import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Desktop1 from "./pages/Desktop1";
import Scrollbar from "smooth-scrollbar";

function App() {
  useEffect(() => {
    const rootElement = document.querySelector('#mainRoot');
    if (rootElement) {
      Scrollbar.init(rootElement, {
        damping: 0.025, // Adjust the damping factor as needed
        thumbMinSize: 20, // Adjust the minimum thumb size as needed
        renderByPixels: true, // Enable rendering by pixels
        alwaysShowTracks: false, // Hide tracks when not needed
        continuousScrolling: true, // Enable continuous scrolling
      });
    }

    return () => {
      if (rootElement && Scrollbar.has(rootElement)) {
        Scrollbar.get(rootElement).destroy();
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "#0f0f12";
  }, []);

  return (
    <div id="mainRoot" style={{ height: '100vh', overflow: 'hidden' }}>
      <Routes>
        <Route path="/" element={<Desktop1 />} />
      </Routes>
    </div>
  );
}

export default App;
