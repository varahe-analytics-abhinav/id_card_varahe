import React, { useMemo, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import FilterComponent from "../Common/FilterComponent";
import Loader from "../Loader/index";
import { usePdfUserList } from "../../hooks/pdfuser";
// import { useReactToPrint } from "react-to-print";

const PdfList = () => {
  const { pdfuser, pdfuserIsLoading } = usePdfUserList();
console.log(pdfuser);
  
  // const { blogData, blogIsLoading } = useBlogList();
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
// console.log(blogData);
  // console.log(pdfuser)
  // const licenceCertificateref = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => licenceCertificateref.current,
  // });



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
  // console.log(blogData ? blogData: "")

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
            alt={"img"}
            width={"100px"}
            height={"80px"}
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
      cell: (row) => row.Designation,
      sortable: true,
    },
    {
      name: "Blood Group",
      selector: (row) => row["Blood Group"],
      cell: (row) => row["Blood Group"],
      sortable: true,
    },
    //        {
    //            name: 'Offer Price',
    //            selector: row => row.tags.map((e,i)=>{
    //             return <span>{e}</span>
    //            })
    //        },

    //        {
    //            name: 'Published',
    //            selector: row => row.isPublished ?<span class="badge badge-success">YES</span> : <span class="badge badge-danger">NO</span>
    //        },
    //        {
    //            name: 'Make pdf',
    //            selector: row => <button className='btn btn-primary' data-toggle="modal"
    //            data-target="#exampleModalview2"
    //            data-whatever="@getbootstrap"
    // onClick={()=>{
    //     setBlog(row)
    // console.log(row);
    // }}

    //          >pdf</button>
    //        },
    {
      name: "Make pdf",
      selector: (row) => (
        <Link
          to={`/view-pdf/${row["Employee Code"]}`}
          className="btn btn-primary"
          // onClick={handlePrint}
      >
          pdf
        </Link>
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
    <>
      {/* <ViewBlogModel
            id="exampleModalview2"
      
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            blog={blog}
          /> */}
      <div className="container" style={{ padding: "20px" }}>
        {/* <div className="text-right">
   
   <Link  to={"/addblog"}  className="btn btn-dark">Add Blog <i className="fa fa-plus"></i></Link>  
              </div> */}
        <div className="table-wrapper">
          <h3 className="text-center" style={{ padding: "5px" }}>
            Data List
          </h3>
          {
            <DataTable
              columns={columns}
              data={filteredItems}
              direction="auto"
              fixedHeaderScrollHeight="300px"
              pagination
              responsive
              progressPending={pdfuserIsLoading}
              // conditionalRowStyles={conditionalRowStyles}

              subHeaderAlign="right"
              subHeaderWrap
              subHeaderComponent={subHeaderComponent}
              subHeader
            />
          }
        </div>
      </div>

      {/* <img src='https://drive.google.com/uc?id=111KXF6h1WG_dYzaHHJHXXDpyac4aV8SI' alt='img' crossOrigin='anonymous'/> */}
    </>
  );
};

export default PdfList;
