import React, { useEffect, useState } from 'react'
import './home.scss'
import search from '../../assets/searchNav.svg'
import star from '../../assets/star.svg'
import location from '../../assets/locationGray.svg'
import cancel from '../../assets/cancel.png'
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getPlacesAsync } from '../../redux/actions/placesActions'


const Home = () => {
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const valueInput = ({ value }) => {
    setInput(value)

  }

  const { user } = useSelector(store => store.users)
  const { places } = useSelector(store => store.places);

  console.log(places);
  console.log(user.birthday);

  useEffect(() => {
    dispatch(getPlacesAsync())

  }, [])

  const arrayFiltered = places[0]?.filter(place => place.name.toLowerCase().includes(input.toLowerCase()))

  console.log(arrayFiltered);


  return (
    <article className='home'>
      <div className='home__header'>
        <Navbar />
        <label>
          <img src={search} alt="lupa" />
          <input type="text" placeholder='Buscar un lugar...' onChange={(e) => valueInput(e.target)} />
          {input ? <img src={cancel} alt="lupa" /> : <></>}


        </label>
        <section className='home__header__btns'>
          <select>
            <option value="">Categoría</option>
            <option value="1">Deportes</option>
          </select>
          <select>
            <option value="">Ubicación</option>
            <option value="1">Valledupar</option>
            <option value="2">Agustín Codazzi</option>
          </select>
          <select>
            <option value="">Clima</option>
            <option value="1">Calido</option>
          </select>
          <button>Mas votados</button>

        </section>
      </div>
      <div className='home__main'>
        <h1>Todos los rincones</h1>
        <div>
          {input ? arrayFiltered.map((e, index) =>
            <figure key={index}>
              <img src={e.imgPlace2} alt="caballo" className='home__main__photo' />
              <figcaption>
                <h3>{e.name}</h3>
                <p>{e.description}</p>
                <span> <img src={location} alt="location" />{` ${e.location} - ${e.department}`}</span>
                <section>
                  {e.category.map((act, index) => <small key={index}>{act}</small>)}
                </section>
                <section>
                  <img src="https://cdn.icon-icons.com/icons2/158/PNG/96/car_22307.png" alt="carro" />
                  <img src="https://cdn.icon-icons.com/icons2/577/PNG/96/TouringMotorcycle_Green_icon-icons.com_54907.png" alt="moto" />
                  <img src="https://cdn.icon-icons.com/icons2/1363/PNG/96/travel-holiday-vacation-306_89077.png" alt="bus" />
                </section>
                <section>
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                </section>
              </figcaption>
            </figure>) : <>
            {places[0] ? places[0].map((place, index) =>
              <figure key={index}>
                <img src={place.imgPlace2} alt="caballo" className='home__main__photo' />
                <figcaption>
                  <h3>{place.name}</h3>
                  <p>{place.description}</p>
                  <span> <img src={location} alt="location" />{` ${place.location} - ${place.department}`}</span>
                  <section>
                    {place.category.map((act, index) => <small key={index}>{act}</small>)}
                  </section>
                  <section>
                    <img src="https://cdn.icon-icons.com/icons2/158/PNG/96/car_22307.png" alt="carro" />
                    <img src="https://cdn.icon-icons.com/icons2/577/PNG/96/TouringMotorcycle_Green_icon-icons.com_54907.png" alt="moto" />
                    <img src="https://cdn.icon-icons.com/icons2/1363/PNG/96/travel-holiday-vacation-306_89077.png" alt="bus" />
                  </section>
                  <section>
                    <img src={star} alt="star" />
                    <img src={star} alt="star" />
                    <img src={star} alt="star" />
                    <img src={star} alt="star" />
                  </section>
                </figcaption>
              </figure>

            ) : <></>}</>}
          {input && !arrayFiltered.length ? <h1>No hay nada</h1> : <></>}

        </div>



      </div>
    </article>
  )
}

export default Home