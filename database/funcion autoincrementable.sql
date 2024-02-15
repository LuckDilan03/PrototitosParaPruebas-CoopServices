CREATE OR REPLACE FUNCTION autoincrementable (atributo VARCHAR ,tabla VARCHAR ) RETURNS BIGINT AS
$$
DECLARE id_solicitud BIGINT;
begin
  SELECT MAX(atributo) INTO id_solicitud FROM tabla WHERE ;
    IF id_solicitud IS NULL THEN
        id_solicitud=1;
        RETURN id_solicitud;
    ELSE 
        id_solicitud=id_solicitud+1;
        RETURN id_solicitud;
    END IF;
end;
$$
LANGUAGE plpgsql