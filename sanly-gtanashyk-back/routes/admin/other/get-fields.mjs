import express from 'express';
import { verifyToken } from '../../../modules/auth/token.mjs';
import { db } from '../../../modules/database/connection.mjs';
import { getCourse, getFaculty, getGroup, getRegion } from '../../../modules/query/admin-query.mjs';
import { badRequest, response } from '../../../modules/response.mjs';

const getFields=express.Router();

getFields.get('/',verifyToken,(req,res)=>{
    db.query(` ${getFaculty} ${getCourse} ${getGroup} ${getRegion}`)
    .then(result=>{
        res.json(response(false,'success',{
            faculty:result[0].rows,
            course:result[1].rows,
            group:result[2].rows,
            region:result[3].rows
        }));
        res.end();
    })
    .catch(err=>{
        badRequest(req,res);
    })
});

export {getFields};