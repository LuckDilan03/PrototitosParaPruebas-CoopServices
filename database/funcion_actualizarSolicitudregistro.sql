CREATE OR REPLACE FUNCTION actualizarSolicitud(
	idSolicitud bigint,
	pdocumento bigint,
    nombre_1 character varying,
	apellido_1 character varying,
	direccion character varying,
	telefono bigint,
	correo character varying,
	nombre_2 character varying DEFAULT NULL,
	apellido_2 character varying DEFAULT NULL,
	usuario character varying DEFAULT NULL)
    RETURNS character varying AS 
	
$$
DECLARE recPersona RECORD ;
DECLARE DocumentoSolicitud BIGINT;
DECLARE mensaje TEXT;
begin
	select dni_persona into DocumentoSolicitud from tab_solicitarmembresia where id_solicitud=idSolicitud;
	if FOUND THEN
		
		select dni_persona,nombre_persona,segundo_nombre_persona,apellido_persona,segundo_apellido_persona,direccion_persona,telefono_persona,correo_persona into recPersona from tab_persona
		where dni_persona=DocumentoSolicitud;
		mensaje='Se actualizaran los siguientes datos : ';
		if recPersona.dni_persona<>pdocumento then
		  mensaje:=mensaje||'El Documento De La Persona, ';
		end if;
		
		if recPersona.nombre_persona<>nombre_1 then
		  mensaje:=mensaje||'El Primer Nombre De La Persona, ';
		end if;

		if recPersona.segundo_nombre_persona<>nombre_2 then
		  mensaje:=mensaje||'El Segundo Nombre De La Persona, ';
		end if;

		if recPersona.apellido_persona<>apellido_1 then
		  mensaje:=mensaje||'El Primer Apellido De La Persona, ';
		end if;
		
		if recPersona.segundo_apellido_persona<>apellido_2 then
		  mensaje:=mensaje||'El Segundo Apellido De La Persona, ';
		end if;
		
		if recPersona.direccion_persona<>direccion then
		  mensaje:=mensaje||'La Direccion De La Persona, ';
		end if;

		if recPersona.telefono_persona<>telefono then
		  mensaje:=mensaje||'El Telefono De La Persona, ';
		end if;

		if recPersona.correo_persona<>correo then
		  mensaje:=mensaje||'El Correo De La Persona, ';
		end if;
		
		
		
		
		update tab_persona
		set dni_persona=pdocumento,nombre_persona=nombre_1,segundo_nombre_persona=nombre_2,apellido_persona=apellido_1,segundo_apellido_persona=apellido_2,direccion_persona=direccion,telefono_persona=telefono,correo_persona=correo
		where dni_persona=DocumentoSolicitud;
		
		

		update tab_solicitarmembresia
		   set detalle_solicitud=mensaje
		 where id_solicitud=idSolicitud;

		 RETURN mensaje;
	end if;
	mensaje ='Ocurrio un error a la hora de encontrar la solicitud deseada';
	RETURN mensaje;
	
	  
end;
$$
LANGUAGE PLPGSQL
