const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const fs = require('fs'); // Agregamos fs para manejar archivos
const path = require('path');

const app = express();
const server = http.createServer(app);

const usersroutes = require('./routes/users');
const homeroutes = require('./routes/home');
const adminroutes = require('./routes/admin');

app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

usersroutes(app);
adminroutes(app);
homeroutes(app);

// Middleware para manejar archivos estáticos que no existen
app.use((req, res, next) => {
    const rutaArchivo = path.join(__dirname, '../frontend', req.path);

    // Verificar si el archivo existe
    fs.access(rutaArchivo, fs.constants.F_OK, (err) => {
        if (err) {
            // Si el archivo no existe, redirigir a 404.html
            const ruta404 = path.join(__dirname, '..', 'frontend', '404.html');
            return res.status(404).sendFile(ruta404);
        } else {
            // Si el archivo existe, continuar con el siguiente middleware
            next();
        }
    });
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor!');
});

const { PORT, HOST } = process.env;
server.listen(PORT, () => {
    console.log(`¡Hola mundo! Funcionó por el puerto ${HOST}:${PORT}`);
});
