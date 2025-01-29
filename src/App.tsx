import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute"; // Importa el nuevo componente
import DashboardLayout from "./Layout/DashboardLayout";
import Login from "./components/Login/Login";
import Home from "./components/Pages/Home";
import RegisterForm from "./components/Register/RegisterForm";
import Recursos from "./components/Pages/Recursos";
import Equipos from "./components/Pages/Equipos";
import Miembros from "./components/Pages/Miembros";
import Proyectos from "./components/Pages/Proyectos";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
      </Route>

      {/* <Route element={<ProtectedRoute/>}> */}
      
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/miembros" element={<Miembros />} />
          <Route path="/proyectos" element={<Proyectos />} />
        </Route>

      {/* </Route> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;