import kop from './kop_bap.png';
import judul from './judul_bap.png';
import nobast from './nobast.png';
import isiatas from './isiatas_bap.png';
import keterangan from './keterangan.png';
import isibawah from './isibawah2_bap.png';
import note from './note.png';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import 'jspdf-autotable';

export const generateBAST = async (data) => {
  const {
    username, no_bast, tanggalSJ, ship_to, alamat, no_po, alamatkirim, npwp, nama_produk, volume, terbilang, kendaraan,
    no_platkendaraan, segel_atas, segel_bawah, direktur = 'TTD Medius Susanto Tanggal'
  } = data;

  const centerText = (doc, text, y) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getStringUnitWidth(text) * doc.getFontSize() / doc.internal.scaleFactor;
    const textOffset = (pageWidth - 17 - textWidth) / 2; // Remove the 17px margin if unnecessary
    doc.text(text, textOffset, y);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const qrText = `${direktur} - ${formattedDate}`;
  const qrImage = await QRCode.toDataURL(qrText);

  var doc = new jsPDF('portrait', 'px', 'a4', 'false');
  doc.addImage(kop, 'PNG', 53, 33, 340, 60);
  doc.addImage(judul, 'PNG', 170, 95, 100, 30);
  doc.addImage(nobast, 'PNG', 48, 126, 63, 35);
  doc.addImage(isiatas, 'PNG', 43, 156, 361, 96);
  doc.addImage(keterangan, 'PNG', 51, 246, 280, 28);
  doc.addImage(isibawah, 'PNG', 46, 272, 355, 118);
  if (qrImage) {
    doc.addImage(qrImage, 'PNG', 55, 415, 55, 55);
  }
  doc.addImage(note, 'PNG', 57, 500, 109, 32);
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'bold');

  const addTextWithSpacing = (text, x, y, maxWidth, lineSpacing) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line, index) => {
      doc.text(line, x, y + index * lineSpacing);
    });
  };

  const lineSpacing = 10;

  addTextWithSpacing(username, 132, 368, 30, lineSpacing);
  addTextWithSpacing(no_bast, 114, 140, 200, lineSpacing);
  addTextWithSpacing(tanggalSJ, 114, 151, 200, lineSpacing);
  addTextWithSpacing(ship_to, 132, 174, 200, lineSpacing);
  addTextWithSpacing(alamat, 132, 185, 240, lineSpacing);
  addTextWithSpacing(no_po, 132, 206, 200, lineSpacing);
  addTextWithSpacing(alamatkirim, 132, 216, 240, lineSpacing);
  addTextWithSpacing(npwp, 132, 237, 201, lineSpacing);
  addTextWithSpacing(nama_produk, 132, 289, 201, lineSpacing);
  addTextWithSpacing(volume, 132, 301, 200, lineSpacing);
  addTextWithSpacing(terbilang, 132, 313, 200, lineSpacing);
  addTextWithSpacing(kendaraan, 132, 325, 200, lineSpacing);
  addTextWithSpacing(no_platkendaraan, 183, 325, 200, lineSpacing);
  addTextWithSpacing(segel_atas, 327, 325, 48, lineSpacing);
  addTextWithSpacing(segel_bawah, 327, 346, 48, lineSpacing);

  doc.setFont('Helvetica', 'normal');
  doc.text("Mengetahui", 59, 410);
  doc.text("Direktur", 59, 480);
  doc.text("Sopir", 205, 410);
  doc.text("(..................................)", 177, 468);
  centerText(doc, username, 480); // Adjusted position for the driver's name
  doc.text("Penerima", 330, 410);
  doc.text("(..................................)", 308, 468);

  const pdfOutput = doc.output('blob');
  return pdfOutput;


};
