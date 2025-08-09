import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import PortofolioPage from "./pages/PortofolioPage";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortofolioPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
