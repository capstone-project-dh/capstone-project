import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const root = document.getElementById("root");
const app = createRoot(root);
app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);