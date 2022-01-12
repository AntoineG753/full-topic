import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Formlogin from './Formlogin';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import { useHistory } from 'react-router-dom';







export default function Home() {
    const allCategory = useSelector((state) => state.getAllCategory);
    const userInfo = useSelector((state) => state.userInfo);

     

    if (allCategory) {
        var list_category = allCategory.map((listCategory_data, index) => {


            return (
                <a className="card_category col-10 overflow-hidden mt-5 d-flex align-items-center justify-content-center shadow position-relative" key={index} href={`http://192.168.1.95:3000/${listCategory_data.name_category}`}>
                    <img className="img-category w-100 h-100" src={`${listCategory_data.image_category}`} alt={`photo category ${listCategory_data.name_category}`}></img>
                    <h2 className="h2-category position-absolute h1 w-100 h-100 m-0 d-flex align-items-center justify-content-center">{listCategory_data.name_category}</h2>
                </a>
            )
        })
    }


    return (
        <div >
            <span id="inst"></span>
            {!userInfo.uuid && <Formlogin />}
            <Header />
            <Search/>
            <div className="div_home pb-5 col-12 h-100 w-100">
                <div>
                    
                </div>
                <div className="div_category col-12 d-flex justify-content-arrond justify-content-center flex-wrap">
                    {list_category}
                </div>
               
            </div>
            <Footer/>
        </div>
    )
}








