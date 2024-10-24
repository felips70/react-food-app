import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import "./utility.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
