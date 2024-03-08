CREATE OR REPLACE FUNCTION denegarSolicitud(Pid_solicitud NUMERIC, motivo VARCHAR , resolucion NUMERIC) RETURNS BOOLEAN AS
$$
begin
    update tab_solicitarmembresia
           set respuesta_solicitud='DENEGADA',fecha_aprobacion=CURRENT_TIMESTAMP,numero_resolucion=resolucion
         where id_solicitud=Pid_solicitud;
		
        RETURN TRUE;
    If not FOUND then
        RETURN FALSE;
    end if;

end;

$$
LANGUAGE PLPGSQL

--SELECT * FROM denegarSolicitud(13,'cualquiera',12)