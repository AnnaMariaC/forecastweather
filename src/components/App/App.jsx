import { Routes, Route } from "react-router-dom";
import { Weather, Forecast, Home } from "../../features";
import { Nav, NotFound } from "../";
import "./App.css";

export function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
