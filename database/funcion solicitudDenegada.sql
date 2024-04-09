CREATE OR REPLACE FUNCTION solicitudDenegada(solicitud bigint,documento bigint) 
RETURNS TABLE (
    id_solicitud bigint, 
    dni_persona bigint , 
    fecha_solicitud date ,
    documento_solicitud varchar,
    respuesta_solicitud VARCHAR,
    fecha_aprobacion date , 
    numero_resolucion bigint,
    usuario_inserta varchar, 
    detalle_solicitud varchar,
    nombre_persona VARCHAR(100),
    segundo_nombre_persona VARCHAR(100),
    apellido_persona VARCHAR(100),
    segundo_apellido_persona VARCHAR(100),
    direccion_persona VARCHAR(100),
    telefono_persona bigint,
    correo_persona VARCHAR(100),
    foto_persona VARCHAR(100)
)
AS
$$
DECLARE
    persona_record RECORD;
BEGIN
    -- Obtener los datos de la persona utilizando el procedimiento obtenerdatospersona
    SELECT * INTO persona_record FROM obtenerdatospersona(documento);
    
    -- Devolver los datos de la persona junto con los datos de la solicitud
    RETURN QUERY 
    SELECT 
        s.id_solicitud,
        s.dni_persona,
        s.fecha_solicitud::date,
        s.documento_solicitud,
        s.respuesta_solicitud,
        s.fecha_aprobacion::date,
        s.numero_resolucion,
        s.usuario_inserta,
        s.detalle_solicitud,
        persona_record.nombre_persona,
        persona_record.segundo_nombre_persona,
        persona_record.apellido_persona,
        persona_record.segundo_apellido_persona,
        persona_record.direccion_persona,
        persona_record.telefono_persona,
        persona_record.correo_persona,
        persona_record.foto_persona
    FROM 
        tab_solicitarmembresia s
    WHERE 
        s.id_solicitud = solicitud;
END;
$$
LANGUAGE plpgsql;

--SELECT * FROM solicitudDenegada(2,123456789)