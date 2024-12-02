import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ allowedTypes }) => {
  const { tipoUsuario } = useUser();

  if (!allowedTypes.includes(tipoUsuario)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
