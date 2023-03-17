import React from 'react'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav className="nav">
    <ul>
      <li><NavLink to="/inicio"> Inicio </NavLink></li>
      <li><NavLink to="/articulos"> Peliculas </NavLink></li>
      <li><NavLink to="/crear_articulos"> Añadir Pelicula </NavLink></li>
      <li><NavLink to="/contact"> Contacto </NavLink></li>
    </ul>
  </nav>
  )
}
