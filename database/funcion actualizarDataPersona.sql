CREATE OR REPLACE FUNCTION actualizaDataPersona(dni bigint,direccion varchar,telefono bigint) RETURNS boolean AS
$$
begin
    update tab_persona
       set direccion_persona=direccion,telefono_persona=telefono
     where dni_persona=dni;
     if FOUND then
       return true;
     else
       return false;
     end if;
  
end;
$$
LANGUAGE plpgsql;