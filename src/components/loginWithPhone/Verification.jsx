import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { verifyCodeAsync } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/firebaseConfig';

const Verification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { error } = useSelector(store => store.users)

  const onSubmit = (data) => {
    const code = Number(`${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`)
    console.log(code);
    dispatch(verifyCodeAsync(code))

  }
  useEffect(() => {
    if (error.status) {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: `${error.message}`
      })

    } else if (error.status === false) {
      Swal.fire({
        icon: 'success',
        title: 'Verificación exitosa',
        text: ''
      }).then(() => {
        if (auth.currentUser.displayName && auth.currentUser.photoURL) {
          navigate('/')

        } else {
          navigate('/register')
        }

      })
    }

  }, [error])
  return (
    <form className='loginWithPhone__verify' onSubmit={handleSubmit(onSubmit)}>
      <h4>Verificación de código</h4>
      <p>Ingrese el código de 6 digitos que ha recibido.</p>
      <label>
        <input type="text"{...register('code1', { required: true })} />
        <input type="text"{...register('code2', { required: true })} />
        <input type="text"{...register('code3', { required: true })} />
        <input type="text"{...register('code4', { required: true })} />
        <input type="text"{...register('code5', { required: true })} />
        <input type="text"{...register('code6', { required: true })} />
      </label>
      <button type='submit' className='button'>Verificar</button>
    </form>
  )
}

export default Verification