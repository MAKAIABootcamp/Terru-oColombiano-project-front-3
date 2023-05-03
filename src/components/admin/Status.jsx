import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { changeStatusAsync } from '../../redux/actions/placesActions'
import { toast } from 'react-toastify'
import { BsCheck2 } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'
import { CiLocationOn } from 'react-icons/ci'
import { Carousel } from 'react-responsive-carousel'
import Loader from '../loader/Loader'

const Status = () => {
    const [showModal, setShowModal] = useState(false)
    const [idPlace, setIdPlace] = useState('')
    const { places } = useSelector(store => store.places)
    const { status } = useParams()
    const dispatch = useDispatch()

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


    const showAllModal = (id) => {
        setShowModal(!showModal)
        console.log(id);
        setIdPlace(id)
    }
    const placeDetails = places?.find(place => place.id === idPlace ? idPlace : '')

    console.log(placeDetails);


    return (
        <div className='showPosts__status'>
            {arrayFiltered.length ? arrayFiltered.map((place, index) =>
                <figure key={index}>
                    <img src={place.images[0]} alt="" />
                    <div>
                        <h3>{place.name}</h3>
                        <section className={place.status === 'Aceptado' || place.status === 'Rechazada' ? 'section hidden' : ''}>
                            <button style={{ backgroundColor: 'green' }} onClick={() => changeStatus(place.id)}><BsCheck2 />Aceptar</button>
                            <button style={{ backgroundColor: 'red' }} onClick={() => rejectedStatus(place.id)}><MdOutlineCancel /> Rechazar</button>
                        </section>

                    </div>
                    <strong className={place.status === 'Aceptado' ? 'accepted' : place.status === 'Pendiente' ? 'waiting' : 'rejected'}>{place.status}</strong>
                    <button onClick={() => showAllModal(place.id)} className='showPosts__status__button'>Ver mas</button>
                    {/* <ModalMain  place={place} /> */}

                </figure>) : status === "all" ? places.map((place, index) =>
                    <figure key={index}>
                        <img src={place.images[0]} alt="" />
                        <div>
                            <h3>{place.name}</h3>
                            <section className={place.status === 'Aceptado' || place.status === 'Rechazada' ? 'section hidden' : ''}>
                                <button style={{ backgroundColor: 'green' }} onClick={() => changeStatus(place.id)}><BsCheck2 />Aceptar</button>
                                <button style={{ backgroundColor: 'red' }} onClick={() => rejectedStatus(place.id)}><MdOutlineCancel /> Rechazar</button>
                            </section>

                        </div>
                        <strong className={place.status === 'Aceptado' ? 'accepted' : place.status === 'Pendiente' ? 'waiting' : 'rejected'}>{place.status}</strong>
                        <button onClick={() => showAllModal(place.id)} className='showPosts__status__button'>Ver mas</button>

                        {/* <ModalMain  place={place} /> */}

                    </figure>) : <>
                <h1>No hay ninguna publicación {status.toLowerCase()} en este momento.</h1></>}

            <article className={showModal ? 'modalAdmin' : 'hidden'}>
                {placeDetails ?
                    <section>

                        <MdOutlineCancel className='modalAdmin__close' onClick={() => showAllModal()} />
                        <Carousel
                            emulateTouch={true}
                            showArrows={true}
                            showStatus={false}
                            showIndicators={true}
                            showThumbs={false}
                            width={"100%"}
                            infiniteLoop={true}
                            className='carousel'>

                            {placeDetails.images.map((e, index) =>
                                <img src={e} alt="images" key={index} />

                            )}

                        </Carousel>


                        <small><strong>Publicado por</strong>{placeDetails.postedBy}</small>
                        <span><CiLocationOn />{placeDetails.location.place.formatted_address}</span>
                        <h3>{placeDetails.name}</h3>
                        <p>{placeDetails.description}</p>
                        <strong>{placeDetails.schedules}</strong>

                    </section> : <Loader />}


            </article>
        </div>
    )
}

export default Status