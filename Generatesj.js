
import kopsj from './kop_sj.png';
import borderatas from './border_atas.png';
import borderbawah from './border_bawah.png';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import 'jspdf-autotable';

export const generateSJ = async (data) => {
  const {
    username, haritanggal, no_sj, no_po, lokasi, nama_barang, nama_transportir, 
    no_platkendaraan, volume, segel, tujuan, direktur = 'TTD Medius Susanto Tanggal'
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

  const qrTextsj = `${no_sj} - ${formattedDate}`;
  const qrImagesj = await QRCode.toDataURL(qrTextsj);


  var doc = new jsPDF('landscape', 'px', 'a4', 'false');
  doc.addImage(borderatas, 'PNG', 125, 55, 390, 80);
  doc.addImage(kopsj, 'PNG', 138, 64, 365, 62);
  doc.addImage(borderbawah, 'PNG', 125, 133, 390, 230);
  if (qrImage) {
    doc.addImage(qrImage, 'PNG', 410, 288, 48, 48);
    doc.addImage(qrImagesj, 'PNG', 155, 288, 48, 48);
  }

  doc.setFontSize(10);
  doc.setFont('Helvetica', 'normal');

  const addTextWithSpacing = (text, x, y, maxWidth, lineSpacing) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line, index) => {
      doc.text(line, x, y + index * lineSpacing);
    });
  };

  const lineSpacing = 10;

  addTextWithSpacing(username, 222, 209, 200, lineSpacing);
  addTextWithSpacing(haritanggal, 222, 147, 200, lineSpacing);
  addTextWithSpacing(no_sj, 222, 157, 200, lineSpacing);
  addTextWithSpacing(no_po, 222, 167, 200, lineSpacing);
  addTextWithSpacing(lokasi, 222, 177, 200, lineSpacing);
  addTextWithSpacing(nama_transportir, 221, 189, 240, lineSpacing);
  addTextWithSpacing(no_platkendaraan, 222, 199, 240, lineSpacing);
  addTextWithSpacing(nama_barang, 180, 236, 200, lineSpacing);
  addTextWithSpacing(volume, 267, 236, 200, lineSpacing);
  addTextWithSpacing(segel, 347, 236, 25, lineSpacing);
  addTextWithSpacing(tujuan, 398, 236, 200, lineSpacing);

  doc.setFont('Helvetica', 'normal');
  doc.text("PT SEJAHTERA PERKASA ENERGI", 370, 285);
  doc.text("Direktur", 420, 342);
  doc.text("(..................................)", 177, 468);
  doc.text("TELAH DITERIMA DENGAN BAIK", 230, 285);
  doc.text("PENERIMA", 268, 297);
  doc.text("(_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ )", 235, 342);
  const pdfOutput = doc.output('blob');
  return pdfOutput;


};
