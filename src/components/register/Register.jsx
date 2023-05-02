import React, { useEffect, useState } from 'react'
import './register.scss'
import { Link, useNavigate } from 'react-router-dom'
import iGogle from '../../assets/facebook.png'
import iFacebook from '../../assets/google.png'
import granos from '../../assets/cafe.svg'
import logo from '../../assets/terruño.svg'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createUserAsync } from '../../redux/actions/userActions'
import { fileUpLoad } from '../../services/fileUpLoad'
import Loader from '../loader/Loader'

const Register = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log(data)
    const photo = data.photo[0] ? await fileUpLoad(data.photo[0]) : '';

    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
      photo: photo,
      location: data.location,
      birthday: data.birthday,
      description: data.description,
      phone: data.phone


    }
    dispatch(createUserAsync(user))
    navigate('/')

  }

  return (
    <>
      {loading ? <Loader /> : <section className='reg-container' >

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

              <input className='input' type="text" placeholder='Ingresa tu nombre '  {...register('name', { required: 'El nombre es requerido' })} />

            </label>
            {errors.name ? <span className='red'>{errors.name.message}</span> : <></>}

            <label className='input-container colum-2 ' >
              <h4>Correo electrónico</h4>

              <input className='input' type="text" placeholder='Ingresa tu correo electrónico' {...register('email', { required: 'El email es requerido' })} />

            </label>
            {errors.email ? <span className='red'>{errors.email.message}</span> : <></>}

            <label className='input-container colum-1' >
              <h4>Lugar de residencia</h4>

              <input className='input' type="text" placeholder='Ingresa tu dirección' {...register('location', {
                required: 'La dirección es requerida'
              })} />
            </label>
            {errors.location ? <span className='red'>{errors.location.message}</span> : <></>}

            <label className='input-container colum-2 ' >
              <h4>Contraseña</h4>

              <input className='input' type="password" placeholder='Ingresa tu contraseña' {...register('password', { required: 'La contraseña es requerida' })} />

            </label>
            {errors.password ? <span className='red'>{errors.password.message}</span> : <></>}

            <label className='input-container colum-1' >
              <h4>Celular</h4>

              <input className='input' type="text" placeholder='Ingresa tu número de celular' {...register('phone', { required: 'El numero telefonico es requerido' })} />

            </label>
            {errors.phone ? <span className='red'>{errors.phone.message}</span> : <></>}
            <label className='input-container colum-1' >
              <h4>Fecha de nacimiento</h4>

              <input className='input' type="date" placeholder='Ingresa tu fecha de nacimiento' {...register('birthday', { required: 'El numero telefonico es requerido' })} />

            </label>
            {errors.phone ? <span className='red'>{errors.phone.message}</span> : <></>}

            <label className='input-container colum-2 ' >
              Foto de perfil
              <input type="file" className='file-input'  {...register('photo', { required: 'La foto de perfil es requerida' })} />


            </label>
            {errors.photo ? <span className='red'>{errors.photo.message}</span> : <></>}

            <label className='input-container colum-1' >
              <h4>Descripción</h4>

              <textarea className='textarea' placeholder='Escribe una pequeña descripción sobre ti' {...register('description', {
                required: 'La descripción es requerida.'
              })} />
            </label>
            {errors.description ? <span className='red'>{errors.description.message}</span> : <></>}

            <section className='form__btns-container'>

              <div className='login_register'>
                <button type='submit' className='login_register__btns' >Registrarse</button>
                <button onClick={() => navigate('/login')} className='login_register__btns' ><Link className='color' style={{ textDecoration: "none" }}>Iniciar sesión</Link></button>
              </div>


            </section>
          </form>

        </div>

      </section>}

    </>
  )
}

export default Register