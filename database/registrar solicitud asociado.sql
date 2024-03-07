-- FUNCTION: public.ingresar_solicitud_asociado(bigint, character varying, character varying, character varying, character varying, character varying, bigint, character varying, character varying, character varying, character varying)

-- DROP FUNCTION IF EXISTS public.ingresar_solicitud_asociado(bigint, character varying, character varying, character varying, character varying, character varying, bigint, character varying, character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION public.ingresar_solicitud_asociado(
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
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
 DECLARE REC_persona RECORD;
 DECLARE REC_solicitud RECORD;
 DECLARE id_person INTEGER;
 DECLARE DIA_ACTUAL timestamp without time zone ;
 DECLARE respuesta CHAR;
 DECLARE Pid_solicitud BIGINT;
 
 BEGIN
 
 SELECT MAX(Id_Solicitud) INTO Pid_solicitud FROM tab_Solicitarmembresia;
    IF Pid_solicitud IS NULL THEN
        Pid_solicitud=1;
    ELSE 
        Pid_solicitud=Pid_solicitud+1;
    END IF;
SELECT MAX(Id_Solicitud) INTO id_person FROM tab_Solicitarmembresia WHERE dni_persona = Pdocumento;
IF id_person IS  NULL THEN 

	INSERT INTO tab_Persona VALUES(Pdocumento , nombre_1 , nombre_2, APELLIDO_1,APELLIDO_2,direccion,telefono,correo,Documento_Solicitud);
    INSERT INTO tab_Solicitarmembresia (id_solicitud,DNI_Persona,Fecha_Solicitud,Usuario_Deseado,ContraseNa_Deseada,Documento_Solicitud) VALUES (Pid_solicitud,Pdocumento,CURRENT_TIMESTAMP, nombre_usuario_deseado,contrasena_deseada,Archivo);
    RAISE NOTICE 'SE INSERTA SOLICITUD NUEVA';
	respuesta='1';
    RETURN respuesta;
	
    
ELSE
    SELECT a.Id_Solicitud ,a.DNI_Persona,a.Fecha_Solicitud,a.Usuario_Deseado,a.Contrasena_Deseada,a.Documento_Solicitud,a.Respuesta_Solicitud, a.Fecha_Aprobacion,a.Numero_Resolucion INTO REC_solicitud FROM tab_Solicitarmembresia a
    WHERE a.Id_Solicitud=id_person AND a.DNI_Persona=Pdocumento;
    IF REC_solicitud.Respuesta_Solicitud = 'APROBADO' THEN
        RAISE NOTICE 'El documento % ya cuenta con una solicitud aprobada con numero % aprobada el dia %',Pdocumento,id_person,REC_solicitud.Fecha_Aprobacion ;
        respuesta='2';
		RETURN respuesta;
    END IF;
    IF REC_solicitud.Respuesta_Solicitud = 'EN REVISION' THEN
        RAISE NOTICE 'El documento % ya cuenta con una solicitud en revision con numero % presentada  el dia %',Pdocumento,id_person,REC_solicitud.Fecha_Solicitud ;
        respuesta='3';
		RETURN respuesta;
    END IF;
    IF REC_solicitud.Respuesta_Solicitud = 'DENEGADA' THEN
        RAISE NOTICE 'El documento % ya cuenta con una solicitud denegada con numero % denegada el dia %',Pdocumento,id_person,REC_solicitud.Fecha_Aprobacion ;
        SELECT a.DNI_Persona ,a.Nombre_Persona,a.Segundo_Nombre_Persona,a.Apellido_Persona,a.Segundo_Apellido_Persona,a.Direccion_Persona,a.Telefono_Persona, a.correo_persona INTO REC_persona FROM tab_persona a WHERE a.DNI_Persona=Pdocumento;
        IF FOUND THEN
            IF REC_persona.Nombre_Persona <> nombre_1 THEN
                RAISE NOTICE 'EL NOMBRE PERSONA CON DOCUEMNTO  YA SE ENCUENTRA EN EL SISTEMA POR LO TANTO NO SE DEJA ACTUALIZAR';
            END IF;
            IF REC_persona.Segundo_Nombre_Persona <> nombre_2 THEN
                RAISE NOTICE 'EL NOMBRE 2 PERSONA CON DOCUEMNTO  YA SE ENCUENTRA EN EL SISTEMA POR LO TANTO NO SE DEJA ACTUALIZAR';
            END IF;

            IF REC_persona.Apellido_Persona <> APELLIDO_1 THEN
                RAISE NOTICE 'EL APELLIDO CON DOCUMENTO YA SE ENCUENTRA EN EL SISTEMA POR LO TANTO NO SE DEJA ACTUALIZAR';
                respuesta='5';
		        RETURN respuesta;
            END IF;
        
            IF REC_persona.Segundo_Apellido_Persona <> APELLIDO_2 THEN
                RAISE NOTICE 'EL APELLIDO 2 DE LA PERSONA EN LA BASE DE DATOS CON DOCUMENTO ES DIFERENTE POR LO QUE SE ACTUALIZARA';
                respuesta='5';
		        RETURN respuesta;
            END IF;

            IF REC_persona.Direccion_Persona <> direccion THEN
                RAISE NOTICE 'LA DIRECCION DE LA PERSONA EN LA BASE DE DATOS CON DOCUMENTO ES DIFERENTE POR LO QUE SE ACTUALIZARA';
                UPDATE tab_Persona SET Direccion_Persona=direccion
                WHERE DNI_Persona=Pdocumento;
            END IF;
            IF REC_persona.correo_Persona <> correo THEN
                RAISE NOTICE 'EL CORREO DE LA PERSONA EN LA SABE DE DATOS CON DOCUMENTO ES DIFERENTE POR LO QUE SE ACTUALIZARA';
                UPDATE tab_Persona SET correo_Persona = correo
                WHERE correo_persona = correo ;
            END IF;
            IF REC_persona.Telefono_Persona <> telefono THEN
                RAISE NOTICE 'EL TELEFONO DE LA PERSONA EN LA BASE DE DATOS CON DOCUMENTO ES DIFERENTE POR LO QUE SE ACTUALIZARA';
                UPDATE tab_Persona SET Telefono_Persona=telefono
                WHERE DNI_Persona=Pdocumento;
            END IF;

        
            
            

        END IF;
        INSERT INTO tab_Solicitarmembresia (id_solicitud,DNI_Persona,Fecha_Solicitud,Usuario_Deseado,ContraseNa_Deseada,Documento_Solicitud) VALUES (Pid_solicitud,Pdocumento,CURRENT_TIMESTAMP, nombre_usuario_deseado,contrasena_deseada,Archivo);
        RAISE NOTICE 'SE INSERTA SOLICITUD NUEVA';
		respuesta='4';
		RETURN respuesta;
    END IF;
    
END IF;
 
END;
$BODY$;

ALTER FUNCTION public.ingresar_solicitud_asociado(bigint, character varying, character varying, character varying, character varying, character varying, bigint, character varying, character varying, character varying, character varying)
    OWNER TO postgres;
