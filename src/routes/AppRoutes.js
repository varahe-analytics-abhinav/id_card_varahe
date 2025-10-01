import { Route, Routes } from "react-router-dom";
import MainPage from "../pages";
import ExcelToPdf from "../pages/exceltopdf/ExceltoPdf";
import DataPff from "../pages/IDPDF/DataPdf";
import NotFound from "../pages/NotFound";
import Wit from "../pages/What_india_thinks/Wit";
import WitPdf from "../pages/WitPdf/Wit-pdf";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/view-pdf/:id" element={<DataPff />} />
         <Route path="/wit-pdf/:id" element={<WitPdf />} />
      <Route path="/exceltoPdf" element={<ExcelToPdf />} />
      
        <Route path="/wit-pdf" element={<Wit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
