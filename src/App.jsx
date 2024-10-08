import { BrowserRouter, Routes, Route } from "react-router-dom";
import DishesContext from "./contexts/Dishes.jsx";
import useAuth from "./hooks/useAuth.jsx";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Food from "./pages/Food";
import Cart from "./pages/Cart";
import dishes from "./assets/dishes.json";
import "./App.css";
import useUserInfo from "./hooks/useUserInfo.jsx";

function App() {
  const { foodAppToken, loading: authLoading } = useAuth();
  // The reason useUserInfo was added here is so that the loading would happen
  // explicitly rather than implicitly by the loading time of useAuth
  const { loading: userInfoLoading } = useUserInfo();

  if (authLoading || userInfoLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DishesContext.Provider value={dishes}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/log-in" element={<LogIn />}></Route>
          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          {foodAppToken && (
            <>
              <Route path="/food" element={<Food />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </DishesContext.Provider>
  );
}

export default App;
