import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Header from './Header';
import { useHistory } from 'react-router-dom';
import defaultProfile from '../../src/components/img/defaultProfile.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import io from 'socket.io-client';
import jwt from 'jsonwebtoken';
import { } from 'dotenv/config'

let socket;


export default function Account() {
    const { register, handleSubmit, reset } = useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const listUserConnected = useSelector((state) => state.listConnected);
    const user = useSelector((state) => state.userInfo);
    const [btnInfoUser, setbtnInfoUser] = useState(true);
    const [modifyImg, setmodifyImg] = useState(false);
    const [passwordWrong, setpasswordWrong] = useState(false);
    const [formWrong, setformWrong] = useState(false);
    const [file, setfile] = useState();


    useEffect(() => {


    }, []);



    const onSubmitImg = data => {
        console.log(data)
        const fileData = new FormData();
        fileData.append("file", file);
        axios.put("http://192.168.1.95:5000/api/auth/updateImgAccount", fileData, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })

            .then(res => {
                axios.post(`${process.env.REACT_APP_API_URL}/api/auth/connectAuth`, { "authorization": "Bearer " + Cookies.get('token') })
                    .then(res => {
                        setmodifyImg(false)
                        reset();
                        dispatch({ type: 'get_userInfo', payload: res.data.result[0] })
                    })
                    .catch(err => (window.location = "/"))
            })
            .catch(err => { "erreur handleSubmit" })
    }

    var modifyImgAccount = () => {
        setmodifyImg(true)
    }

    var inputImgClick = () => {
        document.getElementById("inputAvatar").click();
    }

    const handleFilePreview = e => {
        if (!e.target.files[0]) {
            
        } else {
            var output = "";
            output = document.getElementById("img_avatar")
            output.src = URL.createObjectURL(e.target.files[0]);
            setfile(e.target.files[0])
        }
    }

    const onSubmitModifyForm = data => {
        const chaineglobal = `${data.pseudo + data.name + data.email + data.password + data.last_name + data.date_of_birth}`;
        if (!chaineglobal) {
            setformWrong(true)
            document.getElementById("pseudo").className += " input_not_valid";
            document.getElementById("Email").className += " input_not_valid";
            document.getElementById("password1").className += " input_not_valid";
            document.getElementById("password2").className += " input_not_valid";
            document.getElementById("DateOfBirth").className += " input_not_valid";
            document.getElementById("Name").className += " input_not_valid";
            document.getElementById("Last_Name").className += " input_not_valid";

        } else {

            if (data.password !== data.password2) {
                setpasswordWrong(true);
            } else {
                console.log( data)
                const fileDataUptade = { "pseudo": data.pseudo, "email": data.email, "name": data.name, "last_name": data.last_name, "password": data.password, "date_of_birth": data.date_of_birth, };
                axios.put("http://192.168.1.95:5000/api/auth/updateAccount", fileDataUptade, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })

                    .then(res => {
                        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/connectAuth`, { "authorization": "Bearer " + Cookies.get('token') })
                            .then(res => {
                                setmodifyImg(false)
                                reset();
                                dispatch({ type: 'get_userInfo', payload: res.data.result[0] })
                            })
                            .catch(err => (window.location = "/"))
                    })
                    .catch(err => { console.log("nop") })
            }

        }

    }

    const deleteFormRed = () => {

        if (formWrong === true) {
            document.getElementById("pseudo").className = " form-control";
            document.getElementById("Email").className = " form-control";
            document.getElementById("password1").className = " form-control";
            document.getElementById("password2").className = " form-control";
            document.getElementById("DateOfBirth").className = " form-control";
            document.getElementById("Name").className = " form-control";
            document.getElementById("Last_Name").className = " form-control";
        }

    }

    const deletepasswordWrong = () => {
        if (passwordWrong === true) {
            setpasswordWrong(false)
        }
    }


    return (

        <div className="position-relative">
            <span id="inst"></span>
            {modifyImg === true && btnInfoUser === false && <div className="div_modifyImg col-12 d-flex justify-content-center align-items-center">
                <div className="col-10 bg-color-68 card_modifyImg shadow-lg">
                    <form className="form-group d-flex justify-content-center row" onSubmit={handleSubmit(onSubmitImg)}>
                        <label htmlFor="inputAvatar" className="text-center mb-4 text-info h2">Photo de Profile</label>
                        <input type="file" name="file" className="col-7" id="inputAvatar" aria-describedby="avatar account" placeholder="photo de profile" accept=".jpeg, .png, .jpg" {...register('file', { required: true })} onChange={(e) => handleFilePreview(e)} />
                        <div className="d-flex align-items-center justify-content-center">
                            <div onClick={inputImgClick} className=" div_preview_modifyImg d-flex  justify-content-center align-items-center p-0 border rounded-circle overflow-hidden">{!user.avatar && <img className=" col-12 cursor-pointer " id="img_avatar" src={defaultProfile} alt="logo full topic"></img>}{user.avatar && <img className="col-12 cursor-pointer " id="img_avatar" src={user.avatar} alt="logo full topic"></img>}</div>
                        </div>
                        <div className="d-flex justify-content-around flex-row-reverse pt-5 mb-4">
                            <button className="btn btn-success">Envoyer</button>
                            <button onClick={() => (setmodifyImg(false), reset())} className="btn btn-danger ">Annuler</button>

                        </div>
                    </form>

                </div>
            </div>}
            <div className="bg-color-68 ">
                <Header />
                <div className="div_menu_account d-flex justify-content-around col-12 mt-2 mb-4">
                    <div className={`btn_account col-5 d-flex justify-content-center cursor-pointer ${btnInfoUser === true && "btn_account_select"}`} id="btn_compte" onClick={() => (setbtnInfoUser(true), reset())}>
                        <p className="m-3 d-flex align-items-center ">Compte</p>
                    </div>
                    <div className={`btn_account col-7 d-flex justify-content-center cursor-pointer ${btnInfoUser === false && "btn_account_select"}`} id="btn_modifyCompte" onClick={() => (setbtnInfoUser(false), reset())}>
                        <p className="m-3 d-flex align-items-center ">Modifier le compte</p>
                    </div>
                </div>
                {btnInfoUser === true && <div className="div_Account ">
                    {user.role === "admin" && <div className="d-flex col-12 d-flex justify-content-end p-3 pt-0 pb-1 cursor-pointer">
                        <a className="btn btn-warning" href="/administration">Outils d'administration</a>
                    </div>}
                    <div className="profile_account bg-white col-11 d-flex row justify-content-center m-2 p-3 box_shadow_perso rounded-1">
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="d-flex justify-content-center align-items-center p-0 img_account border rounded-circle overflow-hidden">{!user.avatar && <img className="col-12 cursor-pointer" src={defaultProfile} alt="logo full topic"></img>}{user.avatar && <img className="col-12 cursor-pointer" src={user.avatar} alt="logo full topic"></img>}</div>
                        </div>
                        <h1 className=" text-center mt-3">{user.pseudo}</h1>
                    </div>
                    <div className="apropos_account bg-white m-2 p-3 col-11 box_shadow_perso rounded-1">
                        <h2 className="h5">À propod de moi :</h2>
                        <div>
                            <p className="text-size-1_2rem m-1">Nom : {user.name} {!user.name && "?"}</p>
                            <p className="text-size-1_2rem m-1">Prénom :  {user.last_name} {!user.last_name && "?"}</p>
                            <p className="text-size-1_2rem m-1">Email : {user.email}</p>
                            <p className="text-size-1_2rem m-1">Date de naissance : {user.date_of_birth} {!user.date_of_birth && " ? "}</p>
                        </div>
                    </div>
                    <div className="infocompte_account bg-white m-2 p-3 col-11 box_shadow_perso rounded-1">
                        <h2 className="h6">Information sur le Compte :</h2>
                        <div>
                            <p className="text-size-1_2rem">Date d'inscription : {user.registration_date}</p>
                        </div>
                    </div>
                </div>}
                {btnInfoUser === false && <div>


                    <div className="d-flex align-items-center justify-content-center">
                        <div className="d-flex justify-content-center align-items-center p-0 img_account border rounded-circle overflow-hidden">{!user.avatar && <img onClick={modifyImgAccount} className="col-12  cursor-pointer" src={defaultProfile} alt="logo full topic"></img>}{user.avatar && <img onClick={modifyImgAccount} className="col-12  cursor-pointer" src={user.avatar} alt="logo full topic"></img>}</div>
                    </div>


                    <div className="d-flex align-items-center justify-content-center">
                        <form className="col-10" onSubmit={handleSubmit(onSubmitModifyForm)}>


                            <div className="form-group">
                                <label htmlFor="pseudo" className="mb-2 mt-3 h6">Pseudo</label>
                                <input type="text" name="pseudo" pattern="[a-zA-Z0-9]{4,20}" className=" form-control" id="pseudo" onClick={deleteFormRed} aria-describedby="pseudoModify" placeholder="Entrer votre Pseudo"  {...register('pseudo', { required: false })} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Email" className="mb-2 mt-3 h6">Email </label>
                                <input type="email" name="Email" className=" form-control" id="Email" autoComplete="new-email" onClick={deleteFormRed} aria-describedby="emailModify" placeholder="Entrer votre email" {...register('email', { required: false })} />

                            </div>

                            <div className="form-group">
                                <label htmlFor="Name" className="mb-2 mt-3 h6">Nom</label>
                                <input type="text" name="Name" pattern="[a-zA-Z]{2,25}" className="form-control" id="Name" autoComplete="new-name" onClick={deleteFormRed} aria-describedby="nameModify" placeholder="Entrer votre Nom" {...register('name', { required: false })} />

                            </div>

                            <div className="form-group">
                                <label htmlFor="Last_Name" className="mb-2 mt-3 h6">Prénom</label>
                                <input type="text" name="Last_Name" pattern="[a-zA-Z]{2,25}" className="form-control" id="Last_Name" autoComplete="new-last_name" onClick={deleteFormRed} aria-describedby="LastNameModify" placeholder="Entrer votre Prénom" {...register('last_name', { required: false })} />

                            </div>

                            <div className="form-group">
                                <label htmlFor="password1" className="mb-2 mt-3 h6">Mot de passe</label>
                                <input type="password" name="password1" pattern="[a-zA-Z0-9&_\.-]{8,15}" className="form-control" id="password1" autoComplete="new-password" onClick={(deleteFormRed, deletepasswordWrong)} aria-describedby="passwordModify" placeholder="Entrer votre nouveau Mot de passe" {...register('password', { required: false })} />

                            </div>

                            <div className="form-group">
                                <label htmlFor="password2" className="mb-2 mt-2 h6"></label>
                                <input type="password" name="password2" pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9&_\.-]{8,15})" className="form-control" id="password2" autoComplete="new-password" onClick={deleteFormRed, deletepasswordWrong} aria-describedby="passwordModify2" placeholder="Retapez votre nouveau Mot de passe" {...register('password2', { required: false })} />

                            </div>

                            {passwordWrong === true && <small className="text-danger"> LE MOT DE PASSE NE CORRESPOND PAS</small>}

                            <div className="form-group">
                                <label htmlFor="DateOfBirth" className="mb-2 mt-3 h6">Date de naissance</label>
                                <input type="date" name="DateOfBirth" className="form-control" id="DateOfBirth" onClick={deleteFormRed} placeholder="Entrer votre Date de naissance " {...register('date_of_birth', { required: false })} />
                            </div>

                            {/* <div className="form-check">
<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
<label className="form-check-label" for="exampleCheck1">Check me out</label>
</div> */}
                            <button type="submit" className="btn btn-primary mt-4 mb-5">Submit</button>
                        </form>
                    </div>

                </div>}

            </div>

        </div>
    )

}









