import { useState, useContext, useEffect } from "react";
import img from "../img/finanzas.jpg";
import { Navigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import Swal from "sweetalert";

function Login() {

    const { acceso, setAcceso } = useContext(AppContext);

    const [credenciales, setCredenciales] = useState({ username: '', password: '' });

    const [pagosDelDia, setPagosDelDia] = useState([]);
    const [empleado, setEmpleado] = useState({}); // Variable temporal

    const mandarDatos = ({ target }) => {

        const { name, value } = target;

        setCredenciales({

            ...credenciales, [name]: value

        })

    }

    const onSubmit = e => {

        e.preventDefault();

        const requestInit = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credenciales)

        }

        fetch('http://localhost:5176/api/login', requestInit)
                
            .then(res => res.json())
            .then(res => {

                if (res.length > 0) {

                    const currentDate = new Date();

                    const day = currentDate.getDate().toString().padStart(2, '0');
                    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                    const year = currentDate.getFullYear().toString();

                    const fechaActual = `${day}-${month}-${year}`;

                    const informacion = {

                        idEmpleado: res[0].idEmpleado,
                        fecha: fechaActual

                    }

                    const getCobrados = () => {

                        const query = new URLSearchParams(informacion).toString();
                        const url = `http://localhost:5176/api/cobradosDia?${query}`;

                        fetch(url)
                            .then(res => res.json())
                            .then(res => setPagosDelDia(res));

                    }

                    getCobrados();

                    setEmpleado(res[0]);


                } else {

                    Swal("¡Error!", "No se ha encontrado a nadie con esos datos", "error");

                }

            })

    }

    useEffect(() => {

        if (Object.keys(empleado).length > 0) {

            console.log("Aqui está pasando");

            if (pagosDelDia.length > 0) {

                console.log(pagosDelDia);

                console.log("Si hay cobros realizados, entonces no se le permite ingresar de nuevo");

                swal("Lo sentimos!", "Lo sentimos, pero ya haz finalizado el día", "warning");

                console.log(empleado);

                setEmpleado({});

                setCredenciales({ username: '', password: '' });

            } else {

                console.log("No hay pagos realizados, entonces si se le permite ingresar");

                setAcceso(true);

                localStorage.setItem('Empleado', JSON.stringify(empleado));

                setCredenciales({ username: '', password: '' });

                setEmpleado({});

            }

        }

    }, [pagosDelDia]);


    if (acceso) {

        return (<Navigate to="/menu" />)

    }

    return (

        <div className="bg-blue-950 flex text-white items-center justify-center h-screen">

            <div className="bg-white text-black border border-y-blue-200 grid grid-cols-1 md:grid-cols-2">

                <div className="m-10 p-5">

                    <h1 className="text-blue-900 font-bold text-2xl text-center"><span className="text-3xl block text-center">CADOFI</span> SERVICIOS INTEGRALES</h1>
                    <img src={img} alt="finanzas" className="w-96" />

                </div>

                <div className="text-center m-10 p-5">

                    <h1 className="font-bold text-blue-900 text-2xl p-1">¡Bienvenido!</h1>
                    <p className="font-mono text-blue-800 pb-5">Un nuevo día para hacer el mejor trabajo.</p>

                    <form className="grid">

                        <input
                            type="text"
                            className="border-2 border-blue-800 placeholder:font-bold placeholder:text-blue-900 m-5 p-2"
                            placeholder="Usuario"
                            value={credenciales.username}
                            onChange={mandarDatos}
                            name="username"
                        />
                        <input
                            type="password"
                            className="border-2 border-blue-800 placeholder:font-bold text-blue placeholder:text-blue-900 m-5 p-2"
                            placeholder="Contraseña"
                            value={credenciales.password}
                            onChange={mandarDatos}
                            name="password"
                        />

                        <button className="bg-blue-900 text-white m-5 p-2" onClick={onSubmit}>

                            Iniciar Sesión

                        </button>

                    </form>

                </div>

            </div>


        </div>

    )
}

export default Login