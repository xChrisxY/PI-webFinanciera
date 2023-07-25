import { useState, useContext, useEffect } from "react"
import Modal from "./Modal";
import { Link, Navigate } from "react-router-dom"
import { AppContext } from "../context/AppContext";
import image from "../img/user.jpg";
import Swal from "sweetalert";


function NavBar() {

    const { empleado, setAcceso } = useContext(AppContext);

    const [isOpen, setIsOpen] = useState(false);
    const [mdificar, setModificar] = useState(false);
    const [admin, setAdmin] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [salir, setSalir] = useState(false);
    const [mensajeError, setMensajeError] = useState('');

    const [contrasenaActual, setContrasenaActual] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');

    const toggleNavbar = () => {

        setIsOpen(!isOpen);

    }

    const modificarPassword = () => {

        setModificar(!mdificar);

    }

    const handleChangeNuevaContrasena = e => {

        e.preventDefault();

        if (nuevaContrasena.length !== 6) {

            setMensajeError('La contraseña debe tener exactamente 6 dígitos');
            return;

        }

        setMensajeError('');
        cambiarPassword();

    }

    //comprobamos si la contraseña actual es válida para modificarla
    const cambiarPassword = () => {

        const informacion = {

            contrasenaActual,
            nuevaContrasena,
            idEmpleado

        }

        const requestInit = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(informacion)

        }

        fetch('http://ec2-18-204-21-84.compute-1.amazonaws.com/modificarPassword', requestInit)
            .then(res => res.json())
            .then(res => {

                if (res.message === 'Contraseña actual incorrecta') {

                    Swal("¡Error!", res.message, "error");

                } else {

                    Swal("Proceso Exitoso", `Contraseñas modificadas!`, "success");

                }

                setContrasenaActual("");
                setNuevaContrasena("");

                modificarPassword();
            });

    }


    const [perfilModal, setPerfilModal] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [idEmpleado, setIdEmpleado] = useState('');

    const finalizarDia = e => {

        Swal("Buen trabajo!", `Has finalizado el día ¡Nos vemos mañana!`, "success");

        setSalir(true);

    }

    useEffect(() => {

        if (empleado.puesto === 'Gestor de cobranza') {

            setAdmin(false);

        }

        const { nombre, apellidoMaterno, apellidoPaterno, usuario, email, idEmpleado } = empleado;

        setNombre(nombre);
        setApellidoPaterno(apellidoMaterno);
        setApellidoMaterno(apellidoPaterno);
        setUsuario(usuario);
        setEmail(email);
        setIdEmpleado(idEmpleado);


    }, []);

    if (salir) {

        localStorage.clear();

        setAcceso(false);

        return (<Navigate to="/" />)
    }

    return (

        <div className="p-5 bg-slate-900">
            <div className="md:flex md:justify-between md:items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h1 className="font-extrabold text-5xl text-white animate-fade-in">
                        CADOFI SERVICIOS INTEGRALES
                    </h1>
                </div>

                <div className="text-center">
                    <button
                        onClick={toggleNavbar}
                        type="button"
                        className="text-white md:hidden"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <ul
                        className={`text-white font-mono ${isOpen ? 'block' : 'hidden'
                            } md:flex md:justify-end md:items-center text-xl pt-1 md:pt-0`}
                    >
                        <li className="px-5 hover:bg-red-900 hover:rounded-md">

                            <Link to="/menu">Inicio</Link>

                        </li>

                        <li className="px-5 hover:bg-red-900 hover:rounded-md">

                            <button onClick={e => { setPerfilModal(true) }}>Perfil</button>

                            <Modal isOpen={perfilModal} onClose={e => { setPerfilModal(false) }}>

                                <h2 className="text-cyan-900 font-bold mb-4 text-center text-3xl">Perfil</h2>

                                <div className="text-black inline">

                                    <div className="flex justify-center">

                                        <img src={image} alt="usuario-icon" className="w-48" />


                                    </div>

                                    <p className="inline-flex p-3">Nombre: <span className="text-gray-400">{nombre} </span></p>
                                    <p className="inline-flex text-gray-400">{apellidoPaterno}</p>
                                    <p className="inline-flex text-gray-400">{apellidoMaterno}</p>
                                    <p className="p-3">Email : <span className="text-gray-400">{email}</span></p>
                                    <p className="p-3">Usuario: <span className="text-gray-400">{usuario}</span></p>
                                    <p className="p-3">Contraseña: <span className="text-gray-400"> ******** </span></p>

                                </div>

                                <div className="text-center">

                                    <button className="p-2 text-white font-bold bg-blue-500 rounded-md" onClick={modificarPassword}>Modificar Contraseña</button>

                                </div>

                                {mdificar

                                    ?

                                    <div className="text-center p-4 m-4  shadow-2xl">

                                        <input
                                            type="password"
                                            placeholder="Contraseña actual"
                                            className="border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 p-2 m-2"
                                            value={contrasenaActual}
                                            onChange={e => { setContrasenaActual(e.target.value) }}
                                        />

                                        <input
                                            type="password"
                                            placeholder="Nueva contraseña"
                                            className="border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 p-2 m-2"
                                            value={nuevaContrasena}
                                            onChange={e => { setNuevaContrasena(e.target.value) }}
                                        />

                                        {mensajeError && <p className="text-red-500 text-sm">{mensajeError}</p>}

                                        <div className="text-center">

                                            <button
                                                className="p-2 text-white font-bold bg-blue-700 rounded-md mt-2"
                                                onClick={handleChangeNuevaContrasena}
                                            >
                                                Modificar
                                            </button>

                                            <button
                                                className="p-2 text-white font-bold bg-red-700 rounded-md mt-2 mx-2"
                                                onClick={modificarPassword}
                                            >
                                                Cancelar
                                            </button>

                                        </div>

                                    </div>

                                    :

                                    <div>


                                    </div>

                                }

                                <div className="text-center">

                                    <button onClick={e => { setPerfilModal(false) }} id="referenciaLaboral" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">Cerrar</button>

                                </div>

                            </Modal>

                        </li>

                        {admin ?

                            <li className="px-5 hover:bg-red-900 hover:rounded-md"><button onClick={finalizarDia}>Salir</button></li>

                            :

                            <li>
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
                        }



                    </ul>
                </div>
            </div>
        </div>

    )
}

export default NavBar