import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const convertHtmlToPdf = async (htmlUrl, fileName = 'download.pdf') => {
    try {
        const response = await fetch(htmlUrl);
        const htmlContent = await response.text();

        // Create a temporary div to hold the HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        document.body.appendChild(tempDiv);

        // Use html2canvas to capture the content of the temporary div
        const canvas = await html2canvas(tempDiv);
        const imgData = canvas.toDataURL('image/png');

        // Create PDF with jsPDF
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(fileName);

        // Clean up the temporary div
        document.body.removeChild(tempDiv);
    } catch (error) {
        console.error('Error converting HTML to PDF:', error);
    }
};
