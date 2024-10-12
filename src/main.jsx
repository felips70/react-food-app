import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./utility.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UserInfoProvider } from "./contexts/UserInfoContext.jsx";
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
