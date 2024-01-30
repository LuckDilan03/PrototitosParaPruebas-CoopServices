const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Configuración de la conexión a la base de datos
const pool = new Pool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Función autoejecutable para manejar la conexión
(async () => {
    let client;
    try {
        // Intentar conectar al pool de conexiones
        client = await pool.connect();
        console.log("Connected to the database");
        // Realizar operaciones con la base de datos aquí si es necesario
    } catch (err) {
        // Manejar errores de conexión
        console.error("Connection error:", err);
        process.exit(1); // Salir del proceso en caso de error fatal
    } finally {
        // Liberar la conexión al pool, incluso si hay errores
        if (client) {
            client.release();
        }
    }
})();

module.exports = pool;
