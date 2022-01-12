import { DB } from "../connectDB.js";
import jwt from "jsonwebtoken";
import { sqlAuthUuid, sqlGetAccount } from "../utils/scriptSQL.js";



export const authAdmin = (req, res, next) => {
    const GetAccount = sqlGetAccount(
        req.query.uuid
    );
    DB.query(GetAccount,
        (err, result) => {
            if (err) res.status(500).json({error: "erreur serveur"});
            if(result[0].role === "admin") {
                const sqlauthUuid = sqlAuthUuid(
                    req.query.uuid
                );
            
                try {
                    DB.query(sqlauthUuid,
                        (err, result) => {
                            if (err) res.status(500).json({error: "erreur serveur"});
                       
                            const token = req.headers.authorization.split(' ')[1];
                            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY_CONNECT, (error, decoded) => {
                                
                                if (error) {
                                  
                                    res.status(401).json({ message: error })
                                } else {
                                    if (decoded.userToken && decoded.userToken === result[0].uuid) {
                                        res.locals.userId = req.query.ID
                                        next()
                                    } else {
                                        res.status(401).json({ message: "probléme d'identification" })
                                    }
                                }
                            });
                        }
                    )
                } 
                catch (error) { 
                    res.status(401).json({ error }) 
                }
            } else {
                res.status(401).json({ msg: "autorisation administrateur requis"})
            }
            }
    )
   
   
};