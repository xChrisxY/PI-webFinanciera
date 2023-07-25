import NavBar from "./NavBar"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import Swal from 'sweetalert';
import { Navigate } from "react-router-dom";

function ListaGestores() {

      const { gestores, setAceptado, ubicacion } = useContext(AppContext);
      const [editar, setEditar] = useState(false);
      const [clientes, setClientes] = useState([]);
      const [idEmpleado, setIdEmpleado] = useState('');

      const editarGestor = gestor => {

            localStorage.setItem('gestorEditar', JSON.stringify(gestor));
            setEditar(true);

      }

      const eliminarGestor = gestor => {

            const getClientes = () => {

                  fetch(`http://ec2-100-26-195-9.compute-1.amazonaws.com/gestorClientes/${gestor.idEmpleado}`)
                        .then(res => res.json())
                        .then(res => {

                              if (res.length > 0) {

                                    Swal("¡Error!", "El gestor tiene aún pendientes por terminar, no se puede eliminar del sistema", "error");


                              } else {

                                    const requestInit = {

                                          method: 'DELETE'
                                    }


                                    fetch(`http://ec2-100-26-195-9.compute-1.amazonaws.com/eliminarGestor/${gestor.idEmpleado}`, requestInit)
                                          .then(res => res.text())
                                          .then(res => {
                                                setAceptado(true);
                                                console.log(res);

                                          });


                                    Swal("¡Éxito!", "La información del empleado se ha eliminado correctamente", "success");

                              }


                        });

            }

            getClientes();

      }


      if (editar) {

            return (<Navigate to="/registroGestores" />)

      }


      return (

            <div className="flex flex-col min-h-screen bg-blue-950">

                  <NavBar />

                  <div className="flex flex-col flex-grow items-center justify-center">

                        <div className="bg-white lg:p-10 shadow-md p-0">

                              <h1 className="lg:text-4xl font-bold lg:pb-5 text-center lg:mb-5 text-lg">Lista de gestores {ubicacion}, Chiapas</h1>

                              <div className="h-96 overflow-auto">

                                    <div className="table-responsive">

                                          <table className="table-auto w-full text-xl border border-gray-500">

                                                <thead className="sticky top-0 bg-gray-200">

                                                      <tr className="border-b border-white bg-slate-300">

                                                            <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">Nombre</th>
                                                            <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">Dirección</th>
                                                            <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl hidden lg:table-cell">Correo</th>
                                                            <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">Telefono</th>
                                                            <th className="lg:p-3 text-sm p-1 md:text-lg lg:text-xl">Acción</th>

                                                      </tr>

                                                </thead>

                                                <tbody className="flex-col">

                                                      {gestores.map((gestor, index) => {

                                                            const { nombre, calle, direccionNumero, email, telefono } = gestor;

                                                            return (

                                                                  <tr className="border-2 border-gray-500 text-center font-bold" key={index}>

                                                                        <td className="lg:p-3 text-sm md:text-lg lg:text-lg">{nombre}</td>
                                                                        <td className="lg:p-3 text-sm md:text-lg lg:text-lg">{calle + " No. " + direccionNumero}</td>
                                                                        <td className="lg:p-3 text-sm md:text-lg lg:text-lg hidden lg:table-cell">{email}</td>
                                                                        <td className="lg:p-3 text-sm md:text-lg lg:text-lg">{telefono}</td>
                                                                        <td className="lg:p-3 text-sm md:text-lg lg:text-lg">

                                                                              <button

                                                                                    className="bg-green-500 text-white p-1 m-1 rounded-md hover:bg-green-800"
                                                                                    onClick={e => { editarGestor(gestor) }}
                                                                              >
                                                                                    Editar <span className="block">Información</span></button>

                                                                              <button
                                                                                    className="bg-red-500 text-white lg:p-1 m-1 px-5 rounded-md hover:bg-red-800"

                                                                                    onClick={e => { eliminarGestor(gestor) }}

                                                                              >Dar <span className="block">de baja</span></button>

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

      )
}

export default ListaGestores