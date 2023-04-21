import React, { useEffect } from 'react'
import './placesDescriptions.scss'
import { AiFillCar } from 'react-icons/ai'
import { IoArrowBackOutline } from 'react-icons/io5'
import { FaMotorcycle, FaWalking } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPlacesAsync } from '../../redux/actions/placesActions'
import { motion } from "framer-motion";

const PlaceDescription = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { places } = useSelector(store => store.places)
  const { place } = useParams()
  console.log(places[0]);

  useEffect(() => {
    dispatch(getPlacesAsync())

  }, [])



  const placeDetails = places[0]?.find(item => item.id === place)
  console.log(placeDetails);

  return (
    <>

      <small className='back' onClick={() => navigate(-1)}><IoArrowBackOutline />Regresar</small>

      <motion.main className='description-main' initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}  >
        <motion.article className='description-box'>
          <section className='card-section'>
            <div className='name-title'>
              <h2>{placeDetails?.name}</h2>
              <p>
                {placeDetails?.description}
              </p>
            </div>

            <figure className='figure-container'>
              <img className='figure-container__img radius-1' src={placeDetails?.imgPlace} alt="" />
            </figure>
          </section>

          <section className='card-section'>
            <figure className='figure-container'>
              <img className='figure-container__img radius-2' src={placeDetails?.imgAct} alt="" />
            </figure>
            <div className='name-title'>
              <h2>Actividades</h2>
              <p>
                {placeDetails?.activities}
              </p>
            </div>

          </section>

          <section className='card-section'>
            <div className='name-title'>
              <h2>Formas de llegar</h2>
              <p>
                {placeDetails?.tranport}
              </p>
            </div>

            <figure className='figure-container'>
              <img className='figure-container__img radius-1' src={placeDetails?.imgPlace2} alt="" />
            </figure>
          </section>
        </motion.article>
      </motion.main>
    </>
  )
}

export default PlaceDescription