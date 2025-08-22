import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Desktop1 from "./pages/Desktop1";
import Mobile from "./pages/Mobile";

function useIsMobile(breakpoint = 1800) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    // set initial
    setIsMobile(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [breakpoint]);
  return isMobile;
}

function App() {
    const isMobile = useIsMobile(1800);
  return (
    <div id="mainRoot">
      <Routes>
        <Route path="/" element={isMobile ? <Mobile /> : <Desktop1 />} />
      </Routes>
    </div>
  );
}

export default App;
