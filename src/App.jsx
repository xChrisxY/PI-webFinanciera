import Formulario from "./components/Formulario"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuPrincipal from "./components/MenuPrincipal"
import Busqueda from "./components/Busqueda"
import { useEffect, useState } from "react"
import ejemplo from "./Conexion"
import Cobrar from "./components/Cobrar";
import Login from "./components/Login";


function App() {

  //mx-auto para centrar contenido
  // max-w-md mx-auto


  const [listaClientes, setListaClientes] = useState(ejemplo);
  const [cliente, setCliente] = useState({});
  
  const eliminarCliente = (id) => {

    const clientesActualizados = listaClientes.filter( cliente => cliente.curp !== id);

    setListaClientes(clientesActualizados);

  }

  useEffect(() => {

    // const getClientes = () => {

    //   fetch('http://localhost:3000/api')
    //     .then(res => res.json())
    //     .then(res => setListaClientes(res));

    // }

    // getClientes();

  }, []);

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element = {<Login />}/>

        <Route path="/menu" element={<MenuPrincipal />} />

        <Route path="/registro" element = {<Formulario setListaClientes={setListaClientes} listaClientes={listaClientes} cliente = {cliente}/>}/>

        <Route path="/cobrar" element = {<Cobrar listaClientes={listaClientes}/>}/>

        <Route path="/consultar" element = {<Busqueda listaClientes={listaClientes} eliminarCliente = {eliminarCliente} setCliente={ setCliente }/> }/>

      </Routes>

    </BrowserRouter>

  )
}

export default App
