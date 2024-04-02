CREATE OR REPLACE VIEW public.vista_usuarios
 AS
 SELECT p.dni_persona,
    p.nombre_persona,
    p.apellido_persona,
    p.direccion_persona,
    p.telefono_persona,
    p.correo_persona,
    p.foto_persona,
    u.usuario_ingreso,
    u.rol_ingreso,
    u.estado_usuario,
    u.detalle_estado
   FROM tab_persona p
     JOIN tab_usuarios u ON p.dni_persona = u.dni_usuario;

ALTER TABLE public.vista_usuarios
    OWNER TO postgres;



CREATE OR REPLACE VIEW vista_personas AS
SELECT
    p.DNI_Persona,                  -- Cédula de la Persona (Llave Primaria) 
    p.Nombre_Persona,               -- Nombre de la Persona
    p.Segundo_Nombre_Persona,       -- Segundo Nombre de la Persona          
    p.Apellido_Persona,             -- Apellido de la Persona 
    p.Segundo_Apellido_Persona,     -- Segundo Apellido de la Persona 
    p.Direccion_Persona,            -- Dirección de la Persona 
    p.Telefono_Persona,             -- Teléfono de la Persona
    p.Correo_Persona,               -- Correo Electrónico de la Persona
	p.Documento_Persona,            -- Documento de la Persona
    p.foto_persona,                  -- foto personas

    (
        SELECT STRING_AGG(r.Nombre_Rol, ', ')::character varying
        FROM tab_Usuarios u
        JOIN tab_Roles r ON u.Rol_Ingreso = r.id_Rol
        WHERE u.DNI_Usuario = p.DNI_Persona
    ) AS nombre_rol               -- Nombres de los Roles (concatenados)
FROM
    tab_Persona p;