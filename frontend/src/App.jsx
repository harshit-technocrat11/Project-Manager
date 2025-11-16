import { useState } from "react";

import "./App.css";
// import Sidebar from './components/layout/Sidebar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public- unauth routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* authenticated routes  */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects/" element={<ProjectsPage />}>
            <Route path=":id" element={<ProjectDetailPage />} />
          </Route>

          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
