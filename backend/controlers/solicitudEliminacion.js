const pool = require("../config/connection");
const jwt = require('jsonwebtoken');
const { KEY } = process.env;




async function actualizarSolicitud(req,res){

    const token = req.cookies.authToken;
    if (!token) {
        throw new Error('No token provided'); 
    }

    const decodificado = jwt.decode(token, KEY);
    const  usuario  = decodificado.dni; // Si el DNI se pasa como parámetro en la URL
    console.log(req.body)

    try {

        
        const idSolicitud = parseInt(req.params.idSolicitud);
        const {
            Documento,
            Primer_Nombre,
            Segundo_Nombre,
            Primer_Apellido,
            Segundo_Apellido,
            Direccion,
            Telefono,
            Correo_Electronico}=req.body
            
            if (!idSolicitud || !Documento || !Primer_Nombre  || !Primer_Apellido  || !Direccion || !Telefono ||!Correo_Electronico ||!usuario) 
            {
               return res.status(401).send({ status: "error", message:"datos faltantes" } )
            }
      
        const queryText = 'SELECT actualizarSolicitud($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ;';
        const queryParams=[idSolicitud,Documento,Primer_Nombre,Primer_Apellido,Direccion,Telefono,Correo_Electronico,Segundo_Nombre,Segundo_Apellido,usuario]
        const result = await pool.query(queryText, queryParams);
        
        return res.status(200).send({ status: 'registro exitoso', message: 'Registro Actualizado Correctamente' } )
        

    } catch (error) {
           // Manejo de errores
           console.error("Error al actualizar la solicitud:", error);

        
           return res.status(500).send({ status: 500, message: "Error al actualizar la solicitud." });
    }
    
}

async function eliminarSolicitud(req, res) {
    try {
        const idSolicitud = parseInt(req.params.idSolicitud);
        const queryText = 'SELECT eliminarsolicitud($1) ;';
        const result = await pool.query(queryText, [idSolicitud]);
        
        // Verificar el resultado del procedimiento almacenado
        if (result.rows.length > 0) {
            const respuesta = result.rows[0].eliminarsolicitud;
            console.log(respuesta)
            if (respuesta) {
                // Si el procedimiento devuelve true (eliminación exitosa)
                
                return res.status(200).send({ status: 200, message: "Solicitud eliminada correctamente." });

            } else {
                // Si el procedimiento devuelve false (eliminación fallida)
                
                return res.status(400).send({ status: 400, message: "La solicitud no existe o no se pudo eliminar." });

            }
        } else {
            // Si no se obtuvo ningún resultado del procedimiento
           
            return res.status(404).send({ status: 404, message: "No se pudo completar la solicitud de eliminación." });
        }
    } catch (error) {
        // Manejo de errores
        console.error("Error al eliminar la solicitud:", error);

        
        return res.status(500).send({ status: 500, message: "Error al eliminar la solicitud." });
    }
}

module.exports = {
    actualizarSolicitud,
    eliminarSolicitud
};
