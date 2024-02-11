import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResults from "../pages/SearchResults";
import CreateTour from "../admin/CreateTour";
import Profile from "../pages/Profile";
import Payment from "../pages/Payment";
import Admin from "../admin/Admin";
import AdminCreateTour from "../admin/CreateTour";
import AdminUpdateTour from "../admin/UpdateTour";
import Canceled from "../pages/Canceled";
import Success from "../pages/Success";
import ContactUs from "../pages/ContactUs";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tours/search" element={<SearchResults />} />
      <Route path="/tours/create-tour" element={<CreateTour />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/checkout" element={<Payment />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/manage/create-tours" element={<AdminCreateTour />} />
      <Route path="/manage/update-tours/:id" element={<AdminUpdateTour />} />
      <Route path="/canceled" element={<Canceled />} />
      <Route path="/success" element={<Success />} />
      <Route path="/contactus" element={<ContactUs />} />
    </Routes>
  );
}
