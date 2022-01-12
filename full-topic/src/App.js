import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import './App.css';
import Cookies from 'js-cookie';
import ErreurPage from './components/ErreurPage';
import Home from './components/Home';
import Account from './components/Account';
import SubCategory from './components/page-catégory/SubCategory';
import Tchat from './components/page-subCategory/Tchat';
import Cgu from './components/Cgu'
import Ddc from './components/Ddc';
import PageAdmin from './components/Administration';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

let socket;




export default function App() {
  const dispatch = useDispatch()
  const history = useHistory();
  const [tokenOK, settokenOK] = useState(true)
  const [tokenStatus, settokenStatus] = useState()
  const [ok, setok] = useState(false)
  const user = useSelector((state) => state.userInfo);

  useEffect(() => {

    const token_connect = Cookies.get('token');
   
    if (!token_connect) {
      settokenOK(false);
      
     if ( window.location.pathname !== '/') {
      window.location = "/";
     }
    
    } else {
      if ( window.location.pathname !== '/' ) {     
      axios.post(`${process.env.REACT_APP_API_URL}/api/auth/connectAuth`, { "authorization": "Bearer " + token_connect })
      .then(res => {
        settokenStatus(res.status)
       
        Cookies.set('token', `${res.data.setToken}`, { expires: 1 }, {domain: 'http://192.168.1.95:3000'})
        console.log(res.data.result[0])
        dispatch({ type: 'get_userInfo', payload: res.data.result[0] })
        socket = io("http://192.168.1.95:5000/", { query: `uuid=${res.data.result[0].uuid}` });
        var user = { uuid: res.data.result[0].uuid, pseudo: res.data.result[0].pseudo, avatar: res.data.result[0].avatar, email: res.data.result[0].email, name: res.data.result[0].name, last_name: res.data.result[0].lastname, date_of_birth: res.data.result[0].date_of_birth, role: res.data.result[0].role, registration_date: res.data.result[0].registration_date};
        
        socket.emit('userLogged', user); // envoi dans le canal
        socket.on('userConnected', receiveListConnected)
       
        socket.on("adminInstruction", (inst) => {
          
          if (!inst) {
            window.location = "/"
          }
          if(inst) {
        
            
            document.getElementById("inst").innerHTML = `${inst}`
            document.getElementById('closeMsgAdmin').onclick = () => (document.getElementById("windowMsgAdmin").remove());
            
          }
      })

        axios.get(`${process.env.REACT_APP_API_URL}/api/category/getAllCategory`)
          .then(res => {
            dispatch({ type: 'get_allCategory', payload: res.data.Result })

          })
          .catch(error => (error))

          
      })
      .catch(error =>  (window.location = "/"))
   

      }
    }


  }, []);


// a la connexion d'un user
var receiveListConnected = function (userConnected) {
  dispatch({ type: 'listConnected', payload: userConnected})
  setok(true)
}

  return (

    <Router className="App">

      <Switch>
       <Route path="/" exact component={Home} />
        {tokenStatus && <Route path="/home" component={Home} />}
        {tokenStatus && <Route path="/account" component={Account} /> }
        {tokenStatus && <Route path="/générale" component={SubCategory} /> }
        {tokenStatus && <Route path="/Jeux Vidéo" component={SubCategory} /> }
        {tokenStatus && <Route path="/tv" component={SubCategory} /> }
        {tokenStatus && <Route path="/cinéma" component={SubCategory} /> }
        {tokenStatus && <Route path="/musique" component={SubCategory} /> }
        {tokenStatus && <Route path="/lecture" component={SubCategory} /> }
        {tokenStatus && <Route path="/animaux" component={SubCategory} /> }
        {tokenStatus && <Route path="/quotidien" component={SubCategory} /> }
        {tokenStatus && <Route path="/politique" component={SubCategory} /> }
        {tokenStatus && <Route path="/chat" component={Tchat} /> }
        {tokenStatus && user.role === "admin" && <Route path="/administration" component={PageAdmin} /> }
        <Route path="/cgu" component={Cgu} />
        <Route path="/déclaration-de-confidentialité" component={Ddc} /> 
        <Route component={ErreurPage} />
      </Switch>

    </Router>

  );
}