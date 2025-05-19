import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Sidenav from "../../components/Sidenav/Sidenav";
import { useParams } from "react-router-dom";
import { usePdfUserList } from "../../hooks/pdfuser";
import "./pdf2.css";
import { useReactToPrint } from "react-to-print";

const PdfView = () => {
  const [state,setState] = useState([]);
  // const componentRef = useRef();
  const licenceCertificateref = useRef();
  const handlePrint = useReactToPrint({
    content: () => licenceCertificateref.current,
  });

  
  const id = useParams().id;
  // console.log(id);
  const { pdfuser, pdfuserIsLoading } = usePdfUserList();
  let data = {};
  
  useEffect(() => {}, [!pdfuserIsLoading]);
  if (!pdfuserIsLoading) {
    data = pdfuser.filter((e) => {
      // console.log(e);
      return e["Employee Code"] == id;
      // if({
      //     setState(e)
      // }
    });
  }

  // const handlePrint = async () => {
  //   const inputData = licenceCertificateref.current;
  //   try {
  //     const canvas = await html2canvas(inputData,{
  //       allowTaint:false,
  //     useCORS:true
  //     });
      
  //     const imgData = canvas.toDataURL("image/jpg");
  //     const pdf = new jsPDF({
  //       orientation: "portrait",
       
  //       unit: "px",
  //       format: "a4",
        
  //     });
  //     const width = pdf.internal.pageSize.getWidth();
  //     const height = pdf.internal.pageSize.getHeight();

  //     pdf.addImage(imgData, "JPG", 0, 0, width, height);
  //     pdf.save(`${data[0]["Employee name"]}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(data[0]["Image Link"].replace(/\/file\/d\/(.+)\/(.+)/, "/thumbnail?&id=$1"));

  // console.log(state);

  return (
    <div>
      <Header />
      <Sidenav />
      <div></div>
      <div className="content-wrapper">
        {data.length > 0 && pdfuser && !pdfuserIsLoading ? (
          <div ref={licenceCertificateref}>
            <div className="cardtwo" >
              <div className="imgPdf">
                <img
                  src={data[0]["Image Link"].replace(
                    /\/file\/d\/(.+)\/(.+)/,
                    "/thumbnail?&id=$1"
                  )}
                  alt="img"
                
                  
                    // crossOrigin="anonymous"
                
                />
              </div>


              <div className="namePdf">
                <h1>
                  <b>{data[0]["Employee name"]} </b>
                </h1>
              </div>

              <div className="designPdf">
              <b><p>{data[0]["Designation"]}</p></b>  
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

            <div className="cardthree">

</div>

            {/* <p>{data[0]["Blood Group"]}</p> */}
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
