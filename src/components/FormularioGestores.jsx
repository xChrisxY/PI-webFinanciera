import React, { useEffect, useState, useContext } from 'react'
import NavBar from './NavBar'
import Button from './Button';
import Swal from 'sweetalert';
import { AppContext } from "../context/AppContext"

function FormularioGestores() {

      const {empleado, setAceptado} = useContext(AppContext);

      const [mensajeError, setMensajeError] = useState('');
      const [mensajeError2, setMensajeError2] = useState('');
      const [mensajeError3, setMensajeError3] = useState('');

      const [nombre, setNombre] = useState('');
      const [apellidoPaterno, setApellidoPaterno] = useState('');
      const [apellidoMaterno, setApellidoMaterno] = useState('');
      const [calle, setCalle] = useState('');
      const [direccionNumero, setDireccionNumero] = useState('');
      const [codigoPostal, setCodigoPostal] = useState('');
      const [email, setEmail] = useState('');
      const [telefono, setTelefono] = useState('');
      const [idSucursal, setIdSucursal] = useState(empleado.IdSucursal);
      const [usuario, setUsuario] = useState('');
      const [contrasena, setContrasena] = useState('');

      const [disabled, setDisabled] = useState(false);
      const [idEmpleado, setIdEmpleado] = useState('');

      useEffect(() => {

            setIdSucursal(empleado.IdSucursal);

            const gestor = localStorage.getItem('gestorEditar');

            if (gestor) {

                  setDisabled(true);

                  const { nombre, apellidoPaterno, apellidoMaterno, calle, direccionNumero, codigoPostal, email, telefono, IdSucursal, idEmpleado } = JSON.parse(gestor);

                  setNombre(nombre);
                  setApellidoPaterno(apellidoPaterno);
                  setApellidoMaterno(apellidoMaterno);
                  setCalle(calle);
                  setDireccionNumero(direccionNumero);
                  setCodigoPostal(codigoPostal);
                  setEmail(email);
                  setTelefono(telefono);
                  setIdSucursal(IdSucursal);
                  setIdEmpleado(idEmpleado)

            }

      }, [])

      const validarFormulario = e => {

            e.preventDefault();

            if (disabled) {

                  if ([nombre, apellidoMaterno, apellidoPaterno, calle, codigoPostal, email, telefono, idSucursal].includes('')) {

                        showAlert();

                  } else {

                        const infoEmpleado = {

                              idEmpleado,
                              nombre,
                              apellidoMaterno,
                              apellidoPaterno,
                              calle,
                              direccionNumero,
                              codigoPostal,
                              email,
                              telefono,
                              idSucursal

                        }

                        const requestInit = {

                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(infoEmpleado)

                        }

                        fetch('http://3.133.76.177:3000/api/modificarEmpleado', requestInit)
                              .then(res => res.text())
                              .then(res => console.log(res))


                        localStorage.removeItem('gestorEditar');

                        setDisabled(false);

                        Swal("¡Éxito!", "La información del empleado se ha actualizado correctamente", "success");
                        vaciarCampos();
                        setAceptado(true);

                  }

            } else {

                  if ([nombre, apellidoMaterno, apellidoPaterno, calle, direccionNumero, codigoPostal, email, telefono, idSucursal, usuario, contrasena].includes('')) {

                        showAlert();

                  } else {

                        const gestor = {

                              idSucursal,
                              nombre,
                              apellidoPaterno,
                              apellidoMaterno,
                              calle,
                              direccionNumero,
                              codigoPostal,
                              email,
                              telefono,
                              usuario,
                              contrasena,
                              puesto: "Gestor de cobranza"
                        }


                        // Hacemos la petición a la API y los datos se almacenan en la base de datos
                        const requestInit = {

                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(gestor)

                        }

                        fetch('http://3.133.76.177:3000/api/empleado', requestInit)
                              .then(res => res.text())
                              .then(res => console.log(res));


                        Swal("¡Éxito!", "El gestor se ha agregado satisfactoriamente", "success");
                        vaciarCampos();
                        setAceptado(true);
                  }

            }

      }

      const vaciarCampos = () => {

            setNombre("");
            setApellidoPaterno("");
            setApellidoMaterno("");
            setCalle("");
            setDireccionNumero("");
            setCodigoPostal("");
            setEmail("");
            setTelefono("");
            setIdSucursal("");
            setUsuario('');
            setContrasena('');

      }

      const showAlert = () => {

            Swal("¡Error!", "Debe llenar todos los campos del formulario", "error");

      }

      const handleChangeNumero = e => {

            const inputNumero = e.target.value;

            if (!isNaN(inputNumero)) {

                  if (inputNumero.length <= 10) {

                        setTelefono(+inputNumero);
                        setMensajeError2('');

                  }

            } else {

                  setMensajeError2('Por favor, ingresa solo números!');

            }

      }

      const handleChangeCodigoPostal = e => {

            const inputNumero = e.target.value;

            if (!isNaN(inputNumero)) {

                  setCodigoPostal(+inputNumero);
                  setMensajeError('');

            } else {

                  setMensajeError('Por favor, ingresa solo números!');
            }
      }

      const handleChangeNumeroCasa = e => {

            const inputNumero = e.target.value;

            if (!isNaN(inputNumero)) {

                  setDireccionNumero(+inputNumero);
                  setMensajeError3('');

            } else {

                  setMensajeError3('Por favor, ingresa solo números!');

            }
      }

      return (

            <div className='flex flex-col min-h-screen bg-blue-950'>

                  <NavBar />

                  <div className='flex flex-col flex-grow items-center justify-center'>

                        <div className='bg-white text-center p-10 font-bold'>

                              <h1 className="text-2xl mb-5 text-center">REGISTRO DE GESTORES</h1>

                              <input
                                    type="text"
                                    id='nombre'
                                    value={nombre}
                                    placeholder='Nombre'
                                    className='border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 mb-5 p-2 block'
                                    onChange={e => { setNombre(e.target.value) }}
                              />

                              <input
                                    type="text"
                                    id='apellidoPaterno'
                                    value={apellidoPaterno}
                                    placeholder='Apellido Paterno'
                                    className='border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 mb-5 p-2 block'
                                    onChange={e => { setApellidoPaterno(e.target.value) }}
                              />

                              <input
                                    type="text"
                                    id='apellidoMaterno'
                                    value={apellidoMaterno}
                                    placeholder='Apellido Materno'
                                    className='border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 mb-5 p-2 block'
                                    onChange={e => { setApellidoMaterno(e.target.value) }}
                              />

                              <input
                                    type="text"
                                    id='calle'
                                    value={calle}
                                    placeholder='Calle'
                                    className='border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 mb-5 p-2 block'
                                    onChange={e => { setCalle(e.target.value) }}
                              />

                              <input
                                    type="text"
                                    id='numero'
                                    value={direccionNumero}
                                    placeholder='Número de casa/manzana'
                                    className='border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 mb-5 p-2 block'
                                    onChange={handleChangeNumeroCasa}
                              />

                              {mensajeError3 && <p className="text-red-500 text-sm">{mensajeError3}</p>}

                              <input
                                    type="text"
                                    id='codigoPostal'
                                    value={codigoPostal}
                                    placeholder='Código Postal'
                                    className='border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 mb-5 p-2 block'
                                    onChange={handleChangeCodigoPostal}
                              />

                              {mensajeError && <p className="text-red-500 text-sm">{mensajeError}</p>}

                              <input
                                    type="email"
                                    id='email'
                                    value={email}
                                    placeholder='Email'
                                    className='border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 mb-5 p-2 block'
                                    onChange={e => { setEmail(e.target.value) }}
                              />

                              <input
                                    type="text"
                                    id='telefono'
                                    value={telefono}
                                    placeholder='Telefono'
                                    className='border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 mb-5 p-2 block'
                                    onChange={handleChangeNumero}
                              />

                              {mensajeError2 && <p className="text-red-500 text-sm">{mensajeError2}</p>}

                              <input
                                    type="text"
                                    id='usuario'
                                    value={usuario}
                                    placeholder='Usuario'
                                    disabled={disabled}
                                    className='border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 mb-5 p-2 block'
                                    onChange={e => { setUsuario(e.target.value) }}
                              />

                              <input
                                    type="text"
                                    id='contrasena'
                                    value={contrasena}
                                    placeholder='Contraseña'
                                    disabled={disabled}
                                    className='border-2 text-gray-950 text-center rounded-md border-solid border-blue-900 mt-5 mb-5 p-2 block'
                                    onChange={e => { setContrasena(e.target.value) }}
                              />

                              <Button fn={validarFormulario} mensaje='Finalizar' disabled={false} />

                        </div>

                  </div>

            </div>

      )
}

export default FormularioGestores