-- View: public.vistaaprobado

-- DROP VIEW public.vistaaprobado;

CREATE OR REPLACE VIEW public.vistaaprobado
 AS
 SELECT a.dni_persona,
    a.nombre_persona,
    a.segundo_nombre_persona,
    a.apellido_persona,
    a.segundo_apellido_persona,
    a.direccion_persona,
    a.telefono_persona,
    a.correo_persona,
    b.id_solicitud,
    b.fecha_solicitud,
    b.usuario_deseado,
    b.respuesta_solicitud,
    d.numero_cuenta,
    d.saldo_cuenta,
    d.aporte_mensual,
    d.dni_asociado,
    d.estado_cuenta,
    e.monto_aporte
   FROM tab_persona a
     JOIN tab_solicitarmembresia b ON a.dni_persona = b.dni_persona
     LEFT JOIN tab_cuenta d ON a.dni_persona = d.dni_asociado
     LEFT JOIN tab_aportecuenta e ON d.numero_cuenta = e.numero_cuenta
  WHERE b.respuesta_solicitud::text = ANY (ARRAY['APROBADA'::character varying, 'EN REVISION'::character varying]::text[]);

ALTER TABLE public.vistaaprobado
    OWNER TO postgres;