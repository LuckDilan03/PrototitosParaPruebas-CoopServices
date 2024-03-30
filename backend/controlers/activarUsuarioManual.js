const pool = require("../config/connection");

async function activarUsuario(req,res){
    try {
        const usuario = req.params.usuario;
        const dni =parseInt(req.body.dni)
        console.log(req.body)
        const queryText = 'SELECT activacionmanualusuario($1,$2) ;';
        const result = await pool.query(queryText, [usuario,dni]);

        if (result.rows.length > 0) {
            const respuesta = result.rows[0].activacionmanualusuario;
            console.log(respuesta)
            
            if (respuesta) {
                // Si el procedimiento devuelve true (eliminación exitosa)
                
                return res.status(200).send({ status: 200, message: "usuario activo  correctamente." });

            } else {
                // Si el procedimiento devuelve false (eliminación fallida)
                
                return res.status(400).send({ status: 400, message: "El usuario no existe o no se puede activar." });

            }
        } }
            
    catch (error) {
        // Manejo de errores
        console.error("Error al buscar la solicitud:", error);
        return res.status(500).send({ status: 500, message: "Error al encontrar la solicitud." });
    }
}

module.exports={activarUsuario}