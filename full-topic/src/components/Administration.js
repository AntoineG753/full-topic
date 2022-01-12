import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Header from './Header';
import Cookies from 'js-cookie';
import axios from 'axios';
import io from 'socket.io-client';
let socket;



export default function Admin() {
    const { register, handleSubmit, reset } = useForm();
    const user = useSelector((state) => state.userInfo);
    const userConnected = useSelector((state) => state.listConnected);
    const [CP_category, setCP_category] = useState(false);
    const [allCat, setallCat] = useState(false);
    const [rechercheCat, setrechercheCat] = useState(false);
    const [plusCategory, setplusCategory] = useState(false);
    const [modifyCategory, setmodifyCategory] = useState(false);
    const [modifyCategoryOK, setmodifyCategoryOK] = useState(false);
    const [deleteCategory, setdeleteCategory] = useState(false);
    const [dataCat, setdataCat] = useState();

    const [CP_sujet, setCP_sujet] = useState(false);
    const [allSujet, setallSujet] = useState(false);
    const [rechercheSujet, setrechercheSujet] = useState(false);
    const [plusSujet, setplusSujet] = useState(false);
    const [infoSujet, setinfoSujet] = useState(false);
    const [dataSubCat, setdataSubCat] = useState();
    const [modifySubCategoryOK, setmodifySubCategoryOK] = useState(false);
    const [deleteSubCategory, setdeleteSubCategory] = useState(false);
    const [allReportsSubCategoryData, setallReportsSubCategoryData] = useState();
    const [infoReportSubCategory, setinfoReportSubCategory] = useState(false);
    const [infoReportSubCategoryData, setinfoReportSubCategoryData] = useState();
    const [reportDeleteSubCategory, setreportDeleteSubCategory] = useState(false);
    const [reportApprouvedSubCategory, setreportApprouvedSubCategory] = useState(false);


    const [CP_report, setCP_report] = useState(false);
    const [allReportsSujets, setallReportsSujets] = useState(false);
    const [allReportsMessages, setallReportsMessages] = useState(false);
    const [allReportsMessagesData, setallReportsMessagesData] = useState();
    const [infoReportMessage, setinfoReportMessage] = useState(false);
    const [reportDeleteMessage, setreportDeleteMessage] = useState(false);
    const [reportApprouvedMessage, setreportApprouvedMessage] = useState(false);
    const [infoReportMessageData, setinfoReportMessageData] = useState();


    const [CP_user, setCP_user] = useState(false);
    const [allUser, setallUser] = useState(false);
    const [rechercheUser, setrechercheUser] = useState(false);
    const [connectedUser, setconnectedUser] = useState(false);
    const [list_allUser, setlist_allUser] = useState();
    const [list_rechercheUser, setlist_rechercheUser] = useState();
    const [infoUser, setinfoUser] = useState(false);
    const [infoUserData, setinfoUserData] = useState();
    const [deleteUser, setdeleteUser] = useState(false);
    const [modifyUserOK, setmodifyUserOK] = useState(false);
    const [msgUser, setmsgUser] = useState(false);

    const [heigthHeader, setheigthHeader] = useState();
    const [heigthBody, setheigthBody] = useState()
    const [category, setcategory] = useState()
    const [sub_category, setsub_category] = useState()
    const [file, setfile] = useState();

    const admin = (e) => {
        console.log(e.category)
        
       if (e.category === "updateUser") {
           
        const data = {pseudo: infoUserData[0].pseudo, inst: `<div id="windowMsgAdmin" style= height:${window.innerHeight + 'px;'}z-index:99;backdrop-filter:blur(4px);background-color:transparent; class="position-fixed d-flex justify-content-center align-content-center justify-items-center align-items-center col-12"><div class="p-2 position-fixed bg-color-68 border col-10 d-flex flex-direction-column"><div class="d-flex justify-content-between mb-2"><div><a class="fas fa-sync text-decoration-none" href=""></a></div><div><i id="closeMsgAdmin" class="far fa-window-close text-danger h3" ></i></div></div><div><h1 class=" border p-1 text-danger text-center">~ IMPORTANT ~</h1></div><div class="d-flex flex-direction-column "><p class="color-fff m-0"><b>Message :</b></p><p class="color-fff p-1 pt-0 pb-0">Votre compte vient d'être modifié par un administrateur, actualiser la page pour que les modifications soient prises en compte !</p></div><div><p class="text-warning">Signée par : <b>${user.pseudo}</b></p></div></div>`, category: e.category};
        socket.emit('admin', data);
        
       }
       if (e.category === "deleteUser") {
        const data = {pseudo: infoUserData[0].pseudo, inst: `<div id="windowMsgAdmin" style= height:${window.innerHeight + 'px;'}z-index:99;backdrop-filter:blur(4px);background-color:transparent; class="position-fixed d-flex justify-content-center align-content-center justify-items-center align-items-center col-12"><div class="p-2 position-fixed bg-color-68 border col-10 d-flex flex-direction-column"><div class="d-flex justify-content-between mb-2"></div><div><h1 class=" border p-1 text-danger text-center">~ IMPORTANT ~</h1></div><div class="d-flex flex-direction-column "><p class="color-fff"><b>Message :</b></p><p class="color-fff">Votre compte a etait supprimée par un administrateur car le CGU n'a pas été respecté.</p></div><div><p class="text-warning">Signée par : <b>${user.pseudo}</b></p></div></div>`, category: e.category};
        socket.emit('admin', data);
       }
       
    }

    const MsgUser = e => {
        console.log(e)
        const data = {pseudo: infoUserData[0].pseudo, inst: `<div id="windowMsgAdmin" style= height:${window.innerHeight + 'px;'}z-index:99;backdrop-filter:blur(4px);background-color:transparent; class="position-fixed d-flex justify-content-center align-content-center justify-items-center align-items-center col-12"><div class="p-2 position-fixed bg-color-68 border col-10 d-flex flex-direction-column"><div class="d-flex justify-content-between mb-1"><div><a class="fas fa-sync text-decoration-none" href=""></a></div><div><i id="closeMsgAdmin" class="far fa-window-close text-danger h3" ></i></div></div><div><h1 class=" border p-1 text-danger text-center">Message d'un Admin</h1></div><div class="d-flex flex-direction-column "><p class="color-fff m-0"><b>Message :</b></p><p class="color-fff p-1 pt-0 pb-0">${e.msg}</p></div><div><p class="text-warning">Signée par : <b>${user.pseudo}</b></p></div></div>`, category: e.category};
        socket.emit('admin', data);
        setmsgUser(false)
        reset()
    }

    window.addEventListener("resize", function (e) {
        e.preventDefault();
        setheigthHeader(document.getElementById("header").offsetHeight);

        setheigthBody(window.innerHeight - document.getElementById("header").offsetHeight)
    });

    useEffect(() => {
        socket = io("http://192.168.1.95:5000/", { query: `uuid=${user.uuid}` });
        setheigthHeader(document.getElementById("header").offsetHeight);
        setheigthBody(window.innerHeight - document.getElementById("header").offsetHeight)

    }, []);

    const getAllCategory = () => {

        axios.get(`${process.env.REACT_APP_API_URL}/api/category/getAllCategory`)
            .then(res => {

                setcategory(res.data.Result)

            })
            .catch(error => (error))
    }

    const submitSearchCategory = e => {

        const data = { name: e.name };
        axios.post(`${process.env.REACT_APP_API_URL}/api/category/getSearchCategory`, data)
            .then(res => {

                setcategory(res.data.Result)

                reset()
            })
            .catch(error => (error))
    }

    const addCategory = e => {
        const fileData = new FormData();
        fileData.append("titre", e.titre);
        fileData.append("description", e.Description);
        fileData.append("file", file);
        axios.post(`${process.env.REACT_APP_API_URL}/api/category/createCategory`, fileData, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {
                console.log("category créée avec success!");

            })
            .catch(error => (error))
    }

    const ModifyCat = e => {

        if (!e.titre && !e.description && !file) {
            console.log('il faut au moin 1 champ rempli')
        } else {
            const fileData = new FormData();
            fileData.append("id", dataCat[0].id_category);
            fileData.append("titre", e.titre);
            fileData.append("description", e.description);
            fileData.append("file", file);
            axios.post(`${process.env.REACT_APP_API_URL}/api/category/updateCategory`, fileData, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
                .then(res => {
                    console.log("category modifier avec success !")

                })
                .catch(error => (error))


        }
    }

    const handleDeleteCategory = e => {

        const data = { id: dataCat[0].id_category }
        axios.post(`${process.env.REACT_APP_API_URL}/api/category/deleteCategory`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {

                setdeleteCategory(false)
                setmodifyCategory(false)
                reset()
            })
            .catch(error => (error))
    }

    if (category) {
        var list_category = category.map((listCategory_data, index) => {
            return (
                <div key={index} onClick={() => (setdataCat([listCategory_data]), setmodifyCategory(true))} className="bg-color-107 rounded col-11 mt-3 text-center">
                    <p id={index} className="m-2">{listCategory_data.name_category}</p>
                </div>
            )
        })
    }

    const handleFile = e => {
        setfile(e.target.files[0])
    }

    const getAllSubCategory = () => {

        axios.get(`${process.env.REACT_APP_API_URL}/api/subCategory/adminGetAllSubCategory`)
            .then(res => {

                setsub_category(res.data.Result)
            })
            .catch(error => (error))
    }

    const ModifySubCat = e => {

        if (!e.titre && !e.description && !file && !e.id_category) {
            console.log('au moin un chanmp est requis')
        } else {
            const fileData = new FormData();
            fileData.append("id", dataSubCat[0].id_sub_category);
            fileData.append("titre", e.titre);
            fileData.append("description", e.description);
            fileData.append("file", file);
            fileData.append("id_category", e.id_category);
            axios.post(`${process.env.REACT_APP_API_URL}/api/subCategory/adminGetAllSubCategory`, fileData, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
                .then(res => {

                    reset()
                    setmodifySubCategoryOK(false)
                })
                .catch(error => (error))
        }
    }


    const handleDeleteSubCategory = e => {

        const data = { id: dataSubCat[0].id_sub_category, image: dataSubCat[0].image_sub_category }
        axios.post(`${process.env.REACT_APP_API_URL}/api/subCategory/deleteSubCategory`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {

                setdeleteSubCategory(false)
                setmodifySubCategoryOK(false)
                setinfoSujet(false)
                reset()
                document.getElementById("allSujet").click()
            })
            .catch(error => (error))
    }

    const submitSearchSubCategory = e => {

        const data = { name: e.name };
        axios.post(`${process.env.REACT_APP_API_URL}/api/search/getSearchSubCategory`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {

                setsub_category(res.data.Result)

                reset()
            })
            .catch(error => (error))
    }



    if (sub_category) {
        var list_subCategory = sub_category.map((listSubCategory_data, index) => {
            return (
                <div className="d-flex rounded text-decoration-none p-2 mt-4 col-12 bg-white shadow" key={index} onClick={() => (setinfoSujet(true), setdataSubCat([listSubCategory_data]))}>
                    {listSubCategory_data.image_sub_category && listSubCategory_data.image_sub_category !== "null" && <img className="img_subCategory border shadow" src={`${listSubCategory_data.image_sub_category}`} alt={`photo category ${listSubCategory_data.name_sub_category}`}></img>}

                    <div className="container_subCategory col-9 ">
                        <h2 className="h5 text-truncate">{listSubCategory_data.name_sub_category}</h2>
                        <div>
                            <p className="m-0 created_by">Créée par : <b>{listSubCategory_data.pseudo}</b></p>
                            <div className="d-flex  justify-content-between">
                                <p className="created_by m-0">Le : <b className="date_sub_category">{listSubCategory_data.creation_date}</b></p>
                                <div className='d-flex'>
                                    <p className="m-0"><i className="fas fa-thumbs-up"></i> {listSubCategory_data.numberLike >= 100 && "99+" || listSubCategory_data.numberLike}</p>
                                    <p className="m-1 mb-0 mt-0"> | </p>
                                    <p className="m-0"><i className="fas fa-comment-dots"></i> {listSubCategory_data.numberComment >= 100 && "99+" || listSubCategory_data.numberComment}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )
        })
    }

    if (infoSujet === true) {

        var CP_infoSubCat = dataSubCat.map((listSubCategory_data, index) => {
            return (
                <div key={index} className="bg-blur-2 col-12 d-flex position-absolute h-100 w-100 justify-content-center align-items-center">
                    {deleteSubCategory === true && <div className="bg-color-68 d-flex justify-content-center align-items-center position-absolute h-100 w-100 bg-blur-2 ">
                        <div className="bg-color-68 p-3 rounded">
                            <p className="color-fff h1 text-center p-1 border">ATTENTION</p>
                            <p className="color-fff">Etes vous sur de vouloir supprimer ceci ?</p>
                            <div className="col-12 d-flex justify-content-around">
                                <button className="btn btn-primary" onClick={() => (handleDeleteSubCategory())}>OUI</button>
                                <button className="btn btn-danger" onClick={() => (setdeleteSubCategory(false))}>NON</button>
                            </div>
                        </div>
                    </div>}
                    <div className=' col-11 bg-color-32 p-3'>
                        <div className='d-flex justify-content-end'>
                            <button className="btn d-flex justify-content-center align-items-center p-0 m-0" onClick={() => (setinfoSujet(false))}><i id="btn-times" className="fas fa-times rounded d-flex justify-content-center align-items-center"></i></button>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className='col-5'>
                                <img src={listSubCategory_data.image_sub_category} className="col-12" />
                                <div>
                                    <p className="color-fff mt-2"><b>Créée le</b> : {listSubCategory_data.creation_date}</p>
                                </div>
                            </div>
                            <div className='col-6'>
                                <p className="color-fff" ><b>Titre</b> :  <br />{listSubCategory_data.name_sub_category}</p>
                                <p className="color-fff overflow-auto" style={{ maxHeight: `${heigthBody / 3 + 'px'}` }}><b>Déscription</b> :  <br />{listSubCategory_data.description_sub_category}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-warning" onClick={() => (setmodifySubCategoryOK(true), setinfoSujet(false))}>Modifier</button>
                            <button className="btn btn-danger" onClick={() => (setdeleteSubCategory(true))}>Supprimer</button>
                            <a className="d-flex justify-content-center align-items-center" href={`/chat/${listSubCategory_data.id_sub_category}`}>Allez à </a>
                        </div>
                    </div>
                </div>
            )
        })
    }

    if (modifySubCategoryOK === true && category && CP_category === false) {

        var option_Cat = category.map((listCategory_data, index) => {

            return (
                <option value={`${listCategory_data.id_category}`} key={index} >
                    {listCategory_data.name_category}
                </option>
            )
        })
    }

    if (modifyCategory === true) {
        var CP_modifyCategory = dataCat.map((listCategory_data, index) => {
            return (
                <div key={index} className="bg-blur-2 col-12 d-flex position-absolute h-100 w-100 justify-content-center align-items-center">
                    {deleteCategory === true && <div className="bg-color-68 d-flex justify-content-center align-items-center position-absolute h-100 w-100 bg-blur-2 ">
                        <div className="bg-color-68 p-3 rounded">
                            <p className="color-fff h1 text-center p-1 border">ATTENTION</p>
                            <p className="color-fff">Etes vous sur de vouloir supprimer ceci ?</p>
                            <div className="col-12 d-flex justify-content-around">
                                <button className="btn btn-primary" onClick={() => (handleDeleteCategory())}>OUI</button>
                                <button className="btn btn-danger" onClick={() => (setdeleteCategory(false))}>NON</button>
                            </div>
                        </div>
                    </div>}
                    <div className=' col-11 bg-color-32 p-3'>
                        <div className='d-flex justify-content-end'>
                            <button className="btn d-flex justify-content-center align-items-center p-0 m-0" onClick={() => (setmodifyCategory(false))}><i id="btn-times" className="fas fa-times rounded d-flex justify-content-center align-items-center"></i></button>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className='col-5'>
                                <img src={listCategory_data.image_category} className="col-12" />
                                <div>
                                    <p className="color-fff mt-2"><b>Créée le</b> : {listCategory_data.creation_date}</p>
                                </div>
                            </div>
                            <div className='col-6'>
                                <p className="color-fff"><b>Titre</b> :  <br />{listCategory_data.name_category}</p>
                                <p className="color-fff " ><b>Déscription</b> :  <br />{listCategory_data.description_category}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-warning" onClick={() => (setmodifyCategoryOK(true), setmodifyCategory(false))}>Modifier</button>
                            <button className="btn btn-danger" onClick={() => (setdeleteCategory(true))}>Supprimer</button>
                        </div>
                    </div>
                </div>
            )
        })
    }




    // LOGIQUE REPORTS ----------------------------------------------------------------


    const getReportsMessage = () => {


        axios.get(`${process.env.REACT_APP_API_URL}/api/chatRoom/getAllReportMessage`, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {
                console.log(res)
                setallReportsMessagesData(res.data.Result)
            })
            .catch(error => (error))
    }


    const approuvedMessage = (e) => {


        const data = { id_report: e }
        axios.post(`${process.env.REACT_APP_API_URL}/api/chatRoom/approuvedReportMessage`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {

                setreportApprouvedMessage(false)
                setinfoReportMessage(false)
                getReportsMessage()
            })
            .catch(error => (error))
    }



    const deleteMessage = (e) => {
        console.log(e)
        const data = { id_report: e.id_report, id_message: e.id_message }
        axios.post(`${process.env.REACT_APP_API_URL}/api/chatRoom/deleteReportMessage`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {

                setreportDeleteMessage(false)
                setinfoReportMessage(false)
                getReportsMessage()
                socket.emit("delete_chat_message_report", {
                    id_sub_category: e.id_sub_category,
                    id_message: e.id_message
                })
            })
            .catch(error => (error))

    }


    if (allReportsMessagesData && allReportsMessagesData.length !== 0) {

        console.log(allReportsMessagesData)
        var list_ReportsMessages = allReportsMessagesData.map((reportMessage_data, index) => {
            return (
                <div key={index} className="shadow border rounded mt-2 col-11 d-flex p-2 bg-color-107" onClick={() => (setinfoReportMessage(true), setinfoReportMessageData(reportMessage_data))}>
                    <div className="col-6 d-flex flex-direction-column justify-content-center">
                        <p className="p-0 m-0"><b>Id du report :</b> {reportMessage_data.id_report}</p>
                        <p className="p-0 m-0"><b>Date du report :</b> {reportMessage_data.report_date}</p>
                    </div>
                    <div className="col-6 d-flex flex-direction-column justify-content-center">
                        <p className="p-0 m-0"><b>Nombre de report :</b> {reportMessage_data.number_report}</p>
                        <p className="p-0 m-0"><b>Report par : </b>{reportMessage_data.pseudo_userReport}</p>
                    </div>
                </div>
            )
        })
    }
    if (allReportsMessagesData && allReportsMessagesData.length === 0) {
        const data = [{ text: 'Aucun report ' }]
        var Not_ReportsMessages = data.map((reportMessage_data, index) => {
            return (
                <div key={index} className=" rounded mt-2 col-11 d-flex p-2 " >

                    <p className="col-11 m-0 text-center ">{reportMessage_data.text}</p>
                    <i className="fas fa-sync-alt col-1" onClick={() => (getReportsMessage())}></i>
                </div>
            )
        })
    }



    // LOGIQUE REPORTS Sujets -------------------------------------------------------------
    const getReportsSubCategory = () => {


        axios.get(`${process.env.REACT_APP_API_URL}/api/subCategory/GetAllReportSubCategory`, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {
                console.log(res)
                setallReportsSubCategoryData(res.data.Result)
            })
            .catch(error => (error))
    }

    const approuvedSubCategory = (e) => {

console.log(e)
        const data = { id_report: e }
        axios.post(`${process.env.REACT_APP_API_URL}/api/subCategory/approuvedReportSubCategory`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {

                setreportApprouvedSubCategory(false)
                setinfoReportSubCategory(false)
                getReportsSubCategory()
            })
            .catch(error => (error))
    }



    const reportNotApprouvedSubCategory = (e) => {
        console.log(e)
        const data = { id_report: e.id_report, id_sub_category: e.id_sub_category }
        axios.post(`${process.env.REACT_APP_API_URL}/api/subCategory/deleteReportSubCategory`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {
                setreportDeleteSubCategory(false)
                setinfoReportSubCategory(false)
                getReportsSubCategory()
                socket.emit("delete_sub_category_report", {
                    id_sub_category: e.id_sub_category,
                    id_category: e.id_category
                })
            })
            .catch(error => (error))

    }


    if (allReportsSubCategoryData && allReportsSubCategoryData.length !== 0) {

        console.log(allReportsSubCategoryData)
        var list_reportSubCat = allReportsSubCategoryData.map((reportSubCat_data, index) => {
            return (
                <div key={index} className="shadow border rounded mt-2 col-11 d-flex p-2 bg-color-107" onClick={() => (setinfoReportSubCategory(true), setinfoReportSubCategoryData(reportSubCat_data))}>
                    <div className="col-6 d-flex flex-direction-column justify-content-center">
                        <p className="p-0 m-0"><b>Id du report :</b> {reportSubCat_data.id_report}</p>
                        <p className="p-0 m-0"><b>Date du report :</b> {reportSubCat_data.report_date}</p>
                    </div>
                    <div className="col-6 d-flex flex-direction-column justify-content-center">
                        <p className="p-0 m-0"><b>Nombre de report :</b> {reportSubCat_data.number_report}</p>
                        <p className="p-0 m-0"><b>Report par : </b>{reportSubCat_data.pseudo_userReport}</p>
                    </div>
                </div>
            )
        })
    }
    

    // LOGIQUE USERS 
    const handleDeleteUser = () => {
        
        const data = { uuid: infoUserData[0].uuid, avatar: infoUserData[0].avatar }
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/deleteAccount`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {
                admin({category: "deleteUser"})
                setinfoUserData()
                setinfoUser(false)
                setdeleteUser(false)
                if (allUser === true) {
                    document.getElementById("allUser").click()
                }
                if (connectedUser === true) {
                    document.getElementById("connectedUser").click()
                }
                if (rechercheUser === true) {
                    document.getElementById("rechercheUser").click()
                }
            })
            .catch(error => (error))
    }

    const getAllUser = () => {

        axios.get(`${process.env.REACT_APP_API_URL}/api/auth/allAccount`, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {

                setlist_allUser([res.data.Result])
            })
            .catch(error => (error))
    }

    const ModifyUser = e => {
        
        
      
        if (!e.name && !e.last_name && !file && !e.pseudo && !e.email && !e.date_of_birth && e.role === infoUserData[0].role) {
            console.log('au moin un champ est requis')
        } else {
            
            const fileData = new FormData();
            fileData.append("pseudo", e.pseudo);
            fileData.append("name", e.titre);
            fileData.append("last_name", e.description);
            fileData.append("email", e.email);
            fileData.append("file", file);
            fileData.append("date_of_birth", e.date_of_birth);
            fileData.append("role", e.role);
            fileData.append("uuid", infoUserData[0].uuid);
            axios.post(`${process.env.REACT_APP_API_URL}/api/auth/adminUpdateAccount`, fileData, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
                .then(res => {
                    admin({category: "updateUser"})
                    reset()
                    setmodifyUserOK(false)
                    
                    if(allUser === true && rechercheUser === false && connectedUser === false) {
                        document.getElementById("allUser").click();
                    }
                    if(allUser === false && rechercheUser === true && connectedUser === false) {
                        document.getElementById("rechercheUser").click();
                    }
                    if(allUser === false && rechercheUser === false && connectedUser === true) {
                        document.getElementById("connectedUser").click();
                    }
                })
                .catch(error => (error))
        }
    }

    const submitSearchUser = e => {

        const data = { pseudo: e.pseudo };
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/getSearchAccount`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {

                setlist_rechercheUser([res.data.Result])
                reset()
            })
            .catch(error => (error))
    }

    if (list_allUser && allUser === true) {

        var list_users = list_allUser[0].map((listUser_data, index) => {
            console.log(listUser_data)
            return (
                <div key={index} className="shadow border rounded mt-2 col-10 d-flex p-2 bg-color-107" onClick={() => (setinfoUser(true), setinfoUserData([listUser_data]))}>
                    <img className="col-2 rounded-circle" src={listUser_data.avatar} style={{ height: "10vw", width: "10vw" }}></img>
                    <p className="m-0 col-10 d-flex justify-content-center align-items-center"><b>{listUser_data.pseudo}</b></p>
                </div>
            )
        })
    }

    if (userConnected.length > 0 && connectedUser === true) {

        var list_userConnected = userConnected.map((listUser_data, index) => {
            return (
                <div key={index} className="shadow border rounded mt-2 col-10 d-flex p-2 bg-color-107" onClick={() => (setinfoUser(true), setinfoUserData([listUser_data]))}>
                    <img className="col-2 rounded-circle" src={listUser_data.avatar} style={{ height: "10vw", width: "10vw" }}></img>
                    <p className="m-0 col-10 d-flex justify-content-center align-items-center"><b>{listUser_data.pseudo}</b></p>
                </div>
            )
        })
    }

    if (list_rechercheUser && rechercheUser === true) {
        var list_findUser = list_rechercheUser[0].map((listUser_data, index) => {
            return (
                <div key={index} className="shadow border rounded mt-2 col-10 d-flex p-2 bg-color-107" onClick={() => (setinfoUser(true), setinfoUserData([listUser_data]))}>
                    <img className="col-2 rounded-circle" src={listUser_data.avatar} style={{ height: "10vw", width: "10vw" }}></img>
                    <p className="m-0 col-10 d-flex justify-content-center align-items-center"><b>{listUser_data.pseudo}</b></p>
                </div>
            )
        })
    }


    if (infoUser === true && infoUserData) {

        var CP_infoUser = infoUserData.map((listUser_data, index) => {

            return (
                <div key={index} className="bg-blur-2 col-12 d-flex position-absolute h-100 w-100 justify-content-center align-items-center">
                    {deleteUser === true && <div className="bg-color-68 d-flex justify-content-center align-items-center position-absolute h-100 w-100 bg-blur-2 ">
                        <div className="bg-color-68 p-3 rounded">
                            <p className="color-fff h1 text-center p-1 border">ATTENTION</p>
                            <p className="color-fff">Etes vous sur de vouloir supprimer ceci ?</p>
                            <div className="col-12 d-flex justify-content-around">
                                <button className="btn btn-primary" onClick={() => (handleDeleteUser())}>OUI</button>
                                <button className="btn btn-danger" onClick={() => (setdeleteUser(false))}>NON</button>
                            </div>
                        </div>
                    </div>}
                    {msgUser === true && <div className=" d-flex justify-content-center align-items-center position-absolute h-100 w-100 bg-blur-2 ">
                        <div className="bg-color-68 col-9 p-3 pb-0 rounded">
                            <p className="color-fff h1 text-center p-1 border">~ Message ~</p>
                            <form className="mt-3 mb-3" onSubmit={handleSubmit(MsgUser)}>
                                <textarea name="Msg" rows="5" className=" form-control" id="msg" aria-describedby="Messsage for user" placeholder="Entrer le message" {...register('msg', { required: false })} />
                            
                                <div className="col-12 mt-3 d-flex justify-content-around">
                                    <button className="btn btn-primary" type="submit">ENVOYER</button>
                                    <button className="btn btn-danger" onClick={() => (setmsgUser(false), reset())}>ANNULER</button>
                                </div>
                            </form>
                        </div>
                    </div>}
                    <div className='col-11 bg-color-32 p-3'>
                        <div className='d-flex justify-content-end'>
                            <button className="btn d-flex justify-content-center align-items-center p-0 m-0" onClick={() => (setinfoUser(false))}><i id="btn-times" className="fas fa-times rounded d-flex justify-content-center align-items-center"></i></button>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className='col-4'>
                                <img src={listUser_data.avatar} className="col-12" />
                                <div>
                                    <p className="color-fff mt-2 "><b>Créée le</b> : <br />{listUser_data.registration_date}</p>
                                </div>
                            </div>
                            <div className='col-7'>
                                <p className="color-fff col-12" ><b>Pseudo</b> :  <br /> {listUser_data.pseudo}</p>
                                <p className="color-fff col-12 " style={{ fontSize: "4vw", wordWrap: "break-word" }}><b>Email</b> :  <br />{listUser_data.email} </p>
                                {listUser_data.name && <p className="color-fff col-12" style={{ fontSize: "4vw" }}><b>Nom</b> :  <br />{listUser_data.name} </p>}{!listUser_data.name && <p className="color-fff col-12" style={{ fontSize: "4vw" }}><b>Nom</b> :  <br />? </p>}
                                {listUser_data.last_name && <p className="color-fff col-12 m-0" style={{ fontSize: "4vw" }}><b>Prénom</b> :  <br />{listUser_data.lest_name} </p>}{!listUser_data.last_name && <p className="color-fff col-12 m-0" style={{ fontSize: "4vw" }}><b>Prénom</b> :  <br />?</p>}
                                {listUser_data.date_of_birth && <p className="color-fff col-12 m-0" style={{ fontSize: "4vw" }}><b>Date d'anniversaire</b> :  <br />{listUser_data.date_of_birth} </p>}{!listUser_data.date_of_birth && <p className="color-fff col-12 m-0" style={{ fontSize: "4vw" }}><b>Date d'anniversaire</b> :  <br />? </p>}
                                <p className="color-fff col-12 m-0" style={{ fontSize: "4vw" }}><b>Role</b> : <br />{listUser_data.role}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-warning" onClick={() => (setmodifyUserOK(true), setinfoUser(false), getAllCategory())}>Modifier</button>
                            <button className="btn btn-danger" onClick={() => (setdeleteUser(true))}>Supprimer</button>
                            
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <button className="btn btn-success col-10 mt-3" onClick={() => (setmsgUser(true))}>Message</button>
                        </div>
                    </div>
                </div>
            )
        })
    }




    return (
        <div className='col-12 bg-color-68'>
            <span id="inst"></span>
            {CP_infoSubCat}
            {/* MODIFY SUB CATEGORY */}
            {modifySubCategoryOK === true && <div className="bg-blur-2 col-12 d-flex position-absolute h-100 w-100 justify-content-center align-items-center">
                <div className=' col-11 bg-color-32 p-3'>
                    <div className='d-flex justify-content-end'>
                        <button className="btn d-flex justify-content-center align-items-center p-0 m-0" onClick={() => (setmodifySubCategoryOK(false), reset())}><i id="btn-times" className="fas fa-times rounded d-flex justify-content-center align-items-center"></i></button>
                    </div>
                    <form className="form-group d-flex justify-content-center row" onSubmit={handleSubmit(ModifySubCat)}>
                        <div className="form-group">
                            <label htmlFor="Titre" className="color-fff mb-2 mt-3 h6">Titre</label>
                            <input type="text" name="Titre" className=" form-control" id="Titre" aria-describedby="Titre for nex category" placeholder="Entrer le Titre" pattern="^[a-zA-Z0-9_!-][a-zA-Z0-9_!- ]{1,25}$" {...register('titre', { required: false })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Description" className=" color-fff mb-2 mt-3 h6">Déscription </label>
                            <input type="text" name="Description" className=" form-control" id="Description" aria-describedby="Description for new category" placeholder="Entrer la Déscription" pattern="^[a-zA-Z0-9_][a-zA-Z0-9_ ]{1,300}$" {...register('description', { required: false })} />

                        </div>

                        <div className="form-group">
                            <label htmlFor="file" className="color-fff mb-2 mt-3 h6">image</label>
                            <input type="file" name="Name" className="form-control" id="file" autoComplete="pictures category" aria-describedby="picture for new category" {...register('file', { required: false })} onChange={(e) => handleFile(e)} />

                        </div>

                        <div className="form-group">
                            <label htmlFor="category_select" className="color-fff mb-2 mt-3 h6">changer la category</label>
                            <select name="category_select" id="category_select" {...register('id_category', { required: false })}>
                                <option value="">--Veuillez choisire une category--</option>
                                {option_Cat}
                            </select>
                        </div>
                        <div className="d-flex mt-3 justify-content-around">
                            <button type="submit" className="btn btn-primary">Envoyer</button>
                        </div>
                    </form>

                </div>
            </div>}
            {CP_modifyCategory}
            {modifyCategoryOK === true && <div className="bg-blur-2 col-12 d-flex position-absolute h-100 w-100 justify-content-center align-items-center">
                <div className=' col-11 bg-color-32 p-3'>
                    <div className='d-flex justify-content-end'>
                        <button className="btn d-flex justify-content-center align-items-center p-0 m-0" onClick={() => (setmodifyCategoryOK(false))}><i id="btn-times" className="fas fa-times rounded d-flex justify-content-center align-items-center"></i></button>
                    </div>
                    <form className="form-group d-flex justify-content-center row" onSubmit={handleSubmit(ModifyCat)}>
                        <div className="form-group">
                            <label htmlFor="Titre" className="color-fff mb-2 mt-3 h6">Titre</label>
                            <input type="text" name="Titre" className=" form-control" id="Titre" aria-describedby="Titre for nex category" placeholder="Entrer le Titre"  {...register('titre', { required: false })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Description" className=" color-fff mb-2 mt-3 h6">Déscription </label>
                            <input type="text" name="Description" className=" form-control" id="Description" aria-describedby="Description for new category" placeholder="Entrer la Déscription" {...register('description', { required: false })} />

                        </div>

                        <div className="form-group">
                            <label htmlFor="file" className="color-fff mb-2 mt-3 h6">image</label>
                            <input type="file" name="Name" className="form-control" id="file" autoComplete="pictures category" aria-describedby="picture for new category" {...register('file', { required: false })} onChange={(e) => handleFile(e)} />

                        </div>
                        <div className="d-flex mt-3 justify-content-around">
                            <button type="submit" className="btn btn-primary">Envoyer</button>
                        </div>
                    </form>

                </div>
            </div>}
            {CP_infoUser}
            {modifyUserOK === true && <div className="bg-blur-2 col-12 d-flex position-absolute h-100 w-100 justify-content-center align-items-center">
                <div className=' col-11 bg-color-32 p-3'>
                    <div className='d-flex justify-content-end'>
                        <button className="btn d-flex justify-content-center align-items-center p-0 m-0" onClick={() => (setmodifyUserOK(false), reset())}><i id="btn-times" className="fas fa-times rounded d-flex justify-content-center align-items-center"></i></button>
                    </div>
                    <form className="form-group d-flex justify-content-center row" onSubmit={handleSubmit(ModifyUser)}>
                        <div className="form-group">
                            <label htmlFor="pseudo" className="color-fff mb-2 mt-3 h6">Pseudo</label>
                            <input type="text" name="pseudo" className=" form-control" id="pseudo" aria-describedby="pseudo" placeholder="Entrer le pseudo"  {...register('pseudo', { required: false })} />
                        </div>
                        {/* pattern="^[a-zA-Z0-9_!-][a-zA-Z0-9_!- ]{1,25}$" */}
                        <div className="form-group">
                            <label htmlFor="name" className=" color-fff mb-2 mt-3 h6">Nom </label>
                            <input type="text" name="name" className=" form-control" id="name" aria-describedby="new name" placeholder="Entrer le nom" pattern="^[a-zA-Z0-9_-][a-zA-Z0-9_- ]{1,25}$" {...register('name', { required: false })} />

                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name" className="color-fff mb-2 mt-3 h6">Prénom</label>
                            <input type="text" name="last_name" className="form-control" id="last_name" autoComplete="last_name" aria-describedby="last_name" placeholder="Entrer le prénom" pattern="^[a-zA-Z0-9_-][a-zA-Z0-9_- ]{1,25}$" {...register('last_name', { required: false })} />

                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="color-fff mb-2 mt-3 h6">email</label>
                            <input type="text" name="email" className="form-control" id="email" autoComplete="email" aria-describedby="email" placeholder="Entrer l'email"{...register('email', { required: false })} />

                        </div>

                        <div className="form-group">
                            <label htmlFor="date_of_birth" className="color-fff mb-2 mt-3 h6">Date de naissance</label>
                            <input type="date" name="date_of_birth" className="form-control" id="date_of_birth" autoComplete="date_of_birth" aria-describedby="date_of_birth" placeholder="Entrer votre date de naissance"{...register('date_of_birth', { required: false })} />

                        </div>

                        <div className="form-group">
                            <label htmlFor="file" className="color-fff mb-2 mt-3 h6">file</label>
                            <input type="file" name="Name" className="form-control" id="file" autoComplete="pictures category" aria-describedby="picture for new category" {...register('file', { required: false })} onChange={(e) => handleFile(e)} />

                        </div>

                        <div className="form-group d-flex flex-direction-column">
                            <label htmlFor="category_select" className="color-fff mb-2 mt-3 h6">changer le role : </label>
                            <select name="category_select" className="col-3" id="category_select" {...register('role', { required: false })}>

                                <option value={infoUserData[0].role}>{infoUserData[0].role}</option>
                                {infoUserData[0].role === "admin" && <option value="user">user</option>}
                                {infoUserData[0].role === "user" && <option value="admin">admin</option>}
                            </select>
                        </div>
                        <div className="d-flex mt-3 justify-content-around">
                            <button type="submit" className="btn btn-primary">Envoyer</button>
                        </div>
                    </form>

                </div>
            </div>}
            {infoReportMessage === true && <div className="bg-blur-2 col-12 d-flex position-absolute h-100 w-100 justify-content-center align-items-center">
                {reportApprouvedMessage === true && <div className="bg-color-68 d-flex justify-content-center align-items-center position-absolute h-100 w-100 bg-blur-2 ">
                    <div className="bg-color-68 p-3 rounded">
                        <p className="color-fff h1 text-center p-1 border">ATTENTION</p>
                        <p className="color-fff">Etes vous sur de vouloir Approuver ceci ?</p>
                        <div className="col-12 d-flex justify-content-around">
                            <button className="btn btn-primary" onClick={() => (approuvedMessage(infoReportMessageData.id_report))}>OUI</button>
                            <button className="btn btn-danger" onClick={() => (setreportApprouvedMessage(false))}>NON</button>
                        </div>
                    </div>
                </div>}
                {reportDeleteMessage === true && <div className="bg-color-68 d-flex justify-content-center align-items-center position-absolute h-100 w-100 bg-blur-2 ">
                    <div className="bg-color-68 p-3 rounded">
                        <p className="color-fff h1 text-center p-1 border">ATTENTION</p>
                        <p className="color-fff">Etes vous sur de vouloir supprimer ceci ?</p>
                        <div className="col-12 d-flex justify-content-around">
                            <button className="btn btn-primary" onClick={() => (deleteMessage({ id_report: infoReportMessageData.id_report, id_message: infoReportMessageData.id_message, id_sub_category: infoReportMessageData.id_sub_category }))}>OUI</button>
                            <button className="btn btn-danger" onClick={() => (setreportDeleteMessage(false))}>NON</button>
                        </div>
                    </div>
                </div>}
                <div className=' col-11 bg-color-32 p-3'>
                    <div className='d-flex justify-content-end'>
                        <button className="btn d-flex justify-content-center align-items-center p-0 m-0" onClick={() => (setinfoReportMessage(false), reset())}><i id="btn-times" className="fas fa-times rounded d-flex justify-content-center align-items-center"></i></button>
                    </div>{/* <p>{infoReportMessageData.message}</p> */}
                    <div>
                        <div>
                            <p className="color-fff"><b>Auteur du message :</b> {infoReportMessageData.pseudo}</p>
                            <p className="color-fff"><b>Date de publication :</b> {infoReportMessageData.create_message}</p>
                        </div>
                        <div>
                            <p className="color-fff"><b>Contenu du message :</b></p>
                            <div className="col-11 d-flex align-items-center justify-content-center">
                                <div className="shadow m-1 p-1 p_message">
                                    {infoReportMessageData.image_message !== " " && <img id="img_message" src={infoReportMessageData.image_message} className="col-12 rounded" />}
                                    {infoReportMessageData.message && <p className=" m-0 col-12 text-break">{infoReportMessageData.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 d-flex justify-content-around">
                            <button className="btn btn-success" onClick={() => (setreportApprouvedMessage(true))}>Approuver</button>
                            <button className="btn btn-danger" onClick={() => (setreportDeleteMessage(true))}>Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>}


            {infoReportSubCategory === true && <div className="bg-blur-2 col-12 d-flex position-absolute h-100 w-100 justify-content-center align-items-center">
                {reportApprouvedSubCategory === true && <div className="bg-color-68 d-flex justify-content-center align-items-center position-absolute h-100 w-100 bg-blur-2 ">
                    <div className="bg-color-68 p-3 rounded">
                        <p className="color-fff h1 text-center p-1 border">ATTENTION</p>
                        <p className="color-fff">Etes vous sur de vouloir Approuver ceci ?</p>
                        <div className="col-12 d-flex justify-content-around">
                            <button className="btn btn-primary" onClick={() => (approuvedSubCategory(infoReportSubCategoryData.id_report))}>OUI</button>
                            <button className="btn btn-danger" onClick={() => (setreportApprouvedSubCategory(false))}>NON</button>
                        </div>
                    </div>
                </div>}
                {reportDeleteSubCategory === true && <div className="bg-color-68 d-flex justify-content-center align-items-center position-absolute h-100 w-100 bg-blur-2 ">
                    <div className="bg-color-68 p-3 rounded">
                        <p className="color-fff h1 text-center p-1 border">ATTENTION</p>
                        <p className="color-fff">Etes vous sur de vouloir supprimer ceci ?</p>
                        <div className="col-12 d-flex justify-content-around">
                            <button className="btn btn-primary" onClick={() => (reportNotApprouvedSubCategory({ id_report: infoReportSubCategoryData.id_report, id_sub_category: infoReportSubCategoryData.id_sub_category, id_category: infoReportSubCategoryData.id_category }))}>OUI</button>
                            <button className="btn btn-danger" onClick={() => (setreportDeleteSubCategory(false))}>NON</button>
                        </div>
                    </div>
                </div>}
                <div className=' col-11 bg-color-32 p-3'>
                    <div className='d-flex justify-content-end'>
                        <button className="btn d-flex justify-content-center align-items-center p-0 m-0" onClick={() => (setinfoReportSubCategory(false), reset())}><i id="btn-times" className="fas fa-times rounded d-flex justify-content-center align-items-center"></i></button>
                    </div>{/* <p>{infoReportMessageData.message}</p> */}
                    <div>
                        <div>
                            <p className="color-fff"><b>Auteur du Sujet :</b> {infoReportSubCategoryData.pseudo}</p>
                            <p className="color-fff"><b>Date de publication :</b> {infoReportSubCategoryData.creation_date}</p>
                        </div>
                        <div>
                            <p className="color-fff"><b>Sujet :</b></p>
                            <div className="col-11 d-flex align-items-center justify-content-center">
                                <div className=" m-3 p-1 ">
                                    {infoReportSubCategoryData.image_sub_category !== " " && <img src={infoReportSubCategoryData.image_sub_category} className="col-6 rounded border" />}
                                    {infoReportSubCategoryData.name_sub_category && <p className=" m-0 mt-2 col-12 text-break color-fff"><b>Titre :</b><br/>{infoReportSubCategoryData.name_sub_category}</p>}
                                    {infoReportSubCategoryData.description_sub_category && <p className=" m-0 mt-2 col-12 text-break color-fff"><b>Déscription :</b><br/>{infoReportSubCategoryData.description_sub_category}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 d-flex justify-content-around">
                            <button className="btn btn-success" onClick={() => (setreportApprouvedSubCategory(true))}>Approuver</button>
                            <button className="btn btn-danger" onClick={() => (setreportDeleteSubCategory(true))}>Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>} 
            <Header />
            <div style={{ height: `${heigthBody + 'px'}` }}>
                <div className='div_body_admin col-12 '>
                    <div className='menu_admin bg-color-107 col-12 d-flex justify-content-around'>
                        <div className='d-flex justify-content-center align-items-center cursor-pointer' onClick={() => (setCP_category(true), setCP_sujet(false), setCP_report(false), setCP_user(false))}>
                            <p className='m-0 p-0'>Category</p>
                        </div>
                        <div className='d-flex justify-content-center align-items-center cursor-pointer' onClick={() => (setCP_category(false), setCP_sujet(true), setCP_report(false), setCP_user(false))}>
                            <p className='m-0 p-0'>Sujets</p>
                        </div>
                        <div className='d-flex justify-content-center align-items-center cursor-pointer' onClick={() => (setCP_category(false), setCP_sujet(false), setCP_report(true), setCP_user(false))}>
                            <p className='m-0 p-0'>Reports</p>
                        </div>
                        <div className='d-flex justify-content-center align-items-center cursor-pointer' onClick={() => (setCP_category(false), setCP_sujet(false), setCP_report(false), setCP_user(true))}>
                            <p className='m-0 p-0'>Users</p>
                        </div>
                    </div>
                    <div className='CP_all'>
                        {CP_category === true && <div id="CP_category">
                            <div className='d-flex col-12'>
                                <p id="allCategory" className="btn col-5" onClick={() => (document.getElementById("allCategory").className += " btn_select", document.getElementById("recherCategory").classList.remove("btn_select"), document.getElementById("plusCategory").classList.remove("btn_select"), setrechercheCat(false), setplusCategory(false), setallCat(true), setallSujet(false), setrechercheSujet(false), setallReportsSujets(false), setallReportsMessages(false), setallUser(false), setrechercheUser(false), getAllCategory())}>All category</p>
                                <p id="recherCategory" className="btn col-5" onClick={() => (document.getElementById("recherCategory").className += " btn_select", document.getElementById("allCategory").classList.remove("btn_select"), document.getElementById("plusCategory").classList.remove("btn_select"), setrechercheCat(true), setplusCategory(false), setallCat(false), setallSujet(false), setrechercheSujet(false), setallReportsSujets(false), setallReportsMessages(false), setallUser(false), setrechercheUser(false))}>Recherche</p>
                                <p id="plusCategory" className="btn col-2" onClick={() => (document.getElementById("plusCategory").className += " btn_select", document.getElementById("allCategory").classList.remove("btn_select"), document.getElementById("recherCategory").classList.remove("btn_select"), setplusCategory(true), setrechercheCat(false), setallCat(false), setallSujet(false), setrechercheSujet(false), setallReportsSujets(false), setallReportsMessages(false), setallUser(false), setrechercheUser(false))}>+</p>
                            </div>
                            {allCat && CP_category === true && <div className="h-100 overflow-auto  d-flex flex-direction-column align-items-center" style={{ height: `${heigthBody - heigthHeader + 'px'}` }}>
                                {list_category}
                            </div>}
                            {rechercheCat && CP_category === true && <div style={{ height: `${heigthBody - heigthHeader + 'px'}` }}>
                                <div className="col-12 d-flex justify-content-center">
                                    <form onSubmit={handleSubmit(submitSearchCategory)} id="div_search" className="d-flex  justify-content-center  align-items-center rounded text-center">
                                        <input type="search" className="rounded" placeholder="Recherche de category" {...register('name', { required: true })} />
                                        <button className="fas fa-search"></button>
                                    </form>
                                </div>
                                <div className="mt-2 d-flex justify-content-center flex-direction-column align-items-center overflow-auto" style={{ height: `${heigthBody - heigthHeader + 'px'}` }}>
                                    {list_category}
                                </div>
                            </div>}
                            {plusCategory && CP_category === true && <div className="d-flex align-items-center justify-content-center">
                                <form className="col-10" onSubmit={handleSubmit(addCategory)}>
                                    <div className="form-group">
                                        <label htmlFor="Titre" className="mb-2 mt-3 h6">Titre</label>
                                        <input type="text" name="Titre" className=" form-control" id="Titre" aria-describedby="Titre for nex category" placeholder="Entrer le Titre"  {...register('titre', { required: true })} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Description" className="mb-2 mt-3 h6">Déscription </label>
                                        <input type="text" name="Description" className=" form-control" id="Description" autoComplete="Description" aria-describedby="Description for new category" placeholder="Entrer la Déscription" {...register('Description', { required: true })} />

                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="file" className="mb-2 mt-3 h6">image</label>
                                        <input type="file" name="Name" className="form-control" id="file" autoComplete="pictures category" aria-describedby="picture for new category" {...register('file', { required: true })} onChange={(e) => handleFile(e)} />

                                    </div>
                                    <button type="submit" className="btn btn-primary mt-4 mb-5">Envoi</button>
                                </form>
                            </div>}
                        </div>}
                        {/* ---------------COMPOSANT SUJET */}
                        {CP_sujet === true && <div id="CP_sujet" >
                            <div className='d-flex col-12'>
                                <p id="allSujet" className="btn col-6" onClick={() => (document.getElementById("allSujet").className += " btn_select", document.getElementById("rechercheSujet").classList.remove("btn_select"), setrechercheSujet(false), setallSujet(true), setplusSujet(false), setallCat(false), setrechercheCat(false), setallReportsMessages(false), setallReportsSujets(false), setallUser(false), setrechercheUser(false), getAllSubCategory())}>All Sujets</p>
                                <p id="rechercheSujet" className="btn col-6" onClick={() => (document.getElementById("rechercheSujet").className += " btn_select", document.getElementById("allSujet").classList.remove("btn_select"), setrechercheSujet(true), setplusSujet(false), setallSujet(false), setallCat(false), setrechercheCat(false), setallReportsMessages(false), setallReportsSujets(false), setallUser(false), setrechercheUser(false))}>Recherche</p>
                                {/* <p id="plusSujet" className="btn col-2" onClick={() => (document.getElementById("plusSujet").className += " btn_select", document.getElementById("allSujet").classList.remove("btn_select"), document.getElementById("rechercheSujet").classList.remove("btn_select"), setplusSujet(true), setrechercheSujet(false), setallSujet(false), setallCat(false), setrechercheCat(false), setallReportsMessages(false), setallReportsMessages(false), setallUser(false), setrechercheUser(false))}><b>+</b></p> */}
                            </div>
                            {allSujet && CP_sujet === true && <div className="p-2 overflow-auto" style={{ height: `${heigthBody - heigthHeader + 'px'}` }}>
                                {list_subCategory}
                            </div>}
                            {rechercheSujet && CP_sujet === true && <div style={{ height: `${heigthBody - heigthHeader - 100 + 'px'}` }}>
                                <div className="col-12 d-flex justify-content-center">
                                    <form onSubmit={handleSubmit(submitSearchSubCategory)} id="div_search" className="d-flex  justify-content-center  align-items-center rounded text-center">
                                        <input type="search" className="rounded" placeholder="Recherche de category" {...register('name', { required: true })} />
                                        <button className="fas fa-search"></button>
                                    </form>
                                </div>
                                <div className="h-100 mt-2 p-2 d-flex col-12 flex-direction-column overflow-auto" >
                                    {list_subCategory}
                                </div>
                            </div>}
                        </div>}
                        {/* ---------------- COMPOSANT REPORT ------------------------- */}
                        {CP_report === true && <div id='CP_report'>
                            <div className='d-flex col-12'>
                                <p id="reportsSujets" className="btn col-6" onClick={() => (document.getElementById("reportsSujets").className += " btn_select", document.getElementById("reportsMessages").classList.remove("btn_select"), setallReportsMessages(false), setallReportsSujets(true), setallSujet(false), setrechercheSujet(false), setallCat(false), setrechercheCat(false), setallUser(false), setrechercheUser(false), getReportsSubCategory())}>Reports Sujets</p>
                                <p id="reportsMessages" className="btn col-6" onClick={() => (document.getElementById("reportsMessages").className += " btn_select", document.getElementById("reportsSujets").classList.remove("btn_select"), setallReportsMessages(true), setallReportsSujets(false), setallSujet(false), setrechercheSujet(false), setallCat(false), setrechercheCat(false), setallUser(false), setrechercheUser(false), getReportsMessage())}>Reports Messages</p>

                            </div>
                            {allReportsSujets && CP_report === true && <div className="col-12 d-flex flex-direction-column align-items-center overflow-auto" style={{ height: `${heigthBody - 80 - heigthHeader + 'px'}` }}>
                                {list_reportSubCat}
                            </div>}
                            {allReportsMessages && CP_report === true && <div className="col-12 d-flex flex-direction-column align-items-center overflow-auto" style={{ height: `${heigthBody - 80 - heigthHeader + 'px'}` }}>
                                {list_ReportsMessages}
                                {Not_ReportsMessages}
                            </div>}
                        </div>}
                        {/* ---------------COMPOSANT USER */}
                        {CP_user === true && <div id="CP_user">
                            <div className='d-flex col-12'>
                                <p id="allUser" className="btn col-4" onClick={() => (getAllUser(), document.getElementById("allUser").className += " btn_select", document.getElementById("rechercheUser").classList.remove("btn_select"), document.getElementById("connectedUser").classList.remove("btn_select"), setrechercheUser(false), setallUser(true), setallReportsMessages(false), setallReportsMessages(false), setallCat(false), setrechercheCat(false), setallSujet(false), setrechercheSujet(false), setconnectedUser(false))}>All Users</p>
                                <p id="connectedUser" className="btn col-4" onClick={() => (document.getElementById("connectedUser").className += " btn_select", document.getElementById("rechercheUser").classList.remove("btn_select"), document.getElementById("allUser").classList.remove("btn_select"), setrechercheUser(false), setallUser(false), setallReportsMessages(false), setallReportsSujets(false), setallCat(false), setrechercheCat(false), setallSujet(false), setrechercheSujet(false), setconnectedUser(true))}>Connected</p>
                                <p id="rechercheUser" className="btn col-4" onClick={() => (document.getElementById("rechercheUser").className += " btn_select", document.getElementById("allUser").classList.remove("btn_select"), document.getElementById("connectedUser").classList.remove("btn_select"), setrechercheUser(true), setallUser(false), setallReportsMessages(false), setallReportsSujets(false), setallCat(false), setrechercheCat(false), setallSujet(false), setrechercheSujet(false), setconnectedUser(false))}>Recherche</p>
                            </div>
                            {allUser && CP_user === true && <div style={{ height: `${heigthBody - 80 - heigthHeader + 'px'}` }} className="overflow-auto text-center d-flex flex-direction-column align-items-center">
                                {list_users}
                            </div>}
                            {connectedUser && CP_user === true && <div className="d-flex flex-direction-column align-items-center overflow-auto" style={{ height: `${heigthBody - heigthHeader + 'px'}` }}>
                                {list_userConnected}
                            </div>}
                            {rechercheUser && CP_user === true && <div style={{ height: `${heigthBody - 100 - heigthHeader + 'px'}` }}>
                                <div className="col-12 d-flex justify-content-center">
                                    <form onSubmit={handleSubmit(submitSearchUser)} id="div_search" className="d-flex  justify-content-center  align-items-center rounded text-center">
                                        <input type="search" className="rounded" placeholder="Recherche de category" {...register('pseudo', { required: true })} />
                                        <button className="fas fa-search"></button>
                                    </form>
                                </div>
                                <div className="mt-2 d-flex flex-direction-column align-items-center h-75 overflow-auto">
                                    {list_findUser}
                                </div>
                            </div>}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}