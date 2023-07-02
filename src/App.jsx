import Formulario from "./components/Formulario"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuPrincipal from "./components/MenuPrincipal"
import Busqueda from "./components/Busqueda"
import { useEffect, useState } from "react"
import Cobrar from "./components/Cobrar";
import Login from "./components/Login";
import Historial from "./components/Historial";

function App() {

  const [listaClientes, setListaClientes] = useState([]);
  const [empleado, setEmpleado] = useState({});
  const [cliente, setCliente] = useState({});

  useEffect(() => {

    const getClientes = () => {

      fetch(`http://localhost:5176/api/cliente/${empleado.idEmpleado}`)
        .then(res => res.json())
        .then(res => setListaClientes(res));

    }

    getClientes()

  }, [empleado]);

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login setEmpleado = {setEmpleado}/>} />

        <Route path="/menu" element={<MenuPrincipal />} />

        <Route path="/registro" element={<Formulario cliente={cliente} empleado = {empleado}/>} />

        <Route path="/cobrar" element={<Cobrar listaClientes={listaClientes} cliente={cliente} empleado={empleado}/>} />

        <Route path="/consultar" element={<Busqueda listaClientes={listaClientes} setCliente = {setCliente}/>} />

        <Route path="/historial" element = {<Historial listaClientes = {listaClientes}/>}/>

      </Routes>

    </BrowserRouter>

  )

}

export default App
