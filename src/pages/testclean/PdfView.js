import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Sidenav from "../../components/Sidenav/Sidenav";
import { useParams } from "react-router-dom";
import { usePdfUserList } from "../../hooks/pdfuser";
import "./pdf2.css";
import { useReactToPrint } from "react-to-print";

const PdfView = () => {
  const [state, setState] = useState([]);
  const licenceCertificateref = useRef();

  const id = useParams().id;
  const { pdfuser, pdfuserIsLoading } = usePdfUserList();
  let data = {};

  useEffect(() => {}, [!pdfuserIsLoading]);
  if (!pdfuserIsLoading) {
    data = pdfuser.filter((e) => e["Employee Code"] == id);
  }

  const handlePrint = useReactToPrint({
    content: () => licenceCertificateref.current,
    documentTitle: data.length > 0 ? data[0]["Employee name"] : "Employee", // Dynamically set the document title
  });

  return (
    <div>
      <Header />
      <Sidenav />
      <div className="content-wrapper">
        {data.length > 0 && pdfuser && !pdfuserIsLoading ? (
          <div ref={licenceCertificateref}>
            <div className="cardtwo">
              <div className="imgPdf">
                <img
                  src={data[0]["Image Link"].replace(
                    /\/file\/d\/(.+)\/(.+)/,
                    "/thumbnail?&id=$1"
                  )}
                  alt="img"
                />
              </div>
              <div className="namePdf">
                <h1
                  style={{
                    fontSize: data[0]["Employee name"].length < 14 ? "70px" : "60px",
                  }}
                >
                  <b>{data[0]["Employee name"]}</b>
                </h1>
              </div>
              <div className="designPdf">
                <b>
                  <p>{data[0]["Designation"]}</p>
                </b>
              </div>
              <div className="projectPdf">
                <p>Project ID: {data[0]["Project Name"]}</p>
              </div>
              <div className="employeidPdf">
                <p>Employee ID: {data[0]["Employee Code"]}</p>
              </div>
              <div className="bloodidPdf">
                <p>Blood Group : {data[0]["Blood Group"]}</p>
              </div>
            </div>

            <div className="cardthree"></div>
          </div>
        ) : (
          "loading"
        )}
      </div>

      <p>
        <button onClick={handlePrint} className="buttonpdf">
          Get Pdf
        </button>
      </p>
    </div>
  );
};

export default PdfView;
