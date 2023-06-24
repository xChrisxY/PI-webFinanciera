import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Navigate } from "react-router-dom";
import { useRef } from "react";

function Busqueda({ listaClientes, eliminarCliente, setCliente }) {

    const [nombre, setNombre] = useState('');
    const [clientesFiltro, setClientesFiltro] = useState([listaClientes]);
    const [openModal, setOpenModal] = useState(false);
    const [confirmacion, setConfirmacion] = useState(false);
    const [id, setId] = useState('');
    const [editar, setEditar] = useState(false);

    const idRef = useRef(id);

    //Apartado de busqueda en 
    useEffect(() => {

        setClientesFiltro(listaClientes.filter((c) => {

            if (c.nombre.includes(nombre)) {

                return c;

            }

        }));


    }, [nombre, confirmacion]);


    useEffect(() => {

        if (confirmacion) {

            eliminarCliente(id);

        }

        setConfirmacion(false);

    }, [confirmacion]);


    const editarCliente = (e) => {

        idRef.current = e.target.id;

        const clienteAct = clientesFiltro.find(cliente => cliente.curp === idRef.current);

        setCliente(clienteAct);

        setEditar(true);

    };




    if (editar) {

        return (<Navigate to="/registro" />);

    }

    return (

        <div className="bg-white">

            <div className="p-5">

                <h1 className="font-bold text-5xl text-center p-5">Lista de clientes</h1>

                <div className="flex justify-end p-10">

                    <input type="text" id="curp" value={nombre} placeholder="Buscar" className="font-bold p-1 mx-6 border-b border-black" onChange={e => { setNombre(e.target.value.toUpperCase()) }} />

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

                                const { curp, nombre, telefono, correo } = cliente;

                                return (

                                    <tr className="border-b border-gray-500 text-center" key={curp}>

                                        <td className="p-3">{curp}</td>
                                        <td className="p-3">{nombre}</td>
                                        <td className="p-3">{telefono}</td>
                                        <td className="p-3">{correo}</td>
                                        <td><button className="bg-green-700 text-white rounded-md p-2" id={curp} onClick={editarCliente}>Editar</button></td>
                                        <td><button className="bg-red-700 text-white rounded-md p-2" id={curp} onClick={e => { setOpenModal(true), setId(curp) }} > Eliminar </button></td>

                                    </tr>

                                )

                            })}

                        </tbody>

                    </table>

                    <Modal isOpen={openModal} onClose={e => { setOpenModal(false) }}>

                        <h2 className="font-bold mb-4 text-cyan-900 text-2xl text-center">¿Estás seguro?</h2>

                        <form className="font-bold text-center">

                            <p className="text-neutral-500 p-2">Si eliminas el cliente del sistema, se eliminará de forma permanente del sistema</p>

                            <div className="p-2">

                                <button className="border border-neutral-400 text-stone-500 p-2 m-5" onClick={e => { setOpenModal(false) }}>No, mantener cliente</button>
                                <button className="bg-red-500 text-white p-2 m-5" onClick={e => { setOpenModal(false), setConfirmacion(true) }}>Si, eliminar cliente</button>

                            </div>

                        </form>

                    </Modal>


                </div>

            </div>


        </div>



    )
}

export default Busqueda