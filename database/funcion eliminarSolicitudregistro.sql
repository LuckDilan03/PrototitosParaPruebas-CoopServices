CREATE OR REPLACE FUNCTION eliminarSolicitud(id BIGINT) RETURNS BOOLEAN AS 
$$
DECLARE dni BIGINT;
begin
    select dni_persona into dni from tab_solicitarmembresia
        where id_solicitud=id;
        if found then
            delete  from tab_solicitarmembresia
            where id_solicitud=id;
                if found then
                    delete  from tab_persona
                    where dni_persona=dni;
                    if not found then
                        return false;
                        end if;
                    return true;
                end if;
                return false;
        end if;
        return false;
end;
$$
LANGUAGE PLPGSQL