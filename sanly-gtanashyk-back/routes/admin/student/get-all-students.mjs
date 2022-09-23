import express from 'express';
import { verifyToken } from '../../../modules/auth/token.mjs';
import { db } from '../../../modules/database/connection.mjs';
import { getAllStudenstQuery } from '../../../modules/query/admin-query.mjs';
import { badRequest, response } from '../../../modules/response.mjs';

const getAllStudentsRouter=express.Router();

getAllStudentsRouter.get('/',verifyToken,(req,res)=>{
    db.query(getAllStudenstQuery)
    .then(result=>{
        res.json(response(false,'success',result.rows));
        res.end();
    })
    .catch(err=>{
        badRequest(req,res);
    })
});

export {getAllStudentsRouter};