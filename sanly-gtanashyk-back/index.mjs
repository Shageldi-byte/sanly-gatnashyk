import cors from "cors";
import express from "express";
import fs from "fs";
import { Server } from "socket.io";
import { db } from "./modules/database/connection.mjs";
import { updateFatherSms, updateMotherSms } from "./modules/query/admin-query.mjs";
import { router } from "./routes/router.mjs";

const app = express();
app.use(cors());
app.use('/public', express.static('public'));
app.use(express.json({limit: '500mb', extended: true}));
app.use(express.urlencoded({limit: "500mb", extended: true, parameterLimit:500000}));
app.use('/api', router);




const server=app.listen(6767, () => {
    console.log(`listening on port 6767`);
})

const io = new Server(server, { /* options */ });

io.on("connection", (client) => {
    console.log("Connected  "+client.id);
    client.on('onSms', (data)=> {
        console.log(data)
        io.emit('onSms', data);
    });
    client.on('smsResult', async(data)=> {
        io.emit('smsResult', data);
    });
});

app.get('/socket-test', function(req, res) {
    fs.readFile("public/index.html", (err, data) => {
        res.send(data);
    })
});



export const socket_io = io;
