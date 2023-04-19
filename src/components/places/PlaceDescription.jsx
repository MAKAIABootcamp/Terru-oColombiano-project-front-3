import React from 'react'
import './placesDescriptions.scss'
import frailejonse from '../../assets/frailejosnes.jpeg'
import sendero from '../../assets/sendero.jpg'
import sumapaz from '../../assets/sumapaz.jpg'
import { AiFillCar } from 'react-icons/ai'
import { FaMotorcycle, FaWalking } from 'react-icons/fa'

const PlaceDescription = () => {
  return (
    <>
      <main className='description-main'>
        <article className='description-box'>
          <section className='card-section position-1'>
            <div className='name-title'>
              <h2>Paramo de Sumapaz</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae assumenda impedit qui dignissimos doloremque? Qui nisi nostrum corrupti odit. Quam, libero asperiores amet magnam molestias omnis dolore nulla vel quod?
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae assumenda impedit qui dignissimos doloremque? Qui nisi nostrum corrupti odit. Quam, libero asperiores amet magnam molestias omnis dolore nulla vel quod?
              </p>
            </div>

          </section>

          <section className='card-section position-1'>
            <div className='name-title'>
              <h2>Formas de llegar</h2>
              <p>
                <AiFillCar />
                <FaMotorcycle />
                <FaWalking />
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