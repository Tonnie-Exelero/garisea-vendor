// ** React Imports
import React, { useState } from "react";

// ** MUI Imports
import { Divider } from "@mui/material";

// ** React PDF Imports
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

type PDFFile = string | File | null;

interface Props {
  url: PDFFile;
}

const PDFViewer = ({ url }: Props) => {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <Document
      file={url}
      onLoadSuccess={onDocumentLoadSuccess}
      options={options}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <>
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          <Divider />
        </>
      ))}
    </Document>
  );
};

export default PDFViewer;
