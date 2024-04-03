const pool = require('../config/connection');
const jwt = require('jsonwebtoken');
const { KEY } = process.env;

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

async function actualizarDataPerfil(req,res){
try {
    const token = req.cookies.authToken;
    
        if (!token) {
            throw new Error('No token provided');
        }

        
        const decodificado = jwt.decode(token, KEY);
        const dni = decodificado.dni;
        const {direccion,telefono}=req.body
        
        const queryString='SELECT * FROM actualizaDataPersona($1,$2,$3)'
        const {rows : result}= await pool.query(queryString,[dni,direccion,telefono])
        
        if (result.length > 0) {
            const respuesta=result[0];
            
            
            
            if (respuesta) {
                // Si el procedimiento devuelve true (eliminación exitosa)
                
                return res.status(200).send({ ok:'ok', status: 200, message: "Informacion actualizada correctamente" });

            } else {
                // Si el procedimiento devuelve false (eliminación fallida)
                
                return res.status(400).send({ status: 400, message: "Error al momento de actualizar la informacion" });

            }
        } else {
            // Si no se obtuvo ningún resultado del procedimiento
           
            return res.status(404).send({ status: 404, message: "No se pudo completar la solicitud de actualizacion ." });
        }
    
} catch (error) {
    console.error('Error al obtener datos de usuarios desde la base de datos: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
}
}

module.exports={actualizarDataPerfil}