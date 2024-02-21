CREATE OR REPLACE FUNCTION buscar_solicitud_asociado (documento BIGINT) RETURNS BIGINT AS
$$
DECLARE numero_solicitud_entrante  BIGINT;
begin
  select id_solicitud into numero_solicitud_entrante from tab_solicitarmembresia
    where documento=dni_persona AND respuesta_solicitud ='EN REVISION';
    if numero_solicitud_entrante IS NULL THEN 
        RAISE NOTICE 'No se encontraron solicitudes';
		RETURN NULL;
    else
        RETURN numero_solicitud_entrante;
    end if;
end;
$$
LANGUAGE PLPGSQL

-- SELECT buscar_solicitud_asociado (987)