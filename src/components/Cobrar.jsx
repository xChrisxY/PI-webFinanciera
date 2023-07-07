import { useEffect, useState, useContext } from "react"
import img from "../img/candado.png";
import NavBar from "../components/NavBar"
import swal from "sweetalert";
import { AppContext } from "../context/AppContext";

function Cobrar() {

    const { listaClientes, cliente, empleado } = useContext(AppContext);

    const [mostrar, setMostrar] = useState(false);
    const [seleccionado, setSeleccionado] = useState(false);
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [curp, setCurp] = useState('');
    const [rfc, setRfc] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [direccion, setDireccion] = useState('')
    const [monto, setMonto] = useState(0);

    const [folio, setFolio] = useState(0);

    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    
    const fecha = `${day}-${month}-${year}`;


    const hora = `${new Date().getHours()} : ${new Date().getMinutes()}`

    const [idCredito, setIdCredito] = useState(0);
    const [montoDiario, setMontoDiario] = useState(0);
    const [saldoRestante, setSaldoRestante] = useState(0);
    const [montoTotal, setMontoTotal] = useState(0);
    const [nPago, setNpago] = useState(0);
    const [infoSucursal, setInfoSucursal] = useState([]);
    const [ubicacion, setUbicacion] = useState('');
    const [gestor, setGestor] = useState('');
    const [habilitado, setHabilitado] = useState(true);

    const [infoCredito, setInfoCredito] = useState({});
    const [pagosRealizados, setPagosRealizados] = useState([]);

    useEffect(() => {

        if (Object.keys(cliente).length > 0) {

            setNombre(cliente.nombre);
            setFechaNacimiento(cliente.fechaNacimiento);
            setTelefono(cliente.telefono);
            setCorreo(cliente.email);
            setCurp(cliente.curp);
            setRfc(cliente.rfc);
            setEstadoCivil(cliente.estadoCivil);
            setDireccion(cliente.direccion);

            const getCredito = () => {

                fetch(`http://localhost:5176/api/credito/${cliente.curp}`)
                    .then(res => res.json())
                    .then(res => setInfoCredito(res));

            }

            getCredito()

            setMostrar(true);

            setSeleccionado(true);

        }

    }, []);


    useEffect(() => {

        setGestor(empleado.nombre);

        const getSucursal = () => {

            fetch(`http://localhost:5176/api/sucursal/${empleado.nuevoIdSucursal}`)
                .then(res => res.json())
                .then(res => setInfoSucursal(res));

        }

        getSucursal();

    }, []);

    useEffect(() => {

        if (infoSucursal.length > 0) {
    
            setUbicacion(infoSucursal[0].ubicacion);

        }

    }, [infoSucursal])


    const realizarCobro = e => {

        const clienteCobro = listaClientes.find(c => c.curp === e.target.value);

        console.log(clienteCobro);

        setNombre(clienteCobro.nombre);
        setFechaNacimiento(clienteCobro.fechaNacimiento);
        setTelefono(clienteCobro.telefono);
        setCorreo(clienteCobro.email);
        setCurp(clienteCobro.curp);
        setRfc(clienteCobro.rfc);
        setEstadoCivil(clienteCobro.estadoCivil);
        setDireccion(clienteCobro.direccion);

        const getCredito = () => {

            fetch(`http://localhost:5176/api/credito/${clienteCobro.curp}`)
                .then(res => res.json())
                .then(res => setInfoCredito(res));

        }

        getCredito();

        setMostrar(true);
        setSeleccionado(true);
        setGestor(empleado.nombre);

    }

    useEffect(() => {

        if (mostrar) {

            setFolio(Math.floor(Math.random() * 9000) + 1000);
            setMontoDiario(infoCredito[0].pagos);
            setIdCredito(infoCredito[0].idCredito);
            setMontoTotal(infoCredito[0].totalCredito);

        }

    }, [infoCredito])


    useEffect(() => {

        //Obtener información de los pagos para calcular el saldo restante
        const getInfoCredito = () => {

            fetch(`http://localhost:5176/api/pago/${idCredito}`)
                .then(res => res.json())
                .then(res => setPagosRealizados(res));

        }

        getInfoCredito();

    }, [idCredito]);


    useEffect(() => {

        let suma = 0;

        pagosRealizados.map(pago => {

            suma += pago.monto;

        })

        setNpago(pagosRealizados.length + 1)
        setSaldoRestante(montoTotal - suma);
        setMonto(montoDiario);

    }, [pagosRealizados]);


    const registrarPago = () => {

        const pago = {

            idCredito,
            fecha,
            hora,
            monto,

        }

        const enviarPago = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pago)

        }

        fetch('http://localhost:5176/api/pago', enviarPago)
            .then(res => res.json())
            .then(res => console.log(res));

        swal("¡Éxito!", "El pago se ha registrado correctamente", "success");
        setHabilitado(true);

    }


    return (<div className="flex flex-col min-h-screen bg-blue-950">

        <NavBar />

        <div className="flex flex-col flex-grow items-center justify-center bg-blue-950">

            <div className="text-center bg-white shadow-2xl">

                <h1 className="font-bold text-4xl pt-2">Generar pago</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2">

                    <div className="bg-slate-200 mx-20 my-5 border-2 border-gray-400 shadow-md">

                        <h1 className="text-blue-900 text-3xl font-semibold p-10">Información del cliente</h1>

                        <select
                            name="clientes"
                            id="clientes"
                            className="p-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none
                            bg-blue-900 text-white font-bold text-center border-4 border-white"
                        >

                            {listaClientes.map(opcion => (

                                <option key={opcion.curp} value={opcion.curp} onClick={realizarCobro}>

                                    {opcion.nombre}

                                </option>

                            ))}

                        </select>

                        <div className="text-slate-600 font-bold p-5 text-xl">

                            {seleccionado ?

                                <div>

                                    <p className="p-5 font-bold">{nombre}</p>
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

                    <div className="bg-slate-200 m-10 mx-20 my-5 border-2 border-gray-400 shadow-md">

                        <div className="flex justify-center p-5">

                            <h1 className="text-blue-800 text-3xl font-semibold px-5">Información de pago</h1>
                            <img src={img} alt="candado" className="w-7 h-10" />

                        </div>

                        <div className="text-xl">

                            <p className="p-5 font-bold text-blue-900">Folio de pago: <span className="text-gray-500">{folio}</span></p>
                            <p className="p-5 font-bold text-blue-900">Fecha de pago: <span className="text-gray-500">{fecha}</span></p>
                            <p className="p-5 font-bold text-blue-900">Hora de pago: <span className="text-gray-500">{hora}</span></p>
                            <p className="p-5 font-bold text-blue-900">Sucursal: <span className="text-gray-500">{ubicacion}</span></p>
                            <p className="p-5 font-bold text-blue-900">Gestor de venta: <span className="text-gray-500">{gestor}</span></p>
                            <p className="p-5 font-bold text-blue-900">No. de pago: <span className="text-gray-500">{nPago}</span></p>
                            <p className="p-5 font-bold text-blue-900">Saldo restante:<span className="text-gray-500"> ${saldoRestante}</span></p>

                        </div>

                        <div className="p-5">

                            <button className="bg-blue-900 text-white font-bold rounded-md pt-2 pb-2 mx-5">

                                <span className="text-xl block">${montoDiario}</span>

                                <span className="text-lg px-1">Pago Diario</span>

                            </button>

                            <button
                                className="bg-blue-900 text-white font-bold rounded-md pt-2 pb-2 px-2 mx-5"
                                onClick={e => { setHabilitado(false) }}
                            >

                                <span className="text-lg block">Otra</span>

                                <span className="text-lg">cantidad</span>

                            </button>

                        </div>

                        <div>

                            <input
                                type="number"
                                placeholder="Ingrese otra cantidad"
                                className="p-2 placeholder:bg-slate-300 placeholder:font-bold m-1"
                                disabled={habilitado}
                                onChange={e => { setMonto(+e.target.value) }}
                            />

                        </div>

                        <div className="p-5">

                            <button className="bg-blue-900 text-white font-bold px-28 py-2" onClick={registrarPago}>Confirmar</button>

                        </div>

                    </div>
                </div>

            </div>

        </div>



    </div>)

}

export default Cobrar