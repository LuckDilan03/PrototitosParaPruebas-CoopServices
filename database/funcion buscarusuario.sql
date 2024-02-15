-- FUNCTION: public.buscar_usuario(character varying)

DROP FUNCTION IF EXISTS public.buscar_usuario(character varying);

CREATE OR REPLACE FUNCTION public.buscar_usuario(
	pusuario character varying)
    RETURNS TABLE(usuario character varying, contrasena character varying, dni bigint, rol integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
  RETURN QUERY SELECT usuario_ingreso, contrasena_ingreso, dni_usuario, rol_ingreso
               FROM tab_usuarios WHERE usuario_ingreso = PUsuario;
END;
$BODY$;

ALTER FUNCTION public.buscar_usuario(character varying)
    OWNER TO postgres;