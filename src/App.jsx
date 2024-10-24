import { Routes, Route } from "react-router-dom";
import { DishesProvider } from "./providers/DishesProvider.jsx";
import useAuth from "./hooks/useAuth.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Food from "./pages/Food";
import Cart from "./pages/Cart";
import "./App.css";

function App() {
  const { foodAppToken, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <DishesProvider>
      <NavBar />
      <Routes>
        {/* TODO: Add a page not found route */}
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
    </DishesProvider>
  );
}

export default App;
