import { createContext, useState, useEffect } from "react"

export const AppContext = createContext();

export function AppContextProvider(props) {

      const [listaClientes, setListaClientes] = useState([]);
      const [gestores, setGestores] = useState([]);

      const [solicitudes, setSolicitudes] = useState([]);
      const [empleado, setEmpleado] = useState({});
      const [cliente, setCliente] = useState({});
      const [acceso, setAcceso] = useState(false);
      const [agregado, setAgregado] = useState(false);

      const [aceptado, setAceptado] = useState(false);

      //las tres variables que has movido
      const [infoSucursal, setInfoSucursal] = useState([]);
      const [gestor, setGestor] = useState('');
      const [ubicacion, setUbicacion] = useState('');

      useEffect(() => {

            const trabajador = localStorage.getItem('Empleado');

            if (trabajador) {

                  setEmpleado(JSON.parse(trabajador));
                  setAcceso(true);

            }

      }, [acceso]);

      useEffect(() => {

            //agregamos el nombre del gestor nomas se carge la información de este.
            setGestor(empleado.nombre);
            setAgregado(false);

            console.log("si pasas por aqui")

            const getClientes = () => {

                  fetch(`http://3.133.76.177:3000/api/cliente/${empleado.idEmpleado}`)
                        .then(res => res.json())
                        .then(res => setListaClientes(res));

            }

            getClientes();


      }, [empleado, agregado]);

      useEffect(() => {
            // posible validación para obtener un dato u otro

            setAceptado(false);

            if (empleado.puesto === 'Gerente') {

                  const getGestores = () => {

                        fetch("http://3.133.76.177:3000/api/gestores/" + empleado.IdSucursal)
                              .then(res => res.json())
                              .then(res => setGestores(res));
                  }

                  getGestores();
            }

      }, [empleado, gestor, aceptado]);


      //aqui empieza lo que has movido
      useEffect(() => {

            const getSucursal = () => {

                  fetch(`http://3.133.76.177:3000/api/sucursal/${empleado.IdSucursal}`)
                        .then(res => res.json())
                        .then(res => setInfoSucursal(res));

            }

            getSucursal();

      }, [listaClientes]);

      useEffect(() => {

            console.log(infoSucursal);

            if (infoSucursal.length > 0) {

                  setUbicacion(infoSucursal[0].ubicacion);

            }

      }, [infoSucursal]);
      // aqui termina


      return (

            <AppContext.Provider value={{

                  listaClientes,
                  setListaClientes,
                  empleado,
                  setEmpleado,
                  cliente,
                  setCliente,
                  acceso,
                  setAcceso,
                  gestor,
                  ubicacion,
                  setAgregado,
                  setAceptado,
                  gestores,
                  setGestores,


            }}>

                  {props.children}

            </AppContext.Provider>

      )
}

export default AppContext