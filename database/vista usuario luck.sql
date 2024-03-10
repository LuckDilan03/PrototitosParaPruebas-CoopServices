CREATE OR REPLACE VIEW vista_usuarios AS
SELECT
    p.DNI_Persona,
    p.Nombre_Persona,
    p.Apellido_Persona,
    p.Direccion_Persona,
    p.Telefono_Persona,
    p.Correo_Persona,
    u.Usuario_ingreso,
    u.Contrasena_Ingreso,
    u.Rol_Ingreso
FROM
    tab_Persona p
JOIN
    tab_Usuarios u ON p.DNI_Persona = u.DNI_Usuario;

CREATE OR REPLACE VIEW vista_personas AS
SELECT
    p.DNI_Persona,                  -- Cédula de la Persona(Llave Primaria) 
    p.Nombre_Persona,	            -- Nombre de la Persona
    p.Segundo_Nombre_Persona, 	    -- Segundo Nombre de la Persona          
    p.Apellido_Persona, 	        -- Apellido de la Persona 
    p.Segundo_Apellido_Persona, 	-- Segundo Apellido de la Persona 
    p.Direccion_Persona, 	        -- Dirección de la Persona 
    p.Telefono_Persona, 	        -- Teléfono de la Persona
    p.Correo_Persona,	            -- Correo Electronico de la Persona
	p.Documento_Persona,             -- Documento de la Persona
    r.Nombre_Rol	                -- Nombre del Rol

FROM
    tab_Persona p
LEFT JOIN
    tab_Usuarios u ON p.DNI_Persona = u.DNI_Usuario
LEFT JOIN
    tab_Roles r ON u.Rol_Ingreso = r.id_Rol;