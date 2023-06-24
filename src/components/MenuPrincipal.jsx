import img from "../img/cadofi.jpeg";
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";

function MenuPrincipal() {

    return (

        <div>

            <NavBar />

            <div className='bg-blue-950 text-white grid grid-cols-2 h-screen'>

                <div className="p-10 text-center pt-56">

                    <h1 className="text-6xl pb-5 font-bold">¡BIENVENIDO!</h1>
                    <p><span className="font-serif text-xl">Un nuevo día para hacer el mejor trabajo</span></p>

                    <div className="flex justify-center pt-10">

                        <img src={img} alt="cadofoi logo" className="w-72"/>

                    </div>

                </div>

                <div className="p-10 flex justify-center pt-56">

                    <ul className="text-white font-mono text-2xl">                        

                        <li className="p-5 hover:text-blue-400"><Link to="/registro">Registrar cliente</Link></li>
                        <li className="p-5 hover:text-blue-400"><Link to="/cobrar">Registrar pago</Link></li>
                        <li className="p-5 hover:text-blue-400"><Link to="/consultar">Consultar clientes</Link></li>
                        <li className="p-5 hover:text-blue-400"><Link>Historial de pagos</Link></li>
                        <li className="p-5 hover:text-blue-400"><Link>Generar reporte</Link></li>
                        <li className="p-5 hover:text-blue-400"><Link>Finalizar día</Link></li>

                    </ul>

                </div>

            </div>

        </div>

    )
}

export default MenuPrincipal