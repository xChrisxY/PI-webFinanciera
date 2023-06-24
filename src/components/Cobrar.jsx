import { useEffect, useState } from "react"
import img from "../img/candado.png";
import NavBar from "../components/NavBar"
import Button from "./Button";
import swal from "sweetalert";


function Cobrar({ listaClientes }) {

    const [nombreFiltro, setNombreFiltro] = useState('');
    const [opciones, setOpciones] = useState([]);
    const [id, setId] = useState('');
    const [seleccionado, setSeleccionado] = useState(false);

    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [curp, setCurp] = useState('');
    const [rfc, setRfc] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [direccion, setDireccion] = useState('')


    const fecha = `${new Date().getDate()} / ${new Date().getMonth() + 1} / ${new Date().getFullYear()}`;
    const hora = `${new Date().getHours()} : ${new Date().getMinutes()}`


    useEffect(() => {

        setOpciones(listaClientes.filter(c => {

            if (c.nombre.includes(nombreFiltro)) {

                return c;

            }

        }));

    }, [nombreFiltro]);

    useEffect(() => {

        const cliente = opciones.find(cliente => cliente.curp === id);

        if (cliente) {

            setNombre(cliente.nombre);
            setFechaNacimiento(cliente.fecha);
            setTelefono(cliente.telefono);
            setCorreo(cliente.correo);
            setCurp(cliente.curp);
            setRfc(cliente.rfc);
            setEstadoCivil(cliente.estadoCivil);
            setDireccion(cliente.direccion);

            setSeleccionado(true);
        }

    }, [id, opciones]);

    return (<div>

        <NavBar />

        <div className="bg-blue-950">

            <div className="flex items-center justify-center h-screen">

                <div className="text-center bg-white m-20 shadow-md">

                    <h1 className="font-bold text-4xl m-10">Generar pago</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        <div className="bg-slate-200 mx-20 my-10 py-5 border-2 border-gray-400 shadow-md">

                            <h1 className="text-blue-900 text-3xl font-semibold p-10">Información del cliente</h1>

                            <input

                                type="text"
                                id="nombre"
                                placeholder="Buscar cliente"
                                className="font-bold border-b border-black placeholder-blue-900 m-5 bg-slate-200 text-xl w-60 focus:outline-none focus:ring-0"
                                onChange={e => { setNombreFiltro(e.target.value.toUpperCase()) }}

                            />

                            <select
                                name="clientes"
                                id="clientes"
                                onClick={e => { setId(e.target.value) }}
                                className="p-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                            >

                                {opciones.map(opcion => (

                                    <option key={opcion.curp} value={opcion.curp}>

                                        {opcion.nombre}

                                    </option>

                                ))}

                            </select>


                            <div className="text-slate-600 font-mono p-5 text-xl">

                                {seleccionado ?

                                    <div className="">

                                        <p className="p-5">{nombre}</p>
                                        <p className="p-5">{fechaNacimiento}</p>
                                        <p className="p-5">{telefono}</p>
                                        <p className="p-5">{correo}</p>
                                        <p className="p-5">{rfc}</p>
                                        <p className="p-5">{curp}</p>
                                        <p className="p-5">{estadoCivil}</p>
                                        <p className="p-5">{direccion}</p>

                                    </div>

                                    :

                                    <div>
                                        <p className="p-5">Nombre completo</p>
                                        <p className="p-5">fecha de nacimiento</p>
                                        <p className="p-5">Número teléfonico</p>
                                        <p className="p-5">Correo electronico</p>
                                        <p className="p-5">RFC</p>
                                        <p className="p-5">Curp</p>
                                        <p className="p-5">Estado civil</p>
                                        <p className="p-5">Dirección</p>
                                    </div>

                                }



                            </div>


                        </div>

                        <div className="bg-slate-200 m-10 mx-20 my-10 border-2 border-gray-400 shadow-md">

                            <div className="flex justify-center p-10">

                                <h1 className="text-blue-800 text-3xl font-semibold px-5">Información de pago</h1>
                                <img src={img} alt="candado" className="w-7 h-10" />

                            </div>

                            <div className="text-xl">

                                <p className="p-5 font-bold text-blue-900">Folio de pago:</p>
                                <p className="p-5 font-bold text-blue-900">Fecha de pago: <span className="text-gray-500">{fecha}</span></p>
                                <p className="p-5 font-bold text-blue-900">Hora de pago: <span className="text-gray-500">{hora}</span></p>
                                <p className="p-5 font-bold text-blue-900">Sucursal: </p>
                                <p className="p-5 font-bold text-blue-900">No. de pago: </p>
                                <p className="p-5 font-bold text-blue-900">Saldo restante: </p>

                            </div>



                            <div className="p-5">

                                <button className="bg-blue-900 text-white font-bold p-2 rounded-md">

                                    <span className="text-xl block p-1">$500</span>

                                    <span className="p-2">Pago Diario</span>

                                </button>

                            </div>

                            <div className="p-5">

                                <button className="bg-blue-900 text-white font-bold px-28 py-2">Confirmar</button>

                            </div>




                        </div>
                    </div>

                </div>
            </div>

        </div>



    </div>)

}

export default Cobrar