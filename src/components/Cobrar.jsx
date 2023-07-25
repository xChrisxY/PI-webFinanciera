import { useEffect, useState, useContext } from "react"
import img from "../img/candado.png";
import NavBar from "../components/NavBar"
import Swal from "sweetalert";
import { AppContext } from "../context/AppContext";
import jsPDF from "jspdf";
import image from "../img/cadofi.jpeg"
import 'jspdf-autotable';   

function Cobrar() {

    const { listaClientes, empleado, gestor, ubicacion, setAgregado } = useContext(AppContext);

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

    // Se genera la fecha para el reporte del pago
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
    const [habilitado, setHabilitado] = useState(true);

    const [infoCredito, setInfoCredito] = useState({});
    const [pagosRealizados, setPagosRealizados] = useState([]);
    const [finiquitado, setFiniquitado] = useState([]);

    useEffect(() => {

        const cliente = JSON.parse(localStorage.getItem('COBRO'));

        if (cliente) {

            setNombre(cliente.nombre);
            setFechaNacimiento(cliente.fechaNacimiento);
            setTelefono(cliente.telefono);
            setCorreo(cliente.email);
            setCurp(cliente.curp);
            setRfc(cliente.rfc);
            setEstadoCivil(cliente.estadoCivil);
            setDireccion(cliente.direccion);

            // const getCredito = () => {

            //     fetch(`http://localhost:5176/api/credito/${cliente.curp}`)
            //         .then(res => res.json())
            //         .then(res => setInfoCredito(res));

            // }

            // getCredito()

            const getCredito = () => {

                //fetch(`http://database-cadofi-pi.cb818gwnhvze.us-east-1.rds.amazonaws.com:5176/api/credito/${cliente.curp}`)
                fetch(`http://3.133.76.177:3000/api/credito/${cliente.curp}`)
                    .then(res => res.json())
                    .then(res => setInfoCredito(res));

            }

            getCredito()

            setMostrar(true);

            setSeleccionado(true);

        }

    }, []);

    const realizarCobro = e => {

        console.log("oofgfigj")

        if (e.target.value !== "") {

            const clienteCobro = listaClientes.find(c => c.curp === e.target.value);

            
            setNombre(clienteCobro.nombre);
            setFechaNacimiento(clienteCobro.fechaNacimiento);
            setTelefono(clienteCobro.telefono);
            setCorreo(clienteCobro.email);
            setCurp(clienteCobro.curp);
            setRfc(clienteCobro.rfc);
            setEstadoCivil(clienteCobro.estadoCivil);
            setDireccion(clienteCobro.direccion);

            // const getCredito = () => {

            //     fetch(`http://localhost:5176/api/credito/${clienteCobro.curp}`)
            //         .then(res => res.json())
            //         .then(res => setInfoCredito(res));

            // }

            // getCredito();

            const getCredito = () => {

                fetch(`http://3.133.76.177:3000/api/credito/${clienteCobro.curp}`)
                    .then(res => res.json())
                    .then(res => setInfoCredito(res));

            }

            getCredito();

            setMostrar(true);
            setSeleccionado(true);

        }

    }   

    useEffect(() => {

        if (mostrar) {

            console.log(infoCredito)

            if (infoCredito.length > 0) {

                setFolio(Math.floor(Math.random() * 9000) + 1000);
                setMontoDiario(infoCredito[0].pagos);
                setIdCredito(infoCredito[0].idCredito);
                setMontoTotal(infoCredito[0].totalCredito);

            }

        }

    }, [infoCredito, mostrar]);


    useEffect(() => {

        console.log(idCredito)

        //Obtener información de los pagos para calcular el saldo restante
        const getInfoCredito = () => {

            fetch(`http://3.133.76.177:3000/api/pago/${idCredito}`)
                .then(res => res.json())
                .then(res => setPagosRealizados(res));

        }

        getInfoCredito();


    }, [idCredito, folio]);


    useEffect(() => {

        let suma = 0;

        console.log(pagosRealizados.length);
        console.log(montoTotal)

        pagosRealizados.map(pago => {

            // suma += pago.monto;
            suma += parseInt(pago.monto);

        });

        console.log(suma)

        if (seleccionado) {

            setNpago(pagosRealizados.length + 1);

        } else {

            setNpago(pagosRealizados.length);

        }

        setSaldoRestante(montoTotal - suma);
        setMonto(montoDiario);



    }, [pagosRealizados]);




    const finiquitarCredito = () => {

        const informacion = {

            estatus: "finiquitado",
            curp

        }

        const requestInit = {

            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(informacion)

        }

        fetch('http://3.133.76.177:3000/api/finiquitarCliente', requestInit)
            .then(res => res.text())
            .then(res => console.log(res));


        swal("¡Éxito!", "El cliente ha cumplido con todos sus pagos", "success");


    }

    const generarReporte = () => {

        swal("¡Éxito!", "El pago se ha registrado correctamente", "success");

        const doc = new jsPDF();

        const marginLeft = 70;
        const marginTop = 20;
        const lineHeight = 10;
        let currentY = marginTop;

        doc.setFontSize(20);
        doc.text('Reporte de Pago', 70, 15);

        const imageWidth = 50;
        const imageHeight = 50;

        // Agregar la imagen en las coordenadas (x, y)
        doc.addImage(image, 'JPEG', marginLeft, currentY, imageWidth, imageHeight);

        // Ajustar la posición vertical (coordenada Y) después de agregar la imagen
        currentY += imageHeight + 10;

        doc.setFontSize(14);
        doc.setTextColor(255, 0, 0);
        doc.text('Gracias por su pago.', 20, 110);

        const data1 = [
            ['Cliente', 'Monto', 'Fecha', 'Referencia de Pago', 'Hora de pago', 'Sucursal', 'No. Pago'],
            [nombre, "$" + monto, fecha, folio, hora, ubicacion, nPago]
        ];

        const marginLeftt = 20;
        const marginTopp = 70;

        doc.autoTable({

            head: [data1[0]], // Encabezados de la tabla (primera fila)
            body: data1.slice(1), // Cuerpo de la tabla (resto de filas)
            startY: marginTopp, // Posición vertical para comenzar la tabla
            margin: { left: marginLeftt }, // Margen izquierdo de la tabla
            showHead: 'firstPage', // Mostrar encabezados en la primera página

        });

        doc.save('reporte.pdf');

        localStorage.removeItem('COBRO');

        setSeleccionado(false);
        setSaldoRestante(0);
        setFolio(0);
        setHabilitado(true);
        setMonto(0);
        setMontoDiario(0);
    }


    const registrarPago = () => {

        if (seleccionado) {

            const pago = {

                idCredito,
                fecha,
                hora,
                monto,
                saldoRestante

            }

            const enviarPago = {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pago)

            }


            //http://localhost:5176/api/pago

            fetch('http://3.133.76.177:3000/api/pago', enviarPago)
                .then(res => res.text())
                .then(res => {

                    if (res == 'CORRECTO') {

                        generarReporte();


                    } else if (res == 'FINIQUITADO') {

                        generarReporte();
                        finiquitarCredito();


                    } else {


                        Swal("¡Error!", "El monto ingresado es menor al monto diario permitido.", "error");

                    }

                });

            setAgregado(true);

        } else {

            Swal("¡Error!", "Primero debes seleccionar un cliente", "error");
        }

    }

    return (<div className="flex flex-col min-h-screen bg-blue-950">

        <NavBar />

        <div className="flex flex-col flex-grow items-center justify-center bg-blue-950">

            <div className="text-center bg-white shadow-2xl">

                <h1 className="font-bold text-4xl pt-2">Generar pago</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2">

                    <div className="lg:bg-slate-100 lg:mx-20 my-5 border-2 border-gray-400 shadow-md mx-10">

                        <h1 className="text-blue-900 text-3xl font-semibold p-10">Información del cliente</h1>

                        <select
                            name="clientes"
                            id="clientes"
                            className="px-8 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none
                            bg-blue-900 text-white font-bold text-center border-4 border-white"

                        >

                            <option value="">Escoge un cliente</option>

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

                    <div className="lg:bg-slate-100 lg:mx-20 lg:my-5 border-2 border-gray-400 shadow-md mx-10">

                        <div className="flex justify-center p-5">

                            <h1 className="text-blue-800 text-3xl font-semibold px-5">Información de pago</h1>
                            <img src={img} alt="candado" className="w-7 h-10" />

                        </div>

                        <div className="text-xl">

                            {seleccionado ?

                                <div>

                                    <p className="p-5 font-bold text-blue-900">Folio de pago: <span className="text-gray-500">{folio}</span></p>
                                    <p className="p-5 font-bold text-blue-900">Fecha de pago: <span className="text-gray-500">{fecha}</span></p>
                                    <p className="p-5 font-bold text-blue-900">Hora de pago: <span className="text-gray-500">{hora}</span></p>
                                    <p className="p-5 font-bold text-blue-900">Sucursal: <span className="text-gray-500">{ubicacion}</span></p>
                                    <p className="p-5 font-bold text-blue-900">Gestor de venta: <span className="text-gray-500">{gestor}</span></p>
                                    <p className="p-5 font-bold text-blue-900">No. de pago: <span className="text-gray-500">{nPago}</span></p>
                                    <p className="p-5 font-bold text-blue-900">Saldo restante:<span className="text-gray-500"> ${saldoRestante}</span></p>



                                </div>

                                :

                                <div>

                                    <p className="p-5 font-bold text-blue-900">Folio de pago: <span className="text-gray-500">{folio}</span></p>
                                    <p className="p-5 font-bold text-blue-900">Fecha de pago: <span className="text-gray-500">{fecha}</span></p>
                                    <p className="p-5 font-bold text-blue-900">Hora de pago: <span className="text-gray-500">{hora}</span></p>
                                    <p className="p-5 font-bold text-blue-900">Sucursal: <span className="text-gray-500">{ubicacion}</span></p>
                                    <p className="p-5 font-bold text-blue-900">Gestor de venta: <span className="text-gray-500">{gestor}</span></p>
                                    <p className="p-5 font-bold text-blue-900">No. de pago: <span className="text-gray-500">0</span></p>
                                    <p className="p-5 font-bold text-blue-900">Saldo restante:<span className="text-gray-500"> $ </span></p>



                                </div>

                            }

                        </div>

                        <div className="p-5">

                            <button className="bg-blue-900 text-white font-bold rounded-md pt-2 pb-2 mx-5">

                                <span className="text-xl block">${montoDiario}</span>

                                <span className="text-lg px-1">Pago Diario</span>

                            </button>

                            <button

                                className="bg-blue-900 text-white font-bold rounded-md lg:pt-2 lg:pb-2 lg:px-2 lg:mx-5 lg:mt-0 mt-5 pt-2 pb-2 mx-5 px-4"
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

                            <button className="bg-blue-900 text-white font-bold lg:px-28 py-2 px-14" onClick={registrarPago}>Confirmar</button>

                        </div>

                    </div>
                </div>

            </div>

        </div>


    </div>)

}

export default Cobrar