import React, { useEffect } from 'react'
import './placesDescriptions.scss'
import { AiFillCar } from 'react-icons/ai'
import { IoArrowBackOutline } from 'react-icons/io5'
import { FaMotorcycle, FaWalking } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPlacesAsync } from '../../redux/actions/placesActions'
import { motion } from "framer-motion";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PlaceDescription = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { places } = useSelector(store => store.places)
  const { place } = useParams()
  useEffect(() => {
    dispatch(getPlacesAsync())

  }, [])

  const placeDetails = places?.find(item => item.id === place)
  console.log(placeDetails);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };


  return (
    <>

      <small className='back' onClick={() => navigate(-1)}><IoArrowBackOutline />Regresar</small>

      <motion.main className='description-main' initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}  >
        <motion.article className='description-box'>
          <Carousel style = {{justyfycontent : 'center'}}
            responsive={responsive} className='imgCarousel'
            >
            <figure>
              <img src={placeDetails?.images[0]} alt="" />
              <h1>{placeDetails?.name}</h1>
            </figure>
            <figure>
              <img src={placeDetails?.images[1]} alt="" />
              <p>{placeDetails?.description}</p>

            </figure>
            <figure>
              <img src={placeDetails?.images[2]} alt="" />
              <p>{placeDetails?.activities}</p>


            </figure>
          </Carousel>
          {/* <section className='card-section'>
            <div className='name-title'>
              <h2>{placeDetails?.name}</h2>
              <p>
                {placeDetails?.description}
              </p>
            </div>

            <figure className='figure-container'>
              <img className='figure-container__img ' src={frailejonse} alt="" />
            </figure>
          </section>

          <section className='card-section position-2'>
            <figure className='figure-container'>
              <img className='figure-container__img ' src={sendero} alt="" />
            </figure>
            <div className='name-title'>
              <h2>Actividades</h2>
              <p>
                {placeDetails?.activities}
              </p>
            </div>

          </section>

          <section className='card-section position-1'>
            <div className='name-title'>
              <h2>Formas de llegar</h2>
              <p>
                {placeDetails?.tranport}
              </p>
            </div>

            <figure className='figure-container'>
              <img className='figure-container__img ' src={sumapaz} alt="" />
            </figure>
          </section> */}
        </motion.article>
      </motion.main>
    </>
  )
}

export default PlaceDescription