const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const routes=require('./routes/users');


if (process.env.NODE_ENV !== "Production"){
    require('dotenv/config');
}

const {PORT}=process.env;
app.use(express.urlencoded({extended : true}));
app.use(express.json());
routes(app);


server.listen(PORT,()=>{
    console.log("hola mundo funciono por el puerto ",PORT);
});