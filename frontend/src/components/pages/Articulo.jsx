import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Peticion } from '../../helpers/Peticion'
import { Global } from '../../helpers/Global'
import { useParams } from 'react-router-dom'

export const Articulo = () => {
  const [articulo, setArticulo] = useState({})
  const [cargando, setCargando] = useState(true)
  const params = useParams()

  useEffect(() => {
    conseguirArticulo()
  }, [])

  const conseguirArticulo = async () => {

    const { datos, cargando } = await Peticion(Global.url + "articulos/" + params.id, "GET")

    if (datos.status === "success") {
      setArticulo(datos.articulo)
    }

    setCargando(false)
  }

  return (
    <div className='jumbo'>
      {cargando ? "Cargando" :
        <>
          <div className='mascara'>
            {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
            {articulo.imagen == "default.png" && <img src='https://logos-download.com/wp-content/uploads/2019/01/JavaScript_Logo.png'></img>}
          </div>
          <h1>{articulo.titulo}</h1>
          <span>{articulo.fecha}</span>
          <p>{articulo.contenido}</p>
        </>
      }
    </div>
  )
}

export default Articulo