const pool = require("../config/connection");
const jwt =require('jsonwebtoken');
const { KEY } = process.env;

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

async function registrarAporteGeneral(req,res){
try {
    const token = req.cookies.authToken;
    const archivo = req.file.filename
        if (!token) {
            throw new Error('No token provided');
        }

        if (!archivo) {
            throw new Error('No archivo no provided');
        }
        const decodificado = jwt.decode(token, KEY);
        const rol = decodificado.rol;
        const {dni,montoAporte,tipoPago,pagadoA,fechaAporte}=req.body.montoAporte;
         
        const queryString='SELECT * FROM registrarAporte($1,$2,$3,$4,$5,$6)'
        const {rows : result}= await pool.query(queryString,[dni,montoAporte,tipoPago,pagadoA,fechaAporte])
        
        if (result.length > 0) {
            const respuesta=result[0];
            
            
            
            if (respuesta) {
                // Si el procedimiento devuelve true (eliminación exitosa)
                
                return res.status(200).send({ ok:'ok', status: 200, message: "Foto actualizada correctamente" });

            } else {
                // Si el procedimiento devuelve false (eliminación fallida)
                
                return res.status(400).send({ status: 400, message: "Error al momento de actualizar la foto" });

            }
        } else {
            // Si no se obtuvo ningún resultado del procedimiento
           
            return res.status(404).send({ status: 404, message: "No se pudo completar la solicitud de actualizacion de." });
        }
    
} catch (error) {
    console.error('Error al obtener datos de usuarios desde la base de datos: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
}
}

module.exports={registrarAporteGeneral}