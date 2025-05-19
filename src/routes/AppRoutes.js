import { Route, Routes } from "react-router-dom";
import MainPage from "../pages";
// import RestPage from "../pages/resturants/RestPage";
// import AddRestaurantPage from "../components/ResturantContent/add";
// import SLackPage from "../pages/slack/Slack";
// import Task from "../pages/task/Task";
// import Members from "../pages/members/Members";
import ExcelToPdf from "../pages/exceltopdf/ExceltoPdf";
import EmployeeTable from "../pages/pdfid/PdfId";
// import PDFFile from "../pages/pdfview/PdfFile";
import PdfView from "../pages/testclean/PdfView";
// import DataPdf from "../pages/testclean/DataPdf";
import DataPff from "../pages/testclean/DataPdf";
// import PdfView from "../pages/pdfview/PdfView";

export default function AppRoutes() {
 

  return (
    <Routes>
        <Route index element={<MainPage />} />
        {/* <Route path="/view-pdf/:id" element={<PdfView />} /> */}
        <Route path="/view-pdf/:id" element={<DataPff />} />
        <Route path="/exceltoPdf" element={<ExcelToPdf />} />
        {/* <Route path="/exceltoPdf" element={<EmployeeTable />} /> */}
        {/* <Route path="/productivity" element={<RestPage />} />
        <Route path="/productivity/add" element={<AddRestaurantPage />} />
        <Route path="/task" element={<Task/>} />
        <Route path="/slack" element={<SLackPage />} />
        <Route path="/members" element={<Members />} />
        <Route path="/download-pdf/:id" element={<PDFFile />} /> */}




      {/* </Route> */}

      <Route path="*" element={<h1>404 Page not found</h1>} />
    </Routes>
  );
}
