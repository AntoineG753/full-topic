import { DB } from '../connectDB.js';
import { sqlGetAllCategory, sqlGetSearchCategory, sqlCreateCategroy, sqlUpdateCategroy, sqlGetCategory, sqlDeleteCategory } from '../utils/scriptSQL.js';
import * as fs from 'fs';


export const CreateCategory = (req, res, next) => {
    console.log("ddd")
    const CreateCategory = sqlCreateCategroy(
        req.body.titre,
        req.body.description,
        `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`

    );
    console.log(CreateCategory)
    DB.query(
        CreateCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            res.status(201).json({ Result })
        }
    )
}

export const UpdateCategory = (req, res, next) => {
    console.log(req)
    const getCategroy = sqlGetCategory(
        req.body.id
    );
    DB.query(
        getCategroy,
        (err, Result) => {
            console.log(Result)
            if (err) res.status(500).json({ error: err });
            const updateCategroy = sqlUpdateCategroy(
                (req.body.titre ? req.body.titre : Result[0].name_category),
                (req.body.description ? req.body.description : Result[0].description_category),
                (req.file ? `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}` : Result[0].image_category),
                req.body.id
            );
            if (req.file) {

                const name = Result[0].image_category.split(`${req.protocol}://${req.get('host')}/pictures/`);

                var filename = name[1];
            }
            console.log(updateCategroy)
            DB.query(
                updateCategroy,
                (err, Result) => {
                    if (err) res.status(500).json({ error: err });
                    if (req.file ? fs.unlink(`pictures/${filename}`, (error => error)) : console.log('img non supprimée'))
                        res.status(201).json({ Result })
                }
            )
        }
    )
}

export const getAllCategory = (req, res, next) => {

    const getAllCategory = sqlGetAllCategory();

    DB.query(
        getAllCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            res.status(201).json({ Result })
        }
    )
}

export const deleteCategory = (req, res, next) => {

    const getCategroy = sqlGetCategory(
        req.body.id
    );
    DB.query(
        getCategroy,
        (err, Result) => {
            console.log(Result)
            if (err) res.status(500).json({ error: err });
            const deleteCategory = sqlDeleteCategory(
                req.body.id
            );
            console.log(deleteCategory)
            DB.query(
                deleteCategory,
                function (error) {
                    if (error) throw error;
                    const name = Result[0].image_category.split(`${req.protocol}://${req.get('host')}/pictures/`);
                    var filename = name[1];
                    fs.unlink(`pictures/${filename}`, (error => error))
                }
            )
            res.status(201).json({ message: 'Category suprimée !' })
        }
    )


}

export const getSearchCategory = (req, res, next) => {



    const getSearchCategory = sqlGetSearchCategory(
        req.body.name
    );
    DB.query(
        getSearchCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            res.status(201).json({ Result })
        }
    )
}










