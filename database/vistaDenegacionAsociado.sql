CREATE OR REPLACE VIEW vista_asociado_denegado AS

SELECT a.dni_persona,
    a.nombre_persona,
    a.segundo_nombre_persona,
    a.apellido_persona,
    a.segundo_apellido_persona,
    a.direccion_persona,
    a.telefono_persona,
    a.correo_persona,
    b.id_solicitud,
    b.fecha_solicitud,
    b.usuario_deseado,
    b.respuesta_solicitud,
    b.fecha_aprobacion,
    b.detalle_solicitud
FROM tab_Persona a
    JOIN tab_solicitarmembresia b ON a.dni_persona = b.dni_persona
WHERE b.respuesta_solicitud = 'DENEGADA';
