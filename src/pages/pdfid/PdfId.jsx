import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { usePdfUserList } from "../../hooks/pdfuser";
import Loader from "../../components/Loader";
import FilterComponent from "../../components/Common/FilterComponent";
import { Button } from "@mui/material";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"; // Import html2canvas

const EmployeeTable = () => {
  const { pdfuser, pdfuserIsLoading } = usePdfUserList();
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const subHeaderComponent = useMemo(() => {
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

  // Function to generate PDF for a single row
  const downloadPDF = (row) => {
    // Prepare the content for the PDF
    const element = document.createElement("div");
    element.style.padding = "20px";
    element.innerHTML = `
      <h2>${row["Employee name"]}</h2>
      <p><strong>Employee Code:</strong> ${row["Employee Code"]}</p>
      <p><strong>Project Name:</strong> ${row["Project Name"]}</p>
      <p><strong>Designation:</strong> ${row.Designation}</p>
      <p><strong>Blood Group:</strong> ${row["Blood Group"]}</p>
      <img src="${row["Image Link"].replace(
        /\/file\/d\/(.+)\/(.+)/,
        "/thumbnail?&id=$1"
      )}" alt="Employee Image" width="150px" height="100px"/>
    `;

    // Use html2canvas to capture the content as a canvas
    html2canvas(element).then((canvas) => {
      // Create PDF from the canvas
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10, 180, 150);
      pdf.save(`${row["Employee name"]}_details.pdf`);
    });
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <div>
          <img
            src={row["Image Link"].replace(
              /\/file\/d\/(.+)\/(.+)/,
              "/thumbnail?&id=$1"
            )}
            alt="img"
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
        <Button onClick={() => downloadPDF(row)}>
          Download PDF
        </Button>
      ),
    },
  ];

  if (pdfuserIsLoading) {
    return <Loader />;
  }

  const filteredItems =
    pdfuser && pdfuser.length > 0
      ? pdfuser.filter(
          (item) =>
            JSON.stringify(item)
              .toLowerCase()
              .indexOf(filterText.toLowerCase()) !== -1
        )
      : [];

  return (
    <div className="container" style={{ padding: "20px" }}>
      <div className="table-wrapper">
        <h3 className="text-center" style={{ padding: "5px" }}>
          Data List
        </h3>
        <DataTable
          columns={columns}
          data={filteredItems}
          direction="auto"
          fixedHeaderScrollHeight="300px"
          pagination
          responsive
          progressPending={pdfuserIsLoading}
          subHeaderAlign="right"
          subHeaderWrap
          subHeaderComponent={subHeaderComponent}
          subHeader
        />
      </div>
    </div>
  );
};

export default EmployeeTable;
