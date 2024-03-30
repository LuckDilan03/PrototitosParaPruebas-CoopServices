CREATE OR REPLACE FUNCTION confirmarUsuario(usuario varchar,dni bigint) RETURNS varchar AS
$$
DECLARE correoUser varchar;
DECLARE estadoUsuario boolean;
begin

    select estado_usuario into estadoUsuario from tab_usuarios
    where usuario_ingreso=usuario AND dni_usuario=dni;
        if found then 

            if estadoUsuario then
                select correo_persona into correoUser from tab_persona
                where dni_persona=dni;
                RETURN 'Usuario encontrado y link enviado al correo :'||correoUser;
            else
                RETURN 'Usuario suspendido ';

            end if;
        else 
            RETURN 'Usuario no encontrado ';
        
        end if;
  


end;
$$
LANGUAGE PLPGSQL