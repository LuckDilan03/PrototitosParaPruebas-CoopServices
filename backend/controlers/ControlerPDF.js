const pdfkit = require('pdfkit');
const fs = require('fs');

async function generatePDF(data) {
  const doc = new pdfkit();
  const buffer = [];

  doc.on('data', (data) => {
    buffer.push(data);
  });

  doc.on('end', () => {
    const pdfBuffer = Buffer.concat(buffer);
    return pdfBuffer;
  });

  data.forEach(item => {
    doc.text('Información de la solicitud', { align: 'center' });
    doc.moveDown();

    doc.text(`DNI: ${item.dni_persona}`, { align: 'left' });
    doc.text(`Fecha Solicitud: ${item.fecha_solicitud}`, { align: 'left' });
    doc.text(`Usuario Deseado: ${item.usuario_deseado}`, { align: 'left' });
    doc.text(`Respuesta Solicitud: ${item.respuesta_solicitud}`, { align: 'left' });
    doc.text(`Fecha respuesta: ${item.fecha_aprobacion || 'N/A'}`, { align: 'left' });
    doc.text(`Numero Cuenta: ${item.numero_cuenta || 'N/A'}`, { align: 'left' });
    doc.text(`Saldo Cuenta: ${item.saldo_cuenta || 'N/A'}`, { align: 'left' });
    doc.text(`Aporte Mensual: ${item.aporte_mensual || 'N/A'}`, { align: 'left' });
    doc.text(`Estado Cuenta: ${item.estado_cuenta || 'N/A'}`, { align: 'left' });
    doc.text(`Monto Aporte: ${item.monto_aporte || 'N/A'}`, { align: 'left' });

    doc.addPage();
  });

  doc.end();
}