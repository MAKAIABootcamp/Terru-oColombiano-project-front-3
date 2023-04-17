import React, { useState } from 'react'
import './newPlace.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fileUpLoad } from '../../services/fileUpLoad'
import { createPostAsync } from '../../redux/actions/userActions'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const NewPlace = () => {
    const [transports, setTransports] = useState([])
    const [activity, setActivity] = useState([])
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { user } = useSelector(store => store.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const addTransport = (name) => {
        if (transports.includes(name)) {
            setTransports(transports.filter(t => t !== name))


        } else {
            setTransports([...transports, name])
        }


    }

    const addActivity = (name) => {
        if (activity.includes(name)) {
            setActivity(activity.filter(a => a !== name))


        } else {
            setActivity([...activity, name])
        }


    }





    const onSubmit = async (data) => {
        const imgPlace = data.imgPlace[0] ? await fileUpLoad(data.imgPlace[0]) : '';
        const imgAct = data.imgAct[0] ? await fileUpLoad(data.imgAct[0]) : '';
        const imgPlace2 = data.imgPlace2[0] ? await fileUpLoad(data.imgPlace2[0]) : '';

        const newPlace = {
            name: data.name,
            description: data.description,
            location: data.location,
            department: data.department,
            activities: data.activities,
            category: activity,
            schedules: data.schedules,
            weather: data.weather,
            tranport: data.transport,
            icons: transports,
            imgPlace: imgPlace,
            imgAct: imgAct,
            imgPlace2: imgPlace2,
            postedBy : user.name



        }
        console.log(newPlace);

        dispatch(createPostAsync(newPlace))
        toast('✔ Publicación exitosa!', {
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
        <article className='newPlace'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Agregar nuevo lugar</h1>

                <label>
                    Nombre
                    <input type="text" placeholder='Nombre del lugar' {...register('name', {
                        required: 'Este campo es requerido'
                    })} />
                </label>
                {errors.name ? <span>{errors.name.message}</span> : <></>}
                <label>
                    Descripción del lugar
                    <textarea cols="10" rows="5" placeholder='Descripción detallada del lugar' {...register('description', {
                        required: 'Este campo es requerido'
                    })}></textarea>
                </label>
                {errors.description ? <span>{errors.description.message}</span> : <></>}
                <label>
                    Ciudad o Pueblo
                    <input type="text" placeholder='Ubicación del lugar' {...register('location', {
                        required: 'Este campo es requerido'
                    })} />
                </label>
                {errors.location ? <span>{errors.location.message}</span> : <></>}
                <label>
                    Departamento
                    <input type="text" placeholder='Departamento en el que se encuentra' {...register('department', {
                        required: 'Este campo es requerido'
                    })} />
                </label>
                {errors.department ? <span>{errors.department.message}</span> : <></>}
                <label>
                    Actividades
                    <textarea cols="10" rows="5" placeholder='Descripción de las actividades que se pueden realizar' {...register('activities', {
                        required: 'Este campo es requerido'
                    })}></textarea>
                </label>
                {errors.activities ? <span>{errors.activities.message}</span> : <></>}
                <label>
                    Por favor seleccione la categoría de cada actividad

                    <section>
                        <small className={activity.includes('natation') ? 'selected' : ''} onClick={() => addActivity('natation')}>Natación</small>
                        <small className={activity.includes('viewpoint') ? 'selected' : ''} onClick={() => addActivity('viewpoint')}>Mirador</small>
                        <small className={activity.includes('cycling') ? 'selected' : ''} onClick={() => addActivity('cycling')}>Ciclismo</small>
                        <small className={activity.includes('camping') ? 'selected' : ''} onClick={() => addActivity('camping')}>Camping</small>
                    </section>

                </label>

                <label>
                    Horarios de atención
                    <input type="text" placeholder='Ingrese el horario de atención' {...register('schedules', {
                        required: 'Este campo es requerido'
                    })} />
                </label>
                {errors.schedules ? <span>{errors.schedules.message}</span> : <></>}

                <label>
                    Que tipo de clima hay en el lugar?
                    <select {...register('weather', {
                        required: 'Este campo es requerido'
                    })}>
                        <option value="">Seleccione</option>
                        <option value="1">Seco</option>
                        <option value="2">Templado</option>
                        <option value="3">De montaña</option>
                        <option value="4">Tropical húmedo</option>
                    </select>
                </label>
                {errors.weather ? <span>{errors.weather.message}</span> : <></>}
                <label>
                    Cómo llegar ?
                    <textarea cols="10" rows="5" placeholder='Descripción de como llegar al lugar' {...register('transport', {
                        required: 'Este campo es requerido'
                    })}></textarea>
                </label>
                <label>
                    Medios de transporte para llegar
                    <section>
                        <small className={transports.includes('car') ? 'selected' : ''} onClick={() => addTransport('car')}>Carro</small>
                        <small className={transports.includes('bus') ? 'selected' : ''} onClick={() => addTransport('bus')}>Bus</small>
                        <small className={transports.includes('moto') ? 'selected' : ''} onClick={() => addTransport('moto')}>Motocilceta</small>
                        <small className={transports.includes('bici') ? 'selected' : ''} onClick={() => addTransport('bici')}>Bicicleta</small>
                        <small className={transports.includes('walking') ? 'selected' : ''} onClick={() => addTransport('walking')}>Caminando</small>
                    </section>
                </label>
                <label>
                    Imágenes que nos permitan ver el lugar
                    <input type="file" {...register('imgPlace', {
                        required: 'Este campo es requerido'
                    })} />
                    {errors.imgPlace ? <span>{errors.imgPlace.message}</span> : <></>}
                    <input type="file" {...register('imgAct', {
                        required: 'Este campo es requerido'
                    })} />
                    {errors.imgAct ? <span>{errors.imgAct.message}</span> : <></>}
                    <input type="file" {...register('imgPlace2', {
                        required: 'Este campo es requerido'
                    })} />
                    {errors.imgPlace2 ? <span>{errors.imgPlace2.message}</span> : <></>}
                </label>


                <button type='submit'>Agregar lugar</button>

            </form>
            <ToastContainer />

        </article>
    )
}

export default NewPlace