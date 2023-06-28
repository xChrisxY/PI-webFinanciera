import Button from "./Button"
import NavBar from "./NavBar"
import { useEffect, useState } from "react";
import Swal from 'sweetalert';
import Modal from "./Modal";
import bank from "../img/bank.png";
import credit from "../img/credit.png";
import personal from "../img/personal.png"
import work from "../img/work.png";
import Cotizador from "./Cotizador";
import { json } from "react-router-dom";

function Formulario({ setListaClientes, listaClientes, cliente }) {

    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
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
    const [TotalCredito, setTotalCredito] = useState('');
    const [plan, setPlan] = useState('');
    const [pagos, setPagos] = useState(0);
    const [estatus, setEstatus] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);

    const [referenciaPersonalModal, setReferenciaPersonalModal] = useState(false);
    const [referenciaLaboralModal, setReferenciaLaboralModal] = useState(false);
    const [referenciaCrediticialModal, setReferenciaCrediticiaModal] = useState(false);
    const [referenciaBancariaModal, setReferenciaBancariaModal] = useState(false);

    useEffect(() => {

        if (Object.keys(cliente).length > 0) {

            console.log("Vamos a editar");

            setNombre(cliente.nombre);
            setFechaNacimiento(cliente.fechaNacimiento);
            setTelefono(cliente.telefono);
            setEmail(cliente.email);
            setDireccion(cliente.direccion);
            setRfc(cliente.rfc);
            // La curp queda deshabilitado
            setCurp(cliente.curp);
            setEstadoCivil(cliente.estadoCivil);
            setNombreParentesco(cliente.nombreParentesco);
            setParentesco(cliente.parentesco);
            setTelefonoParentesco(cliente.telefonoParentesco);
            setDireccionParentesco(cliente.direccionParentesco);
            setNombreEmpresa(cliente.nombreEmpresa);
            setPuesto(cliente.puesto);
            setTelefonoEmpresa(cliente.telefonoEmpresa);
            setDireccionEmpresa(cliente.direccionEmpresa);
            setBuroCredito(cliente.buroCredito);
            setCreditoActual(cliente.creditoActual);
            setImporteCredito(cliente.importeCredito);
            setPlan(cliente.plan)
            setTarjetaCredito(cliente.tarjetaCredito);
            setTarjetaDebito(cliente.tarjetaDebito);
            setCuentaBancaria(cliente.cuentaBancaria);

            setDisabled(true);

        }

        setDisabled(false);

    }, [cliente]);



    const validarFormulario = (e) => {

        e.preventDefault();

        if ([nombre, fechaNacimiento, telefono, email, direccion, rfc, curp, estadoCivil, nombreParentesco, parentesco, telefonoParentesco,
            direccionParentesco, nombreEmpresa, puesto, telefonoEmpresa, buroCredito, creditoActual, importeCredito, tarjetaCredito, tarjetaDebito, cuentaBancaria].includes('')) {

            setError(true);

            showAlert();

        } else {

            setError(false);

            const objCliente = {

                curp,
                idEmpleado: 1,
                nombre,
                email,
                direccion,
                telefono,
                estadoCivil,
                rfc,
                estatus,
                fechaNacimiento,

            }

            let idReferencia = Math.floor(Math.random() * 9000) + 1000;
            

            const objReferenciaPersonal = { idReferencia, curp, nombreParentesco, parentesco, direccionParentesco ,telefonoParentesco }

            const objReferenciaLaboral = { idReferencia ,curp, nombreEmpresa, salario , telefonoEmpresa, direccionEmpresa, puesto }

            const objReferenciaCrediticia = { idReferencia, curp, buroCredito, creditoActual, importeCredito }

            const objReferenciaBancaria = { idReferencia, curp, tarjetaCredito, tarjetaDebito, cuentaBancaria }

            const fechaActual = new Date();

            const fechaFinal = new Date(fechaActual);

            fechaFinal.setDate(fechaFinal.getDate() + 66);
            const idCredito = idReferencia;

            const objInfoCredito = {

                idCredito,
                curp,
                fechaInicio: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
                fechaTermino: `${fechaFinal.getFullYear()}-${parseInt(fechaFinal.getMonth() + 1)}-${fechaFinal.getDate()}`,
                TotalCredito,
                plan,
                pagos: Math.floor(pagos),

            }

            console.log(objCliente);
            console.log(objReferenciaPersonal);
            console.log(objReferenciaLaboral);
            console.log(objReferenciaCrediticia);
            console.log(objReferenciaBancaria);
            console.log(objInfoCredito);


            const requestInit = {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objCliente)

            }

            fetch('http://localhost:5176/api', requestInit)
                .then(res => res.json())
                .then(res => console.log(res));


            const requestInit1 = {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objReferenciaPersonal)

            }

            fetch('http://localhost:5176/api/referencia1', requestInit1)
                .then(res => res.json())
                .then(res => console.log(res));


            const requestInit2 = {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objReferenciaLaboral)

            }

            fetch('http://localhost:5176/api/referencia2', requestInit2)
                .then(res => res.json())
                .then(res => console.log(res));


            const requestInit3 = {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objReferenciaCrediticia)

            }

            fetch('http://localhost:5176/api/referencia3', requestInit3)
                .then(res => res.json())
                .then(res => console.log(res));


            const requestInit4 = {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objReferenciaBancaria)

            }

            fetch('http://localhost:5176/api/referencia4', requestInit4)
                .then(res => res.json())
                .then(res => console.log(res));



            const enviarCredito = {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objInfoCredito)

            }

            fetch('http://localhost:5176/api/credito', enviarCredito)
                .then(res => res.json())
                .then(res => console.log(res));




            Swal("¡Éxito!", "El cliente se ha agregado satisfactoriamente", "success");

            //setListaClientes([...listaClientes, objCliente]);

        }

    }

    const showAlert = () => {

        Swal("¡Error!", "Debe llenar todos los campos del formulario", "error");

    }

    return (

        <div className="flex flex-col min-h-screen">

            <NavBar />

            <div className="lg:flex lg:flex-col lg:flex-grow lg:items-center lg:justify-center bg-blue-950 grid">

                <div className="bg-white shadow-2xl xl:max-w-5xl lg:max-w-4xl text-blue-950 font-bold rounded-sm">

                    <div className="text-center grid lg:grid-cols-2">

                        <div className="2xl:p-8 p-4 bg-slate-200 m-5">

                            <h1 className="text-2xl text-blue-800 mb-5 text-center">REGISTRO DE CLIENTES</h1>

                            <input type="text" id="nombre" value={nombre} placeholder="Ingrese su nombre" className="border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 mb-5 p-2" onChange={e => { setNombre(e.target.value) }} />
                            <input type="date" id="fecha" value={fechaNacimiento} placeholder="Ingrese su fecha de nacimiento" className="border-2 text-black rounded-md mt-5 mb-5 px-16 p-2 border-blue-900" onChange={e => { setFechaNacimiento(e.target.value) }} />
                            <input type="text" id="telefono" value={telefono} placeholder="Ingrese su teléfono" className="border-2 text-center rounded-md mt-5 mb-5 p-2 border-blue-900" onChange={e => { setTelefono(e.target.value) }} />
                            <input type="email" id="email" value={email} placeholder="Ingrese su correo electronico" className="border-2 text-center rounded-md mt-5 mb-5 p-2 border-blue-900" onChange={e => { setEmail(e.target.value) }} />
                            <input type="text" id="direccion" value={direccion} placeholder="Ingrese su dirección" className="border-2 text-center rounded-md mt-5 mb-5 p-2 border-blue-900" onChange={e => { setDireccion(e.target.value) }} />
                            <input type="text" id="rfc" value={rfc} placeholder="Ingrese el RFC " className="border-2 text-center rounded-md mt-5 mb-5 p-2 border-blue-900" onChange={e => { setRfc(e.target.value) }} />
                            <input type="text" id="curp" value={curp} disabled={disabled} placeholder="Ingrese la CURP" className="border-2 text-center rounded-md mt-5 mb-5 p-2 border-blue-900" onChange={e => { setCurp(e.target.value) }} />

                            <div className="flex justify-center items-center mb-2">

                                <select name="estadoCivil" id="estadoCivil" className="py-3 px-20 mt-5 mb-5 rounded-md border-2 border-blue-900 bg-white" onChange={e => { setEstadoCivil(e.target.value) }}>

                                    <option value="">Estado civil</option>
                                    <option value="soltero">Soltero</option>
                                    <option value="casado">Casado</option>
                                    <option value="divorciado">Divorciado</option>
                                    <option value="viudo">Viudo</option>

                                </select>

                            </div>

                        </div>

                        <div className="bg-slate-200 m-5">

                            {Object.keys(cliente).length > 0 ? <Cotizador setPlan={setPlan} setTotalCredito={setTotalCredito} pagos={pagos} setPagos={setPagos} disabled={true} /> : <Cotizador setPlan={setPlan} setTotalCredito={setTotalCredito} pagos={pagos} setPagos={setPagos} disabled={false} />}

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
                                            <input type="text" id="telefonoParentesco" value={telefonoParentesco} placeholder="Ingrese el teléfono" className="border py-2 px-10" onChange={e => { setTelefonoParentesco(e.target.value) }} />

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
                                            <input type="number" id="salario" value={salario} placeholder="Ingrese el nombre de la empresa" className="border py-2 px-10" onChange={e => { setSalario(+e.target.value) }} />

                                            <label htmlFor="puesto" className="block py-2 mb-4">Puesto: </label>
                                            <input type="text" id="puesto" placeholder="Puesto" value={puesto} className="border py-2 px-10" onChange={e => { setPuesto(e.target.value) }} />

                                            <label htmlFor="telefonoEmpresa" className="block py-2 mb-4">Número teléfonico: </label>
                                            <input type="text" id="telefonoEmpresa" placeholder="Ingrese el teléfono" value={telefonoEmpresa} className="border py-2 px-10" onChange={e => { setTelefonoEmpresa(e.target.value) }} />

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

                                                    <input type="radio" className="form-radio text-blue-500" name="opcion2" value="si" id="creditoActualSi" onChange={e => { setCreditoActual(e.target.value) }} />

                                                    <span className="ml-2">Sí</span>
                                                </label>

                                                <label className="inline-flex items-center ml-6">

                                                    <input type="radio" className="form-radio text-blue-500" name="opcion2" value="no" id="creditoActualNo" onChange={e => { setCreditoActual(e.target.value) }} />

                                                    <span className="ml-2">No</span>

                                                </label>

                                            </div>

                                            <label htmlFor="importeCredito" className="block py-2 mb-4">Monto del crédito: </label>

                                            <input type="number" id="importeCredito" placeholder="Monto" value={importeCredito} className="border py-2 px-10 text-center mb-4" onChange={e => { setImporteCredito(+e.target.value) }} />

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
                                            <label htmlFor="credito" className="block py-2 mb-4">Tarjeta de crédito:</label>
                                            <input type="text" id="credito" placeholder="Tarjeta de crédito" value={tarjetaCredito} className="border py-2 px-10 mb-4" onChange={e => { setTarjetaCredito(e.target.value) }} />

                                            <label htmlFor="debito" className="block py-2 mb-4">Tarjeta de débito:</label>
                                            <input type="text" id="debito" placeholder="Tarjeta de débito" className="border py-2 px-10 mb-4" value={tarjetaDebito} onChange={e => { setTarjetaDebito(e.target.value) }} />

                                            <label htmlFor="cuentaBancaria" className="block py-2">Cuenta Bancaria: </label>
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