import { useState } from "react";

import "./App.css";
// import Sidebar from './components/layout/Sidebar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
    <Toaster/>
    <BrowserRouter>
      <Routes>
        {/* routing example - >  */}
        {/* <Route path="xyz" element={renderpage}/> */}
        {/* <Route
          path="/schools"
          element={<div>school of computer sciences</div>}
        /> */}

        {/* public- unauth routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* authenticated routes  */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects/" element={<ProjectsPage />}/>
         
          <Route path="/projects/id" element={<ProjectDetailsPage />} />

          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
