CREATE OR REPLACE FUNCTION buscar_fiador (DNi_fiador BIGINT, Monto_Ganancia_Mensual DECIMAL, Monto_Gastos_Mensual DECIMAL) RETURNS VARCHAR AS
$$
DECLARE Fiador_existe VARCHAR;
BEGIN
SELECT a.DNI_Persona,a.Nombre_Persona, a.Segundo_Nombre_Persona, a.Apellido_Persona, a.Segundo_Apellido_Persona,a.Direccion_Persona, a.Telefono_Persona, a.correo_Persona  INTO Fiador_existe FROM tab_persona a
WHERE DNI_Persona = DNi_fiador; 
IF  Fiador_existe IS NULL THEN 
	RAISE NOTICE 'NO EXISTE';
	RETURN 'NO EXISTE FIADOR';
	ELSE 
	RETURN Fiador_existe;
	
END IF;

END; 
$$ 
LANGUAGE PLPGSQL;
 




