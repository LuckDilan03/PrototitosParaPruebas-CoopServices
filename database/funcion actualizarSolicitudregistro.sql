CREATE OR REPLACE FUNCTION actualizarSolicitud(
	idSolicitud bigint,
	pdocumento bigint,
    nombre_1 character varying,
	apellido_1 character varying,
	direccion character varying,
	telefono bigint,
	correo character varying,
	archivo character varying,
	nombre_usuario_deseado character varying,
	contrasena_deseada character varying,
	nombre_2 character varying DEFAULT NULL,
	apellido_2 character varying DEFAULT NULL)
    RETURNS character varying