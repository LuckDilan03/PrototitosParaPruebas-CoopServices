CREATE OR REPLACE FUNCTION buscar_usuario(PUsuario VARCHAR) RETURNS VARCHAR AS
$$
DECLARE resultado VARCHAR;
BEGIN

SELECT contrasena_ingreso INTO resultado FROM tab_usuarios WHERE usuario_ingreso = PUsuario ;
    IF resultado IS NULL THEN
        RAISE NOTICE 'No se encontro ese usuario';
        resultado = 'El usuario no esta registrado';
        RETURN resultado;
    ELSE
        RETURN resultado;
    END IF;
END;
$$
LANGUAGE PLPGSQL;