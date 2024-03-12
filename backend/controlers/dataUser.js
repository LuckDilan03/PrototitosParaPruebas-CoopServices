const pool = require('../config/connection');

async function dataUserAprobado(dni) {
    try {
        const { rows } = await pool.query(`SELECT * FROM vistaaprobado WHERE dni_persona = $1`, [dni]);
        // Verificar si se encontraron datos
        if (rows.length === 0) {
            // No se encontraron datos para el DNI proporcionado
            return { error: 'No se encontraron datos para el DNI proporcionado' };
        }

        // Se encontraron datos, retornar los resultados como un arreglo
        const userDataArray = rows.map(row => ({
            dni_persona: row.dni_persona,
            nombre_persona: row.nombre_persona,
            segundo_nombre_persona: row.segundo_nombre_persona,
            apellido_persona: row.apellido_persona,
            segundo_apellido_persona: row.segundo_apellido_persona,
            direccion_persona: row.direccion_persona,
            telefono_persona: row.telefono_persona,
            correo_persona: row.correo_persona,
            id_solicitud: row.id_solicitud,
            fecha_solicitud: row.fecha_solicitud,
            usuario_deseado: row.usuario_deseado,
            respuesta_solicitud: row.respuesta_solicitud,
            numero_cuenta: row.numero_cuenta,
            saldo_cuenta: row.saldo_cuenta,
            aporte_mensual: row.aporte_mensual,
            dni_asociado: row.dni_asociado,
            estado_cuenta: row.estado_cuenta,
            monto_aporte: row.monto_aporte
        }));

        return userDataArray;
    } catch (error) {
        console.error('Error al obtener datos de usuarios desde la base de datos: ', error);
        return { error: 'Error interno del servidor' };
    }
}

module.exports = { dataUserAprobado };
