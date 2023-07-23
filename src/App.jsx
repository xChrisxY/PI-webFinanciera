import Formulario from "./components/Formulario"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuPrincipal from "./components/MenuPrincipal"
import Busqueda from "./components/Busqueda"
import Cobrar from "./components/Cobrar";
import Login from "./components/Login";
import Historial from "./components/Historial";
import CobradosDia from "./components/CobradosDia";
import ProtectedRoute from "./components/ProtectedRoute";
import FormularioGestores from "./components/FormularioGestores";
import Solicitudes from "./components/Solicitudes";
import ListaGestores from "./components/ListaGestores";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route element = {<ProtectedRoute />}>

          <Route path="/menu" element={<MenuPrincipal />} />

          <Route path="/registro" element={<Formulario />} />

          <Route path="/cobrar" element={<Cobrar />} />

          <Route path="/consultar" element={<Busqueda />} />

          <Route path="/historial" element={<Historial />} />

          <Route path="/cobrados" element={<CobradosDia />} />

          <Route path="/registroGestores" element = {<FormularioGestores />}/>

          <Route path="/solicitudes" element = {<Solicitudes />}/>

          <Route path="/gestores" element = {<ListaGestores />}/>

        </Route>

      </Routes>

    </BrowserRouter>

  )

}

export default App
