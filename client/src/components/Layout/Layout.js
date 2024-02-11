import React from "react";
import { useLocation } from "react-router-dom";
import Routers from "../../routes/Routers";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function Layout() {
  const location = useLocation();

  // Check if the current page is Profile or Admin
  const isProfileOrAdminPage =
    location.pathname === "/profile" ||
    location.pathname === "/admin" ||
    location.pathname === "/manage/create-tours" ||
    location.pathname.includes("/manage/update-tours/");

  return (
    <>
      {/* Render Header only if not on Profile or Admin page */}
      {!isProfileOrAdminPage && <Header />}

      <Routers />

      {/* Render Footer only if not on Profile or Admin page */}
      {!isProfileOrAdminPage && <Footer />}
    </>
  );
}
