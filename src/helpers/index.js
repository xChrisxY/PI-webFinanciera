//API de internacionalización de JS
const formatearDinero = (valor) => {

    const formatter = new Intl.NumberFormat('en-US', {

        style : 'currency',
        currency : 'USD'
    })

    return formatter.format(valor);
}


const calcularTotalPagar = (cantidad) => {

    let total = cantidad * 0.16;
    return total += cantidad;

}

export {

    formatearDinero,
    calcularTotalPagar

}