import { useState, useEffect } from "react"
import { formatearDinero, calcularTotalPagar } from "../helpers";
import Button from "./Button";

function Cotizador({ setPlan , setTotalCredito, pagos ,setPagos ,disabled}) {

    const [cantidad, setCantidad] = useState(25000);
    const [total, setTotal] = useState(25000);
    const [cantidadPagos, setCantidadPagos] = useState(0);
    const [plazo, setPlazo] = useState('Diario');

    const min = 0;
    const max = 50000;
    const step = 100;

    useEffect(() => {

        const resultadoTotal = calcularTotalPagar(cantidad);

        setTotal(resultadoTotal);

        if (plazo === 'Semanal') {

            setCantidadPagos(9);

        } else {

            setCantidadPagos(66);

        }

        setPlan(plazo);
        setTotalCredito(total);

    }, [cantidad, plazo]);

    useEffect(() => {

        setPagos(total / cantidadPagos);

    }, [total, cantidadPagos])


    function handleChange(e) {

        setCantidad(+e.target.value);
        

    }

    function handleClickDecremento() {

        const valor = cantidad - step;

        if (valor < min) {

            alert('Ya no se puede modificar más');
            return;

        }

        setCantidad(valor);

    }

    function handleClickIncremento() {

        const valor = cantidad + step;

        if (valor > max) {

            alert('Ya no se puede modificar más');

            return;

        }

        setCantidad(valor);

    }

    return (

        <div className="bg-white shadow p-5 m-5">

            <h1 className="text-4xl font-extrabold text-gray-500 text-center">

                ¿Cuánto <span className="text-indigo-600">dinero </span> necesita?

            </h1>

            <div className="flex justify-between my-6">


                <Button fn={handleClickDecremento} mensaje="-" disabled = {disabled}/>

                <Button fn={handleClickIncremento} mensaje="+" disabled = {disabled}/>


            </div>

            <input

                type="range"
                className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
                onChange={handleChange}
                min={min}
                max={max}
                step={step}
                value={cantidad}
                disabled = {disabled}

            />

            <p className="text-center 2xl:my-10 2xl:text-5xl font-extrabold text-indigo-600 my-1 text-4xl">{formatearDinero(cantidad)}</p>

            <h2 className="text-2xl font-extrabold text-gray-500 text-center">Elige un <span className="text-indigo-600">Plazo</span> a pagar</h2>

            <select name="plazo" id="plazo" className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"

                value={plazo}
                onChange={e => { setPlazo(e.target.value) }}
                disabled = {disabled}

            >
                <option value="Diario">Diario</option>
                <option value="Semanal">Semanal</option>

            </select>

            <div className="space-y-3 bg-gray-50 p-3">

                <h2 className="text-2xl font-extrabold text-gray-500 text-center">

                    Resumen <span className="text-indigo-600"> Pagos </span>

                </h2>

                <p className="text-xl text-gray-500 text-center font-bold">{cantidadPagos} Pagos</p>
                <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(total)} Total a pagar</p>
                <p className="text-xl text-gray-500 text-center font-bold">{formatearDinero(pagos)} {plazo}</p> 

            </div>

        </div>

    )




}

export default Cotizador
