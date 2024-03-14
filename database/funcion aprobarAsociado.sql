--SELECT aprobarAsociado(3,12345,9999)

CREATE SEQUENCE secuencia_numero_cuenta
    INCREMENT 1
    MINVALUE 1
    START 1
    CACHE 10;

CREATE OR REPLACE FUNCTION aprobarAsociado (Pid_solicitud bigint , PsaldoInicial numeric, saldoAhorroVoluntario numeric,resolucion numeric,admin boolean) RETURNS VARCHAR AS
$$
DECLARE numerCuenta numeric;
DECLARE Rsolicitud RECORD;
DECLARE nuevoNumeroCuenta numeric;
DECLARE incrementableAbono BIGINT;




begin

    if admin  then
        SELECT a.id_solicitud, a.dni_persona, a.usuario_deseado, a.contrasena_deseada INTO Rsolicitud FROM tab_solicitarmembresia a    
        WHERE id_solicitud = Pid_solicitud;
        Rsolicitud.usuario_deseado := 'AD' || substring(Rsolicitud.usuario_deseado from 3);

        if FOUND then
            insert into tab_usuarios (usuario_ingreso,contrasena_ingreso,dni_usuario,rol_ingreso,estado_usuario)
            values (Rsolicitud.usuario_deseado,Rsolicitud.contrasena_deseada,Rsolicitud.dni_persona,1,TRUE);
            update tab_solicitarmembresia
            set usuario_deseado=Rsolicitud.usuario_deseado,respuesta_solicitud='APROBADA',fecha_aprobacion=CURRENT_TIMESTAMP,numero_resolucion=resolucion,detalle_solicitud='ADMIN APROBADO'
            where id_solicitud=Pid_solicitud;

            RETURN 'se ingreso correctamente al administrador ';
        
        else
            
            RETURN 'NO se encontro el numero de la solicitud proporcionad ';
        end if;

    end if;
	numerCuenta := to_char(current_date, 'YYYYMM')::bigint;

    SELECT a.id_solicitud, a.dni_persona, a.usuario_deseado, a.contrasena_deseada INTO Rsolicitud FROM tab_solicitarmembresia a    
   	WHERE id_solicitud = Pid_solicitud;
    if FOUND then
		SELECT COALESCE(MAX(numero_cuenta), 0) + 1 INTO nuevoNumeroCuenta FROM tab_cuenta WHERE numero_cuenta::text LIKE numerCuenta || '%' ;
      	nuevoNumeroCuenta := numerCuenta || LPAD(nextval('secuencia_numero_cuenta')::TEXT, 5, '0');

       
        insert into tab_usuarios (usuario_ingreso,contrasena_ingreso,dni_usuario,rol_ingreso,estado_usuario)
        values (Rsolicitud.usuario_deseado,Rsolicitud.contrasena_deseada,Rsolicitud.dni_persona,2,TRUE);
		insert into tab_asociado (dni_asociado,usuario_ingreso,fecha_ingreso_asociado,estado_del_asociado,detalle_estado)
        values (Rsolicitud.dni_persona,Rsolicitud.usuario_deseado,CURRENT_TIMESTAMP,TRUE,'Recien Aprobado');
        insert into tab_cuenta (numero_cuenta,saldo_cuenta,tasa_interes_cuenta,aporte_mensual,dni_asociado,estado_cuenta,detalles_estado_cuenta)
        values (nuevoNumeroCuenta,PsaldoInicial,0,saldoAhorroVoluntario,Rsolicitud.dni_persona,TRUE,'Aperturada recientemente');
        
        SELECT MAX(id_aporte) INTO incrementableAbono FROM tab_aportecuenta  ;
            IF incrementableAbono IS NULL THEN
                incrementableAbono=1; 
            ELSE 
                incrementableAbono=incrementableAbono+1;
            END IF;
        
        insert into tab_aportecuenta (id_aporte,numero_cuenta,monto_aporte,fecha_aporte)
        values (incrementableAbono,nuevoNumeroCuenta,PsaldoInicial,CURRENT_TIMESTAMP);
        
        
        update tab_solicitarmembresia
           set respuesta_solicitud='APROBADA',fecha_aprobacion=CURRENT_TIMESTAMP,numero_resolucion=resolucion
         where id_solicitud=Pid_solicitud;
		
        RETURN 'se ingreso correctamente el usuario';

      


    else
        RAISE NOTICE 'No se encontro el numero de la solicitud ';
        RETURN 'NO se encontro el numero de la solicitud proporcionad ';
    
    end if;
    
end; 
$$
LANGUAGE PLPGSQL