import React from 'react'
import './updateUser.scss'
import { Link } from 'react-router-dom'
import generalKenobi from '../../../assets/obi-wan-kenobi-2678395.webp'
import { BsPencilSquare } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const UpdateUser = () => {

  const { resgister, handleSubmit, formState: { errors } } = useForm()

  const {user} = useSelector(store => store.users)

  return (
    <>
      <main className='form-container'>
        <form className='from'>

          <section className='inputs-container'>

            <label className='inputs-container__label'>
              <h3>Cambiar el nombre de usuario</h3>
              <input className='inputs' type="text" placeholder='Ingresa nuevo nombre de usuario' />
            </label>

            <label className='inputs-container__label'>
              <h3>Cambiar correo electrónico</h3>
              <input className='inputs' type="text" placeholder='Ingresa nuevo correo electronico' />
            </label>

            <label className='inputs-container__label'>
              <h3>Cambiar contraseña</h3>
              <input className='inputs' type="text" placeholder='Ingrea la nueva contraseña' />
            </label>

            <label className='inputs-container__label'>
              <h3>Cambiar numero de telefono</h3>
              <input className='inputs' type="text" placeholder='Ingresa el nuevo numero de telefono' />
            </label>

            <label className='inputs-container__label'>
              <h3>Cambiar dirección</h3>
              <input className='inputs' type="text" placeholder='Ingresa la nueva direccion' />
            </label>

            <label className='inputs-container__label'>
              <h3>Cambiar la descripción</h3>
              <textarea className='input-area' placeholder='Escribe la nueva descripcion' />
            </label>
          </section>

          <section className='photo-btns'>
            <label >

              <h3>Cambiar foto de perfil</h3>

                <figure className='profile-photo'>
                  <img src={user.photo} alt="hello there" />
                  <BsPencilSquare/>
                <input className='inputs-photo' type="file" placeholder='foto de perfil' />
                </figure>


            </label>

            <label className='btns-container'>
              <button className='btn' type='submit'>Guardar cambios</button>
              <Link className='btn-cancel' to='/user'>Cancelar</Link>
            </label>
          </section>
        </form>
      </main>
    </>
  )
}

export default UpdateUser