import { DB } from '../connectDB.js';
import { sqlSignup, sqlLogin, sqlUpdateAccount, sqlDeleteAccount, sqlCheckEmail, sqlCheckPseudo, sqlGetAccount, sqlallAccount, sqlAuthUuid, sqlUpdateImgAccount, sqlAdminUpdateAccount, sqlGetSearchAccount } from '../utils/scriptSQL.js';
import bcrypt from 'bcrypt';
import { } from 'dotenv/config'
import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import CryptoJS from 'crypto-js';
import { v5 as uuidv5 } from 'uuid';
import { validationResult } from 'express-validator';


export const signup = (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const checkEmail = sqlCheckEmail(
        `${process.env.MAIL_SECRET_KEY, CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(req.body.email))}`
    )
    const checkPseudo = sqlCheckPseudo(
        req.body.pseudo
    )


    DB.query(
        checkEmail,
        (err, Result) => {
            if (err) res.status(500).json({ error: "erreur serveur" });
            if (Result[0].present) {
                return res.status(401).json({ msg: "Cette email existe déja" });
            }

            DB.query(
                checkPseudo,
                (err, Result) => {
                    if (err) res.status(500).json({ error: "erreur serveur" });
                    if (Result[0].present) {
                        return res.status(401).json({ msg: "Ce Pseudo et déja utilisé" });
                    }


                    //signup
                    const namespace = `0134cac5-c00d-4453-a633-38857d0d5258`;
                    const id = `${req.body.pseudo}${req.body.email}`;
                    const uuid = uuidv5(id, namespace);
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        if (err) throw err;
                        var signup = sqlSignup(

                            uuid,
                            `${process.env.MAIL_SECRET_KEY, CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(req.body.email))}`,
                            req.body.pseudo,
                            hash,
                            `${req.protocol}://${req.get('host')}/pictures/defaultProfile.png`,

                        );
                        console.log(signup);
                        DB.query(
                            signup,
                            function (error, Result) {
                                if (error) throw error;
                                res.status(201).json({ message: 'Enregistration confirmée' })
                            }
                        )
                        
                    });

                }
            )

        }
    )
};


export const login = (req, res, next) => {

    // check email already exist 
    const checkPseudo = sqlCheckPseudo(
        req.body.pseudo
    )
    DB.query(
        checkPseudo,
        (err, Result) => {
            if (err) res.status(500).json({ error: "erreur serveur" });
            if (!Result[0].present) {
                return res.status(404).json({ msg: "Pseudo non valide" });
            }
            // login 
            const login = sqlLogin(
                req.body.pseudo
            );

            DB.query(
                login,
                req.body.pseudo,

                (err, result) => {


                    if (err) throw err;
                    if (!req.body.password) {
                        return res.status(401).json({ msg: 'veuillez entrer un mot de passe.' })
                    }

                    bcrypt.compare(req.body.password, result[0].password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ msg: 'Mot de passe incorrect' })
                            };

                            res.status(200).json({
                                userId: result[0].uuid,
                                email: (process.env.MAIL_SECRET_KEY, CryptoJS.enc.Base64.parse(result[0].email).toString(CryptoJS.enc.Utf8)),
                                pseudo: result[0].pseudo,
                                name: result[0].name,
                                last_name: result[0].last_name,
                                role: result[0].role,
                                avatar: result[0].avatar,
                                token: jwt.sign(
                                    { userToken: result[0].uuid },
                                    process.env.SECRET_TOKEN_KEY,
                                    { expiresIn: '24h' },
                                ),
                                token_connect: jwt.sign(
                                    { userToken: result[0].uuid },
                                    process.env.SECRET_TOKEN_KEY_CONNECT,
                                    { expiresIn: '3h' },
                                )

                            });
                        })
                        .catch(error => res.status(500).json({ error }));
                })
        }
    )
}


export const updateAccount = (req, res, next) => {

    var getAccount = sqlGetAccount(
        req.query.uuid,
    );
    DB.query(
        getAccount,
        (err, Result) => {
            if (err) throw err;


            if (req.body.password) {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) throw err;
                    var updateAccount = sqlUpdateAccount(
                        (req.body.pseudo ? req.body.pseudo : Result[0].pseudo),
                        (req.body.name ? req.body.name : Result[0].name),
                        (req.body.last_name ? req.body.last_name : Result[0].lastname),
                        (req.body.email ? `${process.env.MAIL_SECRET_KEY, CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(req.body.email))}` : Result[0].email),
                        hash,
                        (req.body.date_of_birth ? req.body.date_of_birth : Result[0].date_of_birth),
                        req.query.uuid
                    )
                    DB.query(
                        updateAccount,
                        (err, Result) => {
                            if (err) throw err;
                            res.status(201).json({ Result })
                        }
                    )
                });
            } else {

                var updateAccount = sqlUpdateAccount(
                    (req.body.pseudo ? req.body.pseudo : Result[0].pseudo),
                    (req.body.name ? req.body.name : Result[0].name),
                    (req.body.last_name ? req.body.last_name : Result[0].lastname),
                    (req.body.email ? `${process.env.MAIL_SECRET_KEY, CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(req.body.email))}` : Result[0].email),
                    (req.body.password ? req.body.password : Result[0].password),
                    (req.body.date_of_birth ? req.body.date_of_birth : Result[0].date_of_birth),
                    req.query.uuid
                )
                DB.query(
                    updateAccount,
                    (err, Result) => {
                        if (err) throw err;
                        res.status(201).json({ Result })
                    }
                )

            }

        })
}


export const adminUpdateAccount = (req, res, next) => {
    console.log(req.body)
    var getAccount = sqlGetAccount(
        req.body.uuid,
    );
    DB.query(
        getAccount,
        (err, Result) => {
            if (err) throw err;
            var adminupdateAccount = sqlAdminUpdateAccount(
                (req.body.pseudo ? req.body.pseudo : Result[0].pseudo),
                (req.body.name ? req.body.name : Result[0].name),
                (req.body.last_name ? req.body.last_name : Result[0].lastname),
                (req.body.email ? `${process.env.MAIL_SECRET_KEY, CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(req.body.email))}` : Result[0].email),
                (req.file ? `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}` : Result[0].avatar),
                (req.body.date_of_birth ? req.body.date_of_birth : Result[0].date_of_birth),
                (req.body.role ? req.body.role : Result[0].role),
                req.body.uuid
            )
            if (req.file && Result[0].avatar !== `${req.protocol}://${req.get('host')}/pictures/defaultProfile.png`) {
                const filename = Result[0].avatar.split('/pictures/')[1];
                fs.unlink(`pictures/${filename}`, (error => error));
            }
            console.log(
                adminupdateAccount
            )
            DB.query(
                adminupdateAccount,
                (err, Result) => {
                    if (err) throw err;
                    res.status(201).json({ Result })
                }
            )
        })
}



export const updateImgAccount = (req, res, next) => {

    var getAccount = sqlGetAccount(
        req.query.uuid,
    );
    DB.query(
        getAccount,
        (err, Result) => {
            if (err) throw err;

            if (req.file && Result[0].avatar === `${req.protocol}://${req.get('host')}/pictures/defaultProfile.png`) {
                console.log(req.query.uuid)
                if (req.file) {
                    const UpdateImgAccount = sqlUpdateImgAccount(
                        `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`,
                        req.query.uuid
                    )
                    DB.query(
                        UpdateImgAccount,
                        (err, Result) => {
                            if (err) throw err;
                            res.status(201).json({ Result })
                        }
                    )
                }
            } else {
                const filename = Result[0].avatar.split('/pictures/')[1];

                const UpdateImgAccount = sqlUpdateImgAccount(
                    `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`,
                    req.query.uuid
                )

                fs.unlink(`pictures/${filename}`, (error => error));

                DB.query(
                    UpdateImgAccount,
                    (err, Result) => {
                        if (err) throw err;
                        res.status(201).json({ Result })
                    }
                )
            }


        }
    )


}

export const deleteAccount = (req, res, next) => {

    const deleteAccount = sqlDeleteAccount(
        req.body.uuid
    );

    const name = req.body.avatar.split(`${req.protocol}://${req.get('host')}/pictures/`);
    var filename = name[1];
    if (filename !== `defaultProfile.png`) {
        fs.unlink(`pictures/${filename}`, (error => error))
    }
    DB.query(
        deleteAccount,
        (err, Result) => {
            if (err) throw err;
            res.status(201).json({ Result })
        }
    )
}


export const getAccount = (req, res, next) => {
    const getAccount = sqlGetAccount(
        req.body.uuid
    );
    DB.query(
        getAccount,
        (err, Result) => {
            if (err) throw err;
            res.status(201).json({ Result })
        }

    )
}

export const allAccount = (req, res, next) => {
    const getAccount = sqlallAccount();
    DB.query(
        getAccount,
        (err, Result) => {
            if (err) throw err;
            res.status(201).json({ Result })
        }
    )
}

export const getSearchAccount = (req, res, next) => {
    const GetSearchAccount = sqlGetSearchAccount(
        req.body.pseudo
    );
    
    DB.query(
        GetSearchAccount,
        (err, Result) => {
            if (err) throw err;
            console.log(Result)
            res.status(201).json({ Result })
        }
    )
}


export const connectAuth = (req, res, next) => {

    if (!req.body.authorization) {
        res.status(401).json({ msg: "pas de token" })
    } else {
        const token = req.body.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY_CONNECT, (error, decoded) => {
            if (error) {
                res.status(401).json({ msg: error })
            } else {
                if (!decoded.userToken) {
                    res.status(401).json('token non valide')
                } else {
                    const getAccount = sqlGetAccount(
                        decoded.userToken
                    );
                    DB.query(
                        getAccount,
                        (err, Result) => {
                            if (err) throw err;

                            if (Result.length === 0) {
                                console.log("utilisateur non trouvable")
                                res.status(404).json({ msg: "utilisateur non trouver" })
                            } else {
                                const setToken = jwt.sign(
                                    { userToken: Result[0].uuid },
                                    process.env.SECRET_TOKEN_KEY_CONNECT,
                                    { expiresIn: '3h' },
                                )
                                console.log(Result[0])
                                const result = [{
                                    uuid: Result[0].uuid,
                                    date_of_birth: Result[0].date_of_birth,
                                    email: (process.env.MAIL_SECRET_KEY, CryptoJS.enc.Base64.parse(Result[0].email).toString(CryptoJS.enc.Utf8)),
                                    pseudo: Result[0].pseudo,
                                    name: Result[0].name,
                                    registration_date: Result[0].registration_date,
                                    last_name: Result[0].lastname,
                                    role: Result[0].role,
                                    avatar: Result[0].avatar
                                }]


                                res.status(201).json({ result, setToken })
                            }
                        }
                    )
                }
            }

        });
    }
}