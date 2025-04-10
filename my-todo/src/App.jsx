import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/admin/dashboard";
import TodosList from "./pages/admin/todos/list";
import AuthGuard from "./guards/auth_guard";
import { ToastContainer } from "react-toastify";
import CompletedTodos from "./pages/admin/todos/completed";

function App() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-mode", "light");
    // localStorage.setItem('flowbite-theme-mode', 'light');
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />,
        <Route path="/login" element={<Login />} />,
        <Route path="/register" element={<Register />} />
        <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        }
      />
      <Route
        path="/todos/list"
        element={
          <AuthGuard>
            <TodosList />
          </AuthGuard>
        }
      />
      <Route
        path="/todos/completed"
        element={
          <AuthGuard>
            <CompletedTodos />
          </AuthGuard>
        }
      />
    </Routes>
    </>
  );
}

export default App;
