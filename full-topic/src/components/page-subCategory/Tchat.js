import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import io from 'socket.io-client';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import defaultProfile from '../img/defaultProfile.png';
import reactImageSize from 'react-image-size';
var message_socket = [];
let socket;

export default function SubCategory() {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm();
    const [idCategory, setidCategory] = useState(Math.round(window.innerHeight) + 'px');
    const [heigthHeader, setheigthHeader] = useState();
    const [container_input_message, setcontainer_input_message] = useState();
    const [info_subCategory, setinfo_subCategory] = useState([]);
    // const [message_bdd, setmessage_bdd] = useState([]);
    const msgSocket = useSelector((state) => state.msgSocket);
    // const [message_socket, setmessage_socket] = useState(false);
    const [file, setfile] = useState();

    const [filePreview, setfilePreview] = useState();
    const [fileok, setfileok] = useState(false);
    const [infoChat, setinfoChat] = useState(false);
    const user = useSelector((state) => state.userInfo);
   

    const [like, setlike] = useState(false);
    const [likeok, setlikeok] = useState(true);
    const [like_list, setlike_list] = useState([]);
    const [like_number, setlike_number] = useState();



    window.addEventListener("resize", function (event) {
        setcontainer_input_message(document.getElementById("container_input_message").offsetHeight);
        setheigthHeader(document.getElementById("header").offsetHeight + document.getElementById("bar_chat_header").offsetHeight);
        setidCategory(Math.round(window.innerHeight) + 'px')
    });



    window.onload = () => { // a la fin du chargement de la page

        setheigthHeader(document.getElementById("header").offsetHeight);

        console.log(msgSocket)

    }



    useEffect(() => {
        socket = io("http://192.168.1.95:5000/", { query: `uuid=${user.uuid}` });

        var pathNameCoded = window.location.pathname.split('/chat/')[1].toString();
        var id_sub_category = decodeURIComponent(pathNameCoded);
        setcontainer_input_message(document.getElementById("container_input_message").offsetHeight);
        const element = document.getElementById('container_message');

        socket.on("received_message", (msg) => {
            console.log("arriver")
            dispatch({ type: 'newMsgSocket', payload: msg })
            console.log(msgSocket)
            var Elements = document.getElementById('container_message');
            Elements.scrollTop = Elements.scrollHeight;
        })

        socket.on("delete_message", (msg) => {

            dispatch({ type: 'deleteMsg', payload: msg.id_message })
        })
        socket.on("leave_room", (msg) => {

            console.log(msg)
            window.location = `http://192.168.1.95:3000/home`;
        })

        if (info_subCategory) {



            axios.get(`${process.env.REACT_APP_API_URL}/api/chatRoom/getSubCategory`, { params: { id_sub_category }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
                .then(res => {

                    //connection socket.io
                    socket.emit("enter_room", `${res.data.Result[0].id_sub_category}`)

                    console.log(res.data.like)
                    if (res.data.like.length > 0) {
                        var splitted = res.data.like[0].pseudo_like.split(',');
                        setlike_list(splitted)
                        setlike_number(splitted.length)

                    } else {
                        setlike_number(0)
                    }
                    setinfo_subCategory(res.data.Result[0])

                    if (msgSocket.length === 0) {

                        axios.get(`${process.env.REACT_APP_API_URL}/api/chatRoom/getAllMessage`, { params: { id_sub_category }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
                            .then(res => {
                                console.log(res.data.Result)
                                // setmessage_bdd(res.data.Result)
                                dispatch({ type: 'msgbdd', payload: res.data.Result })
                                setheigthHeader(document.getElementById("header").offsetHeight + document.getElementById("bar_chat_header").offsetHeight);
                                element.scrollTop = element.scrollHeight;

                            })
                            .catch(error => (error))
                    }
                })
                .catch(error => (error))
        }



    }, []);
    if (like_list.length > 0 && likeok === true) {
        console.log(like_list)
        console.log(like_list.indexOf(user.pseudo))
        if (like_list.indexOf(user.pseudo) >= 0) {
            setlikeok(false)
            setlike(true)
        }
    }
    const Like = () => {

        console.log('like')
        setlike_number(like_number + 1)
        var pathNameCoded = window.location.pathname.split('/chat/')[1].toString();
        var id_sub_category = decodeURIComponent(pathNameCoded);
        var data = { id_sub_category: id_sub_category, pseudo: user.pseudo };
        axios.post(`${process.env.REACT_APP_API_URL}/api/chatRoom/LikeSubCategory`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {
                console.log(res.data.Result)


            })
            .catch(error => (error))
    }

    const unlike = () => {
        console.log('unlike')
        setlike_number(like_number - 1)
        var pathNameCoded = window.location.pathname.split('/chat/')[1].toString();
        var id_sub_category = decodeURIComponent(pathNameCoded);
        var data = { id_sub_category: id_sub_category, pseudo: user.pseudo };
        axios.post(`${process.env.REACT_APP_API_URL}/api/chatRoom/DisLikeSubCategory`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {
                console.log(res.data.Result)


            })
            .catch(error => (error))
    }




    const textAreaChat = () => {
        if (document.getElementById("textAreaChat").rows === 4) {
            const test = document.getElementById("textAreaChat").value;
            if ((test.match(/\n/g) || []).length + 1 < 4) {
                document.getElementById("textAreaChat").rows = (test.match(/\n/g) || []).length + 1;
                setcontainer_input_message(document.getElementById("container_input_message").offsetHeight);
            }
        } else {
            const test = document.getElementById("textAreaChat").value;
            document.getElementById("textAreaChat").rows = (test.match(/\n/g) || []).length + 1;
            setcontainer_input_message(document.getElementById("container_input_message").offsetHeight);
        }
    }

    const chatInfo = () => {
        setinfoChat(true)
    }

    const onClickMessage = (e) => {
        console.log(e)

    }

    const inputImg = (e) => {
        e.preventDefault()
        document.getElementById("input_chat_img").click();
    }

    const onSubmit = data => {


        if (!file && data.message === " " || !file && !data.message || !file && /\S/.test(data.message) === false) {

        } else {
            var pathNameCoded = window.location.pathname.split('/chat/')[1].toString();
            var id_sub_category = decodeURIComponent(pathNameCoded);
            var date = new Date();
            const fileData = new FormData();
            fileData.append("file", file)
            fileData.append("message", data.message)
            fileData.append("id_sub_category", id_sub_category)

            console.log(fileData)
            axios.post(`${process.env.REACT_APP_API_URL}/api/chatRoom/createMessage`, fileData, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
                .then(res => {

                    socket.emit("chat_message", {
                        pseudo: user.pseudo,
                        avatar: user.avatar,
                        uuid: res.data.Result[0].uuid,
                        image_message: res.data.Result[0].image_message,
                        message: res.data.Result[0].message,
                        id_message: res.data.Result[0].id_message,
                        id_sub_category: `${res.data.Result[0].id_sub_category}`,
                        create_message: res.data.Result[0].create_message
                    })

                    reset();
                    setfile();
                    setfileok(false)
                })
                .catch(error => (error))
        }

    }

    const handleFilePreview = e => {
        if (!e.target.files[0]) {

        } else {
            setfile(e.target.files[0])
            setfilePreview(URL.createObjectURL(e.target.files[0]))
        }
    }
    const deleteMessage = e => {
        for (let i = 0; i < msgSocket.length; i++) {
            console.log(msgSocket[i])
            if (msgSocket[i].id_message === e.id_message) {

                var pathNameCoded = window.location.pathname.split('/chat/')[1].toString();
                var id_sub_category = decodeURIComponent(pathNameCoded);
                socket.emit("delete_chat_message", {
                    id_sub_category: id_sub_category,
                    id_message: e.id_message,
                    index: e.index
                })
                console.log(msgSocket)

                var Elements = document.getElementById('container_message');
                Elements.scrollTop = Elements.scrollHeight;
                var id = { id_message: e.id_message };
                axios.post(`${process.env.REACT_APP_API_URL}/api/chatRoom/deleteMessage`, id, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
                    .then(res => {
                        console.log(res)
                        const element = document.getElementById(e.index)
                        element.classList.add("d-none")
                    })
                    .catch(error => (error))
            } else {
                console.log("message non trouvable")
            }
        }

    }
    const reportMessage = e => {

        var data = { id_message: e.id_message, pseudo_userReport: user.pseudo };
        axios.post(`${process.env.REACT_APP_API_URL}/api/chatRoom/ReportMessage`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {
                console.log(res)
            })
            .catch(error => (window.location.reload()));
    }

    const reportSubCat = e => {
        console.log(e)
        var pathNameCoded = window.location.pathname.split('/chat/')[1].toString();
        var id_sub_category = decodeURIComponent(pathNameCoded);
        var data = { id_sub_category: id_sub_category, pseudo_userReport: user.pseudo };
        axios.post(`${process.env.REACT_APP_API_URL}/api/subCategory/reportSubCategory`, data, { params: { uuid: user.uuid }, headers: { "authorization": "Bearer " + Cookies.get('token') } })
            .then(res => {
                console.log(res)

            })
            .catch(error => (error))
    }


    if ( msgSocket.length > 0) {

        const msgSocketMap = msgSocket
        var message_bdd_map = msgSocketMap.map((listMsg_data, index) => {
            

            return (
                <div className={listMsg_data.uuid === `${user.uuid}` && `col-10 mt-3 mb-3 ml-auto d-flex flex-row-reverse` || `mt-3 mb-3 col-10 d-flex`} id={`${listMsg_data.id_message}`} key={index}>
                    <div className="col-1  rounded-circle">
                        <img className="avatar_message border rounded-circle" src={listMsg_data.avatar === null && defaultProfile || listMsg_data.avatar} />
                    </div>
                    <div className={listMsg_data.uuid === `${user.uuid}` && `col-11 d-flex flex-direction-column justify-content-start` || ` col-11`} onClick={document.getElementById(`${index + "a"}`) && (() => (document.getElementById(`${index + "a"}`).classList.remove("d-none")))}>
                        <div className={listMsg_data.uuid === `${user.uuid}` && `shadow p-1 p_my_message` || ` shadow m-1 p-1 p_message`}>

                            {listMsg_data.image_message !== " " && <img id="img_message" src={listMsg_data.image_message} className=" rounded" />}
                            {listMsg_data.message && <p className=" m-0 col-12 text-break">{listMsg_data.message}</p>}
                        </div>
                        <div id={index + 'a'} className="div_footer_message d-none d-flex">
                            <div>
                                <p>Envoyé par : <b>{listMsg_data.pseudo}</b></p>
                                <p>Le : {listMsg_data.create_message}</p>
                            </div>
                            {listMsg_data.uuid === `${user.uuid}` && <div className="d-flex">
                                <p className="h4 text-danger d-flex align-items-center justify-content-center"><b onClick={() => (deleteMessage({ id_message: listMsg_data.id_message, index: index + "a" }))}>Suprimer</b></p>
                            </div>}
                            {listMsg_data.uuid !== `${user.uuid}` && <div className="d-flex">
                                <p className="h4 text-warning d-flex align-items-center justify-content-center"><b onClick={() => (reportMessage({ id_message: listMsg_data.id_message, index: index + "a" }))}>report</b></p>
                            </div>}
                        </div>
                    </div>
                </div>
            )
        });

    }


    return (

        <div className="bg-color-68" style={{ height: `${idCategory}` }}>
            <span id="inst"></span>
            {infoChat === true && <div id="infoChat" className="col-12 z-index-10 position-absolute d-flex justify-content-center align-items-center" style={{ height: `${idCategory}` }}>
                <div className="col-11 shadow rounded shadow bg-color-107">
                    <div className="p-2 h-auto" >
                        <div className="col-12 d-flex justify-content-end p-0 m-0">
                            <button className="btn d-flex justify-content-center align-items-center p-0 m-0" onClick={() => (setinfoChat(false))}><i id="btn-times" className="fas fa-times rounded d-flex justify-content-center align-items-center"></i></button>
                        </div>
                        <div className="d-flex">

                            <div className="col-4">
                                <div className="col-11  rounded">
                                    <img className="img_header_chat" src={info_subCategory.image_sub_category} />
                                </div>
                            </div>
                            <div className="col-8 d-flex flex-column">
                                <h1 className="h4 text-truncate m-0">{info_subCategory.name_sub_category}</h1>
                                <h2 className="h2_header_chat h-auto">{info_subCategory.description_sub_category}</h2>
                            </div>

                        </div>
                        <div className="col-12 d-flex ">
                            <div className="col-7">
                                <p className="p-0 m-0 font-size-3_5vw">Créée par : <b>{info_subCategory.pseudo}</b></p>
                                <p className="p-0 m-0 font-size-3_5vw">Le : <b>{info_subCategory.creation_date}</b></p>
                            </div>
                            <div className="d-flex justify-content-around align-items-center col-5">
                                {like === false && <p id="like" className="p-0 m-0 font-size-3_5 text-info" onClick={() => (setlike(!like), Like())}>{like_number} <i className="far fa-thumbs-up"></i></p>}
                                {like === true && <p id="like" className="p-0 m-0 font-size-3_5 text-primary" onClick={() => (setlike(!like), unlike())}>{like_number} <i className="far fa-thumbs-up"></i></p>}
                                {user.uuid !== info_subCategory.uuid && <p className="p-0 m-0 font-size-3_5 text-danger" onClick={() => (reportSubCat())}>Report</p>}
                                {user.uuid === info_subCategory.uuid && <p className="p-0 m-0 font-size-3_5 text-warning" onClick={() => (alert("modify"))}>Modifier</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <div id="content" className="h-auto">
                <Header />
            </div>
            <div className="position-relative">
                <div id="bar_chat_header" className="col-12 bg-color-107 d-flex justify-content-center align-items-center">
                    <div className=" d-flex justify-content-center align-items-center" onClick={chatInfo}>
                        <i className="fas fa-info-circle m-1"></i>
                        <p className="m-1">information sur le chat</p>
                    </div>
                </div>

            </div>
            <div className="col-12 bg-color-68 " style={{ height: `${window.innerHeight - heigthHeader + 'px'}` }}>
                <div className=" col-12 position-relative  " style={{ height: `${window.innerHeight - heigthHeader - container_input_message + 'px'}` }}>
                    <div id="container_message" className="col-11 m-auto overflow-auto bg-color-68 h-100 position-absolute fixed-bottom" >
                        {message_bdd_map}

                    </div>
                </div>
                {fileok === true && <div id="div_imgPreview" className="col-3  position-absolute z-index-10 rounded" >
                    <button className="btn_img_chat rounded-circle"><i className="fas fa-times" onClick={() => (setfileok(false), setfile(), setfilePreview())}></i></button>
                    <img id="img_chat" className="w-100 h-100 shadow rounded" src={filePreview} />
                </div>}
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="col-12 d-flex position-absolute bottom-0 pb-3" id="container_input_message">

                        <div className="d-flex col-12 justify-content-center flex-direction-column p-2" >

                            <input type="file" name='file' className="" id="input_chat_img"  {...register('file', { required: false })} onChange={(e) => (setfileok(true), handleFilePreview(e))} />

                            <div className="col-12 d-flex justify-content-between flex-row-reverse">
                                <button className="btn_send col-1 mt-auto d-flex justify-content-end align-items-center"><i className="far fa-paper-plane icon_btn_send"></i></button>
                                <textarea rows="1" onChange={textAreaChat} className="rounded col-9 input_chat" id="textAreaChat" {...register('message', { required: false })} />
                                <button className="col-1 mt-auto btn_plus_chat rounded-circle d-flex justify-content-center align-items-center " onClick={inputImg}><i className="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}