import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import isEmpty from '../utils/isEmpty' // test if it is empty or not empty syntax: ( isEmpty(variable) ) || ( !isEmpty(variable) )
require('dotenv').config();


function Formlogin() {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    const userInfo = useSelector((state) => state.userInfo)

    // switch connect and inscription
    // cp = components
    const [cpLogin, setcpLogin] = useState(true)
    const [cpRegister, setcpRegister] = useState(false)
    const [cpSimilarPassword, setcpSimilarPassword] = useState(false) // password is not similar to confirm password
    const [cpErreurRegister, setcpErreurRegister] = useState(false) // erreur register activation
    const [erreurRegisterText, seterreurRegisterText] = useState() // erreur register text
    const [cpErreurLogin, setcpErreurLogin] = useState(false) // erreur login activation
    const [erreurLoginText, seterreurLoginText] = useState() // erreur Login text
    const [SuccessRegister, setSuccessRegister] = useState(false)




        //  FUNCTION SEND FORM REGISTER
    const onSubmitRegister = data => {
        setcpErreurRegister(false)
        seterreurRegisterText()
        if (data.password !== data.confirm_password) {
            setcpSimilarPassword(true);
        } else {
            
            const registerData = { "email": data.email, "pseudo": data.pseudo, "password": data.password };
       
            axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, registerData)
                .then(res => {
                    console.log(res.data.message);
                    reset()
                    setcpRegister(false)
                    setcpLogin(true)
                    setSuccessRegister(true)
                    setcpErreurLogin(false)
                })
                .catch(error => {seterreurRegisterText(`${error.response.data.msg || error.response.data.errors[0].msg}`); setcpErreurRegister(true)})    
        }
    };

    // FUNCTION SEND FORM LOGIN

    const onSubmitLogin = data => {

        const loginData = { "pseudo": data.pseudo, "password": data.password };
    
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, loginData)
            .then(res => {
                dispatch({ type: 'get_userInfo', payload: res.data})
                console.log(res.data)
                
                dispatch({ type: 'listConnected', payload: {name: res.data, }})
                Cookies.set('token', `${res.data.token_connect}`, { expires: 1 }, {domain: 'localhost:3000'})
                document.getElementById("cpFormLogin").className += "d-none";
                window.location = "/home";
                
            })
            .catch( error => {seterreurLoginText(`${error.response.data.msg || error.response.msg || error.response.data.errors[0].msg}`); setcpErreurLogin(true) })

    }; 

    return (
        <div id="cpFormLogin" className='divFormLogin d-flex justify-content-center align-items-center '>
            {cpLogin === true && <form className="form h-auto p-4 col-11 rounded shadow" onSubmit={handleSubmit(onSubmitLogin)} >
                <h2 className="text-center mb-4 text-info">Connexion</h2>
                <div className='formgroup mb-3'>
                    <label htmlFor="InputPseudo" className="text-muted">Pseudo</label>
                    <input type="text" className="form-control" id="InputPseudo" placeholder="Pseudo" name="pseudo" onClick={() => (setcpErreurLogin(false))} {...register('pseudo', { required: true })} />
                </div>
                <div className='formgroup mb-3'>
                    <label htmlFor="InputPassword" className="text-muted">Password</label>
                    <input type="password" className="form-control" id="InputPassword" autoComplete="off" placeholder="Password" name="password" onClick={() => (setcpErreurLogin(false))} {...register('password', { required: true })} />
                </div>
                {SuccessRegister === true && <p className="text-success">Enregistration Confirmée !</p>}
                {cpErreurLogin === true && <p className="text-danger">{erreurLoginText}</p>}
                <div className='btn-formLogin mt-5 d-flex justify-content-around'>
                    <button className="btn btn-primary">Connexion</button>
                    <button className="btn-deco-none d-flex align-items-center text-warning" onClick={() => (setcpRegister(true), setcpLogin(false), setSuccessRegister(false), reset())}>Inscription</button>
                </div>
            </form>}

            {/* COMPONENT REGISTER */}

            {cpRegister === true && <form className="form h-auto p-4 col-11 rounded shadow" onSubmit={handleSubmit(onSubmitRegister)} >
                <h2 className="text-center mb-4 text-info">Inscription</h2>
                <div className='formgroup mb-3'>
                    <label htmlFor="InputEmail" className="text-muted">Email</label>
                    <input type="email" className="form-control" id="InputEmail" placeholder="email" name="email" onClick={() => (setcpErreurRegister(false), setcpSimilarPassword(false))} {...register('email', { required: true })} />
                </div>
                <div className='formgroup mb-3'>
                    <label htmlFor="InputPseudo" className="text-muted">Pseudo</label>
                    <input type="text" className="form-control" id="InputPseudo" placeholder="Pseudo" name="email" onClick={() => (setcpErreurRegister(false), setcpSimilarPassword(false))} {...register('pseudo', { required: true })} />
                </div>
                <div className='formgroup mb-3'>
                    <label htmlFor="InputPassword" className="text-muted">Mot de passe</label>
                    <input type="password" className="form-control" id="InputPassword" autoComplete="off" placeholder="Password" name="password" onClick={() => (setcpErreurRegister(false), setcpSimilarPassword(false))} {...register('password', { required: true })} />
                </div>
                <div className='formgroup mb-3'>
                    <label htmlFor="InputConfirmationPassword" className="text-muted">Confirmation</label>
                    <input type="password" className="form-control" id="InputConfirmationPassword" autoComplete="off" placeholder=" Confirmation password" name="confirmation password" onClick={() => (setcpErreurRegister(false), setcpSimilarPassword(false))} {...register('confirm_password', { required: true })} />
                </div>
                {cpSimilarPassword === true && <p className="text-danger">Les passwords ne correspondent pas</p>}
                {cpErreurRegister === true && <p className="text-danger">{erreurRegisterText}</p>}
                <div className='btn-formLogin mt-3 d-flex justify-content-around flex-row-reverse'>
                    <button className="btn btn-primary">Inscription</button>
                    <button className=" btn-deco-none d-flex align-items-center text-danger" onClick={() => (setcpRegister(false), setcpLogin(true), setcpErreurRegister(false), reset())}>Retour</button>
                </div>
            </form>}
        </div>
    )
};


export default Formlogin;


















