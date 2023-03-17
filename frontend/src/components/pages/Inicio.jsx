import React from 'react'
import { Link } from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Todas las películas Online Gratis</h1>
      <p><strong>tvPelis</strong> es la plataforma de streaming gratuito por excelencia. Dentro de sus pantallas, puedes ver un sinfín de películas y/o series interesantes, atrapantes y que seguramente te sacudirán el aburrimiento en pocos minutos.</p>
      <Link to='/articulos' className='button'>Comenzar</Link>
    </div>
  )
}

export default Inicio