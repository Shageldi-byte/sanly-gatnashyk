import express from 'express';
import fs from 'fs';
import format from 'pg-format';
import { verifyToken } from '../../../modules/auth/token.mjs';
import { db } from '../../../modules/database/connection.mjs';
import { connection } from '../../../modules/database/mysql-connection.mjs';
import { addAllStudents, truncate_studets } from '../../../modules/query/admin-query.mjs';
import { badRequest } from '../../../modules/response.mjs';
import { jsonStudents } from '../../../modules/talyplar.mjs';

const syncAllStudents=express.Router();

syncAllStudents.get('/',verifyToken,(req,res)=>{
    connection.query('SELECT * FROM talyplar',async function(error,results,fields){
        if(error) throw error;
        if(results.length>0){
            await db.query(truncate_studets)
            .then(result=>{})
            .catch(err=>{});
            let insertValues=[];
            await results.forEach((e,i)=>{
                insertValues.push([e.talyp_belgi, e.ady, e.familyasy, e.a_ady, e.doglan_sene, 
                    e.ata_ady_familyasy, e.ata_tel, e.ene_ady_familyasy, e.ene_tel, e.talyp_tel, 
                    e.welayat_id, e.fakultet_id, e.hunar_id, e.topar_id, e.kurs, e.jynsy]);
            });
            await db.query(format(addAllStudents,insertValues))
            .then(result=>{
                res.json(result.rows);
            })
            .catch(err=>{
                badRequest(req,res);
            })
        } else {
            badRequest(req,res);
        }
    })
    
})

export {syncAllStudents};