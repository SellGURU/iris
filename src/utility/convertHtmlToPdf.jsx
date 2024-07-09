import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {useRef, useState} from "react";
export const ConvertHtmlToPdf = () => {

        const [htmlUrl, setHtmlUrl] = useState('');
        const iframeRef = useRef(null);

        const handleDownload = async () => {
            const iframe = iframeRef.current;
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

            // Wait for the iframe to load completely
            iframe.onload = async () => {
                // Use html2canvas to capture the iframe content
                const canvas = await html2canvas(iframeDocument.body);
                const imgData = canvas.toDataURL('image/png');

                // Create PDF with jsPDF
                const pdf = new jsPDF();
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('download.pdf');
            };

            iframe.src = htmlUrl;
        };

        return (
            <div>
                <input
                    type="text"
                    placeholder="Enter HTML URL"
                    value={htmlUrl}
                    onChange={(e) => setHtmlUrl(e.target.value)}
                    className="border p-2 mb-4"
                />
                <button onClick={handleDownload} className="bg-blue-600 text-white p-2">
                    Download PDF
                </button>
                <iframe
                    ref={iframeRef}
                    style={{ display: 'none' }}
                    title="HTML Content"
                ></iframe>
            </div>
        );
}
