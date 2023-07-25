import { useState, useEffect } from "react"
import NavBar from "./NavBar"
import Swal from 'sweetalert';
import Modal from "./Modal";

function Solicitudes() {

      const [solicitudes, setSolicitudes] = useState([]);
      const [agregado, setAgregado] = useState(false);
      const [openModal, setOpenModal] = useState(false);

      useEffect(() => {

            setAgregado(false);

            const getSolicitudes = () => {

                  fetch("http://3.133.76.177:3000/api/solicitud")
                        .then(res => res.json())
                        .then(res => setSolicitudes(res));

            }

            getSolicitudes();

      }, [agregado])

      const [nombre, setNombre] = useState('');
      const [telefono, setTelefono] = useState('');
      const [email, setEmail] = useState('');
      const [salario, setSalario] = useState('');
      const [creditosActivos, setCreditosActivos] = useState('');
      const [calle, setCalle] = useState('');
      const [buroCredito, setBuroCredito] = useState('');
      const [importeCredito, setImporteCredito] = useState('');

      const visualizar = solicitante => {

            const { nombre, calle, telefono, email, salario, buroCredito, importeCredito, creditoActual } = solicitante;

            setNombre(nombre);
            setTelefono(telefono);
            setCalle(calle);
            setEmail(email);
            setSalario(salario);
            setBuroCredito(buroCredito);
            setImporteCredito(importeCredito);
            setCreditosActivos(creditoActual);

            setOpenModal(true);

      }

      const aceptarSolicitud = solicitante => {

            //Lo que vamos a hacer aquí es modificar la tabla credito y la tabla cliente

            const object = {

                  estatus: "activo",
                  curp: solicitante.curp

            }

            const modificacionEstatus = {

                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(object)

            }

            fetch('http://3.133.76.177:3000/api/agregarCliente', modificacionEstatus)
                  .then(res => res.text())
                  .then(res => console.log(res));



            const currentDate = new Date();

            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear().toString();

            //Obtenemos la fecha actual
            const fechaInicio = `${day}-${month}-${year}`;

            //Formateamos y obtenemos la fecha en 66 días
            currentDate.setDate(currentDate.getDate() + 66)

            const dia = currentDate.getDate().toString().padStart(2, '0');
            const mes = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const anio = currentDate.getFullYear().toString();

            const fechaTermino = `${dia}-${mes}-${anio}`;

            const fechas = {

                  fechaInicio,
                  fechaTermino,
                  idCredito: solicitante.idCredito

            }

            const modificacionFecha = {

                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(fechas)

            }

            fetch('http://3.133.76.177:3000/api/iniciarCredito', modificacionFecha)
                  .then(res => res.text())
                  .then(res => console.log(res));


            setAgregado(true);

            Swal("¡Éxito!", "El cliente se ha agregado satisfactoriamente", "success");

            setNombre("");
            setTelefono("");
            setCalle("");
            setEmail("");
            setSalario("");
            setBuroCredito("");
            setImporteCredito("");
            setCreditosActivos("");

      }

      const eliminarSolicitante = solicitante => {

            const { curp, idReferencia, idCredito } = solicitante;

            const requestInit = {

                  method: 'DELETE'

            }
            //Eliminamos primero los registros de la tabla clientes

            fetch(`http://3.133.76.177:3000/eliminarCredito/${idCredito}`, requestInit)
                  .then(res => res.text())
                  .then(res => console.log(res))

            fetch(`http://3.133.76.177:3000/eliminarCliente/${curp}`, requestInit)
                  .then(res => res.text())
                  .then(res => console.log(res))


            fetch(`http://3.133.76.177:3000/eliminarReferencia1/${idReferencia}`, requestInit)
                  .then(res => res.text())
                  .then(res => console.log(res))


            fetch(`http://3.133.76.177:3000/eliminarReferencia2/${idReferencia}`, requestInit)
                  .then(res => res.text())
                  .then(res => console.log(res))

            fetch(`http://3.133.76.177:3000/eliminarReferencia3/${idReferencia}`, requestInit)
                  .then(res => res.text())
                  .then(res => console.log(res))


            fetch(`http://3.133.76.177:3000/eliminarReferencia4/${idReferencia}`, requestInit)
                  .then(res => res.text())
                  .then(res => console.log(res))

            setAgregado(true);

            Swal("¡Éxito!", "La solicitud se ha eliminado correctamente", "success");

            setNombre("");
            setTelefono("");
            setCalle("");
            setEmail("");
            setSalario("");
            setBuroCredito("");
            setImporteCredito("");
            setCreditosActivos("");

      }

      return (

            <div className="flex flex-col min-h-screen bg-blue-950">

                  <NavBar />

                  <div className="flex flex-col flex-grow items-center justify-center">

                        <div className="bg-white lg:p-10 shadow-md">

                              <h1 className="lg:text-4xl font-bold pb-5 text-center text-2xl">Solicitudes de credito</h1>

                              <p className="lg:text-xl text-center p-2">En este apartado se podrán observar todas las solicitudes de crédito realizadas por los gestores de cobranza</p>

                              <div className="border border-black bg-gray-200 text-black max-w-screen-lg mx-auto">

                                    <div className="h-64 overflow-auto">

                                          <div className="table-responsive">

                                                <table className="table-auto w-full text-xl border border-gray-500">

                                                      <thead className="sticky top-0 bg-gray-200">

                                                            <tr className="border-2 border-white bg-slate-300">

                                                                  <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">No</th>
                                                                  <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">Gestor</th>
                                                                  <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">Monto</th>
                                                                  <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">Lapso</th>
                                                                  <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">Pagos</th>
                                                                  <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">Acción</th>

                                                            </tr>

                                                      </thead>

                                                      <tbody>

                                                            {solicitudes.map((solicitud, index) => {

                                                                  return (

                                                                        <tr className="border-b border-gray-500 text-center font-bold" key={index}>

                                                                              <td className="lg:p-3 text-sm md:text-lg lg:text-xl">{index + 1}</td>
                                                                              <td className="lg:p-3 text-sm md:text-lg lg:text-xl">{solicitud.nombre_empleado}</td>
                                                                              <td className="lg:p-3 text-sm md:text-lg lg:text-xl">${solicitud.totalCredito}</td>
                                                                              <td className="lg:p-3 text-sm md:text-lg lg:text-xl">{solicitud.plan}</td>
                                                                              <td className="lg:p-3 text-sm md:text-lg lg:text-xl">${solicitud.pagos}</td>

                                                                              <td className="p-2">

                                                                                    <button className="bg-green-700 text-white p-1 m-1 rounded-md hover:bg-green-800" onClick={e => { aceptarSolicitud(solicitud) }}>Aceptar</button>
                                                                                    <button className="bg-red-700 text-white p-1 m-1 rounded-md" onClick={e => { eliminarSolicitante(solicitud) }}>Rechazar</button>
                                                                                    <button className="bg-blue-700 text-white p-1 m-1 rounded-md hover:bg-blue-800" onClick={e => visualizar(solicitud)}>Visualizar</button>

                                                                                    <Modal isOpen={openModal} onClose={e => { setOpenModal(false) }}>

                                                                                          <h2 className="text-cyan-900 font-bold mb-4 text-center text-2xl">Información del solicitante</h2>

                                                                                          <div className="text-black text-center p-5">

                                                                                                <p className="p-1">Nombre : <span className="text-cyan-900">{nombre}</span></p>
                                                                                                <p className="p-1">Telefono: <span className="text-cyan-900">{telefono}</span></p>
                                                                                                <p className="p-1">Email : <span className="text-cyan-900">{email}</span></p>
                                                                                                <p className="p-1">Dirección: <span className="text-cyan-900">{calle}</span></p>
                                                                                                <p className="p-1">¿Creditos activos? <span className="text-cyan-900">{creditosActivos}</span></p>
                                                                                                <p className="p-1">¿Buro de Crédito? <span className="text-cyan-900">{buroCredito}</span></p>
                                                                                                <p className="p-1">Importe del crédito: <span className="text-cyan-900">{importeCredito}</span></p>

                                                                                          </div>

                                                                                          <div className="text-center">

                                                                                                <button onClick={e => { setOpenModal(false) }} id="referenciaLaboral" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">Cerrar</button>

                                                                                          </div>

                                                                                    </Modal>

                                                                              </td>

                                                                        </tr>
                                                                  )

                                                            })}

                                                      </tbody>

                                                </table>
                                          </div>

                                    </div>

                              </div>

                        </div>

                  </div>

            </div>

      )
}

export default Solicitudes