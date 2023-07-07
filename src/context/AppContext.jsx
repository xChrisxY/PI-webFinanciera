import { createContext, useState, useEffect } from "react"

export const AppContext = createContext();

export function AppContextProvider(props) {

      const [listaClientes, setListaClientes] = useState([]);
      const [empleado, setEmpleado] = useState({});
      const [cliente, setCliente] = useState({});
      const [acceso, setAcceso] = useState(false);

      useEffect(() => {

            const trabajador = localStorage.getItem('Empleado');

            if (trabajador) {


                  console.log("Obtenemos el objeto de LocalStorage y lo convertimos a objeto")
                  console.log(JSON.parse(trabajador));

                  setEmpleado(JSON.parse(trabajador));
                  setAcceso(true);
                  console.log("hola")

            }

      }, [acceso]);

      useEffect(() => {

            console.log(empleado);

            if (acceso) {

                  console.log("Vemos la información del empleado para ver si podemos enviar los datos")
                  console.log(empleado);

                  const getClientes = () => {

                        fetch(`http://localhost:5176/api/cliente/${empleado.idEmpleado}`)
                              .then(res => res.json())
                              .then(res => setListaClientes(res));

                  }

                  console.log("hola");
                  getClientes();


            }

      }, [empleado]);

      return (

            <AppContext.Provider value={{

                  listaClientes,
                  setListaClientes,
                  empleado,
                  setEmpleado,
                  cliente,
                  setCliente,
                  acceso,
                  setAcceso

            }}>

                  {props.children}

            </AppContext.Provider>

      )
}

export default AppContext