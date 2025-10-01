import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Sidenav from "../../components/Sidenav/Sidenav";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./pdf2.css";
import { API_HOST_URL } from "../../config";
import Loader from "../../components/Loader/index";

const DataPff = () => {
  const [pdfuser, setPdfuser] = useState([]);
  const [pdfuserIsLoading, setPdfuserIsLoading] = useState(true);
  const licenceCertificateref = useRef();
  const { id } = useParams();
  const LOCAL_STORAGE_KEY = 'pdfItems';

  useEffect(() => {
    const fetchPdfItems = async () => {
      setPdfuserIsLoading(true);
      try {
        const cachedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cachedItems) {
          const parsedItems = JSON.parse(cachedItems);
          setPdfuser(parsedItems);
          setPdfuserIsLoading(false);
          return;
        }

        const response = await fetch(`${API_HOST_URL}/get-all-items`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.data));
        setPdfuser(data.data);
      } catch (error) {
        console.error("Error fetching PDF items:", error);
        setPdfuser([]); // Set to empty array on error
      } finally {
        setPdfuserIsLoading(false);
      }
    };

    fetchPdfItems();
  }, []);

  const currentUser = Array.isArray(pdfuser) ? pdfuser.find(user => user["Employee Code"] === id) : undefined;

  const handlePrint = useReactToPrint({
    content: () => licenceCertificateref.current,
    documentTitle: currentUser ? currentUser["Employee name"] : "Employee-Card",
  });

  // Re-implementing the requested function to get the image ID from a URL
  const getImageId = (url) => {
    if (!url || typeof url !== 'string') return '';

    if (url.includes('/file/d/')) {
      const parts = url.split('/file/d/');
      if (parts.length > 1) {
        return parts[1].split('/')[0];
      }
    } else if (url.includes('open?id=')) {
      return url.split('open?id=')[1].split('&')[0];
    } else if (url.includes('id=')) {
      return url.split('id=')[1].split('&')[0];
    }

    return '';
  };

  if (pdfuserIsLoading) {
    return <Loader />;
  }

  if (!currentUser) {
    return (
      <>
        <Header />
        <Sidenav />
        <div className="container" style={{ padding: "20px" }}>
          <h3 className="text-center">User not found.</h3>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header />
      <Sidenav />
      <div className="content-wrapper">
        <div ref={licenceCertificateref}>
          <div className="cardtwo">
            {/* ⭐ UPDATED: Using the image loading logic you provided */}
            <div className="imgPdf">
              <img
                style={{ borderRadius: '8px', objectFit: 'cover' }}
                src={currentUser["Image Link"]
                  ? currentUser["Image Link"] // Use the original link directly
                  : "https://via.placeholder.com/100x80?text=No+Image"}
                alt="Employee"
                width="100px"
                height="80px"
                onError={(e) => {
                  console.log("Image failed to load, trying alternative method");
                  // If the direct link fails, try the ID method as fallback
                  const imageId = getImageId(currentUser["Image Link"]);
                  if (imageId) {
                    // Use higher quality parameters
                    e.target.src = `https://drive.google.com/thumbnail?id=${imageId}&sz=w400-h320`;
                  } else {
                    e.target.src = "https://via.placeholder.com/100x80?text=Error";
                  }
                }}
              />
            </div>
            <div className="namePdf">
              <h1
                style={{
                  fontSize: currentUser["Employee name"].length < 14 ? "70px" : "55px",
                }}
              >
                <b>{currentUser["Employee name"]}</b>
              </h1>
            </div>
            <div className="designPdf">
              <b>
                <p>{currentUser["Designation"]}</p>
              </b>
            </div>
            <div className="projectPdf">
              <p>Project ID: {currentUser["Project Name"]}</p>
            </div>
            <div className="employeidPdf">
              <p>Employee ID: {currentUser["Employee Code"]}</p>
            </div>
            <div className="bloodidPdf">
              <p>Blood Group : {currentUser["Blood Group"]}</p>
            </div>
          </div>
          <div className="cardthree"></div>
        </div>
      </div>

      <p>
        <button onClick={handlePrint} className="buttonpdf">
          Get Pdf
        </button>
      </p>
    </div>
  );
};

export default DataPff;
