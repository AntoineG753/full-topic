import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../Header';
import Footer from '../Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import defaultImg from '../../../src/components/img/interrogation.jpg';
import oops from '../img/oops.png';

export default function SubCategory() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo);
    const user = useSelector((state) => state.userInfo);
    const [allSubCategory, setallSubCategory] = useState();
    const [idCategory, setidCategory] = useState();
    const [getAllSubCategoryOK, setgetAllSubCategoryOK] = useState(false);
    const [createSalonOK, setcreateSalonOK] = useState(false);
    const [btnCheck, setbtnCheck] = useState(false);
    const [titreOK, settitreOK] = useState(false);
    const [descriptionOK, setdescriptionOK] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    var screenHeight = (Math.round(window.innerHeight / 1.3) + 'px');

    useEffect(() => {

        var pathNameCoded = window.location.pathname.split('/')[1].toString();
        var pathName = decodeURIComponent(pathNameCoded);

        if (!allSubCategory) {


            axios.get(`${process.env.REACT_APP_API_URL}/api/subCategory/getAllSubCategory`, { params: { pathName }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
                .then(res => {
                    console.log(res)
                    setidCategory(res.data.id_category.id_category)
                    setallSubCategory(res.data.Result)
                    setgetAllSubCategoryOK(true);

                })
                .catch(error => (error))
        }

    }, []);

    const reloadSubCategory = () => {
        var pathNameCoded = window.location.pathname.split('/')[1].toString();
        var pathName = decodeURIComponent(pathNameCoded);
        axios.get(`${process.env.REACT_APP_API_URL}/api/subCategory/getAllSubCategory`, { params: { pathName }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {
                console.log(res)
                setidCategory(res.data.id_category.id_category)
                setallSubCategory(res.data.Result)
                setgetAllSubCategoryOK(true);

            })
            .catch(error => (error))
    }



    if (getAllSubCategoryOK === true) {
        var subCategoryLength = allSubCategory.length;

        var list_subCategory = allSubCategory.map((listSubCategory_data, index) => {
            var isnull = `${listSubCategory_data.number_like}`;

            return (
                <a className="d-flex rounded text-decoration-none p-2 mt-4 bg-black shadow" key={index} href={`http://192.168.1.95:3000/chat/${listSubCategory_data.id_sub_category}`}>
                    {listSubCategory_data.image_sub_category && <img className="img_subCategory" src={`${listSubCategory_data.image_sub_category}`} alt={`photo category ${listSubCategory_data.name_sub_category}`}></img>}

                    <div className="container_subCategory col-9 ">
                        <h2 className="h5 text-truncate">{listSubCategory_data.name_sub_category}</h2>
                        <div>
                            <p className="m-0 created_by">Créée par : <b>{listSubCategory_data.pseudo}</b></p>
                            <div className="d-flex  justify-content-between">
                                <p className="created_by m-0">Le : <b className="date_sub_category">{listSubCategory_data.creation_date}</b></p>
                                <div className='d-flex'>
                                    <p className="m-0"><i className="fas fa-thumbs-up"></i> {isnull === 'null' && "0" || listSubCategory_data.numberLike >= 100 && "99+" || listSubCategory_data.number_like}</p>
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

    const createSalon = data => {
        console.log(data)
        if (data.btnCheck === false) {
            setbtnCheck(true)
        } else {
            if (!data.titre) {
                settitreOK(true)
            } else {
                if (!data.description) {
                    setdescriptionOK(true)
                } else {
                    const fileData = new FormData();
                    fileData.append("file", data.file[0])
                    fileData.append("titre", data.titre)
                    fileData.append("description", data.description)
                    fileData.append("id_category", idCategory)
                    axios.post(`${process.env.REACT_APP_API_URL}/api/subCategory/createSubCategory`, fileData, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
                        .then(res => {

                            console.log(res.data.Result.affectedRows)
                            if (res.data.Result.affectedRows) {
                                reset();
                                window.location.reload()
                            }
                        })
                        .catch(err => (window.location = "/"))
                }
            }
        }
    }







    return (

        <div className="bg-color-68">
            <span id="inst"></span>
            {createSalonOK === true &&
                <div className="div_createSalon col-12 d-flex justify-content-center align-items-center">
                    <div className="col-10 bg-color-68 card_modifyImg shadow-lg">
                        <h1 className="text-center">Ajouter un salon</h1>
                        <form className="form-group d-flex justify-content-center row" onSubmit={handleSubmit(createSalon)}>

                            <div className="form-group">
                                <label htmlFor="titre" className="mb-2 mt-2 h6">Titre du salon</label>
                                <input type="text" name="titre" className="form-control" id="titre" autoComplete="titre" onClick={() => (settitreOK(false))} aria-describedby="Titre du salon" placeholder="Titre du salon" {...register('titre', { required: false })} />
                                {titreOK === true && <p className="text-danger m-0 text_input_notValid">Entrer un titre</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="description" className="mb-2 mt-2 h6">Déscription du salon</label>
                                <textarea type="text" name="description" className="form-control" id="description" autoComplete="description du salon" onClick={() => (setdescriptionOK(false))} aria-describedby="description" placeholder="Description du salon" {...register('description', { required: false })} />
                                {descriptionOK === true && <p className="text-danger m-0 text_input_notValid">Entrer une description</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="file" className="mb-2 mt-2 h6">Image</label>
                                <input type="file" name="file" className="form-control" id="file" autoComplete="new image sub category" aria-describedby="file" placeholder="Entrer votre Prénom" {...register('file', { required: false })} />
                            </div>

                            <div className="form-group mt-3">
                                <div className="form-check">
                                    <input className="form-check-input" onClick={() => (setbtnCheck(false))} type="checkbox" id="gridCheck" {...register('btnCheck', { required: false })} />
                                    <label className="form-check-label text_input_notValid" htmlFor="gridCheck">
                                        J'accepte les Conditions générales d'utilisation
                                    </label>
                                    {btnCheck === true && <p className="text-danger text_input_notValid"> Vous devez accepter les Conditions générales d'utilisation</p>}
                                </div>
                            </div>
                            <div className='col-12 mt-3 d-flex flex-row-reverse justify-content-around'>
                                <button type="submit" className="btn btn-primary col-4">Ajouter</button>
                                <button onClick={() => (setcreateSalonOK(false), reset())} className="btn btn-danger col-4">Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            }

            <Header />
            <div className="col-12 p-2 d-flex justify-content-between shadow-bottom">
                <a className="" onClick={() => (setcreateSalonOK(true))}>Ajouter un salon</a>
                <i className="fas fa-sync-alt col-1 d-flex justify-content-center align-items-center" aria-hidden="true" onClick={() => (reloadSubCategory(), reset())}></i>
            </div>
            <div className="col-12 p-2 " style={{ minHeight: `${screenHeight}` }}>
                {list_subCategory}
                {!subCategoryLength && <div className="d-flex justify-content-center align-items-center" style={{ minHeight: `${screenHeight}` }}>
                    <img className="col-12" src={oops} /></div>}

            </div>
            <Footer />
        </div>

    )

}