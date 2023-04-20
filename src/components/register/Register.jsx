import React from 'react'
import './register.scss'
import { Link } from 'react-router-dom'
import iGogle from '../../assets/facebook.png'
import iFacebook from '../../assets/google.png'
import granos from '../../assets/cafe.svg'
import logo from '../../assets/terruño.svg'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createUserAsync } from '../../redux/actions/userActions'
import { fileUpLoad } from '../../services/fileUpLoad'

const Register = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()

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
        description : data.description,
        phone : data.phone


    }
    dispatch(createUserAsync(user))
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

              <input className='input' type="text" placeholder='ingresa tu direccion' {...register('location', {
                required : 'La dirección es requerida'
              })} />
            </label>
            {errors.location ? <span className='red'>{errors.location.message}</span> : <></>}

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
            <label className='input-container colum-1' >
              <h4>Fecha de nacimiento</h4>

              <input className='input' type="date" placeholder='Ingresa tu fecha de nacimiento' {...register('birthday', { required: 'El numero telefonico es requerido' })} />

            </label>
            {errors.phone ? <span className='red'>{errors.phone.message}</span> : <></>}

            <label className='input-container colum-2 ' >
              <h4>Foto de perfil</h4>


              <div className='input div-file'>
                <p > Selecciona tu foto de perfil</p>
                <input type="file" className='file-input'  {...register('photo', { required: 'La foto de perfil es requerida' })} />
              </div>

            </label>
            {errors.photo ? <span className='red'>{errors.photo.message}</span> : <></>}

            <label className='input-container colum-1' >
              <h4>Descripcion</h4>

              <textarea className='textarea' placeholder='escribe una peque descripcion sobre ti' {...register('description', {
                required : 'La descripción es requerida.'
              })} />
            </label>
            {errors.description ? <span className='red'>{errors.description.message}</span> : <></>}

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