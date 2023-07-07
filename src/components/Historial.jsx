import { useEffect, useState, useContext } from "react"
import { AppContext } from "../context/AppContext";
import NavBar from "./NavBar"

function Historial() {

  const { listaClientes } = useContext(AppContext);

  const [infoCredito, setInfoCredito] = useState({});
  const [nombre, setNombre] = useState('');
  const [curp, setCurp] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [nPago, setNpago] = useState(0);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaTermino, setFechaTermino] = useState('');
  const [saldoRestante, setSaldoRestante] = useState(0);
  const [mostrar, setMostrar] = useState(false);
  const [totalCredito, setTotalCredito] = useState(0);
  const [pagosRealizados, setPagosRealizados] = useState([]);
  const [idCredito, setIdCredito] = useState(0);


  const llenarDatos = e => {

    const cliente = listaClientes.find(c => c.curp === e.target.value);

    // Llenamos los daros personales
    setNombre(cliente.nombre);
    setCurp(cliente.curp);
    setTelefono(cliente.telefono);
    setDireccion(cliente.direccion);

    //Obtenemos los datos del crédito
    const getCredito = () => {

      fetch(`http://localhost:5176/api/credito/${cliente.curp}`)
        .then(res => res.json())
        .then(res => setInfoCredito(res));

    }

    getCredito();

    setMostrar(true);

  }

  useEffect(() => {

    if (mostrar) {

      setFechaInicio(infoCredito[0].fechaInicio);
      setFechaTermino(infoCredito[0].fechaTermino);
      setTotalCredito(infoCredito[0].totalCredito);
      setIdCredito(infoCredito[0].idCredito);

    }

  }, [infoCredito]);

  useEffect(() => {

    console.log("hola")

    //Obtenemos los datos de los pagos
    const getPagos = () => {

      fetch(`http://localhost:5176/api/pago/${idCredito}`)
        .then(res => res.json())
        .then(res => setPagosRealizados(res));

    }

    getPagos();

  }, [idCredito]);



  useEffect(() => {

    if (mostrar) {

      console.log(pagosRealizados);

      let suma = 0;

      pagosRealizados.map(pago => {

        suma += pago.monto;

      })

      setNpago(pagosRealizados.length);
      setSaldoRestante(totalCredito - suma);

    }

  }, [pagosRealizados]);

  return (

    <div className="flex flex-col min-h-screen bg-blue-950">

      <NavBar />

      <div className="flex flex-col flex-grow items-center justify-center">

        <div className="bg-white p-10 shadow-md">

          <h1 className="text-4xl font-bold pb-5 text-center">Lista de pagos</h1>

          <div className="flex justify-end py-3">

            <h1 className="text-xl font-bold text-gray-400 pt-3 px-3">Selecciona a un cliente</h1>

            <select
              name="clientes"
              id="clientes"
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none
            bg-blue-900 text-white font-bold text-center border-4 border-white"
            >

              {listaClientes.map(opcion => (

                <option key={opcion.curp} value={opcion.curp} onClick={llenarDatos}>

                  {opcion.nombre}

                </option>

              ))}

            </select>

          </div>

          <div className="grid grid-cols-2 p-5 m-5">

            <div className="py-5 px-5 font-bold text-blue-900 text-xl">

              {mostrar
                ?
                <div>
                  <p className="py-4">Cliente : <span className="text-gray-500">{nombre}</span></p>
                  <p className="py-4">Curp : <span className="text-gray-500">{curp}</span></p>
                  <p className="py-4">Teléfono : <span className="text-gray-500">{telefono}</span></p>
                  <p className="py-4">Dirección: <span className="text-gray-500">{direccion}</span></p>
                </div>
                :

                <div>
                  <p className="py-4">Cliente : <span className="text-gray-500">Nombre del cliente</span></p>
                  <p className="py-4">Curp : <span className="text-gray-500">OEAF771012HMCRGR09</span></p>
                  <p className="py-4">Teléfono : <span className="text-gray-500">Número teléfonico</span></p>
                  <p className="py-4">Dirección: <span className="text-gray-500">Direccion</span></p>
                </div>
              }

            </div>

            <div className="py-5 px-5 font-bold text-blue-900 text-xl">

              {mostrar

                ?

                <div>

                  <p className="py-4">No. de Pagos: <span className="text-gray-500">{nPago}</span></p>
                  <p className="py-4">Fecha de Inicio:  <span className="text-gray-500">{fechaInicio}</span></p>
                  <p className="py-4">Fecha de Termino: <span className="text-gray-500">{fechaTermino}</span></p>
                  <p className="py-4">Saldo restante: <span className="text-gray-500">${saldoRestante}</span></p>
                </div>

                :

                <div>

                  <p className="py-4">No. de Pagos: <span className="text-gray-500">Número de pagos</span></p>
                  <p className="py-4">Fecha de Inicio:  <span className="text-gray-500">Fecha de inicio</span></p>
                  <p className="py-4">Fecha de Termino: <span className="text-gray-500">Fecha de termino</span></p>
                  <p className="py-4">Saldo restante: <span className="text-gray-500">$</span></p>

                </div>
              }

            </div>


          </div>

          <div className="border border-black bg-gray-200 text-black max-w-screen-lg mx-auto">

            <div className="h-64 overflow-auto">

              <table className="table-auto w-full text-xl border border-gray-500">

                <thead className="sticky top-0 bg-gray-200">

                  <tr className="border-b border-white bg-slate-300">

                    <th className="p-3">No. Pago</th>
                    <th className="p-3">Fecha</th>
                    <th className="p-3">Hora</th>
                    <th className="p-3">Monto</th>

                  </tr>

                </thead>

                <tbody>

                  {pagosRealizados.map((pago, index) => {

                    return (

                      <tr className="border-b border-gray-500 text-center" key={pago.idPago}>

                        <td className="p-3 font-bold text-red-900">{index + 1}</td>
                        <td className="p-3 font-bold text-blue-900">{pago.fecha}</td>
                        <td className="p-3 font-bold text-blue-900">{pago.hora}</td>
                        <td className="p-3 text-green-900 font-bold">${pago.monto}</td>

                      </tr>


                    )


                  })}


                </tbody>


              </table>
              
            </div>

            {pagosRealizados.length === 0
              ?

              <div className="text-center font-bold text-xl text-blue-900 font-mono p-10">

                Aún no tienes pagos registrados con el cliente <span className="text-red-800">{nombre}</span>

              </div>

              :

              ''

            }

          </div>


        </div>


      </div>


    </div>

  )

}

export default Historial