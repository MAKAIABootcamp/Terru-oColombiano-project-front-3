import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import logo from '../../assets/cafe.svg'
import name from '../../assets/terruño.svg'
import { fileUpLoad } from '../../services/fileUpLoad'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUserAsync, updateProfileAsync } from '../../redux/actions/userActions'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'

const UpdateInfo = () => {
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const  loading  = useSelector((store) => store.loading)



    const onSubmit = async (data) => {
        console.log(data);
        const photo = data.photo[0] ? await fileUpLoad(data.photo[0]) : '';

        const user = {
            name: data.name,
            email: data.email,
            password: data.password,
            photo: photo,
            location: data.location,
            birthday: data.birthday,
            description : data.description,


        }
        if (isEdit) {
            dispatch(updateProfileAsync(user))
            setTimeout(() => {
                navigate('/')

            }, 2000);
        } else {
            dispatch(createUserAsync({...user, phone : data.phone}))
            setTimeout(() => {
                navigate('/')

            }, 2000);

        }



    }

    useEffect(() => {
        onAuthStateChanged(auth, (user => {
            if (user) {
                setIsEdit(true)

            }
        }))

    }, [])
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='loginWithPhone__updateInfo'>
            <section>
                <label>
                    Nombre completo
                    <input type="text" placeholder='Ingresa tu nombre completo ' {...register('name', {
                        required: 'Este campo es requerido'
                    })} />
                </label>
                {errors.name ? <span>{errors.name.message}</span> : <></>}
                <label>
                    Correo electrónico
                    <input type="text" placeholder='Ingrese su correo electrónico ' {...register('email', {
                        required: 'Este campo es requerido'
                    })} />
                </label>
                {errors.email ? <span>{errors.email.message}</span> : <></>}
                <label>
                    Contraseña
                    <input type="password" placeholder='Ingrese su contraseña' />
                </label>
                {errors.password ? <span>{errors.password.message}</span> : <></>}
                <label>
                    Fecha de nacimiento
                    <input type="date" placeholder='Ingresa tu fecha de nacimiento ' {...register('birthday', {
                        required: 'Este campo es requerido'
                    })} />
                </label>
                {errors.birthday ? <span>{errors.birthday.message}</span> : <></>}
                <label>
                    Dirección
                    <input type="text" placeholder='Ingrese su lugar de residencia ' {...register('location', {
                        required: 'Este campo es requerido'
                    })} />
                </label>
                {errors.location ? <span>{errors.location.message}</span> : <></>}
                <label>
                    Cuentanos un poco de ti
                    <textarea cols="30" rows="5" placeholder='Breve descripción para conocerte mejor' {...register('description', {
                        required: 'Este campo es requerido'
                    })}></textarea>

                </label>
                {errors.description ? <span>{errors.description.message}</span> : <></>}
                <label>
                    Foto de perfil
                    <input type="file" {...register('photo', {
                        required: 'Este campo es requerido'
                    })} />
                </label>
                {errors.photo ? <span>{errors.photo.message}</span> : <></>}

            </section>




            <button type='submit'>Confirmar</button>
        </form>
    )
}

export default UpdateInfo