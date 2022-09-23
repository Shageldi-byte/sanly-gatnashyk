import express from "express";
import format from "pg-format";
import { verifyToken } from "../../../modules/auth/token.mjs";
import { db } from "../../../modules/database/connection.mjs";
import { addLogsQuery } from "../../../modules/query/admin-query.mjs";
import { badRequest, response } from "../../../modules/response.mjs";

const addLogs=express.Router();

addLogs.post('/',verifyToken,async(req,res)=>{
    const {
        values
    } = req.body;
    let insertValues=[];
    await values.forEach((e,i)=>{
        insertValues.push([e.reason, 
            e.reason_type, 
            e.log_type, 
            e.sms_status, 
            'now()', 
            'now()', 
            e.status, 
            e.reject_reason, 
            e.student_number, 
            req.user.user.user_id, 
            e.second_sms_status, 
            e.log_date, 
            e.log_time]);
    });

    db.query(format(addLogsQuery,insertValues))
    .then(result=>{
        res.json(response(false,'success','success'));
        res.end();
    })
    .catch(err=>{
        console.log(err);
        badRequest(req,res);
    })

});

export {addLogs};