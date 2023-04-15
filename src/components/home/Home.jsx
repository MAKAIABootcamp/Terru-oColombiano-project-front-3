import React, { useState } from 'react'
import './home.scss'
import search from '../../assets/searchNav.svg'
import star from '../../assets/star.svg'
import location from '../../assets/locationGray.svg'
import cancel from '../../assets/cancel.png'
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'


const Home = () => {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const valueInput = ({ value }) => {
    console.log(value);
    setInput(value)

  }
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
          <figure style={{backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1)2%, rgba(32,32,32,0) 38%), url(https://images.pexels.com/photos/11130921/pexels-photo-11130921.jpeg?auto=compress&cs=tinysrgb&w=600)`}}>
            {/* <img src="https://images.pexels.com/photos/11130921/pexels-photo-11130921.jpeg?auto=compress&cs=tinysrgb&w=600" alt="caballo" className='home__main__photo' /> */}
            <figcaption>
              <h3>Nombre del lugar</h3>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius aliquid possimus fugiat molestias rem sapiente omnis? Rem, repellat dolore? Fuga, quis nobis dolorum dolores nesciunt blanditiis aliquid. Totam, fugiat sed.</p>
              <span> <img src={location} alt="location" /> Ubicacion del lugar</span>
              <section>
                <small>Turismo</small>
                <small>Actividades acuaticas</small>
                <small>Mirador</small>
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
          <figure>
            <img src="https://images.pexels.com/photos/11130921/pexels-photo-11130921.jpeg?auto=compress&cs=tinysrgb&w=600" alt="caballo" className='home__main__photo' />
            <figcaption>
              <h3>Nombre del lugar</h3>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius aliquid possimus fugiat molestias rem sapiente omnis? Rem, repellat dolore? Fuga, quis nobis dolorum dolores nesciunt blanditiis aliquid. Totam, fugiat sed.</p>
              <span> <img src={location} alt="location" /> Ubicacion del lugar</span>
              <section>
                <small>Turismo</small>
                <small>Actividades acuaticas</small>
                <small>Mirador</small>
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
          <figure>
            <img src="https://images.pexels.com/photos/11130921/pexels-photo-11130921.jpeg?auto=compress&cs=tinysrgb&w=600" alt="caballo" className='home__main__photo' />
            <figcaption>
              <h3>Nombre del lugar</h3>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius aliquid possimus fugiat molestias rem sapiente omnis? Rem, repellat dolore? Fuga, quis nobis dolorum dolores nesciunt blanditiis aliquid. Totam, fugiat sed.</p>
              <span> <img src={location} alt="location" /> Ubicacion del lugar</span>
              <section>
                <small>Turismo</small>
                <small>Actividades acuaticas</small>
                <small>Mirador</small>
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

        </div>



      </div>
    </article>
  )
}

export default Home