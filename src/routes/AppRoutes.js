import { Route, Routes } from "react-router-dom";
import MainPage from "../pages";
import ExcelToPdf from "../pages/exceltopdf/ExceltoPdf";
// Remove or comment out unused imports
// import EmployeeTable from "../pages/pdfid/PdfId";
// import PdfView from "../pages/testclean/PdfView";
import DataPff from "../pages/testclean/DataPdf";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/view-pdf/:id" element={<DataPff />} />
      <Route path="/exceltoPdf" element={<ExcelToPdf />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
