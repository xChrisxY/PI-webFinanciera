import { useEffect, useState } from "react"
import NavBar from "./NavBar"

function CobradosDia() {

      const [fechaActual, setFechaActual] = useState('');
      const [pagosRealizados, setPagosRealizados] = useState([]);

      const [empleadoNombre, setEmpleadoNombre] = useState('');
      const [empleadoCorreo, setEmpleadoCorreo] = useState('');
      const [empleadoTelefono, setEmpleadoTelefono] = useState('');
      const [infosucursal, setInfoSucursal] = useState([]);
      const [sucursal, setSucursal] = useState('');
      const [direccion, setDireccion] = useState('');

      useEffect(() => {

            const currentDate = new Date();

            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear().toString();

            const fechaActual = `${day}-${month}-${year}`;

            console.log("Estamos actualizando fecha otra vez");

            //Obtenemos la fecha actual
            setFechaActual(fechaActual);

            //Obtenemos la información del empleado para hacer las consultas
            const trabajador = localStorage.getItem('Empleado');

            const empleado = JSON.parse(trabajador);

            console.log(empleado)

            console.log("Modificando una vez más");

            const informacion = {

                  idEmpleado: empleado.idEmpleado,
                  fecha: fechaActual
            }

            const getCobrados = () => {


                  const query = new URLSearchParams(informacion).toString();
                  const url = `http://localhost:5176/api/cobradosDia?${query}`;

                  fetch(url)
                        .then(res => res.json())
                        .then(res => setPagosRealizados(res));

            }

            getCobrados();

            setEmpleadoNombre(empleado.nombre);
            setEmpleadoCorreo(empleado.email);
            setEmpleadoTelefono(empleado.telefono);


            const getSucursal = () => {

                  fetch(`http://localhost:5176/api/sucursal/${empleado.nuevoIdSucursal}`)
                        .then(res => res.json())
                        .then(res => setInfoSucursal(res));

            }

            getSucursal();

      }, []);

      useEffect(() => {

            if (infosucursal.length > 0) {

                  console.log(infosucursal);

                  setSucursal(infosucursal[0].ubicacion);
                  setDireccion(infosucursal[0].direccion);

            }

      }, [infosucursal]);

      return (

            <div className='flex flex-col min-h-screen bg-blue-950'>

                  <NavBar />

                  <div className="flex flex-col flex-grow items-center justify-center">

                        <div className="bg-white text-center p-10">

                              <h1 className="font-bold text-4xl p-3">Cobrados del día</h1>
                              <p className="font-semibold text-blue-900 p-5 text-xl">En esta sección se registran los pagos realizados de la fecha

                                    <span className="block text-xl pt-5 text-red-900">{fechaActual}</span></p>

                              <div className="pb-5 font-bold text-blue-900 text-xl">

                                    <h1 className="p-1">Gestor de cobranza: <span className="text-gray-500">{empleadoNombre}</span></h1>
                                    <h1 className="p-1">Correo electronico: <span className="text-gray-500">{empleadoCorreo}</span></h1>
                                    <h1 className="p-1">Número teléfonico: <span className="text-gray-500">{empleadoTelefono}</span></h1>
                                    <h1 className="p-1">Sucursal: <span className="text-gray-500">{sucursal}</span></h1>
                                    <h1 className="p-1">Dirección: <span className="text-gray-500">{direccion}</span></h1>
                              </div>


                              <div className="border border-black bg-gray-200 text-black max-w-screen-lg mx-auto m-10">

                                    <div className="h-64 overflow-auto">

                                          <table className="table-auto w-full text-xl border border-gray-900">

                                                <thead className="sticky top-0 bg-gray-200">

                                                      <tr className="border-b border-white bg-slate-300">

                                                            <th>No</th>
                                                            <th>Cliente</th>
                                                            <th>Fecha</th>
                                                            <th>Hora</th>
                                                            <th>Monto</th>

                                                      </tr>

                                                </thead>

                                                <tbody>

                                                      {pagosRealizados.map((pago, index) => {

                                                            return (

                                                                  <tr className="border-b border-gray-500 text-center" key={pago.idPago}>

                                                                        <td className="p-3 font-bold text-red-900">{index + 1}</td>
                                                                        <td className="p-3 font-bold text-green-900">{pago.nombre}</td>
                                                                        <td className="p-3 font-bold text-blue-900">{pago.fecha}</td>
                                                                        <td className="p-3 font-bold text-blue-900">{pago.hora}</td>
                                                                        <td className="p-3 text-red-900 font-bold">${pago.monto}</td>

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


      )
}

export default CobradosDia