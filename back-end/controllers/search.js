import { DB } from '../connectDB.js';
import { sqlGetSearchSubCategory } from '../utils/scriptSQL.js';

export const GetSearchSubCategory = (req, res, next) => {
    console.log(req.body)
    console.log(req.query)
    const GetSearchSubCategory = sqlGetSearchSubCategory(
        req.body.name
    );
    console.log(GetSearchSubCategory)
    DB.query(
        GetSearchSubCategory,
        (err, Result) => {
            if (err) res.status(500).json({ error: err });
            res.status(201).json({ Result })
        }
    )
}

