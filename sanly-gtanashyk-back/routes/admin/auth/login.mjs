import express from 'express';
import jwt from 'jsonwebtoken';
import { secret_key } from '../../../modules/constant/constant.mjs';
import { db } from '../../../modules/database/connection.mjs';
import { loginQuery, updateToken } from '../../../modules/query/admin-query.mjs';
import { badRequest, response } from '../../../modules/response.mjs';



const loginRouter = express.Router();
loginRouter.post('/',async(req,res)=>{
    if(typeof req.body === 'undefined' || req.body == null){
        badRequest(req,res);
    } else {
        db.query(loginQuery,[req.body.username,req.body.password])
        .then(result=>{
            if(result.rows.length){
                const user = {
                    user_id: result.rows[0].id
                };
                jwt.sign({user},secret_key,async (err,token)=>{
                    if(err) {
                        console.log(err);
                        badRequest(req,res);};
                    await db.query(updateToken,[token,user.user_id])
                    .then(result2=>{
                        if(result2.rows.length){
                            result.rows[0].token=token;
                            res.json(response(false,"success",result.rows[0]));
                            res.end();
                        } else {
                            console.log(user);
                            badRequest(req,res);
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                        badRequest(req,res);
                    })
                })
            } else {
                console.log("bfdjkh");
                badRequest(req,res);
            }
        })
        .catch(err=>{
            console.log(err+"");
            badRequest(req,res);
        })
    }
});
export {loginRouter};