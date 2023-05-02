import React from 'react'
import './newPlace.scss'
import { ToastContainer} from 'react-toastify'
import { Outlet, useNavigate } from 'react-router-dom'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { BsImage } from 'react-icons/bs'






const NewPlace = () => {
    const navigate = useNavigate()
    
    return (
        <article className='newPlace'>
            <aside>
                <button onClick={() => navigate('addPlace')}> <IoMdAddCircleOutline />Agregar lugar</button>
                <button onClick={() => navigate('myPlaces')}><BsImage />Lugares agregados</button>
            </aside>

            <Outlet />
           
            <ToastContainer />

        </article>
    )
}

export default NewPlace