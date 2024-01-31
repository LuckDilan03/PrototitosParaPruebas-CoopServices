const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const routes = require('./routes/users');
const homeroutes=require('./routes/home');
const path = require('path');


app.use(express.static(path.join(__dirname, '../frontend')));


if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
homeroutes(app)
routes(app);
const { PORT } = process.env;


// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor!');
});

server.listen(PORT, () => {
    console.log("¡Hola mundo! Funcionó por el puerto", PORT);
});
