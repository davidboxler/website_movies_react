import React from 'react'

export const Contact = () => {
  return (
    <div className='jumbo'>
      <h1>Contactate con Nosotros</h1>

      <form className='formulario' onSubmit="">

        <div className='form_group'>
          <label htmlFor='titulo'>Nombre</label>
          <input type='text' name='titulo' />
        </div>

        <div className='form_group'>
          <label htmlFor='titulo'>Email</label>
          <input type='text' name='titulo' />
        </div>

        <div className='form_group'>
          <label htmlFor='titulo'>Mensaje</label>
          <textarea type='text' name='contenido' />
        </div>

        <input type='submit' value='Enviar' className='btn btn-success' />
      </form>
    </div>
  )
}

export default Contact