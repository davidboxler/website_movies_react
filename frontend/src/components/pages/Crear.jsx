import { React, useState } from 'react'
import { useForm } from "../../hooks/useForm"
import { Peticion } from '../../helpers/Peticion'
import { Global } from '../../helpers/Global'

export const Crear = () => {

  const { formulario, enviado, cambiado } = useForm({})
  const [resultado, setResultado] = useState(false)

  const guardarArticulo = async (e) => {
    e.preventDefault()

    // Recoger datos formulario
    let nuevoArticulo = formulario

    // Guardar articulo en el backend
    const { datos } = await Peticion(Global.url + "crear", "POST", nuevoArticulo)

    if (datos.status === "success") {
      setResultado("guardado")
    } else {
      setResultado("error")
    }

    // Subir imagen
    const fileInput = document.querySelector("#file")

    if (datos.status === "success") {
      setResultado("guardado")

      const formData = new FormData()
      formData.append('file0', fileInput.files[0])

      const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true)

      if (subida.datos.status === "success") {
        setResultado("guardado")
      } else {
        setResultado("error")
      }

    } else {
      setResultado("error")
    }
  }

  return (
    <div className='jumbo'>
      <h1>Añadir Pelicula</h1>
      <p>Formulario para crear una pelicula</p>

      <strong>{resultado == "guardado" ? "Articulo guardado con exito!!" : ""}</strong>
      <strong>{resultado == "error" ? "Algunos de los datos son incorrectos" : ""}</strong>

      <form className='formulario' onSubmit={guardarArticulo}>
        <div className='form_group'>
          <label htmlFor='titulo'>Titulo</label>
          <input type='text' name='titulo' onChange={cambiado} />
        </div>

        <div className='form_group'>
          <label htmlFor='titulo'>Descripcion</label>
          <textarea type='text' name='contenido' onChange={cambiado} />
        </div>

        <div className='form_group'>
          <label htmlFor='titulo'>Imagen</label>
          <input type='file' name='file0' id='file' />
        </div>

        <input type='submit' value='Guardar' className='btn btn-success' />
      </form>
    </div>
  )
}

export default Crear