import Button from "./Button"
import { useEffect, useState } from "react";
import Swal from 'sweetalert';
import Modal from "./Modal";
import bank from "../img/bank.png";
import credit from "../img/credit.png";
import personal from "../img/personal.png"
import work from "../img/work.png";
import Cotizador from "./Cotizador";

function Formulario({ setListaClientes, listaClientes, cliente }) {

    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [rfc, setRfc] = useState('');
    const [curp, setCurp] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [nombreParentesco, setNombreParentesco] = useState('');
    const [parentesco, setParentesco] = useState('');
    const [telefonoParentesco, setTelefonoParentesco] = useState('');
    const [direccionParentesco, setDireccionParentesco] = useState('');
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [puesto, setPuesto] = useState('');
    const [telefonoEmpresa, setTelefonoEmpresa] = useState('');
    const [direccionEmpresa, setDireccionEmpresa] = useState('');
    const [buro, setBuro] = useState('');
    const [creditoActual, setCreditoActual] = useState('');
    const [monto, setMonto] = useState('');
    const [credito, setCredito] = useState('');
    const [debito, setDebito] = useState('');
    const [cuentaBancaria, setCuentaBancaria] = useState('');
    const [plan, setPlan] = useState('');
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
            setFecha(cliente.fecha);
            setTelefono(cliente.telefono);
            setCorreo(cliente.correo);
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
            setBuro(cliente.buro);
            setCreditoActual(cliente.creditoActual);
            setMonto(cliente.monto);
            setPlan(cliente.plan)
            setCredito(cliente.credito);
            setDebito(cliente.debito);
            setCuentaBancaria(cliente.cuentaBancaria);

            setDisabled(true);

        }

        setDisabled(false);
        
    },[cliente]);



    const validarFormulario = (e) => {

        e.preventDefault();

        if ([nombre, fecha, telefono, correo, direccion, rfc, curp, estadoCivil, nombreParentesco, parentesco, telefonoParentesco,
            direccionParentesco, nombreEmpresa, puesto, telefonoEmpresa, buro, creditoActual, monto, credito, debito, cuentaBancaria].includes('')) {

            setError(true);

            showAlert();

        } else {

            setError(false);

            const objCliente = {

                curp,
                nombre,
                correo,
                direccion,
                telefono,
                estadoCivil,
                rfc,
                estatus,
                fecha,
                nombreParentesco,
                parentesco,
                telefonoParentesco,
                direccionParentesco,
                nombreEmpresa,
                puesto,
                telefonoEmpresa,
                direccionEmpresa,
                buro,
                creditoActual,
                monto,
                plan,
                credito,
                debito,
                cuentaBancaria

            }

            console.log(objCliente);


            // const requestInit = {

            //     method : 'POST',
            //     headers : {'Content-Type': 'application/json'},
            //     body : json.stringify(cliente)


            // }

            // fetch('http://localhost:3000/api', requestInit)
            //     .then(res => res.json())
            //     .then(res => console.log(res));


            Swal("¡Éxito!", "El cliente se ha agregado satisfactoriamente", "success");

            setListaClientes([...listaClientes, objCliente]);

        }

    }

    const showAlert = () => {

        Swal("¡Error!", "Debe llenar todos los campos del formulario", "error");

    }

    return (

        <div className="flex fixed items-center h-full w-full justify-center bg-blue-950">

            <div className="bg-white shadow-2xl p-5 w-1/2 text-blue-950 font-bold">

                <div className="text-center grid grid-cols-2">

                    <div className="p-8 bg-slate-200 m-5">

                        <h1 className="text-2xl text-center text-blue-800 mb-5">REGISTRO DE CLIENTES</h1>

                        <input type="text" id="nombre" value={nombre} placeholder="Ingrese su nombre" className="border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 m-5 p-2" onChange={e => { setNombre(e.target.value) }} />
                        <input type="date" id="fecha" value={fecha} placeholder="Ingrese su fecha de nacimiento" className="border-2 text-black rounded-md m-5 px-16 p-2 border-blue-900" onChange={e => { setFecha(e.target.value) }} />
                        <input type="text" id="telefono" value={telefono} placeholder="Ingrese su teléfono" className="border-2 text-center rounded-md m-5 p-2 border-blue-900" onChange={e => { setTelefono(e.target.value) }} />
                        <input type="email" id="email" value={correo} placeholder="Ingrese su correo electronico" className="border-2 text-center rounded-md m-5 p-2 border-blue-900" onChange={e => { setCorreo(e.target.value) }} />
                        <input type="text" id="direccion" value={direccion} placeholder="Ingrese su dirección" className="border-2 text-center rounded-md m-5 p-2 border-blue-900" onChange={e => { setDireccion(e.target.value) }} />
                        <input type="text" id="rfc" value={rfc} placeholder="Ingrese el RFC " className="border-2 text-center rounded-md m-5 p-2 border-blue-900" onChange={e => { setRfc(e.target.value) }} />
                        <input type="text" id="curp" value={curp} disabled = {disabled} placeholder="Ingrese la CURP" className="border-2 text-center rounded-md m-5 p-2 border-blue-900" onChange={e => { setCurp(e.target.value) }} />

                        <div className="flex justify-center items-center mb-2">

                            <select name="estadoCivil" id="estadoCivil" className="py-3 px-20 mb-3 m-5 rounded-md border-2 border-blue-900 bg-white" onChange={e => { setEstadoCivil(e.target.value) }}>

                                <option value="">Estado civil</option>
                                <option value="soltero">Soltero</option>
                                <option value="casado">Casado</option>
                                <option value="divorciado">Divorciado</option>
                                <option value="viudo">Viudo</option>

                            </select>

                        </div>

                    </div>

                    <div className="bg-slate-200 m-5">

                        {Object.keys(cliente).length > 0 ? <Cotizador setPlan={setPlan} setMonto={setMonto} disabled = {true} /> : <Cotizador setPlan={setPlan} setMonto={setMonto} disabled = {false}/>}

                        <div className="grid md:grid-cols-4 p-2">

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

                                                <input type="radio" className="form-radio text-blue-500" name="opcion" value="si" id="buroSi" onChange={e => { setBuro(e.target.value) }} />

                                                <span className="ml-2">Sí</span>

                                            </label>

                                            <label className="inline-flex items-center ml-6">

                                                <input type="radio" className="form-radio text-blue-500" name="opcion" value="no" id="buroNo" onChange={e => { setBuro(e.target.value) }} />

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

                                        <label htmlFor="monto" className="block py-2 mb-4">Monto del crédito: </label>

                                        <input type="text" id="monto" placeholder="Monto" value={monto} className="border py-2 px-10 text-center mb-4" onChange={e => { setMonto(e.target.value) }} />

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
                                        <input type="text" id="credito" placeholder="Tarjeta de crédito" value={credito} className="border py-2 px-10 mb-4" onChange={e => { setCredito(e.target.value) }} />

                                        <label htmlFor="debito" className="block py-2 mb-4">Tarjeta de débito:</label>
                                        <input type="text" id="debito" placeholder="Tarjeta de débito" className="border py-2 px-10 mb-4" value={debito} onChange={e => { setDebito(e.target.value) }} />

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

                <div className="text-center">

                    <Button fn={validarFormulario} mensaje={'CONFIRMAR'} />

                </div>


            </div>

        </div>

    )
}

export default Formulario