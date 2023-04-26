import React, { useEffect } from 'react'

import './placesDescriptions.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getPlacesAsync } from '../../redux/actions/placesActions'
import { IoArrowBackOutline } from 'react-icons/io5'
import { FaBus } from 'react-icons/fa'
import { RiMotorbikeFill, RiShipLine } from 'react-icons/ri'
import { IoMdBicycle } from 'react-icons/io'
import { BiTime, BiWalk } from 'react-icons/bi'
import { BsCloudSun, BsFillCarFrontFill, BsSun } from 'react-icons/bs'
import { GrMapLocation } from 'react-icons/gr'
import { WiDayRainMix } from 'react-icons/wi'
import { CiSun } from 'react-icons/ci'
import './placesDescriptions.scss'


const PlaceDescription = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { places } = useSelector(store => store.places)
  const { place } = useParams()
  console.log(places[0])


  useEffect(() => {
    dispatch(getPlacesAsync())
  }, [])

  const placeDetails = places[0]?.find(item => item.id === place)
  console.log(placeDetails);

  return (
    <>
      <small className='back' onClick={() => navigate(-1)}><IoArrowBackOutline />Regresar</small>

      <main className='description-main'>
        <div id="carouselExample" className="carousel slide description-box">
          <div className="carousel-inner imgCarousel ">
            <div className="carousel-item active  " style={{height: "550px"}}>

              <img src={placeDetails?.imgAct} alt="" className="d-block " style={{height: "540px"}}  />
              <p className='place-dif'>{placeDetails?.name}</p>
            </div>
            <div className="carousel-item ">
              <figure>
                <img src={placeDetails?.imgAct} alt="" />

                <div className='title-description-container'>

                <p className='place-title'>{placeDetails?.name}</p>
                <p className='place-parafraph' >{placeDetails?.description}</p>
                </div>
              </figure>
            </div>
            <div className="carousel-item ">
              <figure>
                <img src={placeDetails?.imgPlace} alt="" />

                <div className='title-description-container'>

                  <p className='place-title'>Actividades</p>
                  <p className='place-parafraph' >{placeDetails?.activities}</p>
                </div>
              </figure>
            </div>
            <div className="carousel-item ">
              <figure>
                <img src={placeDetails?.imgPlace2} alt="" />

                <div className='icons-info' >
                  <p className='place-icons' >{placeDetails?.icons.map((icon, index) => {
                    if (icon === 'car') {
                      return <BsFillCarFrontFill className='icons-tranport' key={index + 80} />

                    }
                    if (icon === 'moto') {
                      return <RiMotorbikeFill className='icons-tranport' key={index + 25} />

                    }
                    if (icon === 'walking') {
                      return <BiWalk className='icons-tranport' key={index + 38} />

                    }
                    if (icon === 'bici') {
                      return <IoMdBicycle className='icons-tranport' key={index + 18} />

                    }
                    if (icon === 'bus') {
                      return <FaBus className='icons-tranport' key={index + 10} />

                    }
                    if (icon === 'ship') {
                      return <RiShipLine className='icons-tranport' key={index + 41} />

                    }
                  }

                  )}
                  </p>
                  <p className='text-info'>
                    <GrMapLocation />
                    {placeDetails?.location}
                    -
                    {placeDetails?.department}
                  </p>
                  <p className='categories-container'>
                    {placeDetails?.category.map((act, index) => <small key={index}>{act}</small>)}
                  </p>
                  <p className='text-info'>
                    <BiTime />
                    {placeDetails?.schedules}
                  </p>
                  <p className='whether-icons'>
                    {placeDetails?.weather === "1" ?
                      <BsCloudSun className='icons' />
                      : placeDetails?.weather === "2" ?
                        <CiSun className='icons' />
                        : placeDetails?.weather === "3" ? <WiDayRainMix className='icons' />
                          : <BsSun className='icons' />}
                  </p>
                </div>
              </figure>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </main>
    </>
  )
}

export default PlaceDescription