CREATE OR REPLACE FUNCTION registraraporte(
    dni bigint,
    montoAporte numeric,
    tipoPago VARCHAR,
    pagadoA VARCHAR,
    fechaAporte TIMESTAMP,
    archivo VARCHAR,
    detalles_aporte VARCHAR,
    usuario VARCHAR
) 
RETURNS TABLE (codigo_estado integer, mensaje varchar) AS
$$
DECLARE 
    numeroCuenta bigint;
    estadoCuenta boolean;
    mensajeEstado varchar;
    idAporte bigint;
BEGIN
    -- Check if the account exists and retrieve its information
    SELECT numero_cuenta, estado_cuenta INTO numeroCuenta, estadoCuenta FROM tab_cuenta WHERE dni_asociado = dni;

    IF FOUND THEN
        -- Check if the account is active
        IF estadoCuenta = false THEN
            mensajeEstado := 'La cuenta se encuentra suspendida en estos momentos';
            RETURN QUERY SELECT 2, mensajeEstado;
        ELSE
            -- Generate a new id for the contribution
            SELECT COALESCE(MAX(id_aporte), 0) + 1 INTO idAporte FROM tab_aportecuenta;

            -- Insert the contribution record
            IF tipoPago = 'Efectivo' THEN
                INSERT INTO tab_aportecuenta (id_aporte,numero_cuenta, monto_aporte, fecha_aporte, usuario_inserta, detalles_aporte, modo_aporte, pagado_a, comprobante_aporte)
                VALUES (idAporte,numeroCuenta, montoAporte, fechaAporte, usuario, detalles_aporte, tipoPago, pagadoA, archivo);
            ELSE
                INSERT INTO tab_aportecuenta (id_aporte,numero_cuenta, monto_aporte, fecha_aporte, usuario_inserta, detalles_aporte, modo_aporte, pagado_a, comprobante_aporte)
                VALUES (idAporte,numeroCuenta, montoAporte, fechaAporte, usuario, detalles_aporte, tipoPago, tipoPago, archivo);
            END IF;

            mensajeEstado := 'Se registra correctamente el abono';
            RETURN QUERY SELECT 3, mensajeEstado;
        END IF;
    ELSE 
        mensajeEstado := 'El DNI proporcionado no cuenta con una cuenta registrada en el sistema';
        RETURN QUERY SELECT 1, mensajeEstado;
    END IF;
END;
$$
LANGUAGE PLPGSQL;

-- Example call to the function
SELECT * FROM registraraporte(
    1234567890::bigint,         -- dni
    9999.123::numeric,          -- montoAporte
    'nequi'::varchar,        -- tipoPago
    'pagado'::varchar,          -- pagadoA
    CURRENT_TIMESTAMP AT TIME ZONE 'UTC', -- fechaAporte sin zona horaria
    'archivo'::varchar,         -- archivo
    'usuario'::varchar          -- usuario
);