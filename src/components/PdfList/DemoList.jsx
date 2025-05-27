import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import FilterComponent from "../Common/FilterComponent";
import Loader from "../Loader/index";
import { API_HOST_URL } from "../../config";
import { toast } from "react-toastify";
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField, 
  Box, 
  Paper, 
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

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

  // Custom styles for DataTable
  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
        padding: '16px',
      },
    },
    headRow: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '#e0e0e0',
        backgroundColor: '#f5f5f5',
      },
    },
    headCells: {
      style: {
        fontSize: '14px',
        fontWeight: 600,
        padding: '16px',
      },
    },
    cells: {
      style: {
        padding: '16px',
      },
    },
  };

  const columns = [
        {
      name: "Image",
      selector: (row) => (
        <div>
          <img
            style={{ borderRadius: '8px', objectFit: 'cover' }}
            src={row["Image Link"].match(/(?:id=|\/d\/)([^\/?]+)/)?.[1]
              ? `https://drive.google.com/thumbnail?id=${row["Image Link"].match(/(?:id=|\/d\/)([^\/?]+)/)?.[1]}`
              : "https://via.placeholder.com/100"}
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
      cell: (row) => <Chip label={row["Blood Group"]} color="primary" size="small" />,
      sortable: true,
    },
    {
      name: "Make PDF",
      selector: (row) => (
        <Button
          component={Link}
          to={`/view-pdf/${row["Employee Code"]}`}
          variant="contained"
          color="primary"
          startIcon={<PictureAsPdfIcon />}
          size="small"
        >
          View PDF
        </Button>
      ),
    },
  ];

  // Password dialog state
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePasswordSubmitDialog = () => {
    handlePasswordSubmit();
    if (password === REQUIRED_PASSWORD) {
      handleCloseDialog();
    }
  };

  if (pdfuserIsLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Employee ID Card Management
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3, justifyContent: 'center' }}>
          <Grid item xs={12} sm={8} md={6} lg={5}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom align="center">
                  Upload New Data
                </Typography>
                
                {!passwordCorrect ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={handleOpenDialog}
                    >
                      Authenticate to Upload
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ mb: 2, textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ mb: 1 }}
                      >
                        Select CSV File
                        <input
                          type="file"
                          accept=".csv"
                          hidden
                          onChange={handleFileChange}
                        />
                      </Button>
                      {selectedFile && (
                        <Typography variant="body2">
                          Selected: {selectedFile.name}
                        </Typography>
                      )}
                    </Box>
                    
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleUpload}
                      disabled={!selectedFile || uploading}
                    >
                      {uploading ? "Uploading..." : "Upload Data"}
                    </Button>
                    
                    {uploadMessage && (
                      <Typography 
                        variant="body2" 
                        color={uploadMessage.includes('successful') ? 'success.main' : 'error.main'}
                        sx={{ mt: 1 }}
                      >
                        {uploadMessage}
                      </Typography>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <DataTable
          title="Employee List"
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          subHeader
          customStyles={customStyles}
          highlightOnHover
          pointerOnHover
          progressPending={pdfuserIsLoading}
          progressComponent={<Loader />}
        />
      </Paper>
      
      {/* Password Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Authentication Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the password to access upload functionality.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
          {uploadMessage && uploadMessage !== 'Uploading...' && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {uploadMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handlePasswordSubmitDialog} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DemoList;