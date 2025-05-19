import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import FilterComponent from "../Common/FilterComponent";
import Loader from "../Loader/index";
import { API_HOST_URL } from "../../config"; // Import API_HOST_URL
import { toast } from "react-toastify";
// import { useReactToPrint } from "react-to-print";

const DemoList = () => {
  const [pdfuser, setPdfuser] = useState([]); // Initialize pdfuser as an empty array
  const [pdfuserIsLoading, setPdfuserIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const [uploading, setUploading] = useState(false); // State for upload loading
  const [uploadMessage, setUploadMessage] = useState(''); // State for upload message
  const [password, setPassword] = useState(''); // State for password input
  const [passwordCorrect, setPasswordCorrect] = useState(false); // State to track if password is correct
  const REQUIRED_PASSWORD = 'CSV_UPLOAD_VARAHE'; // The required password
  const LOCAL_STORAGE_KEY = 'pdfItems'; // Key for local storage

  const fetchPdfItems = async () => {
    setPdfuserIsLoading(true); // Set loading to true before fetching
    try {
      // Check local storage first
      const cachedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cachedItems) {
        setPdfuser(JSON.parse(cachedItems));
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

  useEffect(() => {
    fetchPdfItems();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadMessage(''); // Clear previous message
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Please select a file first.');
      return;
    }

    setUploading(true);
    setUploadMessage('Uploading...');

    const formData = new FormData();
    formData.append('file', selectedFile); // 'file' should match the backend's expected field name

    try {
      const response = await fetch(`${API_HOST_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      setUploadMessage('Upload successful!');
      toast.success('Upload successful!');
      setSelectedFile(null); // Clear selected file
      // Refetch data after successful upload
      fetchPdfItems();

    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Optionally, clear passwordCorrect state here if you want it to reset on every input change
    // setPasswordCorrect(false);
  };

  const handlePasswordSubmit = () => {
    if (password === REQUIRED_PASSWORD) {
      setPasswordCorrect(true);
      setUploadMessage(''); // Clear any previous upload message
    } else {
      setUploadMessage('Incorrect password.');
      setPasswordCorrect(false);
    }
  };


//   const { pdfuser, pdfuserIsLoading } = usePdfUserList();
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // Ensure pdfuser is an array before filtering
  const filteredItems = Array.isArray(pdfuser) ? pdfuser.filter(
    (item) =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  ) : []; // If pdfuser is not an array, use an empty array for filtering

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  // console.log(blogData ? blogData: "")

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <div>
          <img
            src={row["Image Link"].match(/(?:id=|\/d\/)([^\/?]+)/)?.[1]
              ? `https://drive.google.com/thumbnail?id=${
                  row["Image Link"].match(/(?:id=|\/d\/)([^\/?]+)/)?.[1]
                }`
              : "https://via.placeholder.com/100"} // Placeholder if ID extraction fails
            alt="Employee"
            width="100px"
            height="80px"
          />
        </div>
      ),
      sortable: true,
    },
    {
      name: "Employee name",
      selector: (row) => row["Employee name"],
      sortable: true,
    },
    {
      name: "Employee code",
      selector: (row) => row["Employee Code"],
      sortable: true,
    },
    {
      name: "Project Name",
      selector: (row) => row["Project Name"],
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.Designation,
      sortable: true,
    },
    {
      name: "Blood Group",
      selector: (row) => row["Blood Group"],
      sortable: true,
    },
    {
      name: "Make pdf",
      selector: (row) => (
        <Link
          to={`/view-pdf/${row["Employee Code"]}`}
          className="btn btn-primary"
        >
          pdf
        </Link>
      ),
    },
  ];


  if (false) {
    return <Loader />;
  }

  return (
    <>
      {/* <ViewBlogModel
            id="exampleModalview2"

            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            blog={blog}
          /> */}
      <div className="container" style={{ padding: "20px" }}>
        {/* Password Input Section */}
        {!passwordCorrect && (
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Enter Password to Upload CSV</h3>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="mr-2 p-2 border rounded"
              placeholder="Enter password"
            />
            <button
              onClick={handlePasswordSubmit}
              className="btn btn-primary"
            >
              Submit Password
            </button>
            {uploadMessage && <p className="mt-2 text-sm text-red-500">{uploadMessage}</p>}
          </div>
        )}

        {/* Add CSV Upload Section (Conditionally rendered) */}
        {passwordCorrect && (
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Upload CSV</h3>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mr-2"
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className={`btn ${selectedFile && !uploading ? 'btn-primary' : 'btn-secondary'}`}
            >
              {uploading ? 'Submiting...' : 'Submit'}
            </button>
            {uploadMessage && <p className="mt-2 text-sm">{uploadMessage}</p>}
          </div>
        )}
        {/* End CSV Upload Section */}

        <div className="table-wrapper">
          <h3 className="text-center" style={{ padding: "5px" }}>
            Data List
          </h3>
          {
            <DataTable
              columns={columns}
              data={filteredItems} // Use the filteredItems derived from pdfuser state
              direction="auto"
              fixedHeaderScrollHeight="300px"
              pagination
              responsive
              progressPending={pdfuserIsLoading} // Use pdfuserIsLoading for progress pending
              // conditionalRowStyles={conditionalRowStyles}

              subHeaderAlign="right"
              subHeaderWrap
              subHeaderComponent={subHeaderComponentMemo} // Use subHeaderComponentMemo
              subHeader
            />
          }
        </div>
      </div>

      {/* <img src='https://drive.google.com/uc?id=111KXF6h1WG_dYzaHHJHXXDpyac4aV8SI' alt='img' crossOrigin='anonymous'/> */}
    </>
  );
};

export default DemoList;
