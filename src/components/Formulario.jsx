import Button from "./Button"
import NavBar from "./NavBar"
import { useEffect, useState, useContext, Children } from "react";
import Swal from 'sweetalert';
import Modal from "./Modal";
import bank from "../img/bank.png";
import credit from "../img/credit.png";
import personal from "../img/personal.png"
import work from "../img/work.png";
import Cotizador from "./Cotizador";
import { AppContext } from "../context/AppContext"

function Formulario() {

    const { empleado, setAgregado } = useContext(AppContext);

    const [mensajeError, setMensajeError] = useState('');
    const [mensajeError1, setMensajeError1] = useState('');
    const [mensajeError2, setMensajeError2] = useState('');
    const [mensajeError3, setMensajeError3] = useState('');
    const [mensajeError4, setMensajeError4] = useState('');
    const [mensajeError5, setMensajeError5] = useState('');
    const [disabledMonto, setDisabledMonto] = useState(false);

    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('')
    const [apellidoMaterno, setApellidoMaterno] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [colonia, setColonia] = useState('');
    const [numeroCasa, setNumeroCasa] = useState();
    const [calle, setCalle] = useState('');
    const [rfc, setRfc] = useState('');
    const [curp, setCurp] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [nombreParentesco, setNombreParentesco] = useState('');
    const [parentesco, setParentesco] = useState('');
    const [telefonoParentesco, setTelefonoParentesco] = useState('');
    const [direccionParentesco, setDireccionParentesco] = useState('');
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [salario, setSalario] = useState(0);
    const [puesto, setPuesto] = useState('');
    const [telefonoEmpresa, setTelefonoEmpresa] = useState('');
    const [direccionEmpresa, setDireccionEmpresa] = useState('');
    const [buroCredito, setBuroCredito] = useState('');
    const [creditoActual, setCreditoActual] = useState('');
    const [importeCredito, setImporteCredito] = useState(0);
    const [tarjetaCredito, setTarjetaCredito] = useState('');
    const [tarjetaDebito, setTarjetaDebito] = useState('');
    const [cuentaBancaria, setCuentaBancaria] = useState('');
    const [TotalCredito, setTotalCredito] = useState(25000);
    const [plan, setPlan] = useState('');
    const [pagos, setPagos] = useState(0);
    const [estatus, setEstatus] = useState('pendiente');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);

    const [informacionCliente, setInformacionCliente] = useState({});

    const [referenciaPersonalModal, setReferenciaPersonalModal] = useState(false);
    const [referenciaLaboralModal, setReferenciaLaboralModal] = useState(false);
    const [referenciaCrediticialModal, setReferenciaCrediticiaModal] = useState(false);
    const [referenciaBancariaModal, setReferenciaBancariaModal] = useState(false);

    useEffect(() => {

        const id = localStorage.getItem('ID');

        if (id) {

            setDisabled(true)

            //http://localhost:5176/api/actualizar/${JSON.parse(id)}

            const getInfoCliente = () => {

                fetch(`http://localhost:5176/api/actualizar/${JSON.parse(id)}`)
                    .then(res => res.json())
                    .then(res => setInformacionCliente(res));

            }

            getInfoCliente();

        }


    }, []);

    useEffect(() => {

        if (informacionCliente.length > 0) {

            setNombre(informacionCliente[0].nombre);
            setApellidoPaterno(informacionCliente[0].apellidoPaterno);
            setApellidoMaterno(informacionCliente[0].apellidoMaterno);
            setFechaNacimiento(informacionCliente[0].fechaNacimiento);
            setTelefono(informacionCliente[0].telefono);
            setEmail(informacionCliente[0].email);
            setColonia(informacionCliente[0].colonia);
            setCalle(informacionCliente[0].calle);
            setNumeroCasa(informacionCliente[0].numeroCasa);
            setRfc(informacionCliente[0].rfc);
            setEstatus('activo');
            setCurp(informacionCliente[0].curp);
            setEstadoCivil(informacionCliente[0].estadoCivil);
            setNombreParentesco(informacionCliente[0].nombreParentesco);
            setParentesco(informacionCliente[0].parentesco);
            setTelefonoParentesco(informacionCliente[0].telefonoParentesco);
            setDireccionParentesco(informacionCliente[0].direccionParentesco);
            setNombreEmpresa(informacionCliente[0].nombreEmpresa);
            setSalario(informacionCliente[0].salario);
            setPuesto(informacionCliente[0].puesto);
            setTelefonoEmpresa(informacionCliente[0].telefonoEmpresa);
            setDireccionEmpresa(informacionCliente[0].direccionEmpresa);
            setBuroCredito(informacionCliente[0].buroCredito);
            setCreditoActual(informacionCliente[0].creditoActual);
            setImporteCredito(informacionCliente[0].importeCredito);
            setTarjetaCredito(informacionCliente[0].tarjetaCredito);
            setTarjetaDebito(informacionCliente[0].tarjetaDebito);
            setCuentaBancaria(informacionCliente[0].cuentaBancaria);

        }

    }, [informacionCliente]);


    const validarFormulario = (e) => {

        e.preventDefault();

        if ([nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, telefono, email, colonia, calle, numeroCasa, rfc, curp, estadoCivil, nombreParentesco, parentesco, telefonoParentesco,
            direccionParentesco, nombreEmpresa, puesto, telefonoEmpresa, buroCredito, creditoActual, importeCredito, tarjetaCredito, tarjetaDebito, cuentaBancaria].includes('')) {

            setError(true);

            showAlert();

        } else {

            setError(false);

            if (Object.keys(informacionCliente).length > 0) {

                //editar
                const idReferencia = informacionCliente[0].idReferencia;

                const objCliente = { curp, idEmpleado: empleado.idEmpleado, nombre, apellidoPaterno, apellidoMaterno, email, colonia, calle, numeroCasa, telefono, estadoCivil, rfc, estatus, fechaNacimiento }

                const objReferenciaPersonal = { idReferencia, curp, nombreParentesco, parentesco, direccionParentesco, telefonoParentesco }

                const objReferenciaLaboral = { idReferencia, curp, nombreEmpresa, salario, telefonoEmpresa, direccionEmpresa, puesto }

                const objReferenciaCrediticia = { idReferencia, curp, buroCredito, creditoActual, importeCredito }

                const objReferenciaBancaria = { idReferencia, curp, tarjetaCredito, tarjetaDebito, cuentaBancaria }

                console.log(objCliente);
                console.log(objReferenciaPersonal);
                console.log(objReferenciaLaboral);
                console.log(objReferenciaCrediticia);
                console.log(objReferenciaBancaria);

                const requestInit = {

                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objCliente)

                }

                fetch('http://localhost:5176/api/modificarCliente', requestInit)
                    .then(res => res.text())
                    .then(res => console.log(res));


                const requestInit1 = {

                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objReferenciaPersonal)

                }

                fetch('http://localhost:5176/api/modificarReferencia1', requestInit1)
                    .then(res => res.text())
                    .then(res => console.log(res));


                const requestInit2 = {

                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objReferenciaLaboral)

                }

                fetch('http://localhost:5176/api/modificarReferencia2', requestInit2)
                    .then(res => res.text())
                    .then(res => console.log(res));


                const requestInit3 = {

                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objReferenciaCrediticia)

                }

                fetch('http://localhost:5176/api/modificarReferencia3', requestInit3)
                    .then(res => res.text())
                    .then(res => console.log(res));


                const requestInit4 = {

                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objReferenciaBancaria)

                }

                fetch('http://localhost:5176/api/modificarReferencia4', requestInit4)
                    .then(res => res.text())
                    .then(res => console.log(res));

                localStorage.removeItem('ID');

                setDisabled(false);

                Swal("¡Éxito!", "El cliente se ha actualizado correctamente", "success");

            } else {

                // Aquí se está agregando a un nuevo cliente

                console.log("Agregando un nuevo cliente");

                const objCliente = {

                    curp,
                    idEmpleado: empleado.idEmpleado,
                    nombre,
                    apellidoPaterno,
                    apellidoMaterno,
                    email,
                    colonia,
                    calle,
                    numeroCasa,
                    telefono,
                    estadoCivil,
                    rfc,
                    estatus,
                    fechaNacimiento,
                    buroCredito: 'limpio'

                }


                let idReferencia = Math.floor(Math.random() * 9000) + 1000;

                const objReferenciaPersonal = { idReferencia, curp, nombreParentesco, parentesco, direccionParentesco, telefonoParentesco }

                const objReferenciaLaboral = { idReferencia, curp, nombreEmpresa, salario, telefonoEmpresa, direccionEmpresa, puesto }

                const objReferenciaCrediticia = { idReferencia, curp, buroCredito, creditoActual, importeCredito }

                const objReferenciaBancaria = { idReferencia, curp, tarjetaCredito, tarjetaDebito, cuentaBancaria }

                const idCredito = idReferencia;

                const currentDate = new Date();

                const day = currentDate.getDate().toString().padStart(2, '0');
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                const year = currentDate.getFullYear().toString();

                const fechaInicio = `${day}-${month}-${year}`;

                //Obtenemos la fecha actual

                //Formateamos y obtenemos la fecha en 66 días
                currentDate.setDate(currentDate.getDate() + 66)

                const dia = currentDate.getDate().toString().padStart(2, '0');
                const mes = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                const anio = currentDate.getFullYear().toString();

                const fechaTermino = `${dia}-${mes}-${anio}`;

                const objInfoCredito = {

                    idCredito,
                    curp,
                    fechaInicio,
                    fechaTermino,
                    TotalCredito,
                    plan,
                    pagos: Math.floor(pagos),

                }

                const requestInit = {

                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objCliente)

                }

                fetch('http://localhost:5176/api', requestInit)
                    .then(res => res.text())
                    .then(res => console.log(res));


                const requestInit1 = {

                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objReferenciaPersonal)

                }

                fetch('http://localhost:5176/api/referencia1', requestInit1)
                    .then(res => res.text())
                    .then(res => console.log(res));


                const requestInit2 = {

                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objReferenciaLaboral)

                }

                fetch('http://localhost:5176/api/referencia2', requestInit2)
                    .then(res => res.text())
                    .then(res => console.log(res));


                const requestInit3 = {

                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objReferenciaCrediticia)

                }

                fetch('http://localhost:5176/api/referencia3', requestInit3)
                    .then(res => res.text())
                    .then(res => console.log(res));


                const requestInit4 = {

                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objReferenciaBancaria)

                }

                fetch('http://localhost:5176/api/referencia4', requestInit4)
                    .then(res => res.text())
                    .then(res => console.log(res));



                const enviarCredito = {

                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(objInfoCredito)

                }

                fetch('http://localhost:5176/api/credito', enviarCredito)
                    .then(res => res.text())
                    .then(res => console.log(res));




                Swal("¡Éxito!", "La solicitud se ha mandado correctamente", "success");

            }

            setNombre("");
            setApellidoPaterno("");
            setApellidoMaterno("");
            setFechaNacimiento("");
            setTelefono("");
            setEmail("");
            setColonia("");
            setCalle("");
            setNumeroCasa("");
            setRfc("");
            setCurp("");
            setEstadoCivil("");
            setNombreParentesco("");
            setParentesco("");
            setTelefonoParentesco("");
            setDireccionParentesco("");
            setNombreEmpresa("");
            setSalario(0);
            setPuesto("");
            setTelefonoEmpresa("");
            setDireccionEmpresa("");
            setBuroCredito("");
            setCreditoActual("");
            setImporteCredito(0);
            setTarjetaCredito("");
            setTarjetaDebito("");
            setCuentaBancaria("");

            setAgregado(true);

        }


    }

    const showAlert = () => {

        Swal("¡Error!", "Debe llenar todos los campos del formulario", "error");

    }

    const handleChangeNumero = e => {

        const inputNumero = e.target.value;

        if (!isNaN(inputNumero)) {

            if (inputNumero.length <= 10) {

                setTelefono(inputNumero);
                setMensajeError('');

            }

        } else {

            setMensajeError('Por favor, ingresa solo números!');

        }

    }

    const handleChangeNumeroCasa = e => {

        const inputNumero = e.target.value;

        if (!isNaN(inputNumero)) {

            setNumeroCasa(inputNumero);
            setMensajeError1('');

        } else {

            setMensajeError1('Por favor, ingresa solo números!');

        }

    }

    const handleChangeNumeroParentesco = e => {

        const inputNumero = e.target.value;

        if (!isNaN(inputNumero)) {

            setTelefonoParentesco(inputNumero);
            setMensajeError2('');

        } else {

            setMensajeError2('Por favor, ingresa solo números!');

        }

    }

    const handleChangeSalario = e => {

        const inputNumero = e.target.value;

        if (!isNaN(inputNumero)) {

            setSalario(+inputNumero);
            setMensajeError3('');

        } else {

            setMensajeError3('Por favor, ingresa solo números!');

        }

    }

    const handleChangeTelefonoEmpresa = e => {

        const inputNumero = e.target.value;

        if (!isNaN(inputNumero)) {

            if (inputNumero.length <= 10) {

                setTelefonoEmpresa(+inputNumero);
                setMensajeError4('');

            }

        } else {

            setMensajeError4('Por favor, ingresa solo números!');

        }

    }

    const handleChangeMontoCredito = e => {

        const inputNumero = e.target.value;

        if (!isNaN(inputNumero)) {

            setImporteCredito(+inputNumero);
            setMensajeError5('');

        } else {

            setMensajeError5('Por favor, ingresa solo números!');

        }

    }

    const handleChangeCreditoActual = e => {

        const inputRespuesta = e.target.value;

        setCreditoActual(inputRespuesta);

        if (inputRespuesta === 'no') {

            setDisabledMonto(true);

        } else {

            setDisabledMonto(false);
        }


    }
    
    return (

        <div className="flex flex-col min-h-screen">

            <NavBar />

            <div className="lg:flex lg:flex-col lg:flex-grow lg:items-center lg:justify-center bg-blue-950 grid">

                <div className="bg-white shadow-2xl xl:max-w-5xl lg:max-w-4xl text-blue-950 font-bold rounded-sm">

                    <div className="text-center grid lg:grid-cols-2">

                        <div className="2xl:p-8 p-4 bg-slate-200 m-5">

                            <h1 className="text-2xl text-blue-800 text-center">REGISTRO DE CLIENTES</h1>

                            <input type="text" id="nombre" value={nombre} placeholder="Ingrese su nombre" className="border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5  p-2" onChange={e => { setNombre(e.target.value) }} />
                            <input type="text" id="apellidoPaterno" value={apellidoPaterno} placeholder="Ingrese su apellido paterno" className="border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 p-2" onChange={e => { setApellidoPaterno(e.target.value) }} />
                            <input type="text" id="apellidoMaterno" value={apellidoMaterno} placeholder="Ingrese su apellido materno" className="border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 p-2" onChange={e => { setApellidoMaterno(e.target.value) }} />
                            <input type="date" id="fecha" value={fechaNacimiento} placeholder="Ingrese su fecha de nacimiento" className="border-2 text-black rounded-md mt-5 px-16 p-2 border-blue-900" onChange={e => { setFechaNacimiento(e.target.value) }} />
                            <input type="text" id="telefono" value={telefono} placeholder="Ingrese su teléfono" className="border-2 text-center rounded-md mt-5 p-2 border-blue-900" onChange={handleChangeNumero} />
                            {mensajeError && <p className="text-red-500 text-sm">{mensajeError}</p>}
                            <input type="email" id="email" value={email} placeholder="Ingrese su correo electronico" className="border-2 text-center rounded-md mt-5 mb-2 p-2 border-blue-900" onChange={e => { setEmail(e.target.value) }} />
                            <input type="text" id="colonia" value={colonia} placeholder="Ingrese su colonia" className="border-2 text-center rounded-md mt-2 p-2 border-blue-900" onChange={e => { setColonia(e.target.value) }} />
                            <input type="text" id="calle" value={calle} placeholder="Ingrese la calle" className="border-2 text-center rounded-md mt-2 p-2 border-blue-900" onChange={e => { setCalle(e.target.value) }} />
                            <input type="text" id="numeroCasa" value={numeroCasa} placeholder="Número casa o manzana" className="border-2 text-center rounded-md mt-5 p-2 border-blue-900" onChange={handleChangeNumeroCasa} />
                            {mensajeError1 && <p className="text-red-500 text-sm">{mensajeError1}</p>}
                            <input type="text" id="rfc" value={rfc} placeholder="Ingrese el RFC " className="border-2 text-center rounded-md mt-5 p-2 border-blue-900" onChange={e => { setRfc(e.target.value) }} />
                            <input type="text" id="curp" value={curp} disabled={disabled} placeholder="Ingrese la CURP" className="border-2 text-center rounded-md mt-5 p-2 border-blue-900" onChange={e => { setCurp(e.target.value) }} />

                            <div className="flex justify-center items-center mb-2">

                                <select name="estadoCivil" id="estadoCivil" className="py-3 px-20 mt-5 rounded-md border-2 border-blue-900 bg-white" onChange={e => { setEstadoCivil(e.target.value) }}>

                                    <option value="">Estado civil</option>
                                    <option value="soltero">Soltero</option>
                                    <option value="casado">Casado</option>
                                    <option value="divorciado">Divorciado</option>
                                    <option value="viudo">Viudo</option>

                                </select>

                            </div>

                        </div>

                        <div className="bg-slate-200 m-5">

                            {disabled ? <Cotizador setPlan={setPlan} setTotalCredito={setTotalCredito} pagos={pagos} setPagos={setPagos} disabled={true} /> : <Cotizador setPlan={setPlan} setTotalCredito={setTotalCredito} pagos={pagos} setPagos={setPagos} disabled={false} />}

                            <div className="grid sm:grid-cols-4 grid-cols-2 p-2">

                                <div>

                                    <button onClick={e => { setReferenciaPersonalModal(true) }} className=" text-blue-950 font-bold rounded">

                                        <div className="flex justify-center">

                                            <img src={personal} alt="" className="w-14" />

                                        </div>

                                        Referencias Personales

                                    </button>

                                    <Modal isOpen={referenciaPersonalModal} onClose={e => { setReferenciaPersonalModal(false) }}>

                                        <h2 className="font-bold mb-4 text-cyan-900 text-2xl text-center">REFERENCIAS PERSONALES</h2>

                                        <form className="font-bold text-center">

                                            <label htmlFor="nombreParentesco" className="block py-2 mb-4">Nombre completo:</label>
                                            <input type="text" id="nombreParentesco" value={nombreParentesco} placeholder="Ingrese nombre" className="border py-2 px-10" onChange={e => { setNombreParentesco(e.target.value) }} />

                                            <label htmlFor="parentesco" className="block py-2 mb-4">Parentesco: </label>
                                            <input type="text" id="parentesco" value={parentesco} placeholder="Parentesco" className="border py-2 px-10" onChange={e => { setParentesco(e.target.value) }} />

                                            <label htmlFor="telefonoParentesco" className="block py-2 mb-4">Número teléfonico: </label>
                                            <input type="text" id="telefonoParentesco" value={telefonoParentesco} placeholder="Ingrese el teléfono" className="border py-2 px-10" onChange={handleChangeNumeroParentesco} />
                                            {mensajeError2 && <p className="text-red-500 text-sm">{mensajeError2}</p>}

                                            <label htmlFor="direccionParentesco" className="block py-2 mb-4">Dirección: </label>
                                            <input type="text" id="direccionParentesco" value={direccionParentesco} placeholder="Ingrese la dirección" className="border py-2 px-10 mb-4" onChange={e => { setDireccionParentesco(e.target.value) }} />

                                        </form>

                                        <div className="text-center">

                                            <button onClick={e => { setReferenciaPersonalModal(false) }} id="referenciaPersonal" className="bg-cyan-800 hover:bg-cyan-950 text-white font-bold py-2 px-10 mt-4 rounded">Cerrar</button>

                                        </div>

                                    </Modal>

                                </div>


                                <div>

                                    <button onClick={e => { setReferenciaLaboralModal(true) }} className="text-blue-950 font-bold rounded">

                                        <div className="flex justify-center">

                                            <img src={work} alt="" className="w-14" />

                                        </div>

                                        Referencias Laborales

                                    </button>

                                    <Modal isOpen={referenciaLaboralModal} onClose={e => { setReferenciaLaboralModal(false) }}>

                                        <h2 className="text-cyan-900 font-bold mb-4 text-center text-2xl">REFERENCIAS LABORALES</h2>

                                        <form className="font-bold text-center">

                                            <label htmlFor="nombreEmpresa" className="block py-2 mb-4">Nombre de la empresa:</label>
                                            <input type="text" id="nombreEmpresa" value={nombreEmpresa} placeholder="Ingrese el nombre de la empresa" className="border py-2 px-10" onChange={e => { setNombreEmpresa(e.target.value) }} />

                                            <label htmlFor="salario" className="block py-2 mb-4">Salario: </label>
                                            <input type="text" id="salario" value={salario} placeholder="Ingrese el nombre de la empresa" className="border py-2 px-10" onChange={handleChangeSalario} />
                                            {mensajeError3 && <p className="text-red-500 text-sm">{mensajeError3}</p>}

                                            <label htmlFor="puesto" className="block py-2 mb-4">Puesto: </label>
                                            <input type="text" id="puesto" placeholder="Puesto" value={puesto} className="border py-2 px-10" onChange={e => { setPuesto(e.target.value) }} />

                                            <label htmlFor="telefonoEmpresa" className="block py-2 mb-4">Número teléfonico: </label>
                                            <input type="text" id="telefonoEmpresa" placeholder="Ingrese el teléfono" value={telefonoEmpresa} className="border py-2 px-10" onChange={handleChangeTelefonoEmpresa} />
                                            {mensajeError4 && <p className="text-red-500 text-sm">{mensajeError4}</p>}

                                            <label htmlFor="direccionEmpresa" className="block py-2 mb-4">Dirección: </label>
                                            <input type="text" id="direccionEmpresa" placeholder="Ingrese la dirección" value={direccionEmpresa} className="border py-2 px-10 mb-4" onChange={e => { setDireccionEmpresa(e.target.value) }} />

                                        </form>

                                        <div className="text-center">

                                            <button onClick={e => { setReferenciaLaboralModal(false) }} id="referenciaLaboral" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">Cerrar</button>

                                        </div>

                                    </Modal>

                                </div>

                                <div>

                                    <button onClick={e => { setReferenciaCrediticiaModal(true) }} className="text-blue-950 font-bold rounded">

                                        <div className="flex justify-center">

                                            <img src={credit} className="w-14" />

                                        </div>

                                        Referencias Crediticias

                                    </button>

                                    <Modal isOpen={referenciaCrediticialModal}>

                                        <h2 className="text-2xl text-center text-cyan-900 font-bold mb-4">REFERENCIAS CREDITICIAS</h2>

                                        <form className="font-bold text-center">

                                            <label className="block py-2 mb-4">¿Buro de Credito?</label>

                                            <div className="pb-3 mb-2">

                                                <label className="inline-flex items-center">

                                                    <input type="radio" className="form-radio text-blue-500" name="opcion" value="si" id="buroSi" onChange={e => { setBuroCredito(e.target.value) }} />

                                                    <span className="ml-2">Sí</span>

                                                </label>

                                                <label className="inline-flex items-center ml-6">

                                                    <input type="radio" className="form-radio text-blue-500" name="opcion" value="no" id="buroNo" onChange={e => { setBuroCredito(e.target.value) }} />

                                                    <span className="ml-2">No</span>

                                                </label>

                                            </div>

                                            <div className="pb-3 mb-2">

                                                <p className="mb-4">¿El cliente posee un crédito actual?</p>

                                                <label className="inline-flex items-center">

                                                    <input
                                                        type="radio"
                                                        className="form-radio text-blue-500"
                                                        name="opcion2"
                                                        value="si"
                                                        id="creditoActualSi"
                                                        onChange={handleChangeCreditoActual} />

                                                    <span className="ml-2">Sí</span>

                                                </label>

                                                <label className="inline-flex items-center ml-6">

                                                    <input type="radio" className="form-radio text-blue-500" name="opcion2" value="no" id="creditoActualNo" onChange={ handleChangeCreditoActual } />

                                                    <span className="ml-2">No</span>

                                                </label>

                                            </div>

                                            <label htmlFor="importeCredito" className="block py-2 mb-4">Monto del crédito: </label>

                                            <input type="text" id="importeCredito" disabled={disabledMonto} placeholder="Monto" value={importeCredito} className="border py-2 px-10 text-center mb-4" onChange={handleChangeMontoCredito} />
                                            {mensajeError5 && <p className="text-red-500 text-sm">{mensajeError5}</p>}

                                        </form>

                                        <div className="text-center">

                                            <button onClick={e => { setReferenciaCrediticiaModal(false) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">Cerrar</button>

                                        </div>

                                    </Modal>

                                </div>

                                <div>

                                    <button onClick={e => { setReferenciaBancariaModal(true) }} className="text-blue-950 font-bold rounded">

                                        <div className="flex justify-center">

                                            <img src={bank} alt="" className="w-14" />

                                        </div>

                                        Referencias Bancarias

                                    </button>

                                    <Modal isOpen={referenciaBancariaModal}>

                                        <h2 className="text-center text-cyan-900 font-bold mb-4">Título de la ventana modal</h2>

                                        <div className="text-center font-bold">
                                            <label htmlFor="credito" className="block py-2 mb-4">Tarjeta de crédito (Institución): </label>
                                            <input type="text" id="credito" placeholder="Tarjeta de crédito" value={tarjetaCredito} className="border py-2 px-10 mb-4" onChange={e => { setTarjetaCredito(e.target.value) }} />

                                            <label htmlFor="debito" className="block py-2 mb-4">Tarjeta de débito (Institución):</label>
                                            <input type="text" id="debito" placeholder="Tarjeta de débito" className="border py-2 px-10 mb-4" value={tarjetaDebito} onChange={e => { setTarjetaDebito(e.target.value) }} />

                                            <label htmlFor="cuentaBancaria" className="block py-2">No. de cuenta Bancaria: </label>
                                            <input type="text" id="cuentaBancaria" placeholder="Cuenta bancaria" value={cuentaBancaria} className="border py-2 px-10 mb-4" onChange={e => { setCuentaBancaria(e.target.value) }} />

                                        </div>

                                        <div className="text-center">

                                            <button onClick={e => { setReferenciaBancariaModal(false) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">Cerrar</button>

                                        </div>

                                    </Modal>

                                </div>


                            </div>
                        </div>

                    </div>

                    <div className="text-center pb-2">

                        <Button fn={validarFormulario} mensaje={'CONFIRMAR'} />

                    </div>


                </div>

            </div>

        </div>

    )
}

export default Formulario