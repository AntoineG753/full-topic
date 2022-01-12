import { DB } from '../connectDB.js';
import { sqlGetAllSubCategory, sqlGetSubCategory, sqlDeleteSubCategory, sqlGetCategorySubCategory, sqlCreateSubCategory, sqlCreateSubCategoryImg, sqlGetNumberComment, sqlGetAllReportSubCategory, sqlAdminGetAllSubCategory, sqlAdminUpdateSubCategoryImg, sqlGetSearchSubCategory, sqlReportSubCategory, sqlGetReportSubCategory, sqlUpdateReportSubCategory, sqlApprouvedReportSubCategory } from '../utils/scriptSQL.js';
import * as fs from 'fs';




export const getAllSubCategory = (req, res, next) => {
    console.log(req.query)
    const getSubCategory = sqlGetCategorySubCategory(
        req.query.pathName
    );
    DB.query(
        getSubCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            const getAllSubCategory = sqlGetAllSubCategory(
                Result[0].id_category
            );
            const id_category = {id_category : Result[0].id_category};
            DB.query(
                getAllSubCategory,
                (err, Result) => {
                    if (err) res.status(500).json({ error: err });
                    res.status(201).json({ Result, id_category })
                }
            )
        }
    )
}

export const deleteSubCategory = (req, res, next) => {

    const deleteSubCategory = sqlDeleteSubCategory(
        req.body.id
    );

    const name = req.body.image.split(`${req.protocol}://${req.get('host')}/pictures/`);
    var filename = name[1];
    if (filename !== `interrogation.jpg`) {
        fs.unlink(`pictures/${filename}`, (error => error))
    }
    DB.query(
        deleteSubCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            res.status(201).json({ Result })
        }
    )
}

export const adminUpdateSubCategoryImg = (req, res, next) => {
    console.log(req.body)
    const getSubCat = sqlGetSubCategory(
        req.body.id
    );
    console.log(getSubCat)
    DB.query(
        getSubCat,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            console.log(Result)
            const adminUpdateSubCategory = sqlAdminUpdateSubCategoryImg(
                (req.body.titre ? req.body.titre : Result[0].name_sub_category),
                (req.body.description ? req.body.description : Result[0].description_sub_category),
                (req.file ? `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}` : Result[0].image_sub_category),
                (req.body.id_category ? req.body.id_category : Result[0].id_category),
                req.body.id
            );

            const name = Result[0].image_sub_category.split(`${req.protocol}://${req.get('host')}/pictures/`);
            var filename = name[1];
            if (req.file && filename !== `interrogation.jpg`) {
                fs.unlink(`pictures/${filename}`, (error => error))
            }
            console.log(adminUpdateSubCategory)
            DB.query(
                adminUpdateSubCategory,
                (err, Result) => {
                    if (err) res.status(500).json({ error: err });
                    res.status(201).json({ Result })
                }
            )
        }
    )
}

export const adminGetAllSubCategory = (req, res, next) => {

    const adminGetAllSubCategory = sqlAdminGetAllSubCategory(
    );
    DB.query(
        adminGetAllSubCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            res.status(201).json({ Result })
        }
    )
}



export const createSubCategory = (req, res, next) => {
    console.log(req.body)
    console.log(req.query.uuid)
    console.log(req.file)
    if (req.file) {
        const CreateSubCategory = sqlCreateSubCategoryImg(
            req.body.id_category,
            req.body.description,
            req.body.titre,
            req.query.uuid,
            `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`
        );
        console.log(CreateSubCategory)
        DB.query(
            CreateSubCategory,
            (err, Result) => {
                if (err) res.status(500).json({ error: err });
                res.status(201).json({ Result })
            }
        )
    } else {
        const createSubCategory = sqlCreateSubCategory(
            req.body.id_category,
            req.body.description,
            req.body.titre,
            req.query.uuid,
            `${req.protocol}://${req.get('host')}/pictures/interrogation.jpg`
        );
        console.log(createSubCategory)
        DB.query(
            createSubCategory,
            (err, Result) => {
                if (err) res.status(500).json({ error: err });
                res.status(201).json({ Result })
            }
        )
    }
}

export const getNumberComment = (req, res, next) => {

    const getNumberComment = sqlGetNumberComment(
        req.body.id_sub_category
    );
    console.log(getNumberComment)
    DB.query(
        getNumberComment,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            res.status(201).json({ Result })
        }
    )
}


export const getSearchSubCategory = (req, res, next) => {

    const GetSearchSubCategory = sqlGetSearchSubCategory(
        req.body.name
    );

    DB.query(
        GetSearchSubCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            res.status(201).json({ Result })
        }
    )
}


export const reportSubCategory = (req, res, next) => {



    const getSubCategory = sqlGetSubCategory(
        req.body.id_sub_category
    );


    DB.query(
        getSubCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });

            if (Result.length === 0) {
                console.log('sujet introuvable ')
                res.status(404).json({ msg: "sujet introuvable" })
            } else {


                const GetReportSubCategory = sqlGetReportSubCategory(
                    req.body.id_sub_category
                );

                DB.query(
                    GetReportSubCategory,
                    (err, Result) => {
                        if (err) res.status(500).json({ error: err });
                        console.log(Result)
                        if (Result.length === 0) {
                            const reportSubcategory = sqlReportSubCategory(
                                req.body.id_sub_category,
                                req.body.pseudo_userReport

                            );
                            console.log(reportSubcategory)
                            DB.query(
                                reportSubcategory,
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
                                const UpdateReportSubCategory = sqlUpdateReportSubCategory(
                                    number,
                                    req.body.id_sub_category,
                                    allPseudo
                                );
                                DB.query(
                                    UpdateReportSubCategory,
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



export const GetAllReportSubCategory = (req, res, next) => {

    const getAllReportSubCategory = sqlGetAllReportSubCategory();

    DB.query(
        getAllReportSubCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });

            res.status(201).json({ Result })
        })
}



export const ApprouvedReportSubCategory = (req, res, next) => {

    const approuvedReportSubCategory = sqlApprouvedReportSubCategory(
        req.body.id_report
    );

    DB.query(
        approuvedReportSubCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });

            res.status(201).json({ Result })
        })
}


export const DeleteReportSubCategory = (req, res, next) => {

    const approuvedReportSubCategory = sqlApprouvedReportSubCategory(
        req.body.id_report
    );

    DB.query(
        approuvedReportSubCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            
            const GetSubCategory = sqlGetSubCategory(
                req.body.id_sub_category
            );
        
            DB.query(
                GetSubCategory,
                (err, Result) => {
                    if (err) res.status(500).json({ error: err });
                    if (!Result) {
                        res.status(404).json({ msg: "Sujet déja supprimé"})
                    }
                    if (Result) {
                        console.log(Result)
                        const deleteSubCategory = sqlDeleteSubCategory(
                            req.body.id_sub_category
                        );
                    
                        const name = Result[0].image_sub_category.split(`${req.protocol}://${req.get('host')}/pictures/`);
                        var filename = name[1];
                        if (filename !== `interrogation.jpg`) {
                            fs.unlink(`pictures/${filename}`, (error => error))
                        }
                        DB.query(
                            deleteSubCategory,
                            (err, Result) => {
                                if (err) res.status(500).json({ error: err });
                                res.status(201).json({ Result })
                            }
                        )

                    }
                })
        })
}