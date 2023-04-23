import React, { useEffect } from 'react'
import './placesDescriptions.scss'
import frailejonse from '../../assets/frailejosnes.jpeg'
import sendero from '../../assets/sendero.jpg'
import sumapaz from '../../assets/sumapaz.jpg'
import { AiFillCar } from 'react-icons/ai'
import { FaMotorcycle, FaWalking } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPlacesAsync } from '../../redux/actions/placesActions'

const PlaceDescription = () => {
  const dispatch = useDispatch()
  const { places } = useSelector(store => store.places) 
  const {place} = useParams()
  console.log(places[0]);

  useEffect(() => {
    dispatch(getPlacesAsync())

  }, [])



  const placeDetails = places[0]?.find(item => item.id === place)
  console.log(placeDetails);
  
  return (
    <>
      <main className='description-main'>
        <article className='description-box'>
          <section className='card-section position-1'>
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
              <h2>Actividaes</h2>
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
          </section>
        </article>
      </main>
    </>
  )
}

export default PlaceDescription