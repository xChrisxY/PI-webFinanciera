function NavBar() {

    return (

        <div className="p-5 bg-slate-900 grid md:grid-cols-2 grid-cols-1">

            <div className="text-center">

                <h1 className="font-extrabold text-5xl text-white animate-fade-in">

                    CADOFI SERVICIOS INTEGRALES

                </h1>

            </div>

            <div>

                <ul className="text-white font-mono flex justify-end text-xl">

                    <li className="px-3 hover:bg-red-900">Inicio</li>
                    <li className="px-3 hover:bg-red-900">Cobrados del dia</li>
                    <li className="px-3 hover:bg-red-900">Actualizar Ticket</li>
                    <li className="px-3 hover:bg-red-900">Salir</li>


                </ul>


            </div>

        </div>

    )
}

export default NavBar