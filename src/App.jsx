import Formulario from "./components/Formulario"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuPrincipal from "./components/MenuPrincipal"
import Busqueda from "./components/Busqueda"
import { useEffect, useState } from "react"
import Cobrar from "./components/Cobrar";
import Login from "./components/Login";
import Historial from "./components/Historial";
import CobradosDia from "./components/CobradosDia";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/menu" element={<MenuPrincipal />} />

        <Route path="/registro" element={<Formulario />} />

        <Route path="/cobrar" element={<Cobrar />} />

        <Route path="/consultar" element={<Busqueda />} />

        <Route path="/historial" element={<Historial />} />

        <Route path="/cobrados" element={<CobradosDia />} />

      </Routes>

    </BrowserRouter>

  )

}

export default App
