import { Server } from 'socket.io';
// import { DB } from './connectDB.js';
// import { sqlCreateMessage } from './utils/scriptSQL.js';
// import multer from 'multer';
// import { sqlAuthUuid } from "./utils/scriptSQL.js";
// import jwt from "jsonwebtoken";



export const socketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        },



    });

    // console.log(Object.keys('tous ca connecté' + io))


    io.engine.on("headers", (headers) => {
        headers["Access-Control-Allow-Private-Network"] = true;
    });


    let userConnected = []


    io.on('connection', (socket) => {

        let _user = [];


        socket.join("full-topic");
        
        socket.on("admin", (data) => {
            
            for (let i = 0; i < userConnected.length; i++) {
                if (userConnected[i].pseudo === `${data.pseudo}`) {

                    console.log(userConnected[i].id_socket)
                    socket.to(userConnected[i].id_socket).emit('adminInstruction', data.inst);
                }
            }
        })



        socket.on("enter_room", (room) => {

            socket.join(room)


        });
        socket.on("chat_message", (msg) => {
            console.log(msg)
            io.in(`${msg.id_sub_category}`).emit("received_message", msg)
        })
        socket.on("delete_chat_message", (msg) => {

            io.in(`${msg.id_sub_category}`).emit("delete_message", msg)
        })

        socket.on("delete_chat_message_report", (msg) => {

            io.in(`${msg.id_sub_category}`).emit("delete_message", msg)
        })


        socket.on("delete_sub_category_report", (msg) => {

            io.in(`${msg.id_sub_category}`).emit("leave_room", msg.id_category)
        })

        // on ecoute les deconnexions
        socket.on('disconnect', () => {
            // console.log(_user)
            for (let i = 0; i < userConnected.length; i++) {
                if (userConnected[i].pseudo === `${_user.pseudo}`) {

                    userConnected.splice(i, 1)
                    io.emit('userConnected', userConnected)
                }
            }

            io.emit('userDisconnect', userConnected)


            console.log("un utilisateru c'est deconnecté: " + socket.id);
        })


        socket.on('userLogged', (user) => {

            const User = {
                uuid: user.uuid,
                pseudo: user.pseudo,
                avatar: user.avatar,
                email: user.email,
                name: user.name,
                date_of_birth: user.date_of_birth,
                role: user.role,
                registration_date: user.registration_date,
                id_socket: socket.id
            };

            console.log(User)
            _user = User;
            console.log(socket.id)
            userConnected.push(User);
            io.emit('userConnected', userConnected)


            // io.emit('userLoggedd', user) // renvoi de l'information
            // console.log(userConnected.length)
            // if (userConnected.length === 0 ) {
            //     userConnected.push(user);
            //             // console.log(userConnected)
            //             io.emit('userConnected', userConnected)
            // } else if (userConnected.length > 1) {

            //     for (let i = 0; i < userConnected.length; i++) {
            //         console.log(userConnected.length)
            //         if (userConnected[i].uuid === user.uuid) {
            //             console.log(userConnected)
            //             io.emit('userConnected', userConnected)
            //             console.log('test11111')
            //         } else {
            //             userConnected.push(user);
            //             // console.log(userConnected)
            //             io.emit('userConnected', userConnected)
            //         }
            //     }
            // }


            // console.log(userConnected)

        })
    })



}