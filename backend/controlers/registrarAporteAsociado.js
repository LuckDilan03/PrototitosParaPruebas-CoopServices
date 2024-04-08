const pool = require("../config/connection");
const jwt =require('jsonwebtoken');
const { KEY } = process.env;

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

async function registrarAporteAsociado(req,res){
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

        const dni = decodificado.dni
        const usuario = decodificado.rol;
        const {montoAporte,tipoPago,pagadoA,fechaAporte,}=req.body;
        let {detalles}=req.body;
        detalles=`Aporte ingresado por el asociado ${dni} con detalles:${detalles}`;
         
        const queryString='SELECT * FROM registrarAporte($1,$2,$3,$4,$5,$6,$7,$8)'
        const {rows : result}= await pool.query(queryString,[dni,montoAporte,tipoPago,pagadoA,fechaAporte,archivo,detalles,usuario])
        
        if (result.length > 0) {
            const respuesta=result[0];
    
            if (respuesta.codigo_estado === 3) {
                // Si el procedimiento devuelve true (eliminación exitosa)
                
                return res.status(200).send({ ok:'ok', status: 200, message: respuesta.mensaje });

            } else if(respuesta.codigo_estado === 2){
                // Si el procedimiento devuelve false (eliminación fallida)
                
                return res.status(400).send({ status: 400, message: respuesta.mensaje });
                
            }
            else if(respuesta.codigo_estado === 1){
                // Si el procedimiento devuelve false (eliminación fallida)
                
                return res.status(400).send({ status: 400, message: respuesta.mensaje })}
        }
        
         else {
            // Si no se obtuvo ningún resultado del procedimiento
           
            return res.status(404).send({ status: 404, message: "No se pudo completar la solicitud de registro de aporte." });
        }
    
} catch (error) {
    console.error('Error al obtener datos de usuarios desde la base de datos: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
}}

module.exports={registrarAporteAsociado}