CREATE OR REPLACE FUNCTION obtenerdatospersona(dni bigint) 
RETURNS TABLE(
    
    nombre_persona VARCHAR(100),
    segundo_nombre_persona VARCHAR(100),
    apellido_persona VARCHAR(100),
    segundo_apellido_persona VARCHAR(100),
    direccion_persona VARCHAR(100),
    telefono_persona bigint,
    correo_persona VARCHAR(100),
    foto_persona VARCHAR(100)
)
AS
$$
begin
    RETURN QUERY EXECUTE 
    'SELECT nombre_persona,
            segundo_nombre_persona,
            apellido_persona,
            segundo_apellido_persona,
            direccion_persona,
            telefono_persona,
            correo_persona,
            foto_persona
            FROM tab_persona
            WHERE dni_persona=$1'
            USING dni;

  
end;
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION obtenerdatoscuenta(dni bigint, rol integer) 
RETURNS TABLE(
    numero_cuenta bigint,
    saldo_cuenta numeric,
    aporte_mensual numeric,
    estado_cuenta BOOLEAN,
    detalle_estado_cuenta VARCHAR(100)
)
AS $$
DECLARE 
    tabdata RECORD; -- Definimos el tipo de registro
    total_cuentas bigint;
BEGIN
    IF rol = 1 THEN
        SELECT COUNT(*) INTO total_cuentas FROM tab_cuenta WHERE tab_cuenta.estado_cuenta=true;
        SELECT 
            total_cuentas AS numero_cuenta,
            SUM(tab_cuenta.saldo_cuenta) AS saldo_cuenta,
            AVG(tab_cuenta.aporte_mensual) AS aporte_mensual,
            TRUE AS estado_cuenta,
            'estado admin' AS detalle_estado_cuenta
        INTO 
            tabdata
        FROM 
            tab_cuenta;
        RETURN QUERY SELECT * FROM (VALUES (tabdata.numero_cuenta::bigint, tabdata.saldo_cuenta::numeric, tabdata.aporte_mensual::numeric, tabdata.estado_cuenta::boolean, tabdata.detalle_estado_cuenta::varchar)) AS t(numero_cuenta, saldo_cuenta, aporte_mensual, estado_cuenta, detalle_estado_cuenta);
    ELSE
        RETURN QUERY EXECUTE 
        'SELECT 
            numero_cuenta,
            saldo_cuenta,
            aporte_mensual,
            estado_cuenta,
            detalles_estado_cuenta 
         FROM 
            tab_cuenta
         WHERE 
            dni_asociado = $1'
        USING dni;
    END IF;

    
END;
$$ 
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION obtenerdatosaportescuenta (dni bigint ,rol integer)
RETURNS TABLE (id_aporte bigint, monto_aporte numeric, fecha_aporte date,detalles_aporte varchar) AS
$$
BEGIN
	if rol=2 then
		RETURN QUERY SELECT
			a.id_aporte,
			a.monto_aporte,
			a.fecha_aporte::date as fecha_aporte,
			a.detalles_aporte
		FROM
			tab_cuenta c
			JOIN tab_aportecuenta a ON c.numero_cuenta = a.numero_cuenta AND c.dni_asociado = dni
		WHERE
			a.estado_aporte = true;
	else
		
		RETURN QUERY SELECT
			a.id_aporte,
			a.monto_aporte,
			a.fecha_aporte::date as fecha_aporte,
			a.detalles_aporte
		FROM tab_aportecuenta a
		WHERE
			a.estado_aporte = true;


		end if;
    
END;
$$
LANGUAGE plpgsql;
--select obtenerdatospersona(1234567890)
--select obtenerdatoscuenta(1234567890,1)
--select obtenerdatosaportescuenta(1234567890,1)