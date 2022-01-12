import React, { useState } from 'react';
import iconheader from '../../src/components/img/logo.png';
import defaultProfile from '../../src/components/img/defaultProfile.png';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';




function Header() {

    const history = useHistory();
    const userInfo = useSelector((state) => state.userInfo)


    const dropMenu = () => {

        const navbar = document.getElementById("navbar");
        const acceuilMenu = document.getElementById('1_menu')
        const topicMenu = document.getElementById("2_menu");
        const compteMenu = document.getElementById("3_menu");
        const contactMenu = document.getElementById("4_menu");
        const aproposMenu = document.getElementById("5_menu");
        const icon_menu = document.getElementById("icon_menu");

        if (navbar.className === "d-flex unDroped") {
            navbar.className = "d-flex droped";
            acceuilMenu.className = "acceuilMenu";
            topicMenu.className = " topicMenu";
            compteMenu.className = " compteMenu";
            contactMenu.className = "contactMenu";
            aproposMenu.className = "aproposMenu";
            icon_menu.className = "fas fa-bars icon_menu_animation";
        } else {
            navbar.className = "d-flex unDroped";
            acceuilMenu.className = "";
            topicMenu.className = "";
            compteMenu.className = "";
            contactMenu.className = "";
            aproposMenu.className = "";
            icon_menu.className = "fas fa-bars icon_menu_animationReverse";
        }
    }

    const pushAccount = () => {
        history.push('/account')
    }

    return (
        <div>
            <header className="div_header container-fluid d-flex justify-content-between" id="header">
                <div className="nav col-3 d-flex ">
                    <i id="icon_menu" className="fas fa-bars" onClick={dropMenu}></i>
                </div>
                <div className="Titre col-6 ">
                    <a href="http://192.168.1.95:3000/home" className="d-flex cursor-pointer-none justify-content-center"><img className="logo_header cursor-pointer col-6" src={iconheader} alt="logo full topic"></img></a>
                </div>
                <div className="Profile_div col-3 d-flex align-items-center justify-content-center">
                    <div className="col-12">
                        <a onClick={pushAccount} className="d-flex  justify-content-center align-items-center img_header border rounded-circle overflow-hidden">{!userInfo.avatar && <img className="col-12" src={defaultProfile} alt="logo full topic"></img>}{userInfo.avatar && <img className="col-12" src={userInfo.avatar} alt="logo full topic"></img>}</a>
                    </div>
                </div>
            </header>
            <nav id="navbar" className="d-flex unDroped">
                <a id="1_menu" href="http://192.168.1.95:3000/home" className=" " >Acceuil</a>
                <a id="2_menu" href="#" className=" ">Topic</a>
                <a id="3_menu" href="#" className=" ">Compte</a>
                <a id="4_menu" href="#" className=" ">Contact</a>
                <a id="5_menu" href="#" className=" ">A porpos</a>
            </nav>
        </div>
    )

};



export default Header;