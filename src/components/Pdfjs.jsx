import React, {  useRef, useState } from "react";

import "./pdf.css";
import { useReactToPrint } from "react-to-print";
import { usePdfUserList } from "../hooks/pdfuser";

const Pdfjs = ({user}) => {
  const [state,setState] = useState([]);
  const licenceCertificateref = useRef();
  const handlePrint = useReactToPrint({
    content: () => licenceCertificateref.current,
  });

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


  return (
    <div>
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

export default Pdfjs;
