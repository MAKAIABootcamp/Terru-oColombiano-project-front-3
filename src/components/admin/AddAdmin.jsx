import React from 'react'
import { useForm } from 'react-hook-form'
import { fileUpLoad } from '../../services/fileUpLoad'
import { useDispatch } from 'react-redux'
import { createAdmin } from '../../redux/actions/userActions'
import { toast } from 'react-toastify'

const AddAdmin = () => {
    const { reset, handleSubmit, register, formState: { errors } } = useForm()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {

        console.log(data);
        const photo = data.photo[0] ? await fileUpLoad(data.photo[0]) : '';

        const user = {
            name: data.name,
            email: data.email,
            password: data.password,
            photo: photo,
            birthday: data.birthday,
            phone: data.phone


        }
        dispatch(createAdmin(user))
        toast('✔ Se ha agregado correctamente!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });


    }
    return (
        <article className='addAdmin'>
            {/* <h1>Agregar nuevo administrador</h1> */}
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <label>
                        Nombre
                        <input type="text" placeholder='Nombre completo' {...register('name', {
                            required: 'El nombre es requerido'
                        })} />
                        {errors.name ? <span>{errors.name.message}</span> : <></>}

                    </label>
                    <label>
                        Correo electrónico
                        <input type="text" placeholder='Ingrese el email' {...register('email', {
                            required: 'El correo es requerido'
                        })} />
                        {errors.email ? <span>{errors.email.message}</span> : <></>}
                    </label>

                    <label>
                        Contraseña
                        <input type="password" placeholder='Ingrese una contraseña' {...register('password', {
                            required: 'La contraseña es requerida'
                        })} />
                        {errors.password ? <span>{errors.password.message}</span> : <></>}
                    </label>

                    <label>
                        Teléfono
                        <input type="text" placeholder='Ingrese el número de teléfono' {...register('phone', {
                            required: 'El número es requerido'
                        })} />
                        {errors.phone ? <span>{errors.phone.message}</span> : <></>}
                    </label>

                    <label>
                        Foto
                        <input type="file" {...register('photo', {
                            required: 'La foto es requerida'
                        })} />
                        {errors.photo ? <span>{errors.photo.message}</span> : <></>}
                    </label>
                    <label>
                        Fecha de nacimiento
                        <input type="date" {...register('birthday', {
                            required: 'La fecha es requerida'
                        })} />
                        {errors.birthday ? <span>{errors.birthday.message}</span> : <></>}
                    </label>

                </section>



                <button type='submit'>Crear usuario</button>
            </form> */}

        </article>
    )
}

export default AddAdmin