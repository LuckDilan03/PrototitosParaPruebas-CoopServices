CREATE OR REPLACE FUNCTION suspenderManualmente(idSolicitud bigint) RETURNS boolean AS
$$
DECLARE DocumentoSolicitud bigint;
begin
  select dni_persona into DocumentoSolicitud from tab_solicitarmembresia where id_solicitud=idSolicitud ;
  IF FOUND THEN
        update tab_cuenta
           set estado_cuenta=false,detalles_estado_cuenta='Cuenta Suspendida Manual Mente'
         where dni_asociado=DocumentoSolicitud;

         update tab_usuarios
           set estado_usuario=false,Detalle_Estado='Usuario Suspendido Manual Mente'
         where dni_usuario=DocumentoSolicitud;

         update tab_asociado
           set estado_del_asociado=false,detalle_estado='Asociado Suspendido Manual Mente'
         where dni_asociado=DocumentoSolicitud;

        return true;
  END IF;
        return false;
end;
$$
LANGUAGE PLPGSQL