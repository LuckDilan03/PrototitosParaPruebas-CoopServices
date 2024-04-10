const pdfkit = require('pdfkit');

async function generatePDF(data) {
    return new Promise((resolve, reject) => {
        const doc = new pdfkit();
        const buffer = [];

        doc.on('data', (data) => {
            buffer.push(data);
        });

        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffer);
            resolve(pdfBuffer);
        });

        doc.on('error', (err) => {
            reject(err); // Rechaza la promesa en caso de error
        });

        // Define el estilo para el título
        const titleStyle = { align: 'center', fontSize: 18, font: 'Helvetica-Bold' };

        // Define el estilo para el texto normal
        const textStyle = { align: 'left', fontSize: 12, font: 'Helvetica' };
        

        data.forEach(item => {
            // Título de la sección
            doc.text('Información de la solicitud', titleStyle);
            doc.moveDown();

            // Datos de la solicitud
            doc.text(`DNI: ${item.dni_persona}`, textStyle);
            doc.text(`Id Solicitud: ${item.id_solicitud}`, textStyle);
            doc.text(`Fecha Solicitud: ${item.fecha_solicitud}`, textStyle);
            doc.text(`Usuario Deseado: ${item.usuario_deseado}`, textStyle);
            doc.text(`Respuesta Solicitud: ${item.respuesta_solicitud}`, textStyle);
            doc.text(`Fecha respuesta: ${item.fecha_aprobacion}`, textStyle);
            doc.text(`Numero resolucion: ${item.numero_resolucion}`, textStyle);
            doc.text(`Detalles Solicitud: ${item.detalle_solicitud}`, textStyle);
            

            // Agregar línea separadora
            doc.moveDown();
            doc.lineCap('round')
                .moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .stroke();

            
        });

        doc.end();
    });
}

module.exports = { generatePDF };
