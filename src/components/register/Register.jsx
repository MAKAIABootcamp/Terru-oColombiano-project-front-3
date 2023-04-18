import React from 'react'
import './register.scss'
import { Link } from 'react-router-dom'
import iGogle from '../../assets/facebook.png'
import iFacebook from '../../assets/google.png'
import granos from '../../assets/cafe.svg'
import logo from '../../assets/terruño.svg'
import { useForm } from 'react-hook-form'

const Register = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = () => {
    console.log('yesssssssss')
  }

  return (
    <>
      <section className='reg-container' >

        <div className='form-container-div' >

          <div className='logos'>
            <figure className='granos'>
              <img src={granos} alt="" />
            </figure>
            <figure className='logo'>
              <img src={logo} alt="" />
            </figure>

          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='form' >
            <label className='input-container colum-1 ' >
              <h4>Nombre completo</h4>

              <input className='input' type="text" placeholder='ingresa tu nombre '  {...register('name', { required: 'El nombre es requerido' })} />

            </label>
            {errors.name ? <span className='red'>{errors.name.message}</span> : <></>}

            <label className='input-container colum-2 ' >
              <h4>Correo electronico</h4>

              <input className='input' type="text" placeholder='ingresa tu correo electronico' {...register('email', { required: 'El email es requerido' })} />

            </label>
            {errors.email ? <span className='red'>{errors.email.message}</span> : <></>}

            <label className='input-container colum-1' >
              <h4>Direccion</h4>

              <input className='input' type="text" placeholder='ingresa tu direccion' />
            </label>

            <label className='input-container colum-2 ' >
              <h4>Contraseña</h4>

              <input className='input' type="password" placeholder='ingresa tu contraseña' {...register('password', { required: 'La contraseña es requerida' })} />

            </label>
            {errors.password ? <span className='red'>{errors.password.message}</span> : <></>}

            <label className='input-container colum-1' >
              <h4>Celular</h4>

              <input className='input' type="text" placeholder='ingresa tu numero de celular' {...register('phone', { required: 'El numero telefonico es requerido' })} />

            </label>
            {errors.phone ? <span className='red'>{errors.phone.message}</span> : <></>}

            <label className='input-container colum-2 ' >
              <h4>Foto de perfil</h4>

              <input className='input' type="text" placeholder='pon tu foto de perfil' {...register('photo', { required: 'La foto de perfil es requerido' })} />

            </label>
            {errors.photo ? <span className='red'>{errors.photo.message}</span> : <></>}

            <label className='input-container colum-1' >
              <h4>Descripcion</h4>

              <textarea className='textarea' placeholder='escribe una peque descripcion sobre ti' />
            </label>

            <section className='form__btns-container'>

              <div className='login_register'>
                <button type='submit' className='login_register__btns' >Register</button>
                <button className='login_register__btns' ><Link className='color' style={{ textDecoration: "none" }}>Iniciar sesión</Link></button>
              </div>

              <h4>O</h4>

              <div className='goggle-facebook'>
                <figure><img className='g-icon' src={iGogle} alt="" /></figure>

                <figure> <img className='f-icon' src={iFacebook} alt="" /></figure>
              </div>

            </section>
          </form>

        </div>

      </section>
    </>
  )
}

export default Register