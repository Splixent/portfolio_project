import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Desktop1 from "./pages/Desktop1";

function App() {
  return (
    <div id="mainRoot">
      <Routes>
        <Route path="/" element={<Desktop1 />} />
      </Routes>
    </div>
  );
}

export default App;
