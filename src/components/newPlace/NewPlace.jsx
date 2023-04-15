import React from 'react'
import './newPlace.scss'
import { useForm } from 'react-hook-form'

const NewPlace = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()


    const onSubmit = (data) => {
        console.log(data);
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
                        <small>Natación</small>
                        <small>Mirador</small>
                        <small>Ciclismo</small>
                        <small>Camping</small>
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
                        <option value="1">Cálido</option>
                        <option value="2">Frío</option>
                        <option value="3">Tropical</option>
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
                        <small>Carro</small>
                        <small>Bus</small>
                        <small>Motocilceta</small>
                        <small>Bicicleta</small>
                        <small>Caminando</small>
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
        </article>
    )
}

export default NewPlace