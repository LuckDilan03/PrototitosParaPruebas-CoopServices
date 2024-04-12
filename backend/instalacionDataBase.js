const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');

// Ruta de la carpeta que contiene los scripts SQL
const carpetaDatabase = path.join(__dirname, '../database');

// Función para ejecutar un script SQL en una base de datos
function ejecutarScriptEnBaseDeDatos(script, baseDeDatos) {
    console.log(`Ejecutando ${script} en la base de datos ${baseDeDatos}...`);
    // Ejecutar el script SQL en la base de datos especificada
    execSync(`psql -U postgres -d ${baseDeDatos} -a -f ${script}`, { 
        cwd: carpetaDatabase,
        stdio: 'inherit' // Mostrar la salida de psql en la consola
    });
}

// Solicitar al usuario el nombre de la nueva base de datos
const nombreNuevaBaseDeDatos = readlineSync.question('Introduce el nombre de la nueva base de datos: ');

// Crear la nueva base de datos
console.log(`Creando la nueva base de datos ${nombreNuevaBaseDeDatos}...`);
execSync(`createdb -U postgres ${nombreNuevaBaseDeDatos}`);

// Obtener el nombre del script DDL
const ddlScript = fs.readdirSync(carpetaDatabase).find(archivo => archivo === 'Script_DDL.sql');

// Si se encontró el script DDL, ejecutarlo en la nueva base de datos
if (ddlScript) {
    const rutaDDL = path.join(carpetaDatabase, ddlScript);
    ejecutarScriptEnBaseDeDatos(rutaDDL, nombreNuevaBaseDeDatos);
} else {
    console.error("No se encontró el script DDL (Script_DDL.sql). Asegúrate de que el archivo esté presente en la carpeta 'database'.");
    process.exit(1); // Salir con un código de error
}

// Obtener la lista de archivos SQL en la carpeta (excluyendo el script DDL)
const archivosSQL = fs.readdirSync(carpetaDatabase).filter(archivo => archivo !== ddlScript && archivo.endsWith('.sql'));

// Iterar sobre cada script y ejecutarlo en la nueva base de datos
archivosSQL.forEach(archivo => {
    const rutaScript = path.join(carpetaDatabase, archivo);
    ejecutarScriptEnBaseDeDatos(rutaScript, nombreNuevaBaseDeDatos);
});

console.log("¡Todos los scripts han sido ejecutados en la nueva base de datos!");
