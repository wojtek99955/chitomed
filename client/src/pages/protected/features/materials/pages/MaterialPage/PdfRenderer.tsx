import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useState } from "react";

// Konfiguracja workera (wymagana do renderowania)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Props {
  url: string;
}

const PdfRenderer = ({ url }: Props) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        margin: "2rem 0",
        background: "#f0f0f0",
        padding: "20px",
        borderRadius: "12px",
      }}>
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p>Ładowanie dokumentu PDF...</p>}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={800} // Możesz dostosować szerokość lub użyć kontenera
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfRenderer;
