import { Link } from "react-router-dom"

function NavBar() {

    return (

        <div className="p-5 bg-slate-900 grid md:grid-cols-2 grid-cols-1">

            <div className="text-center">

                <h1 className="font-extrabold text-5xl text-white animate-fade-in">

                    CADOFI SERVICIOS INTEGRALES

                </h1>

            </div>

            <div>

                <ul className="text-white font-mono flex justify-end text-xl pt-1">

                    <li className="px-5 hover:bg-red-900 hover:rounded-md"><Link to="/menu">Inicio</Link></li>
                    <li className="px-5 hover:bg-red-900 hover:rounded-md"><Link to="/cobrados">Cobrados del dia</Link></li>
                    <li className="px-5 hover:bg-red-900 hover:rounded-md">Actualizar Ticket</li>
                    <li className="px-5 hover:bg-red-900 hover:rounded-md">Salir</li>


                </ul>


            </div>

        </div>

    )
}

export default NavBar