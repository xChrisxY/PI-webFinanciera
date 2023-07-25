import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import image from "../img/cadofi.jpeg"
import jsPDF from "jspdf";
import "jspdf-autotable"

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
                  // const url = `http://localhost:5176/api/cobradosDia?${query}`;
                  const url = `http://ec2-100-26-195-9.compute-1.amazonaws.com/cobradosDia?${query}`;

                  fetch(url)
                        .then(res => res.json())
                        .then(res => setPagosRealizados(res));

            }

            getCobrados();

            setEmpleadoNombre(empleado.nombre);
            setEmpleadoCorreo(empleado.email);
            setEmpleadoTelefono(empleado.telefono);

            const getSucursal = () => {

                  fetch(`http://ec2-100-26-195-9.compute-1.amazonaws.com/sucursal/${empleado.IdSucursal}`)
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

      const generarPDF = e => {

            e.preventDefault();

            const tableData = pagosRealizados.map(obj => [obj.nombre, obj.fecha, obj.hora ,"$"+obj.monto]);
            
            const doc = new jsPDF();

            const marginLeftt = 70;
            const marginTopp = 20;
            const lineHeight = 10;
            let currentY = marginTopp;

            doc.setFontSize(20);
            doc.setFont("courier");
            doc.text('Cobrados del día', 70, 15);

            const imageWidth = 50;
            const imageHeight = 50;

            // Agregar la imagen en las coordenadas (x, y)
            doc.addImage(image, 'JPEG', marginLeftt, currentY, imageWidth, imageHeight);

            // Ajustar la posición vertical (coordenada Y) después de agregar la imagen
            currentY += imageHeight + 10;

            doc.setFontSize(12);
            doc.setFont("courier");
            doc.text(fechaActual, 80, 70);

            doc.text("Gestor de cobranza: " + empleadoNombre, 60, 80);
            doc.text("Correo electronico: " + empleadoCorreo, 60, 90);
            doc.text("Número teléfonico: " + empleadoTelefono, 60, 100);
            doc.text("Sucursal: " + sucursal, 60, 110);
            doc.text("Dirección: " + direccion, 60, 120);

            
            const marginLeft = 20;
            const marginTop = 130;

      
            doc.autoTable({
                  head: [['Cliente', 'Fecha de pago', 'Hora de pago', 'Monto']], // Encabezados de la tabla
                  body: tableData, // Cuerpo de la tabla (datos de los clientes)
                  startY: marginTop, // Posición vertical para comenzar la tabla
                  margin: { left: marginLeft }, // Margen izquierdo de la tabla
                  showHead: 'firstPage', // Mostrar encabezados en la primera página
            });

            // Guardar el PDF en un archivo o mostrarlo en el navegador
            doc.save('Pagos_del_dia.pdf');
      }

      return (

            <div className='flex flex-col min-h-screen bg-blue-950'>

                  <NavBar />

                  <div className="flex flex-col flex-grow items-center justify-center">

                        <div className="bg-white text-center lg:p-10 p-3">

                              <h1 className="font-bold text-4xl p-3">Cobrados del día</h1>
                              <p className="font-semibold text-blue-900 p-5 text-xl">En esta sección se registran los pagos realizados de la fecha

                                    <span className="block text-xl pt-5 text-red-900">{fechaActual}</span></p>

                              <div className="pb-5 font-bold text-blue-900 text-xl">

                                    <h1 className="p-1 lg:text-lg text-sm">Gestor de cobranza: <span className="text-gray-500">{empleadoNombre}</span></h1>
                                    <h1 className="p-1 lg:text-lg text-sm">Correo electronico: <span className="text-gray-500">{empleadoCorreo}</span></h1>
                                    <h1 className="p-1 lg:text-lg text-sm">Número teléfonico: <span className="text-gray-500">{empleadoTelefono}</span></h1>
                                    <h1 className="p-1 lg:text-lg text-sm">Sucursal: <span className="text-gray-500">{sucursal}</span></h1>
                                    <h1 className="p-1 lg:text-lg text-sm">Dirección: <span className="text-gray-500">{direccion}</span></h1>
                              </div>

                              <div className="border border-black bg-gray-200 text-black max-w-screen-lg mx-auto m-10">

                                    <div className="h-64 overflow-auto">

                                          <table className="table-auto w-full text-xl border border-gray-900">

                                                <thead className="sticky top-0 bg-gray-200">

                                                      <tr className="border-b border-white bg-slate-300">

                                                            <th className="lg:p-3 lg:text-lg text-sm">No</th>
                                                            <th className="lg:p-3 lg:text-lg text-sm">Cliente</th>
                                                            <th className="lg:p-3 lg:text-lg text-sm">Fecha</th>
                                                            <th className="lg:p-3 lg:text-lg text-sm">Hora</th>
                                                            <th className="lg:p-3 lg:text-lg text-sm">Monto</th>

                                                      </tr>

                                                </thead>

                                                <tbody>

                                                      {pagosRealizados.map((pago, index) => {

                                                            return (

                                                                  <tr className="text-center" key={pago.idPago}>

                                                                        <td className="lg:p-3 lg:text-lg text-sm font-bold text-red-900">{index + 1}</td>
                                                                        <td className="lg:p-3 lg:text-lg text-sm font-bold text-green-900">{pago.nombre}</td>
                                                                        <td className="lg:p-3 lg:text-lg text-sm font-bold text-blue-900">{pago.fecha}</td>
                                                                        <td className="lg:p-3 lg:text-lg text-sm font-bold text-blue-900">{pago.hora}</td>
                                                                        <td className="lg:p-3 lg:text-lg text-sm text-red-900 font-bold">${pago.monto}</td>

                                                                  </tr>

                                                            )

                                                      })}

                                                </tbody>

                                          </table>

                                    </div>

                              </div>

                              <div>

                                    <button
                                          className="bg-blue-700 text-white font-bold p-2 rounded-md transition-colors shadow"
                                          onClick={generarPDF}
                                    >Generar PDF
                                    </button>

                              </div>

                        </div>



                  </div>



            </div>


      )
}

export default CobradosDia