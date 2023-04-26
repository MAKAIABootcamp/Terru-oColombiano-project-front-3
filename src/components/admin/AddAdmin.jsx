import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { fileUpLoad } from '../../services/fileUpLoad'
import { useDispatch, useSelector } from 'react-redux'
import { createAdmin, editUserAsync } from '../../redux/actions/userActions'
import { toast } from 'react-toastify'

const AddAdmin = () => {
    const [isEdit, setIsEdit] = useState(false)
    const { reset, handleSubmit, register, formState: { errors } } = useForm()
    const dispatch = useDispatch()

    const { user } = useSelector(store => store.users)

    const onSubmit = async (data) => {

        const updatedFields = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== '')
        );

        if (Object.keys(updatedFields).length === 0) {
            return; // no fields updated
        }

        const photo = updatedFields.photo ? await fileUpLoad(updatedFields.photo[0]) : '';


        let newPhoto;
        if (!photo.length) {
            newPhoto = user.photo

        }
        else {
            newPhoto = photo
        }

        const updatedUser = Object.assign({}, user, updatedFields, { photo : newPhoto });


        dispatch(editUserAsync(updatedUser));
        toast('✔ Información actualizada!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setIsEdit(!isEdit)
    }
    return (
        <article className='myAccount'>
            <figure>
                <img src={user.photo} alt="photo" />
            </figure>

            {isEdit ?
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label>
                        Nombre
                        <input type="text" placeholder='Ingrese el nombre' {...register('name')} />
                    </label>

                    <label>
                        Correo electrónico
                        <input type="text" placeholder='Ingrese el correo electrónico' {...register('email')} />
                    </label>

                    <label>
                        Teléfono
                        <input type="text" placeholder='Ingrese el número de teléfono' {...register('phone')} />
                    </label>
                    <label>
                        Fecha de nacimiento
                        <input type="date" {...register('birthday')} />
                    </label>
                    <label>
                        Foto
                        <input type="file" {...register('photo')} />
                    </label>
                    <button type='submit'>Guardar información</button>
                    <span onClick={() => setIsEdit(!isEdit)} style={{ backgroundColor: 'red' }}>Cancelar</span>

                </form> :
                <form className='form'>

                    <label>
                        Nombre
                        <input type="text" readOnly placeholder={user.name} />
                    </label>
                    <label>
                        Correo electrónico
                        <input type="text" readOnly placeholder={user.email} />
                    </label>
                    <label>
                        Teléfono
                        <input type="text" readOnly placeholder={user.phone ? user.phone : 'Agregar número de teléfono'} />
                    </label>
                    <label>
                        Fecha de nacimiento
                        <input type="text" readOnly placeholder={!user.birthday ? 'Agregar fecha de cumpleaños' : user.birthday} />
                    </label>

                    <span onClick={() => setIsEdit(!isEdit)}>Editar información</span>

                </form>}



        </article>
    )
}

export default AddAdmin