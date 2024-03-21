DROP TABLE IF EXISTS tab_borrados;
DROP TABLE IF EXISTS tab_FiadoresXSolicitud;
DROP TABLE IF EXISTS tab_planpago;
DROP TABLE IF EXISTS tab_abonoprestamo;
DROP TABLE IF EXISTS tab_desembolsoprestamo;
DROP TABLE IF EXISTS tab_prestamo;
DROP TABLE IF EXISTS tab_Junta_Directiva;
DROP TABLE IF EXISTS tab_SolicitudPrestamo;
DROP TABLE IF EXISTS tab_Requisitos;
DROP TABLE IF EXISTS tab_Tipo_de_prestamos;
DROP TABLE IF EXISTS tab_Fiadores;
DROP TABLE IF EXISTS tab_RetiroCuenta;
DROP TABLE IF EXISTS tab_AporteCuenta;
DROP TABLE IF EXISTS tab_Cuenta;
DROP TABLE IF EXISTS tab_Asociado;
DROP TABLE IF EXISTS tab_usuarios;
DROP TABLE IF EXISTS tab_roles;
DROP TABLE if EXISTS tab_Auditor;
DROP TABLE IF EXISTS tab_DesembolsoPrestamo;
DROP TABLE IF EXISTS tab_planpago;
DROP TABLE IF EXISTS tab_cartera;
DROP TABLE IF EXISTS tab_transaccion;
DROP TABLE IF EXISTS tab_Empleado;
DROP TABLE IF EXISTS tab_SolicitarMembresia;
DROP TABLE IF EXISTS tab_directivo;
DROP TABLE IF EXISTS tab_Persona;

--tabla de municiio departamentepo

--Tabla Persona 
CREATE TABLE tab_Persona 
( 
    DNI_Persona             		    BIGINT		    NOT NULL, 	-- Cédula de la Persona(Llave Primaria) 
    Nombre_Persona             		    VARCHAR     	NOT NULL, 	-- Nombre de la Persona
    Segundo_Nombre_Persona     		    VARCHAR     		, 	-- Segundo Nombre de la Persona          
    Apellido_Persona            	    VARCHAR     	NOT NULL, 	-- Apellido de la Persona 
    Segundo_Apellido_Persona         	VARCHAR			, 	-- Segundo Apellido de la Persona 
    Direccion_Persona             	    VARCHAR     	NOT NULL, 	-- Dirección de la Persona 
    Telefono_Persona             	    BIGINT     	    NOT NULL, 	-- Teléfono de la Persona
    Correo_Persona			            VARCHAR		    NOT NULL, 	--Correo Electronico de la Persona}	
	Documento_Persona					VARCHAR			NOT NULL,
    Usuario_Inserta      		        VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			        TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		        VARCHAR, 
    Fecha_Update      			        TIMESTAMP WITHOUT TIME ZONE, 
PRIMARY KEY (DNI_Persona) 
); 

--tabla roles de usuarios
CREATE TABLE tab_Roles
(
    id_Rol              		INTEGER 	    NOT NULL,
    Nombre_Rol          		VARCHAR 	    NOT NULL,
    Labores_Rol         		VARCHAR 	    NOT NULL,
    Permisos_Rol        		VARCHAR 	    NOT NULL,
    Usuario_Inserta      		VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		VARCHAR, 
    Fecha_Update      			TIMESTAMP WITHOUT TIME ZONE,

    PRIMARY KEY(id_Rol) 

);



--tabla ingreso

CREATE TABLE tab_Usuarios

(   
    Usuario_ingreso     		VARCHAR 	    NOT NULL,-- USUARIO CON EL QUE INGRESA EL USUARIO AL SISTEMA
    Contrasena_Ingreso  		VARCHAR 	    NOT NULL,--CONTRASEÑA DE ACCESO AL SISTEMA
    DNI_Usuario					BIGINT		    NOT NULL,
    Rol_Ingreso          		INTEGER 	    NOT NULL,--ROL QUE DESEMPEÑA CADA USUARIO AL INGRESAR AL SISTEMA
	Estado_Usuario              BOOLEAN         NOT NULL DEFAULT FALSE,
    Detalle_Estado              VARCHAR         ,
    Usuario_Inserta      		VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		VARCHAR, 
    Fecha_Update      			TIMESTAMP WITHOUT TIME ZONE,

 PRIMARY KEY (Usuario_ingreso),
 FOREIGN KEY (Rol_Ingreso) REFERENCES tab_roles(id_Rol),
 FOREIGN KEY (DNI_Usuario) REFERENCES tab_Persona(DNI_Persona)

);

--Tabla de Empleado
CREATE TABLE tab_Empleado 
( 
    DNI_Empleado             		    BIGINT     	    NOT NULL, 			-- Cédula del Empleado (Llave Primaria) 
    Cargo_Empleado                	    VARCHAR     	NOT NULL, 			-- Cargo del Empleado 
    Salario_Empleado                	DECIMAL     	NOT NULL, 			-- Salario del Empleado 
    Estado_Empleado          		    BOOLEAN   	    NOT NULL DEFAULT TRUE,		-- estado del empleado true activo trabajando False inactivo de trabajo
    Detalle_Estado          		    VARCHAR,    					-- Es una descripcion del estado del empleado o las razones por las que esta suspendido 
    Directivo                           BOOLEAN         NOT NULL /*DEFAULT FALSE*/, -- TRUE: eS DIRECTIVO / FALSE: NO ES DIRECTIVO        
    Usuario_Inserta      		        VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			        TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		        VARCHAR, 
    Fecha_Update      			        TIMESTAMP WITHOUT TIME ZONE, 
PRIMARY KEY (DNI_Empleado), 
FOREIGN KEY (DNI_Empleado) REFERENCES tab_Persona(DNI_Persona)    
); 

--Tabla de Asociado 
CREATE TABLE tab_Asociado 
( 
    DNI_Asociado             		BIGINT     	    NOT NULL, 		-- Código del Asociado (Llave Primaria)
    Usuario_ingreso                 VARCHAR,
    Fecha_Ingreso_Asociado      	TIMESTAMP WITHOUT TIME ZONE   NOT NULL, -- Fecha de Ingreso del Asociado 
    Estado_del_asociado     		BOOLEAN     	NOT NULL DEFAULT TRUE, 	-- estado del asociado dentro de la cooperativa para lo cual de estar al dia en los aportes obligatorios de almenos una cuenta 
    Detalle_Estado          		VARCHAR,    				-- Es una descripcion del estado del asociado o las razones por las que esta suspendido  
    Usuario_Inserta      		    VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta     	 		    TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		    VARCHAR, 
    Fecha_Update      			    TIMESTAMP WITHOUT TIME ZONE, 
PRIMARY KEY (DNI_Asociado), 
FOREIGN KEY (DNI_Asociado) REFERENCES tab_Persona(DNI_Persona),
FOREIGN KEY (Usuario_ingreso) REFERENCES tab_usuarios(Usuario_ingreso)
); 

--Tabla Cuenta 
CREATE TABLE tab_Cuenta 
( 
    Numero_Cuenta                  	BIGINT     	    NOT NULL, 		                -- Código o Número de la Cuenta (Llave Primaria) 
    Saldo_Cuenta                  	DECIMAL     	NOT NULL, 		            -- Saldo de la Cuenta 
    Tasa_Interes_Cuenta         	DECIMAL     	NOT NULL, 		            -- Tasa de Interés de la Cuenta 
    Aporte_Mensual              	DECIMAL     	NOT NULL, 		            -- valor del aporte obligatorio de esa cuenta 
    DNI_Asociado                 	BIGINT     	    NOT NULL ,		                -- id del titular de la cuenta que debe ser un asociado
    Estado_Cuenta               	BOOLEAN     	NOT NULL DEFAULT TRUE,	    -- estado de la cuenta si esta activa o no 
    Detalles_Estado_Cuenta      	VARCHAR,     
    Usuario_Inserta      		    VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			    TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		    VARCHAR, 
    Fecha_Update      			    TIMESTAMP WITHOUT TIME ZONE, 
PRIMARY KEY (Numero_Cuenta),
FOREIGN KEY (DNI_Asociado) REFERENCES tab_Asociado(DNI_Asociado)
); 


--tabla de tipo de transaccion donde se guardaran los tipos de transaccion que se pueden realizar y sus requisitos ejemplo retiro de ahorro para lo cual se debe contar con un saldo en la cuenta de la que se desea retirar
-- Crear una Tabla por cada transaccion (
-- Aporte a cuenta(aporte voluntario mensual) OK
-- Retiro Cuenta(Retirar dinero de una cuenta) OK
-- Abono al Saldo de un Prestamo(Pagar la cuota de un prestamo) OK
-- Desembolso de prestamo (Generar un nuevo prestamo a un asociado) OK
-- 

CREATE TABLE tab_AporteCuenta (
    Id_Aporte                       BIGINT          NOT NULL, 
    Numero_Cuenta                   BIGINT          NOT NULL, 
    Monto_Aporte                    DECIMAL         NOT NULL,
    Fecha_Aporte                    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    Usuario_Inserta      		    VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			    TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		    VARCHAR, 
    Fecha_Update      			    TIMESTAMP WITHOUT TIME ZONE, 

PRIMARY KEY (Numero_Cuenta,Id_Aporte),
FOREIGN KEY (Numero_Cuenta) REFERENCES tab_Cuenta(Numero_Cuenta)
);

CREATE TABLE tab_RetiroCuenta (
    Id_Retiro                       BIGINT          NOT NULL, 
    Numero_Cuenta                   BIGINT          NOT NULL, 
    Monto_Retirado                  DECIMAL         NOT NULL,
    Fecha_Retiro                    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    Usuario_Inserta      		    VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			    TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		    VARCHAR, 
    Fecha_Update      			    TIMESTAMP WITHOUT TIME ZONE, 

PRIMARY KEY (Id_Retiro),
FOREIGN KEY (Numero_Cuenta) REFERENCES tab_Cuenta(Numero_Cuenta)

);

 --Tabla Junta Directiva 


CREATE TABLE tab_Junta_Directiva 

( 

    Id_Junta_Directiva       		        BIGINT     	        NOT NULL, 				-- Código de la Junta directiva (Llave Primaria compuesta) 
    DNI_Directivo         		            BIGINT     	        NOT NULL, 				-- Código del Asociado (Llave primaria compuesta)  
    Fecha_Inicio_Junta_Directiva  	        TIMESTAMP WITHOUT TIME ZONE NOT NULL        NOT NULL, 	-- Fecha de Inicio del de la Junta Directiva 
    Fecha_Fin_Junta_Directiva  		        TIMESTAMP WITHOUT TIME ZONE NOT NULL        NOT NULL, 	-- Fecha de Fin del de la Junta Directiva 
    Usuario_Inserta      		            VARCHAR     	    NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			            TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		            VARCHAR, 
    Fecha_Update      			            TIMESTAMP WITHOUT TIME ZONE, 

PRIMARY KEY (Id_Junta_Directiva),
FOREIGN KEY (DNI_Directivo) REFERENCES tab_Empleado(DNI_Empleado)
); 

 
--Tabla para Solicitar Membresia 

CREATE TABLE tab_SolicitarMembresia 
( 
    Id_Solicitud         		BIGINT     	    NOT NULL, 	-- Código de la Solicitud (Llave Primaria) 
    DNI_Persona          		BIGINT     	    NOT NULL, 	-- Cédula de la Persona (Llave Foránea) 
    Fecha_Solicitud        		TIMESTAMP WITHOUT TIME ZONE NOT NULL, -- Fecha de la Solicitud  
	Usuario_Deseado				VARCHAR		    NOT NULL,
	Contrasena_Deseada			VARCHAR		    NOT NULL,
    Documento_Solicitud			VARCHAR			NOT NULL,
    Respuesta_Solicitud			VARCHAR   	    NOT NULL	 DEFAULT 'EN REVISION',
    Fecha_Aprobacion			DATE,                   	-- Fecha en la que se aprobo la solicitud
	Numero_Resolucion			BIGINT,
    Detalle_Solicitud           VARCHAR,
    Usuario_Inserta      		VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		VARCHAR, 
    Fecha_Update      			TIMESTAMP WITHOUT TIME ZONE, 

PRIMARY KEY (DNI_Persona,Id_Solicitud),  
FOREIGN KEY (DNI_Persona) REFERENCES tab_Persona(DNI_Persona)   
); 



--tabla para los tipos de prestamos que genere la cooperativa como libre inversion, estudio , libranza
CREATE TABLE tab_Tipo_de_prestamos 
(
    Id_Tipo_Prestamo         		        INTEGER 	    NOT NULL,	--es el codigo de tipo de prestamo (llave primaria)
    Tipo_Prestamo            		        VARCHAR 	    NOT NULL,	--es el nombre o la descripcion del tipo de prestamo
    Descripcion_Tipo_Prestamo   	        VARCHAR 	    NOT NULL,	-- una descripcion de los casos donde aplica ese tipo de prestamo 
    Intereses_Base_Tipo_De_Prestamo 	    DECIMAL 	    NOT NULL,	-- el valor base para ese tipo de prestamo
    Usuario_Inserta      		            VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			            TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		            VARCHAR, 
    Fecha_Update      			            TIMESTAMP WITHOUT TIME ZONE, 


PRIMARY KEY (Id_Tipo_Prestamo)	
);

-- Tabla de Requisitos 
CREATE TABLE tab_Requisitos 
( 
   Id_Tipo_Prestamo          		INTEGER     	NOT NULL, 	-- el id de tipo de prestamo que actura como llave primaria compuesta para que un mismo tipo de prestamo pueda tener diferentes requisitos (llave primaria compuesta)
   Id_Requisitos     			    INTEGER     	NOT NULL, 	-- Código de Los requisitos (Llave Primaria compuesta) 
   Monto_Minimo_Requisitos       	DECIMAL     	NOT NULL, 	-- Monto Minimo del requisito 
   Monto_Maximo_Requisitos      	DECIMAL    	    NOT NULL, 	-- Monto Maximo del requisito 
   Interes_Pres_Requisitos    		DECIMAL     	NOT NULL, 	-- Intereses del prestamo nunca por debajo de la los intereses base establecidos en el tipo de prestamo 
   Cantidad_Fiadores_Requisitos    	INTEGER     	NOT NULL, 	-- Cantidad de Fiadores de la solicitud del Prestamo para los requisitos 
   Maximo_Meses_Requisitos    		INTEGER     	NOT NULL, 	-- Maximo de meses de Financiacion de la solicitud del Prestamo para los requisitos 
   Usuario_Inserta      		    VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
   Fecha_Inserta      			    TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
   Usuario_Update      			    VARCHAR, 
   Fecha_Update      			    TIMESTAMP WITHOUT TIME ZONE, 
PRIMARY KEY (Id_tipo_prestamo,Id_Requisitos),
FOREIGN KEY (Id_tipo_prestamo) REFERENCES tab_Tipo_de_prestamos (Id_tipo_prestamo)
); 

-- tab fiadores que es donde se deben registrar las personas que serviran como soporte del prestamo 


CREATE TABLE tab_Fiadores 
(
    Dni_Fiador       			    BIGINT 		    NOT NULL, 	-- DNI de la persona que solicita actuar  como fiadoor (llave  foranea)
    Monto_Ganancia_Mensual     		DECIMAL 	    NOT NULL, 	-- un aproximado de sus ganancias mensuales
    Monto_Gastos_Mensual       		DECIMAL 	    NOT NULL,	-- un aproximado de sus egresos mensuales
	Usuario_Inserta      		    VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			    TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		    VARCHAR, 
    Fecha_Update      			    TIMESTAMP WITHOUT TIME ZONE, 

PRIMARY KEY (Dni_Fiador),
FOREIGN KEY (Dni_fiador) REFERENCES tab_Persona(DNI_Persona)
);
-- Tabla de Solicitud de Prestamo 

CREATE TABLE tab_SolicitudPrestamo 
( 
   Id_Solicitud_Prestamo     		        BIGINT     	    NOT NULL, -- Código de la Solicitud de Prestamo (Llave Primaria)
   DNI_responsable_prestamo 		        BIGINT     	    NOT NULL, -- Código del Asociado (Llave Foranea)
   DNI_fiador_prestamo      		        BIGINT, 		  -- DNI de la persona fiadora (Llave foranea)
   DNI_Coofiador_prestamo  			        BIGINT,                   --DNIK de la persona fiadora (llave foranea)
   Id_Cuenta_Titular_Prestamo         	    BIGINT     	    NOT NULL, -- Número de la Cuenta de Respaldo del Prestamo (Llave Primaria Compuesta(F)) 
   Monto_Solicita_Prestamo    		        DECIMAL     	NOT NULL, -- Monto de la Solicitud de Prestamo 
   Ingreso_Solicita_Prestamo    	        DECIMAL     	NOT NULL, -- Ingresos de la Solicitud de Prestamo 
   Tipo_Prestamo                	        INTEGER     	NOT NULL,
   Requisitos_Solicitud_Prestamo    	    INTEGER     	NOT NULL, -- Requisitos de la Solicitud de Prestamo (Llave Foranea) 
   Usuario_Inserta      		            VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
   Fecha_Inserta      			            TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,   
   Usuario_Update      			            VARCHAR, 
   Fecha_Update      			            TIMESTAMP WITHOUT TIME ZONE, 
 
PRIMARY KEY (Id_Solicitud_Prestamo), 
FOREIGN KEY (DNI_responsable_prestamo)       	REFERENCES 	tab_Asociado(DNI_Asociado),
FOREIGN KEY (DNI_fiador_prestamo)               REFERENCES  	tab_Fiadores(DNI_fiador),
FOREIGN KEY (DNI_Coofiador_prestamo)            REFERENCES  	tab_Fiadores(DNI_fiador),
FOREIGN KEY (Id_Cuenta_Titular_Prestamo)        REFERENCES  tab_Cuenta(Numero_Cuenta),
FOREIGN KEY (Tipo_Prestamo,Requisitos_Solicitud_Prestamo)          REFERENCES tab_Requisitos(id_Tipo_Prestamo,Id_Requisitos) 
); 

-- tabla donde se llevaran los datos de los fiadores que conformen cada solicitud 

CREATE TABLE tab_FiadoresXSolicitud
(
    Id_Solicitud_Prestamo        	BIGINT 		    NOT NULL,	-- id solicitud de prestamo (llave primaria compuesta)
    DNI_fiador              		BIGINT 		    NOT NULL,	-- reg_fiador que es numer de la llave primaria de fiadores(llave primaria compuesta)
    Detalle_Fiador              	VARCHAR 	    NOT NULL,	-- detalle del fiador que es en la solicitud si es el principal o uno segundario
    Estado_Fiador               	BOOLEAN 	    NOT NULL, 	-- nos indica si el fiadoor para esta solicitud fue aprobado o no
    Usuario_Inserta      		    VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			    TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		    VARCHAR, 
    Fecha_Update      			    TIMESTAMP WITHOUT TIME ZONE,  



    PRIMARY KEY (Id_Solicitud_Prestamo,DNI_fiador ),
    FOREIGN KEY (Id_Solicitud_Prestamo) REFERENCES tab_SolicitudPrestamo(Id_Solicitud_Prestamo),
    FOREIGN KEY (DNI_fiador) REFERENCES tab_Fiadores(DNI_fiador) 


);

-- Tabla de Préstamos 

CREATE TABLE tab_Prestamo 
( 
   Id_Prestamo          		        BIGINT     	    NOT NULL, -- Código del Préstamo (Llave Primaria Compuesta) 
   Id_Solicitud_Prestamo           	    BIGINT     	    NOT NULL, -- Código de la Aprobación de Préstamos (Llave Foránea)
   Numero_Resolucion				    BIGINT		    NOT NULL,
   Fec_AprobarPrestamo      		    TIMESTAMP WITHOUT TIME ZONE     NOT NULL,
   Monto_Prestamo                 	    DECIMAL     	NOT NULL, -- Monto del Préstamo Aprobado  
   Tasa_Interes_Prestamo             	DECIMAL     	NOT NULL, -- Tasa de Interés determinado del Préstamo 
   Plazo_Meses_Prestamo             	INTEGER     	NOT NULL, -- Plazo de los Meses estipulados para el Préstamo 
   Estado_Prestamo                 	    BOOLEAN     	NOT NULL, -- Estado del Préstamo 
   Usuario_Inserta      		        VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
   Fecha_Inserta      			        TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
   Usuario_Update      			        VARCHAR, 
   Fecha_Update      			        TIMESTAMP WITHOUT TIME ZONE, 

PRIMARY KEY (Id_Prestamo), 
FOREIGN KEY (Id_Solicitud_Prestamo) REFERENCES  tab_SolicitudPrestamo(Id_Solicitud_Prestamo) 
); 


--Tabla de Abono de Prestamo
CREATE TABLE tab_AbonoPrestamo (
    Id_AbonoPrestamo                BIGINT              NOT NULL,
    Id_Prestamo                     BIGINT              NOT NULL,
    Monto_Abonado                   DECIMAL             NOT NULL,
    Fecha_Abono                     TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    Num_Cuota_Prestamo              INTEGER             NOT NULL CHECK (Num_Cuota_Prestamo > 0),
    Valor_Capital                   DECIMAL             NOT NULL,
    Valor_Intereses                 DECIMAL             NOT NULL,
    Usuario_Inserta      		    VARCHAR     	    NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			    TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		    VARCHAR, 
    Fecha_Update      			    TIMESTAMP WITHOUT TIME ZONE, 

PRIMARY KEY (Id_AbonoPrestamo),
FOREIGN KEY (Id_Prestamo) REFERENCES tab_Prestamo(Id_Prestamo)

);

--Tabla de Desembolso de Prestamo
CREATE TABLE tab_DesembolsoPrestamo (
    id_Desembolso                       BIGINT              NOT NULL,
    Id_Solicitud_Prestamo               BIGINT              NOT NULL,
    Monto_Desembolso                    DECIMAL             NOT NULL,
    Fecha_Desembolso                    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    Usuario_Inserta      		        VARCHAR     	    NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			        TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		        VARCHAR, 
    Fecha_Update      			        TIMESTAMP WITHOUT TIME ZONE, 


PRIMARY KEY (id_Desembolso),
FOREIGN KEY (Id_Solicitud_Prestamo) REFERENCES tab_Prestamo(Id_Prestamo)

); 

--Tabla de plan de pagos(id_prestamo,numero cuota,cuotamensual, intereses, amortizacion.)
CREATE TABLE tab_PlanPago (
    id_prestamo                         BIGINT              NOT NULL,
    Numero_cuota                        INTEGER             NOT NULL,
    Cuota_mensual                       DECIMAL             NOT NULL,
    Abono_Capital                       DECIMAL             NOT NULL,
    Abono_Intereses                     DECIMAL             NOT NULL,
    Saldo_Capital                       DECIMAL             NOT NULL,
    Total_Cuota                         DECIMAL             NOT NULL,                                     -- Atributo Opcional porque se puede sacar el total de otra manera
    Usuario_Inserta      		        VARCHAR     	    NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			        TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		        VARCHAR, 
    Fecha_Update      			        TIMESTAMP WITHOUT TIME ZONE, 


    PRIMARY KEY (id_prestamo,Numero_cuota),
    FOREIGN KEY (id_prestamo) REFERENCES tab_Prestamo(Id_Prestamo)

);


--Tabla de Recaudo de Cartera



-- Tabla del Auditor 

CREATE TABLE tab_Auditor 

( 
    DNI_Auditor           		    BIGINT      	NOT NULL, -- Código del Auditor (Llave Primaria) 
    Año_Auditor           		    TIMESTAMP      	NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Año que se realiza la Auditoria 
    Resultado_Auditor          		INTEGER     	NOT NULL, -- Resultado de la Auditoria 
    Observaciones_Auditor      		VARCHAR     	NOT NULL, -- Observaciones de la Auditoria 
    Usuario_Inserta      		    VARCHAR     	NOT NULL   DEFAULT CURRENT_USER, 
    Fecha_Inserta      			    TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    Usuario_Update      		    VARCHAR, 
    Fecha_Update      			    TIMESTAMP WITHOUT TIME ZONE,  


PRIMARY KEY (DNI_Auditor), 
FOREIGN KEY (DNI_Auditor) REFERENCES tab_Persona(DNI_Persona) 
); 


-- Tabla de borrados 

CREATE TABLE tab_borrados 

( 
    id_consec       			INTEGER     	NOT NULL, -- Codígo de la tabla Borrados (Llave Primaria) 
    nombre_tabla       			VARCHAR     	NOT NULL, -- 
    usuario_insert      		VARCHAR     	NOT NULL    DEFAULT CURRENT_USER, 
    fecha_insert      			TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY(id_consec) 
); 


CREATE OR REPLACE FUNCTION fun_act_tabla() RETURNS "trigger" AS 
$$ 
    DECLARE id_consec tab_borrados.id_consec%TYPE; 
    BEGIN 
        IF TG_OP = 'INSERT' THEN 
           NEW.Usuario_Inserta = CURRENT_USER; 
           NEW.Fecha_Inserta = CURRENT_TIMESTAMP; 
           RETURN NEW; 
        END IF; 
        IF TG_OP = 'UPDATE' THEN 
           NEW.Usuario_Update = CURRENT_USER; 
           NEW.Fecha_Update = CURRENT_TIMESTAMP; 
           RETURN NEW; 
        END IF; 
        IF TG_OP = 'DELETE' THEN 
            SELECT MAX(a.id_consec) INTO id_consec FROM tab_borrados a; 
            IF id_consec IS NULL THEN 
                id_consec = 1; 
            ELSE 
                id_consec = id_consec + 1; 
            END IF; 
            INSERT INTO tab_borrados VALUES(id_consec,TG_RELNAME,CURRENT_USER,CURRENT_TIMESTAMP); 
            RETURN OLD;  
        END IF; 
    END; 
$$ 
LANGUAGE PLPGSQL; 


/*TRIGER PARA CONTROL PERSONA */ 

CREATE OR REPLACE TRIGGER tri_persona AFTER DELETE ON tab_Persona 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_persona BEFORE INSERT OR UPDATE ON tab_Persona 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 

/*TRIGER PARA CONTROL EMPLEADO */ 

CREATE OR REPLACE TRIGGER tri_empleado AFTER DELETE ON tab_Empleado 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_empleado BEFORE INSERT OR UPDATE ON tab_Empleado 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 

/*TRIGER PARA CONTROL ASOCIADO*/ 

CREATE OR REPLACE TRIGGER tri_Asociado AFTER DELETE ON tab_Asociado 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_asociados BEFORE INSERT OR UPDATE ON tab_Asociado 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 

/*TRIGER PARA CONTROL CUENTA */ 

CREATE OR REPLACE TRIGGER tri_Cuenta AFTER DELETE ON tab_Cuenta 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_Cuenta BEFORE INSERT OR UPDATE ON tab_Cuenta 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 

/*TRIGER PARA CONTROL AporteCuenta*/ 

CREATE OR REPLACE TRIGGER tri_AporteCuenta AFTER DELETE ON tab_AporteCuenta 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_AporteCuenta BEFORE INSERT OR UPDATE ON tab_AporteCuenta 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 

/*TRIGER PARA CONTROL RETIRO DE CUENTA*/ 

CREATE OR REPLACE TRIGGER tri_RetiroCuenta AFTER DELETE ON tab_RetiroCuenta 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_RetiroCuenta BEFORE INSERT OR UPDATE ON tab_RetiroCuenta 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 



/*TRIGER PARA CONTROL juntaDirectiva*/ 

CREATE OR REPLACE TRIGGER tri_JuntaDirectiva AFTER DELETE ON tab_Junta_Directiva 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_JuntaDirectiva BEFORE INSERT OR UPDATE ON tab_Junta_Directiva 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 

/*TRIGER PARA CONTROL SOLICITAR MEMBRESIA*/ 

CREATE OR REPLACE TRIGGER tri_SolicitarMembresia AFTER DELETE ON  tab_SolicitarMembresia 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_SolicitarMembresia BEFORE INSERT OR UPDATE ON  tab_SolicitarMembresia 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 


/*TRIGER PARA TIPO DE PRESTAMOS*/ 

CREATE OR REPLACE TRIGGER tri_Tipo_de_prestamos  AFTER DELETE ON tab_Tipo_de_prestamos 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_Tipo_de_prestamos  BEFORE INSERT OR UPDATE ON tab_Tipo_de_prestamos  
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 


/*TRIGER PARA CONTROL REQUISITOS*/ 

CREATE OR REPLACE TRIGGER tri_Requisitos AFTER DELETE ON  tab_Requisitos 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_Requisitos BEFORE INSERT OR UPDATE ON  tab_Requisitos 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 

/*TRIGER PARA FIADORES*/ 

CREATE OR REPLACE TRIGGER tri_Fiadores  AFTER DELETE ON tab_Fiadores
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_Fiadores  BEFORE INSERT OR UPDATE ON tab_Fiadores
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 

/*TRIGER PARA CONTROL SOLICITUDPRESTAMO*/ 

CREATE OR REPLACE TRIGGER tri_SolicitudPrestamo AFTER DELETE ON tab_SolicitudPrestamo 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_SolicitudPrestamo BEFORE INSERT OR UPDATE ON tab_SolicitudPrestamo 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 

/*TRIGER PARA FIADORESXSOLICITUD*/ 

CREATE OR REPLACE TRIGGER tri_FiadoresXSolicitud  AFTER DELETE ON tab_FiadoresXSolicitud 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_FiadoresXSolicitud  BEFORE INSERT OR UPDATE ON tab_FiadoresXSolicitud 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 


/*TRIGER PARA CONTROL PRESTAMO*/ 

CREATE OR REPLACE TRIGGER tri_Prestamo AFTER DELETE ON tab_Prestamo 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_Prestamo BEFORE INSERT OR UPDATE ON tab_Prestamo 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
 
/*TRIGER PARA CONTROL ABONO PRESTAMO*/ 

CREATE OR REPLACE TRIGGER tri_AbonoPrestamo AFTER DELETE ON tab_AbonoPrestamo 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_AbonoPrestamo BEFORE INSERT OR UPDATE ON tab_AbonoPrestamo 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 


/*TRIGER PARA CONTROL DESEMBOLSO PRESTAMO*/ 

CREATE OR REPLACE TRIGGER tri_DesembolsoPrestamo AFTER DELETE ON tab_DesembolsoPrestamo 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_DesembolsoPrestamo BEFORE INSERT OR UPDATE ON tab_DesembolsoPrestamo 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 

/*TRIGER PARA CONTROL AUDITOR*/ 

CREATE OR REPLACE TRIGGER tri_Auditor AFTER DELETE ON tab_Auditor 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_Auditor BEFORE INSERT OR UPDATE ON tab_Auditor 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 

/*TRIGER PARA CONTROL ROLES DE USUARIOS */ 

CREATE OR REPLACE TRIGGER tri_Roles AFTER DELETE ON tab_Roles
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
    CREATE TRIGGER tri_ins_Roles BEFORE INSERT OR UPDATE ON tab_Roles
    FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

/*TRIGER PARA CONTROL USUARIOS*/ 

CREATE OR REPLACE TRIGGER tri_Usuarios AFTER DELETE ON tab_Usuarios 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla(); 
CREATE TRIGGER tri_ins_Usuarios BEFORE INSERT OR UPDATE ON tab_Usuarios 
FOR EACH ROW EXECUTE PROCEDURE fun_act_tabla();

