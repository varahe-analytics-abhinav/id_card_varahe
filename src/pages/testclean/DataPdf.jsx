import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Sidenav from "../../components/Sidenav/Sidenav";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./pdf2.css";
import { API_HOST_URL } from "../../config"; // Import API_HOST_URL
import Loader from "../../components/Loader/index"; // Import Loader

const DataPff = () => {
  const [state, setState] = useState([]); // This state seems unused based on the original code, keeping it for now.
  const [pdfuser, setPdfuser] = useState([]); // State to hold the fetched/cached PDF user data
  const [pdfuserIsLoading, setPdfuserIsLoading] = useState(true); // State to track loading status
  const licenceCertificateref = useRef();
  const { id } = useParams();
  const LOCAL_STORAGE_KEY = 'pdfItems'; // Key for local storage

  // Removed the hardcoded pdfuser array

  const fetchPdfItems = async () => {
    setPdfuserIsLoading(true); // Set loading to true before fetching
    try {
      // Check local storage first
      const cachedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cachedItems) {
        const parsedItems = JSON.parse(cachedItems);
        setPdfuser(parsedItems);
        setPdfuserIsLoading(false);
        // Optionally, you might still want to fetch in the background to get the latest data
        // and update cache for next time, but for now, we'll just use cached data.
        // fetch(`${API_HOST_URL}/get-all-items`).then(res => res.json()).then(data => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))).catch(console.error);
        return; // Use cached data and exit
      }

      // If not in local storage, fetch from API
      const response = await fetch(`${API_HOST_URL}/get-all-items`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Store fetched data in local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.data));

      setPdfuser(data.data);
      setPdfuserIsLoading(false);
    } catch (error) {
      console.error("Error fetching PDF items:", error);
      setPdfuserIsLoading(false);
      // Set pdfuser to an empty array in case of error
      setPdfuser([]);
    }
  };

  // Move useEffect hooks and useReactToPrint to the top level
  useEffect(() => {
    fetchPdfItems();
  }, []); // Empty dependency array means this effect runs once on mount

  // Find the specific user based on the ID from the URL
  // This should be done after pdfuser is potentially updated by the effect
  const currentUser = Array.isArray(pdfuser) ? pdfuser.find(user => user["Employee Code"] === id) : undefined;


  useEffect(() => {
    // Filter the pdfuser array to find the correct user by Employee Code
    // Ensure pdfuser is an array before filtering
    const filteredData = Array.isArray(pdfuser) ? pdfuser.filter((e) => e["Employee Code"] === id) : [];
    setState(filteredData);
  }, [id, pdfuser]); // Added pdfuser to dependency array

  const handlePrint = useReactToPrint({
    content: () => licenceCertificateref.current,
    // Use currentUser for document title if available, otherwise fallback
    documentTitle: currentUser ? currentUser["Employee name"] : (state.length > 0 ? state[0]["Employee name"] : "Employee"),
  });


  // If data is still loading or user is not found, show a loading indicator or message
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


  // Function to extract image ID from the Google Drive URL
  const getImageId = (url) => {
    if (!url) return '';

    // Handle different Google Drive URL formats
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

  return (
    <div>
      <Header />
      <Sidenav />
      <div className="content-wrapper">
        {/* Use currentUser directly here */}
        {currentUser ? (
          <div ref={licenceCertificateref}>
            <div className="cardtwo">
            <div className="imgPdf">
  <img
    src={
      currentUser["Image Link"]
        ? `https://lh3.googleusercontent.com/d/${getImageId(currentUser["Image Link"])}`
        : "https://via.placeholder.com/100x80?text=No+Image"
    }
    alt="Employee"
    width="100px"
    height="80px"
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
        ) : (
          // This "Loading..." will likely not be reached due to the early return for !currentUser
          "Loading..."
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

export default DataPff;