import img from "../img/cadofi.jpeg";
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";


function MenuPrincipal() {

    return (

        <div className="flex flex-col min-h-screen">

            <NavBar />

            <div className="flex flex-col flex-grow justify-center items-center bg-blue-950">

                <div className='text-white grid grid-cols-2'>

                    <div className="text-center m-5 mx-16">

                        <h1 className="text-6xl font-bold pb-5">¡BIENVENIDO!</h1>
                        <p className="font-bold"><span className="text-xl">Un nuevo día para hacer el mejor trabajo</span></p>

                        <div className="flex justify-center pt-10">

                            <img src={img} alt="cadofoi logo" className="w-72" />

                        </div>

                    </div>

                    <div className="flex justify-center">

                        <ul className="text-white font-mono text-2xl pt-5">

                            <li className="p-5 hover:text-blue-400"><Link to="/registro">Registrar cliente</Link></li>
                            <li className="p-5 hover:text-blue-400"><Link to="/cobrar">Registrar pago</Link></li>
                            <li className="p-5 hover:text-blue-400"><Link to="/consultar">Consultar clientes</Link></li>
                            <li className="p-5 hover:text-blue-400"><Link to="/historial">Historial de pagos</Link></li>
                            <li className="p-5 hover:text-blue-400"><Link>Generar reporte</Link></li>
                            <li className="p-5 hover:text-blue-400"><Link>Finalizar día</Link></li>

                        </ul>

                    </div>

                </div>
            </div>

        </div>

    )
}

export default MenuPrincipal