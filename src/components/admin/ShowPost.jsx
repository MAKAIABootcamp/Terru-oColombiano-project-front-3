import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusAsync, getPlacesAsync } from '../../redux/actions/placesActions';
import { BsCheck2 } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'
import ModalMain from '../modal/ModalMain';
import { toast } from 'react-toastify';

const ShowPost = () => {
    const [isDispatched, setIsDispatched] = useState(false)
    const [posts, setPosts] = useState([])
    const { places } = useSelector(store => store.places)

    console.log(places);

    const dispatch = useDispatch()
    const filterButton = (button) => {
        console.log(button);
        if (button === "accepted") {
            setPosts(places.filter(item => item.status === "Aceptado"))

        }
        if (button === "rejected") {
            setPosts(places.filter(item => item.status === "Rechazada"))

        }
        if (button === "pendent") {
            setPosts(places.filter(item => item.status === "Pendiente"))
        }
        if (button === "all") {
            setPosts(places)
        }


    }


    useEffect(() => {
        dispatch(getPlacesAsync())


    }, [isDispatched])
    useEffect(() => {
      
    
    }, [])
    



    const changeStatus = (id) => {
        console.log(id);
        
        dispatch(changeStatusAsync(id, 'accepted'))
        setIsDispatched(!isDispatched)
        console.log(isDispatched);
        toast('✔ Lugar aceptado!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setIsDispatched(!isDispatched)
        console.log(isDispatched);

        

    }
    const rejectedStatus = (id) => {
        console.log(id);
        console.log('para eliminar');
        dispatch(changeStatusAsync(id, 'rejected'))
        setIsDispatched(!isDispatched)
        toast('❌ Lugar rechazado!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setIsDispatched(!isDispatched)


    }
    console.log(posts);

    return (
        <article className='showPosts'>
            <section className='showPosts__filters'>
                <button style={{ backgroundColor: 'gray' }} onClick={() => filterButton("all")}>Todos</button>
                <button style={{ backgroundColor: 'green' }} onClick={() => filterButton("accepted")}>Aceptadas</button>
                <button style={{ backgroundColor: 'rgb(223, 146, 4)' }} onClick={() => filterButton("pendent")}>Pendientes</button>
                <button style={{ backgroundColor: 'red' }} onClick={() => filterButton("rejected")}>Rechazadas</button>
            </section> 
            {posts.length ? posts.map((place, index) =>
                <figure key={index}>
                    <img src={place.images[0]} alt="" />
                    <h3>{place.name}</h3>
                    <strong className={place.status === 'Aceptado' ? 'accepted' : place.status === 'Pendiente' ? 'waiting' : 'rejected'}>{place.status}</strong>
                    <section className={place.status === 'Aceptado' || place.status === 'Rechazada' ? 'section hidden' : ''}>
                        <button style={{ backgroundColor: 'green' }} onClick={() => changeStatus(place.id)}><BsCheck2 />Aceptar</button>
                        <button style={{ backgroundColor: 'red' }} onClick={() => rejectedStatus(place.id)}><MdOutlineCancel /> Rechazar</button>
                    </section>
                    {/* <ModalMain  place={place} /> */}

                </figure>) : places.map((place, index) =>
                <figure key={index}>
                    <img src={place.images[0]} alt="" />
                    <h3>{place.name}</h3>
                    <strong className={place.status === 'Aceptado' ? 'accepted' : place.status === 'Pendiente' ? 'waiting' : 'rejected'}>{place.status}</strong>
                    <section className={place.status === 'Aceptado' || place.status === 'Rechazada' ? 'section hidden' : ''}>
                        <button style={{ backgroundColor: 'green' }} onClick={() => changeStatus(place.id)}><BsCheck2 />Aceptar</button>
                        <button style={{ backgroundColor: 'red' }} onClick={() => rejectedStatus(place.id)}><MdOutlineCancel /> Rechazar</button>
                    </section>
                    {/* <ModalMain  place={place} /> */}

                </figure>)}


        </article>
    )
}

export default ShowPost