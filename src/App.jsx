import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Location from "./components/Location";
import Whether from "./components/Whether";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NextDay from "./components/NextDay";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Location />} />
          <Route path="/:lat/:lon/:city" element={<Whether />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
