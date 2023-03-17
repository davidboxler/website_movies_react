import { React, useEffect, useState } from 'react'
import { useForm } from "../../hooks/useForm"
import { Peticion } from '../../helpers/Peticion'
import { Global } from '../../helpers/Global'
import { useParams } from 'react-router-dom'

export const Editar = () => {

  const { formulario, enviado, cambiado } = useForm({})
  const [resultado, setResultado] = useState(false)
  const [articulo, setArticulo] = useState({})
  const params = useParams()

  useEffect(() => {
    conseguirArticulo()
  }, [])

  const conseguirArticulo = async () => {

    const { datos } = await Peticion(Global.url + "articulos/" + params.id, "GET")

    if (datos.status === "success") {
      setArticulo(datos.articulo)
    }
  }

  const editarArticulo = async (e) => {
    e.preventDefault()

    // Recoger datos formulario
    let nuevoArticulo = formulario

    // Guardar articulo en el backend
    const { datos } = await Peticion(Global.url + "articulos/"+params.id, "PUT", nuevoArticulo)

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
      <h1>Editar articulo</h1>
      <p>Formulario para editar: {articulo.titulo}</p>

      <strong>{resultado == "guardado" ? "Articulo guardado con exito!!" : ""}</strong>
      <strong>{resultado == "error" ? "Algunos de los datos son incorrectos" : ""}</strong>

      <form className='formulario' onSubmit={editarArticulo}>
        <div className='form_group'>
          <label htmlFor='titulo'>Titulo</label>
          <input type='text' name='titulo' onChange={cambiado} defaultValue={articulo.titulo} />
        </div>

        <div className='form_group'>
          <label htmlFor='titulo'>Contenido</label>
          <textarea type='text' name='contenido' onChange={cambiado} defaultValue={articulo.contenido} />
        </div>

        <div className='form_group'>
          <label htmlFor='titulo'>Imagen</label>
          <div className='mascara'>
            {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
            {articulo.imagen == "default.png" && <img src='https://logos-download.com/wp-content/uploads/2019/01/JavaScript_Logo.png'></img>}
          </div>
          <input type='file' name='file0' id='file' />
        </div>

        <input type='submit' value='Guardar' className='btn btn-success' />
      </form>
    </div>
  )
}

export default Editar