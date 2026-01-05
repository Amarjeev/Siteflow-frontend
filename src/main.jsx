import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./main.css";
import { BrowserRouter } from "react-router-dom";

import "./security/authInterceptor.js"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <Toaster position="top-right" />
  </BrowserRouter>
);
