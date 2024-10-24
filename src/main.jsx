import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./utility.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import UserInfoProvider from "./providers/UserInfoProvider.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    </AuthProvider>
  </BrowserRouter>
);
