import Button from "./Button";
import Swal from 'sweetalert';

function Confirmacion({ cliente, listaClientes, setListaClientes }) {

    const { nombre, fecha, telefono, correo, direccion, rfc, curp, estadoCivil, nombreParentesco, parentesco, telefonoParentesco, direccionParentesco, nombreEmpresa, puesto, telefonoEmpresa, direccionEmpresa, buro, creditoActual, monto, credito, debito, cuentaBancaria } = cliente;

    const datos = [

        { etiqueta: 'Nombre', valor: nombre },
        { etiqueta: 'Fecha de nacimiento', valor: fecha },
        { etiqueta: 'Número de teléfono', valor: telefono },
        { etiqueta: 'Correo Electrónico', valor: correo },
        { etiqueta: 'Dirección', valor: direccion },
        { etiqueta: 'RFC', valor: rfc },
        { etiqueta: 'CURP', valor: curp },
        { etiqueta: 'Estado Civil', valor: estadoCivil }

    ];

    const referenciasPersonales = [

        { etiqueta: 'Nombre', valor: nombreParentesco },
        { etiqueta: 'Parentesco', valor: parentesco },
        { etiqueta: 'Número de teléfono', valor: telefonoParentesco },
        { etiqueta: 'Dirección', valor: direccionParentesco }

    ]

    const referenciasLaborales = [

        { etiqueta: 'Nombre de la empresa', valor: nombreEmpresa },
        { etiqueta: 'Puesto', valor: puesto },
        { etiqueta: 'Número de teléfono', valor: telefonoEmpresa },
        { etiqueta: 'Dirección', valor: direccionEmpresa },

    ];

    const referenciasCrediticias = [

        { etiqueta: '¿Buro de crédito?', valor: buro },
        { etiqueta: '¿El cliente posee un crédito actual? ', valor: creditoActual },
        { etiqueta: 'Monto del crédito', valor: puesto },

    ];

    const referenciasBancarias = [

        { etiqueta: 'Cuenta Bancaria', valor: cuentaBancaria },
        { etiqueta: 'Tarjeta de crédito', valor: credito },
        { etiqueta: 'Tarjeta de débito', valor: debito },

    ];

    const agregarCliente = () => {


    }

    return (

        <div className="bg-indigo-300 p-8 rounded-lg my-4 mx-4">

            <h1 className="text-2xl text-center font-bold bg-emerald-600 text-white shadow-md p-1">Confirma el acceso del cliente</h1>

            <div className="font-bold text-2xl text-left px-5 m-8">

                <div className="shadow-md bg-indigo-100">

                    {datos.map((dato, index) => {

                        return (<p key={index} className="my-3 mx-2">

                            {dato.etiqueta}: <span className="text-cyan-800 font-mono">{dato.valor}</span>

                        </p>)

                    })}

                </div>

                <div className="shadow-md bg-indigo-100">

                    <p className="text-3xl text-sky-700 font-medium mx-2 text-center">Referencias Personales</p>

                    {referenciasPersonales.map((dato, index) => {

                        return (<p key={index} className="my-3 mx-2">

                            {dato.etiqueta}: <span className="text-cyan-800 font-mono">{dato.valor}</span>

                        </p>)

                    })}

                </div>

                <div className="shadow-md bg-indigo-100">

                    <p className="text-3xl text-sky-700 font-medium text-center">Referencias Laborales</p>

                    {referenciasLaborales.map((dato, index) => {

                        return (<p key={index} className="my-3 mx-2">

                            {dato.etiqueta}: <span className="text-cyan-800 font-mono">{dato.valor}</span>

                        </p>)

                    })}

                </div>

                <div className="shadow-md bg-indigo-100">

                    <p className="text-3xl text-sky-700 font-medium text-center">Referencias Crediticias</p>

                    {referenciasCrediticias.map((dato, index) => {

                        return (<p key={index} className="my-3 mx-2">

                            {dato.etiqueta}: <span className="text-cyan-800 font-mono">{dato.valor}</span>

                        </p>)

                    })}

                </div>



                <div className="shadow-md bg-indigo-100">

                    <p className="text-3xl text-sky-700 font-medium text-center">Referencias Bancarias</p>

                    {referenciasBancarias.map((dato, index) => {

                        return (<p key={index} className="my-3 mx-2">

                            {dato.etiqueta}: <span className="text-cyan-800 font-mono">{dato.valor}</span>

                        </p>)

                    })}

                </div>

            </div>

            <div className="text-center">

                <Button fn={agregarCliente} mensaje={'CONFIRMAR'} />

            </div>

        </div>

    )
}

export default Confirmacion