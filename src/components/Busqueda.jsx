import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Cobrar from "./Cobrar";
import { AppContext } from "../context/AppContext";

function Busqueda() {

    const { listaClientes, setCliente, ubicacion, empleado } = useContext(AppContext);

    const [nombre, setNombre] = useState('');
    const [clientesFiltro, setClientesFiltro] = useState([]);
    const [confirmacion, setConfirmacion] = useState(false);
    const [editar, setEditar] = useState(false);
    const [cobrar, setCobrar] = useState(false);

    const [cls, setCls] = useState([]);


    const editarCliente = (e) => {

        localStorage.setItem('ID', JSON.stringify(e.target.id));

        setEditar(true);

    };

    if (editar) {

        return (<Navigate to="/registro" />);

    }

    const cobrarCliente = e => {

        const aCobrar = listaClientes.find(cliente => cliente.curp === e.target.id);

        console.log("El cliente a cobrar es: ");

        console.log(aCobrar);

        localStorage.setItem('COBRO', JSON.stringify(aCobrar));

        setCobrar(true);

    }

    if (cobrar) {

        return (<Navigate to="/cobrar" />)
    }

    return (

        <div className="flex flex-col min-h-screen bg-blue-950">

            <NavBar />

            <div className="flex flex-col flex-grow items-center justify-center">

                <div className="bg-white shadow-md p-0">

                    {/* <h1 className="lg:text-3xl text-black pb-5 text-center font-bold">Lista de clientes de la sucursal {ubicacion}</h1> */}

                    <div className="border border-black bg-gray-200 text-black">

                        <div className="h-96 overflow-auto">

                            <div className="table-responsive">

                                <table className="table-auto w-full border border-gray-500">

                                    <thead className="sticky top-0 bg-gray-200">

                                        <tr className="border-b border-white bg-slate-300">

                                            <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl hidden lg:table-cell">CURP</th>
                                            <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">NOMBRE</th>
                                            <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">TELÉFONO</th>
                                            <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">CORREO</th>
                                            <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">ACCIÓN</th>

                                        </tr>

                                    </thead>

                                    <tbody className="flex-col">

                                        {listaClientes.map(cliente => {

                                            const { curp, nombre, telefono, email } = cliente;

                                            return (

                                                <tr className="border-2  border-gray-500 text-center font-bold" key={curp}>

                                                    <td className="lg:p-3 text-sm md:text-lg lg:text-lg hidden lg:table-cell">{curp}</td>
                                                    <td className="lg:p-3 text-sm md:text-lg lg:text-xl">{nombre}</td>
                                                    <td className="lg:p-3 text-sm md:text-lg lg:text-xl">{telefono}</td>
                                                    <td className="lg:p-3 text-sm md:text-lg lg:text-xl">{email}</td>

                                                    <td className="p-3 text-sm md:text-lg lg:text-xl lg:inline-flex ">

                                                        <button className="bg-green-700 text-white rounded-md p-1 hover:bg-green-800 lg:m-2 my-1" id={curp} onClick={editarCliente}>Editar</button>
                                                        <button className="bg-blue-800 text-white rounded-md p-1 hover:bg-blue-900 lg:m-2 " id={curp} onClick={cobrarCliente}>Cobrar</button>

                                                    </td>

                                                </tr>

                                            )

                                        })}

                                    </tbody>

                                </table>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>



    )
}

export default Busqueda