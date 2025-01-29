import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Comprueba si hay un token

  // Si el usuario está autenticado, redirigir a la página de inicio
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;