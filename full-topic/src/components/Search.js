import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import defaultImg from '../../src/components/img/interrogation.jpg';

function Search() {
    const { register, handleSubmit, reset } = useForm();
    const [heigthWindow, setheigthWindow] = useState(window.innerHeight);
    const [searchOk, setsearchOk] = useState(false);
    const [resultSearchOk, setresultSearchOk] = useState(false);
    const [resultSearch, setresultSearch] = useState();
    const user = useSelector((state) => state.userInfo);


    window.addEventListener("resize", function (event) {
        setheigthWindow(window.innerHeight);
    });

    useEffect(() => {
        console.log(heigthWindow)

    }, []);

    const submitSearch = e => {
        console.log(e)
        setsearchOk(true)
        const name = { name: e.name };
        console.log(Cookies.get('token'))
        axios.post(`${process.env.REACT_APP_API_URL}/api/search/getSearchSubCategory`, name, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {
                console.log(res)

                setresultSearch(res.data.Result)
                setresultSearchOk(true)
            })
            .catch(error => (error))
    }

    if (resultSearchOk === true) {
        console.log("dddd")
        console.log(resultSearch)

        if (resultSearch) {
            var search_map = resultSearch.map((listSubCategory_data, index) => {
                console.log(listSubCategory_data)
                return (
                    <a className="d-flex rounded text-decoration-none p-2 mt-4 bg-black shadow" key={index} href={`http://192.168.1.95:3000/chat/${listSubCategory_data.id_sub_category}`}>
                    {listSubCategory_data.image_sub_category && <img className="img_subCategory" src={`${listSubCategory_data.image_sub_category}`} alt={`photo category ${listSubCategory_data.name_sub_category}`}></img>}
                    {!listSubCategory_data.image_sub_category && <img className="img_subCategory" src={`${defaultImg}`} alt={`photo category ${listSubCategory_data.name_sub_category}`}></img>}
                    <div className="container_subCategory col-9 ">
                        <h2 className="h5 text-truncate">{listSubCategory_data.name_sub_category}</h2>
                        <div>
                            <p className="m-0 created_by">Créée par : <b>{listSubCategory_data.pseudo}</b></p>
                            <div className="d-flex  justify-content-between">
                                <p className="created_by m-0">Le : <b className="date_sub_category">{listSubCategory_data.creation_date}</b></p>
                                <div id="numberLikeAndComment" className='d-flex'>
                                    <p className="m-0"><i className="fas fa-thumbs-up"></i> {listSubCategory_data.numberLike >= 100 && "99+" || listSubCategory_data.numberLike}</p>
                                    <p className="m-1 mb-0 mt-0"> | </p>
                                    <p className="m-0"><i className="fas fa-comment-dots"></i> {listSubCategory_data.numberComment >= 100 && "99+" || listSubCategory_data.numberComment}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </a>
                )
            })
        }
        if (resultSearch.length === 0) {
            document.getElementById("err_result").classList.remove("d-none")
        }

    }


    return (
        <div className="bg-color-32 p-2 pt-2 pb-2 position-relative">
            
            <form onSubmit={handleSubmit(submitSearch)} id="div_search" className="d-flex flex-row-reverse justify-content-center  align-items-center rounded text-center">
                <input type="search" className="" placeholder="Recherche de Salon" {...register('name', { required: true })} />
                <button className="fas fa-search"></button>
            </form>
            {searchOk === true && <div id="result_search" className="mt-1 bg-color-107 rounded col-11 overflow-auto p-2" style={{ maxHeight: `${window.innerHeight * 0.75 + 'px'}` }}>
                <a className="link-danger d-flex justify-content-end " onClick={() => (setsearchOk(false), reset())}>Annuler</a>
                {search_map}
                <div id="err_result" className="d-none">
                    <p className="m-0 mt-5 mb-5 text-danger">Désoler aucun salon ne comporte ce mot clé</p>
                </div>
            </div>}
        </div>
    )

};



export default Search;