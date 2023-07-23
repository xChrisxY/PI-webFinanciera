import img from "../img/cadofi.jpeg";
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
import { useEffect, useState, useContext } from "react";
import Modal from "./Modal";
import Swal from 'sweetalert';
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function MenuPrincipal() {

    const [openModal, setOpenModal] = useState(false);
    const [finaliarDia, setFinalizarDia] = useState(false);
    const [admin, setAdmin] = useState(true);
    const { empleado, setAcceso } = useContext(AppContext);

    useEffect(() => {

        if (empleado.puesto === 'Gestor de cobranza') {

            setAdmin(false);

        }

    }, [])

    const finalizarDia = e => {

        Swal("Buen trabajo!", `Has finalizado el día ¡Nos vemos mañana!`, "success");

        setFinalizarDia(true);

    }

    if (finaliarDia) {

        localStorage.clear();

        setAcceso(false);

        return (<Navigate to="/" />)
    }

    return (

        <div className="flex flex-col min-h-screen bg-blue-950">

            <NavBar />

            {/* sm:min-h-screen */}
            <div className="lg:flex lg:flex-col lg:flex-grow lg:justify-center lg:items-center">

                <div className='text-white grid lg:grid-cols-2 max:grid-cols-1'>

                    <div className="text-center m-5 pt-5 lg:pt-0"> 

                        <h1 className="lg:text-6xl font-bold pb-5 text-5xl">¡BIENVENIDO!</h1>

                        <p className="font-bold"><span className="text-xl">Un nuevo día para hacer el mejor trabajo</span></p>

                        <div className="lg:flex lg:justify-center pt-10 hidden sm:hidden">

                            <img src={img} alt="cadofoi logo" className="w-72" />

                        </div>

                    </div>

                    <div className="flex justify-center">

                        <ul className="text-white font-mono text-2xl pt-5">

                            <li className="p-5 hover:text-blue-400">

                                {admin ?
                                    <Link to="/registroGestores">Registrar gestor</Link>
                                    :
                                    <Link to="/registro">Registrar cliente</Link>
                                }

                            </li>

                            <li className="p-5 hover:text-blue-400">

                                {admin ?

                                    <Link to="/solicitudes">Ver solicitudes</Link>
                                    :
                                    <Link to="/cobrar">Registrar pago</Link>
                                }

                            </li>

                            <li className="p-5 hover:text-blue-400">

                                {admin ?
                                    <Link to="/gestores">Consultar gestores</Link>
                                    :
                                    <Link to="/consultar">Consultar clientes</Link>
                                }

                            </li>

                            {admin ?

                                <li className="p-5 hover:text-red-500"><button onClick={finalizarDia}>Salir</button></li>
                                
                                :

                                <div>

                                    <li className="p-5 hover:text-blue-400"><Link to="/historial">Historial de pagos</Link></li>
                                    <li className="p-5 hover:text-blue-400"><Link to="/cobrados">Cobrados del día</Link></li>
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

                                                    <button onClick={finalizarDia} id="confirmar" className="bg-cyan-800 hover:bg-cyan-950 text-white font-bold py-2 px-10 mt-4 rounded mx-2">Confirmar</button>
                                                    <button onClick={e => { setOpenModal(false) }} id="cancelar" className="bg-red-800 hover:bg-red-950 text-white font-bold py-2 px-10 mt-4 rounded mx-2">Cancelar</button>

                                                </div>

                                            </Modal>

                                        </div>


                                    </li>


                                </div>
                                
                                }


                        </ul>

                    </div>

                </div>
            </div>

        </div>

    )
}

export default MenuPrincipal