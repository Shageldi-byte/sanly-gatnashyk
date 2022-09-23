import express from "express";
import format from "pg-format";
import { verifyToken } from "../../../modules/auth/token.mjs";
import { db } from "../../../modules/database/connection.mjs";
import { getLogs } from "../../../modules/query/admin-query.mjs";
import { badRequest, response } from "../../../modules/response.mjs";

const getAllLogs = express.Router();

getAllLogs.post('/', verifyToken, (req, res) => {
    let whereQuery = ` WHERE 1=1 `;
    let {
        topar_id,
        talyp_id,
        log_type,
        startDate,
        endDate
    } = req.body;


    if (startDate != null && startDate !== '' && typeof startDate !== 'undefined') {
        let endD = new Date();
        startDate = new Date(startDate);
        startDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
        if (endDate != null && endDate !== '' && typeof endDate !== 'undefined' && endDate != 0) {
            let e = new Date(endDate);
            e.setDate(e.getDate() + 1);
            endD = `${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`;
        } else {
            endD.setDate(endD.getDate() + 1);
            endD = `${endD.getFullYear()}-${endD.getMonth() + 1}-${endD.getDate()}`;
        }
        whereQuery += ` AND ((l.created_at,l.created_at) OVERLAPS ('${startDate}'::DATE,'${endD}'::DATE)) `;
    }

    if (topar_id != null && topar_id !== '' && typeof topar_id !== 'undefined' && topar_id != 0) {
        whereQuery += ` AND t.topar_id=${topar_id} `;
    }

    if (talyp_id != null && talyp_id !== '' && typeof talyp_id !== 'undefined' && talyp_id != 0) {
        whereQuery += ` AND log.student_number=${talyp_id} `;
    }

    if (log_type != null && log_type !== '' && typeof log_type !== 'undefined' && log_type != 0) {
        whereQuery += ` AND l.log_type='${log_type}' `;
    }


    let query = format(getLogs, whereQuery);
    console.log(query);
    db.query(query)
        .then(result => {
            res.json(response(false, 'success', result.rows));
            res.end();
        })
        .catch(err => {
            console.log(err);
            badRequest(req, res);
        })
})
export { getAllLogs };