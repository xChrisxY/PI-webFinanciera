import { useState } from "react";
import axios from "axios";
import img from "../img/finanzas.jpg";
import { Navigate } from "react-router-dom"
import swal from "sweetalert";

function Login() {

    const [credenciales, setCredenciales] = useState({ username: '', password: '' });
    const [acceso, setAcceso] = useState(false);
    const [nombre, setNombre] = useState('');

    const mandarDatos = ({ target }) => {

        const { name, value } = target;

        setCredenciales({

            ...credenciales, [name]: value

        })

    }

    const onSubmit = e => {

        e.preventDefault();

        axios.post('http://localhost:4000/api/login', credenciales)

            .then(({ data }) => {

                console.log(data);

                setNombre(data.usuario);

                setAcceso(true);

            })

            .catch(({ response }) => {

                console.log(response.data);

            })

    }

    if (acceso) {

        swal("¡Éxito!", `Bienvenido ${nombre}`, "success");

        setTimeout(() => {

            

        }, 3000);


        return (<Navigate to="/menu" />)

    }

    return (

        <div className="bg-blue-950 flex text-white items-center justify-center h-screen">

            <div className="bg-white text-black border border-y-blue-200 grid grid-cols-1 md:grid-cols-2">

                <div className="m-10 p-5">

                    <h1 className="text-blue-900 font-bold text-2xl"><span className="text-3xl">CADOFI</span> SERIVICIOS INTEGRALES</h1>
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