import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {

      const trabajador = localStorage.getItem('Empleado');

      if (!trabajador) {

            return <Navigate to="/" />

      }
      
      return <Outlet />
}

export default ProtectedRoute