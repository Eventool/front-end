import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { guestPages } from "../utils/util";

const GuestRoute = () => {
  const { tipoUsuario } = useUser();

  console.log("oiii");
  if (tipoUsuario !== null && guestPages.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
