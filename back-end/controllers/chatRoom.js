import { DB } from '../connectDB.js';
import { sqlGetSubCategory, sqlGetAllMessage, sqlCreateMessage, sqlGetMessage, sqlDeleteMessage, sqlReportMessage, sqlGetReportMessage, sqlGetAllReportMessage, sqlGetLikeSubCategory, sqlUpdateReportMessage, sqlApprouvedReportMessage, sqlCreateLikeSubCategory, sqlDisLikeSubCategory, sqlLikeSubCategory } from '../utils/scriptSQL.js';


export const GetSubCategory = (req, res, next) => {
    console.log(req.body)
    console.log(req.query)
    const GetSubCategory = sqlGetSubCategory(
        req.query.id_sub_category
    );
    console.log(GetSubCategory)
    DB.query(
        GetSubCategory,
        (err, result) => {
            if (err) res.status(500).json({ error: err });
            var Result = result;
            const GetLikeSubCategory = sqlGetLikeSubCategory(
                req.query.id_sub_category
            );
            console.log(GetLikeSubCategory)
            DB.query(
                GetLikeSubCategory,
                (err, Res) => {
                    if (err) res.status(500).json({ error: err });
                    var like = Res;
                    res.status(201).json({ Result, like })
                }
            )
        }
    )
}

export const GetAllMessage = (req, res, next) => {
    console.log(req.body)
    console.log(req.query)
    const getallMessages = sqlGetAllMessage(
        req.query.id_sub_category
    );
    DB.query(
        getallMessages,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            res.status(201).json({ Result })
        }
    )



}


export const CreateMessage = (req, res, next) => {

    const createMessage = sqlCreateMessage(
        req.query.uuid,
        req.body.id_sub_category,
        req.body.message,
        (req.file ? `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}` : " ")
    );
    console.log(createMessage)
    DB.query(
        createMessage,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            const getMessage = sqlGetMessage(
                Result.insertId
            );
            DB.query(
                getMessage,
                (err, Result) => {
                    if (err) res.status(500).json({ error: err });
                    res.status(201).json({ Result })
                }
            )

        }
    )
}


export const DeleteMessage = (req, res, next) => {


    const getMessage = sqlGetMessage(
        req.body.id_message
    )
    DB.query(
        getMessage,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });

            if (Result[0].uuid === req.query.uuid) {

                const deleteMessage = sqlDeleteMessage(
                    `${Result[0].id_message}`
                );

                DB.query(
                    deleteMessage,
                    (err, Result) => {
                        if (err) res.status(500).json({ error: err });
                        res.status(201).json({ Result })
                    }
                )
            } else {
                res.status(500).json({ msg: "Ce message ne vous apartient pas" })
            }
        }
    )
}





export const ReportMessage = (req, res, next) => {


    const GetMessage = sqlGetMessage(
        req.body.id_message
    );
    DB.query(
        GetMessage,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            if (Result.length === 0) {
                console.log('msg introuvable')
                res.status(404).json({ msg: "messgae introuvable" })
            } else {
                const getReportMessage = sqlGetReportMessage(
                    req.body.id_message
                );

                DB.query(
                    getReportMessage,
                    (err, Result) => {
                        if (err) res.status(500).json({ error: err });

                        if (Result.length === 0) {
                            const reportMessage = sqlReportMessage(
                                req.body.id_message,
                                req.body.pseudo_userReport
                            );

                            DB.query(
                                reportMessage,
                                (err, Result) => {
                                    if (err) res.status(500).json({ error: err });
                                    res.status(201).json({ msg: "report send !" })
                                }
                            )
                        } else {

                            var splitted = Result[0].allPseudoReport.split(',');
                            console.log(splitted)
                            if (splitted.indexOf(req.body.pseudo_userReport) === -1) {

                                const number = Result[0].number_report + 1;
                                const allPseudo = `${Result[0].allPseudoReport},${req.body.pseudo_userReport}`;

                                const UpdateReportMessage = sqlUpdateReportMessage(
                                    number,
                                    req.body.id_message,
                                    allPseudo
                                );

                                DB.query(
                                    UpdateReportMessage,
                                    (err, Result) => {
                                        if (err) res.status(500).json({ error: err });
                                        res.status(201).json({ msg: "report send !" })
                                    }
                                )
                            }
                            res.status(202).json({ msg: "report already exist!" })
                        }
                    }
                )
            }
        }
    )
}



export const GetAllReportMessage = (req, res, next) => {

    const getAllReportMessage = sqlGetAllReportMessage();

    DB.query(
        getAllReportMessage,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });

            res.status(201).json({ Result })
        })
}




export const ApprouvedReportMessage = (req, res, next) => {

    const approuvedReportMessage = sqlApprouvedReportMessage(
        req.body.id_report
    );

    DB.query(
        approuvedReportMessage,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            res.status(201).json({ Result })
        })
}


export const DeleteReportMessage = (req, res, next) => {

    console.log(req.body)

    const approuvedReportMessage = sqlApprouvedReportMessage(
        req.body.id_report
    );

    DB.query(
        approuvedReportMessage,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            const deleteMessage = sqlDeleteMessage(
                `${req.body.id_message}`
            );

            DB.query(
                deleteMessage,
                (err, Result) => {
                    if (err) res.status(500).json({ error: err });
                    res.status(201).json({ Result })

                })
        })
}

// sqlGetLikeSubCategory, sqlCreateLikeSubCategory, sqlDisLikeSubCategory, sqlLikeSubCategory 

export const LikeSubCategory = (req, res, next) => {

    console.log(req.body.id_sub_category)

    const GetLikeSubCategory = sqlGetLikeSubCategory(
        req.body.id_sub_category
    );

    DB.query(
        GetLikeSubCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            if (Result.length > 0) {
                console.log(Result)
                const number = Result[0].number_like + 1;
                const pseudo = Result[0].pseudo_like + "," + req.body.pseudo;
                const LikeSubCategory = sqlLikeSubCategory(
                    pseudo,
                    number,
                    req.body.id_sub_category
                );
                console.log(LikeSubCategory)
                DB.query(
                    LikeSubCategory,
                    (err, Result) => {
                        if (err) res.status(500).json({ error: err });
                        res.status(201).json({ msg: "like send success" })
                    })
            } else {
                const CreateLikeSubCategory = sqlCreateLikeSubCategory(
                    req.body.id_sub_category,
                    req.body.pseudo
                );
                console.log(CreateLikeSubCategory)
                DB.query(
                    CreateLikeSubCategory,
                    (err, Result) => {
                        if (err) res.status(500).json({ error: err });
                        res.status(201).json({ msg: "like send success" })
                    }
                )
            }
        }
    )
}


export const DisLikeSubCategory = (req, res, next) => {

    const GetLikeSubCategory = sqlGetLikeSubCategory(
        req.body.id_sub_category
    );

    DB.query(
        GetLikeSubCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            if (Result.length > 0) {
                var splitted = Result[0].pseudo_like.split(',');

                if (splitted.indexOf(req.body.pseudo) >= 0) {


                    if (splitted.length === 1) {
                        
                        const number_like = Result[0].number_like - 1;
                        splitted.splice(splitted.indexOf(`${req.body.pseudo}`), 1)
                        const updateList = splitted.join(',');                       
                        console.log(updateList)
                        const disLikeSubCategory = sqlDisLikeSubCategory(
                            updateList,
                            number_like,
                            req.body.id_sub_category
                        );

                        DB.query(
                            disLikeSubCategory,
                            (err, Result) => {
                                if (err) res.status(500).json({ error: err });

                            }
                        )
                    } else {
                        
                        const number_like = Result[0].number_like - 1;
                        splitted.splice(splitted.indexOf(`${req.body.pseudo}`), 1)
                        const updateList = splitted.join(',');                       
                        console.log(updateList)
                        const disLikeSubCategory = sqlDisLikeSubCategory(
                            updateList,
                            number_like,
                            req.body.id_sub_category
                        );

                        DB.query(
                            disLikeSubCategory,
                            (err, Result) => {
                                if (err) res.status(500).json({ error: err });
                                res.status(201).json({ msg: "like send success" })
                            }
                        )
                    }

                }

            }
        }
    )
}






