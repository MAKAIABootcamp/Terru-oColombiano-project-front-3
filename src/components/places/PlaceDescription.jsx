import React, { useEffect } from 'react'
import './placesDescriptions.scss'
import { AiFillCar, AiOutlineArrowLeft } from 'react-icons/ai'
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




  return (

    <article className='placeDescription'>
      <AiOutlineArrowLeft className='back' onClick={() => navigate(-1)} />

      <div>

        <Carousel
          emulateTouch={true}
          showArrows={true}
          showStatus={false}
          showIndicators={true}
          showThumbs={false}
          width={"100%"}
          infiniteLoop={true}
          className='carousel'>

          <section>
            <img src={placeDetails.images[0]} alt="" />
            <h1>{placeDetails.name}</h1>
            <span>{placeDetails.description}</span>
            <span>{placeDetails.location.place.formatted_address}</span>
          </section>
          <section>
            <img src={placeDetails.images[1]} alt="" />
            <span>{placeDetails.activities}</span>
          </section>
          <section>
            <img src={placeDetails.images[2]} alt="" />
            <span>{placeDetails.tranport}</span>
            <span>{placeDetails.schedules}</span>
            <div>
              {placeDetails.category.map((e, index) =>
                <small key={index}>{e}</small>)}
            </div>


          </section>

        </Carousel>
      </div>

    </article>



  )
}

export default PlaceDescription