import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { act, useState } from "react";
import Table from "./pages/Table";
import Weather from "./pages/Weather";

const App = () => {
  const [arr, setArr] = useState(() => {
    // Load data from localStorage if available
    const saved = localStorage.getItem("arrData");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save to localStorage whenever arr changes
    localStorage.setItem("arrData", JSON.stringify(arr));
  }, [arr]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home arr={arr} setArr={setArr} />} />
        <Route path="/table" element={<Table arr={arr} setArr={setArr} />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
