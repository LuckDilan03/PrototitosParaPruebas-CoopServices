const pool = require("../config/connection");

async function eliminarSolicitud(req, res) {
    try {
        const idSolicitud = parseInt(req.params.idSolicitud);
        console.log(req.params.idSolicitud)
        console.log(idSolicitud)
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
    eliminarSolicitud
};
