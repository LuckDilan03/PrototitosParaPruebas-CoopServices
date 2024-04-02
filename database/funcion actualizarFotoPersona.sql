CREATE OR REPLACE FUNCTION actualizaFotoPersona(dni bigint ,foto varchar) RETURNS BOOLEAN AS
$$
begin
  UPDATE tab_persona SET foto_persona=foto WHERE dni_persona=dni;
  if FOUND THEN
    RETURN true;
  ELSE
    RETURN false;
  END IF;
end;
$$
LANGUAGE plpgsql;