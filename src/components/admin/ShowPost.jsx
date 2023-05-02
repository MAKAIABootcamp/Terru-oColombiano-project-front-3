import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusAsync, getPlacesAsync } from '../../redux/actions/placesActions';
import { BsCheck2 } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'
import ModalMain from '../modal/ModalMain';
import { toast } from 'react-toastify';
import { Outlet, useNavigate } from 'react-router-dom';


const ShowPost = () => {
    const [isDispatched, setIsDispatched] = useState(false)
    const { places } = useSelector(store => store.places)
    const navigate = useNavigate()

    console.log(places);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPlacesAsync())

    }, [isDispatched])
    useEffect(() => {
      
  
    }, [])
    




 

    return (
        <article className='showPosts'>
            <section className='showPosts__filters'>
                <button style={{ backgroundColor: 'gray' }} onClick={() => navigate("all")}>Todos</button>
                <button style={{ backgroundColor: 'green' }} onClick={() => navigate("Aceptado")}>Aceptadas</button>
                <button style={{ backgroundColor: 'rgb(223, 146, 4)' }} onClick={() => navigate("Pendiente")}>Pendientes</button>
                <button style={{ backgroundColor: 'red' }} onClick={() => navigate("Rechazada")}>Rechazadas</button>
            </section> 
            <Outlet />
      

        </article>
    )
}

export default ShowPost