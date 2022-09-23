import express from 'express';
import { socket_io } from '../../../index.mjs';
import { verifyToken } from '../../../modules/auth/token.mjs';
import { response } from '../../../modules/response.mjs';

const sendSms=express.Router();

sendSms.post('/',verifyToken,async(req,res)=>{
    const {
        message,
        phoneNumber,
        type,
        studentNumber,
        fullname,
        log_id
    } = req.body;

    await socket_io.emit('onSms',{
        message:message,
        phoneNumber:phoneNumber,
        type:type,
        studentNumber:studentNumber,
        fullname:fullname,
        log_id:log_id
    });

    res.json(response(false,'success',req.body));
    res.end();

});

export {sendSms};