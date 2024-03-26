const pool = require("../config/connection");

async function suspenderAsociadoManualmente(req, res) {
    try {
        const idSolicitud = parseInt(req.params.idSolicitud);
        const queryText = 'SELECT suspenderManualmente($1) ;';
        const result = await pool.query(queryText, [idSolicitud]);
        
        
        // Verificar el resultado del procedimiento almacenado
        if (result.rows.length > 0) {
            const respuesta = result.rows[0].suspendermanualmente;
            
            if (respuesta) {
                // Si el procedimiento devuelve true (eliminación exitosa)
                
                return res.status(200).send({ status: 200, message: "usuario suspendido  correctamente." });

            } else {
                // Si el procedimiento devuelve false (eliminación fallida)
                
                return res.status(400).send({ status: 400, message: "El usuario no existe o no se puede suspenderr." });

            }
        } else {
            // Si no se obtuvo ningún resultado del procedimiento
           
            return res.status(404).send({ status: 404, message: "No se pudo completar la solicitud de suspencion." });
        }
    } catch (error) {
        // Manejo de errores
        console.error("Error al eliminar la solicitud:", error);
        return res.status(500).send({ status: 500, message: "Error al eliminar la solicitud." });
    }
}

module.exports = {
    suspenderAsociadoManualmente
};
