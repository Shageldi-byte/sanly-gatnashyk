import express from 'express';
import { verifyToken } from '../../../modules/auth/token.mjs';
import { db } from '../../../modules/database/connection.mjs';
import { updateSmsQuery } from '../../../modules/query/admin-query.mjs';
import { badRequest, response } from '../../../modules/response.mjs';

const updateSms=express.Router();

updateSms.post('/',verifyToken,(req,res)=>{
    const {
        sms,
        type
    } = req.body;
    db.query(updateSmsQuery,[sms,type])
    .then(result=>{
        res.json(response(false,'success',result.rows[0]));
        res.end();
    })
    .catch(err=>{
        badRequest(req,res);
    })
});

export {updateSms};