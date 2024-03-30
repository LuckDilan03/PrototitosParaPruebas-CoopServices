const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../frontend/uploads/documentos')); // Ruta absoluta a la carpeta 'uploads' dentro del frontend
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Genera un sufijo único
        cb(null,  file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../frontend/uploads/fotoPerfil')); // Ruta absoluta a la carpeta 'uploads' dentro del frontend
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Genera un sufijo único
        cb(null,  file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});


const upload = multer({ storage: storage });
const uploadfotoPerfil=multer({storage:storage2});

module.exports = {upload,uploadfotoPerfil};