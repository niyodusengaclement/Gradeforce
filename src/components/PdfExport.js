import React, { Component } from "react";
import jsPDF from 'jspdf'
import ReactDOMServer from 'react-dom/server';
import 'jspdf-autotable'
import { Button } from "react-bootstrap";
import schoolImg from '../assets/images/skul.png';
import path from 'path';

const PdfExport = (props) => {
const pdfGenerator = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
  const string = ReactDOMServer.renderToString("#transcript");
  const pdf = new jsPDF(orientation, unit, size, string);

  let img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACS0lEQVRoge3YO09UQRjG8R8XCxEQY4wWWtCIFlQSGy00Qb+BlYWdpQkWFiZaWtiY+B3sqCioNBoFIwShRCURChM1MTHxtgXeijMblsNZdjmcXQZy/skkk5k5z/s+Mzm3l5KSXUc3ruEdFkO/e0cz2iKduIK3+Jdqy7guckPVE1iylvhSGKs3HpWhrBPI2vlm17WdvIlFY6ioRHbMUKsCt81QuwK1LM5OHX1hcWO5GXPnEYuB3HnFaiBNwzxnaiaifOOmyPqCeNWBlziMe3iE3zUXHcdFnMEQBtGLA2H+J37gveTjcA7P8KFBMkXoduMqbuNLVpA+3MR8jeOttvmgMVCjO1Cgbl866Y6afg9u4QYOhbGPeIIpvAm78y3sGMkO9uMkTuMcRnEszH/HgxBnTLLrReh+xUPcx6+0qdng+g/GJUffmV7UBJ3h2vGgVd3NVujOZC2sYBXDOYLUYzhotkq3kjVZqTexTdqim+eIo6Q0EhulkdgojcRGaSQ2SiOxURqJjdJIbOwZI43KPidwQeNqx7Kk3vQaTzWuorRKF2t/XP2SQsF2qx1jkmpHq3WxvopSwT5JjehoGPuMx5Jqx6KN1Y7eIDqEUzgvqXZUr/+EI6HfCt1V7Jei6vovJnAJXelFTdCFy5i0cUcnC9CdCDlWNTdQnRjJEaQeZyVVwtnQL4oRTRjZLazLN+vxm/dGrG1TMsqaYWy6oBh1eVFQgGqbk9ygPZLH6mgYKzLG880MbZdBrGwSfCWs2RUcxF0sWHu5LeBOmCvZ8/wHnBqGyyoum5EAAAAASUVORK5CYII="
  // img.src = path.resolve(schoolImg);
  pdf.addImage(img, 'JPEG',10, 10, 80, 70);

  pdf.autoTable({ html: '#transcript'});
  pdf.save('transcript');
};
  
  return (
    <button type="button" onClick={pdfGenerator} className="btn-primary btn-sm mt-3">
      Export PDF
    </button>
  );
}

export default PdfExport;