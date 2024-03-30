CREATE OR REPLACE FUNCTION actuliazarContra(dni bigint,usuario varchar, password varchar) RETURNS boolean AS
$$
begin
    update tab_usuarios
       set contrasena_ingreso=password,detalle_estado='cambio de contra'
     where usuario_ingreso=usuario AND dni_usuario=dni AND estado_usuario;
     IF FOUND THEN
        RETURN true;
     end if;
        RETURN false;
  
end;
$$
LANGUAGE PLPGSQL