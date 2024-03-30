CREATE OR REPLACE FUNCTION habilitarManualmente(idSolicitud bigint) RETURNS boolean AS
$$
DECLARE DocumentoSolicitud bigint;
begin
  select dni_persona into DocumentoSolicitud from tab_solicitarmembresia where id_solicitud=idSolicitud 
  IF FOUND THEN
        update tab_cuenta
           set estado_cuenta=true,detalles_estado_cuenta='Cuenta Aprobado Manual Mente'
         where dni_asociado=DocumentoSolicitud;

         update tab_usuarios
           set estado_usuario=true,Detalle_Estado='Usuario Aprobado Manual Mente'
         where dni_usuario=DocumentoSolicitud;

         update tab_asociado
           set estado_del_asociado=true,detalle_estado='Asociado Aprobado Manual Mente'
         where dni_asociado=DocumentoSolicitud;

        return true;
  END IF;
        return false;
end;
$$
LANGUAGE PLPGSQL