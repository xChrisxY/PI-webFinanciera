import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useRef } from "react";
import Cobrar from "./Cobrar";

function Busqueda({ listaClientes, setCliente }) {


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

        <div className="bg-white">

            <div className="p-5">

                <h1 className="font-bold text-5xl text-center p-5">Lista de clientes</h1>

                <div className="flex justify-end p-10">

                    <input type="text" id="curp" value={nombre} placeholder="Buscar" className="font-bold p-1 mx-6 border-b border-black" onChange={e => { setNombre(e.target.value) }} />

                </div>

                <div className="bg-slate-100 m-5 p-5 border border-black">

                    <table className="table-auto w-full">


                        <thead className="border-b border-gray-500">

                            <tr>
                                <th>CURP</th>
                                <th>NOMBRE</th>
                                <th>TELÉFONO</th>
                                <th>CORREO</th>
                                <th>EDITAR</th>
                                <th>ELIMINAR</th>

                            </tr>
                            
                        </thead>

                        <tbody>

                            {clientesFiltro.map(cliente => {

                                const { curp, nombre, telefono, email } = cliente;

                                return (

                                    <tr className="border-b border-gray-500 text-center" key={curp}>

                                        <td className="p-3">{curp}</td>
                                        <td className="p-3">{nombre}</td>
                                        <td className="p-3">{telefono}</td>
                                        <td className="p-3">{email}</td>
                                        <td><button className="bg-green-700 text-white rounded-md p-2" id={curp} onClick={editarCliente}>Editar</button></td>
                                        <td><button className="bg-blue-800 text-white rounded-md p-2" id={curp} onClick={cobrarCliente } > Cobrar </button></td>

                                    </tr>

                                )

                            })}

                        </tbody>

                    </table>

                </div>

            </div>


        </div>



    )
}

export default Busqueda