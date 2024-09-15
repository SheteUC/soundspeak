import React from "react";
import ReactDOM from "react-dom/client"; 
import "./index.css"; 
import App from "./App"; 
import { ConvexProvider, ConvexReactClient } from "convex/react";
import convex from "./convex";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </React.StrictMode>
);
