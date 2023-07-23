function Button({fn, mensaje, disabled}) {

  return (

    <button className="bg-cyan-800 font-bold text-white rounded-2xl mt-4 py-2 px-10 hover:bg-cyan-900" onClick={fn} disabled = {disabled}><span className="text-xl">{mensaje}</span></button>

  )

}

export default Button