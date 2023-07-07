import img from "../img/cadofi.jpeg";
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
import { useEffect, useState, useContext } from "react";
import Modal from "./Modal";
import Swal from 'sweetalert';
import { Navigate } from "react-router-dom";
import {AppContext} from "../context/AppContext";

function MenuPrincipal() {

    const [openModal, setOpenModal] = useState(false);
    const [finaliarDia, setFinalizarDia] = useState(false);
    const {acceso, setAcceso} = useContext(AppContext);

    const finalizarDia = e => {

        const trabajador = JSON.parse(localStorage.getItem('Empleado'));

        Swal("Buen trabajo!", `Has finalizado el día ${trabajador.usuario} ¡Nos vemos mañana!`, "success");   

        setFinalizarDia(true);

    }

    if (finaliarDia) {

        console.log("Eliminando localStorage");

        localStorage.clear();

        setAcceso(false);

        return (<Navigate to="/"/>) 
    }


    return (

        <div className="flex flex-col min-h-screen">

            <NavBar />

            <div className="flex flex-col flex-grow justify-center items-center bg-blue-950">

                <div className='text-white grid grid-cols-2'>

                    <div className="text-center m-5 mx-16">

                        <h1 className="text-6xl font-bold pb-5">¡BIENVENIDO!</h1>
                        <p className="font-bold"><span className="text-xl">Un nuevo día para hacer el mejor trabajo</span></p>

                        <div className="flex justify-center pt-10">

                            <img src={img} alt="cadofoi logo" className="w-72" />

                        </div>

                    </div>

                    <div className="flex justify-center">

                        <ul className="text-white font-mono text-2xl pt-5">

                            <li className="p-5 hover:text-blue-400"><Link to="/registro">Registrar cliente</Link></li>
                            <li className="p-5 hover:text-blue-400"><Link to="/cobrar">Registrar pago</Link></li>
                            <li className="p-5 hover:text-blue-400"><Link to="/consultar">Consultar clientes</Link></li>
                            <li className="p-5 hover:text-blue-400"><Link to="/historial">Historial de pagos</Link></li>
                            <li className="p-5 hover:text-blue-400"><Link>Generar reporte</Link></li>
                            <li className="p-5 hover:text-blue-400">

                                <div>

                                    <button onClick={e => { setOpenModal(true) }} className="text-white font-bold rounded hover:text-red-400">

                                        Finalizar el día

                                    </button>

                                    <Modal isOpen={openModal} onClose={e => { setOpenModal(false) }}>

                                        <h2 className="font-bold mb-4 text-cyan-900 text-2xl text-center">Se está finalizando el día</h2>

                                        <div>

                                            <p className="text-xl text-black text-center">
                                                ¡Se está finalizando el día, asegurate de hacer los reportes y llevar a cabo
                                                las actividades correspondientes!
                                            </p>


                                        </div>

                                        <div className="text-center">

                                            <button onClick={ finalizarDia } id="confirmar" className="bg-cyan-800 hover:bg-cyan-950 text-white font-bold py-2 px-10 mt-4 rounded mx-2">Confirmar</button>
                                            <button onClick={e => { setOpenModal(false) }} id="cancelar" className="bg-red-800 hover:bg-red-950 text-white font-bold py-2 px-10 mt-4 rounded mx-2">Cancelar</button>

                                        </div>

                                    </Modal>

                                </div>


                            </li>

                        </ul>

                    </div>

                </div>
            </div>

        </div>

    )
}

export default MenuPrincipal