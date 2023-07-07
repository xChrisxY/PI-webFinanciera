import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useRef } from "react";
import Cobrar from "./Cobrar";
import { AppContext } from "../context/AppContext";

function Busqueda() {

    const { listaClientes, setCliente } = useContext(AppContext);

    const [nombre, setNombre] = useState('');
    const [clientesFiltro, setClientesFiltro] = useState([]);
    const [confirmacion, setConfirmacion] = useState(false);
    const [id, setId] = useState('')
    const [editar, setEditar] = useState(false);
    const [cobrar, setCobrar] = useState(false);

    const idRef = useRef(id);

    //Apartado de busqueda en 
    useEffect(() => {

        setClientesFiltro(listaClientes.filter((c) => {

            if (c.nombre.includes(nombre)) {

                return c;

            }

        }));


    }, [nombre, confirmacion]);


    const editarCliente = (e) => {

        idRef.current = e.target.id;

        const clienteAct = clientesFiltro.find(cliente => cliente.curp === idRef.current);

        setCliente(clienteAct);

        setEditar(true);

    };

    if (editar) {

        return (<Navigate to="/registro" />);

    }

    const cobrarCliente = e => {

        idRef.current = e.target.id;

        const clienteAct = clientesFiltro.find(cliente => cliente.curp === idRef.current);

        console.log(clienteAct)

        setCliente(clienteAct);

        setCobrar(true);

    }

    if (cobrar) {

        return (<Navigate to="/cobrar" />)
    }

    return (

        <div className="flex flex-col min-h-screen bg-blue-950">

            <NavBar />

            <div className="flex flex-col flex-grow items-center justify-center">

                <h1 className="font-bold text-5xl text-center text-white">Lista de clientes</h1>

                <div className="p-10">

                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        placeholder="Buscar"
                        className="font-bold p-1 mx-6 border-b border-white placeholder:bg-blue-950"
                        onChange={e => { setNombre(e.target.value) }}
                    />

                </div>

                <div className="m-5 p-5 border border-black bg-white text-black w-8/12">

                    {clientesFiltro.length > 0

                        ?

                        <table className="table-auto w-full text-xl">

                            <thead className="border-b border-gray-500">

                                <tr>
                                    <th>CURP</th>
                                    <th>NOMBRE</th>
                                    <th>TELÉFONO</th>
                                    <th>CORREO</th>
                                    <th>EDITAR</th>
                                    <th>COBRAR</th>

                                </tr>

                            </thead>

                            <tbody>

                                {clientesFiltro.map(cliente => {

                                    const { curp, nombre, telefono, email } = cliente;

                                    return (

                                        <tr className="border-b border-gray-500 text-center" key={curp}>

                                            <td className="p-5">{curp}</td>
                                            <td className="p-5">{nombre}</td>
                                            <td className="p-5">{telefono}</td>
                                            <td className="p-5">{email}</td>
                                            <td><button className="bg-green-700 text-white rounded-md p-2 hover:bg-green-800" id={curp} onClick={editarCliente}>Editar</button></td>
                                            <td><button className="bg-blue-800 text-white rounded-md p-2 hover:bg-blue-900" id={curp} onClick={cobrarCliente} > Cobrar </button></td>

                                        </tr>

                                    )

                                })}

                            </tbody>

                        </table>

                        :

                        <div>

                            

                        </div>

                    }

                </div>

            </div>

        </div>



    )
}

export default Busqueda