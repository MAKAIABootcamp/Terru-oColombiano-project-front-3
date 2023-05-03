import React, { useEffect, useState } from 'react'
import './login.scss'
import logo from '../../assets/cafe.svg'
import name from '../../assets/terruño.svg'
import phone from '../../assets/celular.png'
import fb from '../../assets/facebook.png'
import googleIcon from '../../assets/google.png'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginUser, loginWithEmail, loginWithEmailAsync, userLoginProvider } from '../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, facebook, google } from '../../firebase/firebaseConfig'
import Swal from 'sweetalert2'
import Loader from '../loader/Loader'
import { getUsers } from '../../services/getUsers'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const Login = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const { handleSubmit, register, reset, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.users)
  console.log(user);

  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch(loginWithEmail(user.uid));
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'info',
          title: 'Error de autenticación',
          text: 'Por favor compruebe que el email y la contraseña sean correctos.'

        })
      });
  };
  const loginWithProvider = (provider) => {
    dispatch(userLoginProvider(provider))
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user1', user);
        getUsers(user.uid)
          .then((response) => {
            console.log(response);
            if (response.type === "admin") {
              navigate('/admin/myAccount')

            }
            else {
              navigate('/')
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {

      }
    });

  }


  return (
    <>
      {loading ? <Loader /> : <article className='login'>
        <div className='login__info'>
          <AiOutlineArrowLeft className='back' onClick={() => navigate(-1)} />

          <figure>
            <img src={logo} alt="icon" />
            <img src={name} alt="terruño" />
          </figure>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section>
              <label>
                Correo
                <input type="text" placeholder='Ingrese su correo' autoComplete="off" {...register('email', {
                  required: 'Este campo es requerido'
                })} />
              </label>
              {errors.email ? <span>{errors.email.message}</span> : <></>}
              <label>
                Contraseña
                <input type="password" placeholder='Ingrese su contraseña' autoComplete="off" {...register('password', {
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
            <img src={googleIcon} alt="Facebook" onClick={() => loginWithProvider(google)} />
            <img src={fb} alt="Google" onClick={() => loginWithProvider(facebook)} />

            <img src={phone} alt="Phone" onClick={() => navigate('/loginWithPhone/phone')} />
          </figure>
        </div>

      </article>}
    </>

  )
}

export default Login