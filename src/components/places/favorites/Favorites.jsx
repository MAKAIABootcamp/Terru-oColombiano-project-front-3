import React from 'react'
import close from '../../../assets/icon-close.svg'
import { BsFillHeartFill } from 'react-icons/bs'
import './favorites.scss'
import generalKenobi from '../../../assets/obi-wan-kenobi-2678395.webp'
import valleSamaria from '../../../assets/valle_samaria_4_1_2_0.jpg'
import frailejones from '../../../assets/frailejosnes.jpeg'
import waklMan from '../../../assets/walkman.jpeg'
import señorSombrero from '../../../assets/señor-conseombrero.jpg'
import porton from '../../../assets/porton.jpeg'
import { Link, useNavigate } from 'react-router-dom'

const Favorites = () => {

  const navigate = useNavigate()

  const provitionalArray = [
    {
      image: generalKenobi,
      title: 'Nave espacial',
    },
    {
      image: valleSamaria,
      title: 'Valle de la samaria',
    },
    {
      image: frailejones,
      title: 'Paramo de snaturban',
    },
    {
      image: waklMan,
      title: 'Honda, tolima',
    },
    {
      image: señorSombrero,
      title: 'Sierra nevada de santa marta',
    },
    {
      image: porton,
      title: 'Centro historico de cartagena',
    }
  ];

const descriptionGo = () => {
  navigate('/description')
}

  return (
    <>
      <main className='main-fav' >
        <section className='cards-section'>
          {provitionalArray.map((item, index) => (
            <article className="main__article" key={index}>
              <section className='image-fig'>
                <figure className='close-fig'>
                  <img src={close} alt="" />
                </figure>

                <div className='div-container' onClick={() => descriptionGo()}>
                  <figure className='img-link-fig'>
                    <img className='img' src={item.image} alt={item.title} />

                  </figure>
                  <div className="info-icon-div">
                    <BsFillHeartFill className='heart' />
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </section>
            </article>
          ))}

        </section>
      </main>
    </>
  )
}

export default Favorites