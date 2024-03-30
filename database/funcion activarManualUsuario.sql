CREATE OR REPLACE FUNCTION activacionmanualusuario(userIngreso varchar,documento bigint ) RETURNS boolean AS
$$
    DECLARE rol integer;
    
    begin
        select rol_ingreso into rol from tab_usuarios
            where usuario_ingreso=userIngreso AND dni_usuario=documento;
        if rol=1 then
            update tab_usuarios set estado_usuario=true ,detalle_estado='Se activa Unicamente el Usuario actual'
                where usuario_ingreso=userIngreso AND dni_usuario=documento;
                if FOUND then
                 return true;
                end if;
                return false;
        elsif rol=2 then
        
          update tab_cuenta
            set estado_cuenta=true,detalles_estado_cuenta='Cuenta activa Manual Mente por que se activa el usuario'
          where dni_asociado=documento;

          update tab_asociado
            set estado_del_asociado=true,detalle_estado='Asociado activado Manual Mente por que se activo el usuario'
          where dni_asociado=documento;
          
          update tab_usuarios
            set estado_usuario=true,Detalle_Estado='Usuario activo Manual Mente desde la seccion de usuarios'
          where usuario_ingreso=userIngreso AND dni_usuario=documento;
          if FOUND THEN   
              return true;      
          end if;
            return false;   
        end if;
          return raise_application_error(-20000, 'no se encontro rol para el usuario con ese dni');
    end;
$$
LANGUAGE PLPGSQL