import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, Signup, Profile } from "./pages/pages";
import { useEffect, useState } from "react";
import "./styles/global.scss";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  // const [theme, setTheme] = useState("light");

  // const localTheme = localStorage.getItem("theme");
  // const stheme = window.matchMedia("(prefers-color-scheme: dark)");

  // useEffect(() => {
  //   if (localTheme === null) {
  //     localStorage.setItem("theme", "light");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (stheme.matches == true) {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // }, [stheme.matches]);

  // console.log(stheme.matches);

  // console.log(localTheme);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
