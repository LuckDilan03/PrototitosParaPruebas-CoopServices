--SELECT aprobarAsociado(3,12345,9999)

CREATE SEQUENCE secuencia_numero_cuenta
    INCREMENT 1
    MINVALUE 1
    START 1
    CACHE 10;

CREATE OR REPLACE FUNCTION aprobarAsociado (Pid_solicitud bigint , PsaldoInicial numeric, saldoAhorroVoluntario numeric) RETURNS VARCHAR AS
$$
DECLARE numerCuenta numeric;
DECLARE Rsolicitud RECORD;
DECLARE nuevoNumeroCuenta numeric;


begin
	numerCuenta := to_char(current_date, 'YYYYMM')::bigint;

    SELECT a.id_solicitud, a.dni_persona, a.usuario_deseado, a.contrasena_deseada INTO Rsolicitud FROM tab_solicitarmembresia a    
   	WHERE id_solicitud = Pid_solicitud;
    if FOUND then
		SELECT COALESCE(MAX(numero_cuenta), 0) + 1 INTO nuevoNumeroCuenta FROM tab_cuenta WHERE numero_cuenta::text LIKE numerCuenta || '%' ;
      	nuevoNumeroCuenta := numerCuenta || LPAD(nextval('secuencia_numero_cuenta')::TEXT, 5, '0');

       
        insert into tab_usuarios (usuario_ingreso,contrasena_ingreso,dni_usuario,rol_ingreso)
        values (Rsolicitud.usuario_deseado,Rsolicitud.contrasena_deseada,Rsolicitud.dni_persona,2);
		insert into tab_asociado (dni_asociado,usuario_ingreso,fecha_ingreso_asociado,estado_del_asociado,detalle_estado)
        values (Rsolicitud.dni_persona,Rsolicitud.usuario_deseado,CURRENT_TIMESTAMP,TRUE,'Recien Aprobado');
        insert into tab_cuenta (numero_cuenta,saldo_cuenta,tasa_interes_cuenta,aporte_mensual,dni_asociado,estado_cuenta,detalles_estado_cuenta)
        values (nuevoNumeroCuenta,PsaldoInicial,0,saldoAhorroVoluntario,Rsolicitud.dni_persona,TRUE,'Aperturada recientemente');
        update tab_solicitarmembresia
           set respuesta_solicitud='APROBADA'
         where id_solicitud=Pid_solicitud
		
        RETURN 'se ingreso correctamente el usuario';

      


    else
        RAISE NOTICE 'No se encontro el numero de la solicitud ';
        RETURN 'NO se encontro el numero de la solicitud proporcionad ';
    
    end if;
    
end; 
$$
LANGUAGE PLPGSQL