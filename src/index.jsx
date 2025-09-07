// src/index.jsx
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./global.css";

const container = document.getElementById("root");
const root = createRoot(container);

// Set basename for GitHub Pages deployment
const basename = process.env.NODE_ENV === 'production' ? '/portfolio-project' : '';

root.render(
    <BrowserRouter basename={basename}>
        <App />
    </BrowserRouter>
);
