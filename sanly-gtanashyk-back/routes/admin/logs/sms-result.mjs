import express, { request } from "express";
import { socket_io } from "../../../index.mjs";
import { verifyToken } from "../../../modules/auth/token.mjs";
import { db } from "../../../modules/database/connection.mjs";
import { updateFatherSms, updateMotherSms } from "../../../modules/query/admin-query.mjs";
import { badRequest, response } from "../../../modules/response.mjs";

const smsResultRouter = express.Router();

smsResultRouter.post('/', verifyToken, async (req, res) => {
    if (typeof req.body === 'undefined' || req.body == null) {
        badRequest(req, res);
    } else {
        const data= req.body;
        if(data.type=='mother'){
            await db.query(updateMotherSms,[data.status,data.log_id])
            .then(result=>{})
            .catch(err=>{});
        }
        if(data.type=='father'){
            await db.query(updateFatherSms,[data.status,data.log_id])
            .then(result=>{})
            .catch(err=>{});
        }
        socket_io.emit('smsResult', req.body);
        res.json(response(false, 'success', req.body));
        res.end();
    }
});

export {smsResultRouter};