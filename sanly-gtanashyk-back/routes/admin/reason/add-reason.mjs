import express from "express";
import { verifyToken } from "../../../modules/auth/token.mjs";
import { db } from "../../../modules/database/connection.mjs";
import { addReasonQuery } from "../../../modules/query/admin-query.mjs";
import { badRequest, response } from "../../../modules/response.mjs";

const addReason = express.Router();

addReason.post('/', verifyToken, (req, res) => {
    const {
        reason,
        type
    } = req.body;

    db.query(addReasonQuery, [reason, type])
        .then(result => {
            if (result.rows.length) {
                res.json(response(false, 'success', result.rows[0]));
                res.end();
            } else {
                badRequest(req, res);
            }
        })
        .catch(err => {
            badRequest(req, res);
        })
})

export { addReason };