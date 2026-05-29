import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function generatePDF(elementId, filename = 'mi-cv.pdf') {
  const element = document.getElementById(elementId)
  if (!element) return

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
  })

  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth  = pdf.internal.pageSize.getWidth()   // 210mm
  const pageHeight = pdf.internal.pageSize.getHeight()  // 297mm

  const imgWidth  = pageWidth
  const imgHeight = (canvas.height * pageWidth) / canvas.width

  // Si el contenido cabe en una sola pagina, lo imprime directo
  if (imgHeight <= pageHeight) {
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
  } else {
    // Divide el contenido en paginas sin cortar visualmente
    let yOffset = 0
    while (yOffset < imgHeight) {
      if (yOffset > 0) pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, -yOffset, imgWidth, imgHeight)
      yOffset += pageHeight
    }
  }

  pdf.save(filename)
}
