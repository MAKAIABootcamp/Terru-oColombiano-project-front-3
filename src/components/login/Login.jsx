import React, { useEffect } from 'react'
import './login.scss'
import logo from '../../assets/cafe.svg'
import name from '../../assets/terruño.svg'
import phone from '../../assets/celular.png'
// import fb from '../../assets/facebook.png'
// import google from '../../assets/google.png'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { actionLoginGoogleOrFacebook, loginWithEmail } from '../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { loginProvider } from '../../services/gfProvider'
import { auth } from '../../firebase/firebaseConfig'

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

  const handleLoginGoogleOrFacebook = (provider) => {
    dispatch(actionLoginGoogleOrFacebook(provider));
  };

   useEffect(() => {
     if (auth.currentUser) {
       navigate('/')
       console.log(auth.currentUser)
     } 
    //  else if (auth.currentUser.displayName) {
    //    navigate('/loginWithPhone/updateInfo')
    //  } 
     else {
    console.log('xd')
  }
   })
  

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
        {loginProvider.map((provider, index) => (
          <img
            key={index}
            src={provider.image}
            alt={provider.name}
            style={{ width: "40px", cursor: "pointer" }}
            onClick={() => {
              handleLoginGoogleOrFacebook(provider.provider);
            }}
          />
        ))}
          <img src={phone} alt="Phone" onClick={() => navigate('/loginWithPhone/phone')} />
        </figure>
      </div>
    </article>
  )
}

export default Login