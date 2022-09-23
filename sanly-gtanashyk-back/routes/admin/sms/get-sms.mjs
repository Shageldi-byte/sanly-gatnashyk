import express from 'express';
import { verifyToken } from '../../../modules/auth/token.mjs';
import { db } from '../../../modules/database/connection.mjs';
import { getSmsQuery } from '../../../modules/query/admin-query.mjs';
import { badRequest, response } from '../../../modules/response.mjs';

const getSms=express.Router();

getSms.get('/',verifyToken,(req,res)=>{
    db.query(getSmsQuery)
    .then(result=>{
        res.json(response(false,'success',result.rows));
        res.end();
    })
    .catch(err=>{
        badRequest(req,res);
    })
})

export {getSms};