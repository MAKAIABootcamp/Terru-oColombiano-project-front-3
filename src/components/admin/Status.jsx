import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { changeStatusAsync } from '../../redux/actions/placesActions'
import { toast } from 'react-toastify'
import { BsCheck2 } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'

const Status = () => {
    const { places } = useSelector(store => store.places)
    const { status } = useParams()
    const dispatch = useDispatch()

    console.log(places);
    console.log(status);

    const changeStatus = (id) => {
        console.log(id);

        dispatch(changeStatusAsync(id, 'accepted'))
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



    }
    const rejectedStatus = (id) => {
        console.log(id);
        console.log('para eliminar');
        dispatch(changeStatusAsync(id, 'rejected'))
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


    }

    const arrayFiltered = places?.filter(place => place.status === status)

    console.log(arrayFiltered);


    return (
        <div className='showPosts__status'>
            {arrayFiltered.length ? arrayFiltered.map((place, index) =>
                <figure key={index}>
                    <img src={place.images[0]} alt="" />
                    <h3>{place.name}</h3>
                    <strong className={place.status === 'Aceptado' ? 'accepted' : place.status === 'Pendiente' ? 'waiting' : 'rejected'}>{place.status}</strong>
                    <section className={place.status === 'Aceptado' || place.status === 'Rechazada' ? 'section hidden' : ''}>
                        <button style={{ backgroundColor: 'green' }} onClick={() => changeStatus(place.id)}><BsCheck2 />Aceptar</button>
                        <button style={{ backgroundColor: 'red' }} onClick={() => rejectedStatus(place.id)}><MdOutlineCancel /> Rechazar</button>
                    </section>
                    {/* <ModalMain  place={place} /> */}

                </figure>) : status === "all" ? places.map((place, index) =>
                    <figure key={index}>
                        <img src={place.images[0]} alt="" />
                        <h3>{place.name}</h3>
                        <strong className={place.status === 'Aceptado' ? 'accepted' : place.status === 'Pendiente' ? 'waiting' : 'rejected'}>{place.status}</strong>
                        <section className={place.status === 'Aceptado' || place.status === 'Rechazada' ? 'section hidden' : ''}>
                            <button style={{ backgroundColor: 'green' }} onClick={() => changeStatus(place.id)}><BsCheck2 />Aceptar</button>
                            <button style={{ backgroundColor: 'red' }} onClick={() => rejectedStatus(place.id)}><MdOutlineCancel /> Rechazar</button>
                        </section>
                        {/* <ModalMain  place={place} /> */}

                    </figure>) : <>
                <h1>No hay nada {status.toLowerCase()} en este momento.</h1></>}
        </div>
    )
}

export default Status