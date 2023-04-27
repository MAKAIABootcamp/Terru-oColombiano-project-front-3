import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusAsync, getPlacesAsync } from '../../redux/actions/placesActions';
import { BsCheck2 } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'
import ModalMain from '../modal/ModalMain';

const ShowPost = () => {
    const [posts, setPosts] = useState([])
    const { places } = useSelector(store => store.places)

    const dispatch = useDispatch()
    const filterButton = (button) => {
        console.log(button);
        if (button === "accepted") {
            setPosts(places[0].filter(item => item.status === "Aceptado"))

        }
        if (button === "rejected") {
            setPosts(places[0].filter(item => item.status === "Rechazada"))

        }
        if (button === "pendent") {
            setPosts(places[0].filter(item => item.status === "Pendiente"))
        }
        if (button === "all") {
            setPosts(places[0])
        }


    }


    useEffect(() => {
        dispatch(getPlacesAsync())
        filterButton('all')
        setPosts(places[0])


    }, [places[0]])

    console.log(posts);


    const changeStatus = (id) => {
        console.log(id);
        console.log('di click');
        dispatch(changeStatusAsync(id, 'accepted'))
        console.log('se disparo');

    }
    const rejectedStatus = (id) => {
        console.log(id);
        console.log('para eliminar');
        dispatch(changeStatusAsync(id, 'rejected'))

    }

    return (
        <article className='showPosts'>
            <section className='showPosts__filters'>
                <button style={{ backgroundColor: 'gray' }} onClick={() => filterButton("all")}>Todos</button>
                <button style={{ backgroundColor: 'green' }} onClick={() => filterButton("accepted")}>Aceptadas</button>
                <button style={{ backgroundColor: 'rgb(223, 146, 4)' }} onClick={() => filterButton("pendent")}>Pendientes</button>
                <button style={{ backgroundColor: 'red' }} onClick={() => filterButton("rejected")}>Rechazadas</button>
            </section> 
            {posts ? posts.map((place, index) =>
                <figure key={index}>
                    <img src={place.images[0]} alt="" />
                    <h3>{place.name}</h3>
                    <strong className={place.status === 'Aceptado' ? 'accepted' : place.status === 'Pendiente' ? 'waiting' : 'rejected'}>{place.status}</strong>
                    <section className={place.status === 'Aceptado' || place.status === 'Rechazada' ? 'section hidden' : ''}>
                        <button style={{ backgroundColor: 'green' }} onClick={() => changeStatus(place.id)}><BsCheck2 />Aceptar</button>
                        <button style={{ backgroundColor: 'red' }} onClick={() => rejectedStatus(place.id)}><MdOutlineCancel /> Rechazar</button>
                    </section>
                    <ModalMain  place={place} />

                </figure>) : <></>}


        </article>
    )
}

export default ShowPost