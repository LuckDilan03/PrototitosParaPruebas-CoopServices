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