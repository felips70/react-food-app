import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./utility.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UserInfoProvider } from "./contexts/UserInfoContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  </AuthProvider>
);
