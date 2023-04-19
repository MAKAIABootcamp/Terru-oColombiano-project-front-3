import React from 'react'
import './login.scss'
import logo from '../../assets/cafe.svg'
import name from '../../assets/terruño.svg'
import phone from '../../assets/celular.png'
import fb from '../../assets/facebook.png'
import google from '../../assets/google.png'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginWithEmail } from '../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.users)
  console.log(user);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginWithEmail(data))

    navigate('/')
  }
  return (
    <article className='login'>
      <div className='login__info'>
        <figure>
          <img src={logo} alt="icon" />
          <img src={name} alt="terruño" />
        </figure>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label>
              Correo
              <input type="text" placeholder='Ingrese su correo' {...register('email', {
                required: 'Este campo es requerido'
              })} />
            </label>
            {errors.email ? <span>{errors.email.message}</span> : <></>}
            <label>
              Contraseña
              <input type="password" placeholder='Ingrese su contraseña' {...register('password', {
                required: 'Este campo es requerido'
              })} />
            </label>
            {errors.password ? <span>{errors.password.message}</span> : <></>}


          </section>


          <button type='submit'>Iniciar sesión</button>
        </form>
        <button onClick={() => navigate('/register')}>Regitrarse</button>
        <small>O</small>
        <figure>
          <img src={google} alt="Facebook" />
          <img src={fb} alt="Google" />

          <img src={phone} alt="Phone" onClick={() => navigate('/loginWithPhone/phone')} />
        </figure>
      </div>
    </article>
  )
}

export default Login