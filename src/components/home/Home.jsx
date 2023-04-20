import React, { useEffect, useState } from 'react'
import './home.scss'
import search from '../../assets/searchNav.svg'
import location from '../../assets/locationGray.svg'
import cancel from '../../assets/cancel.png'
import Navbar from '../navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getPlacesAsync } from '../../redux/actions/placesActions'
import { BsFillCarFrontFill } from 'react-icons/bs'
import { RiMotorbikeFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import { BiWalk } from 'react-icons/bi'
import { FaBus } from 'react-icons/fa'
import { IoMdBicycle } from 'react-icons/io'
import { RiShipLine } from 'react-icons/ri'
import { Rate } from 'antd'
import { BsFillHeartFill } from 'react-icons/bs'
import { addFavoriteAsync } from '../../redux/actions/userActions'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const [input, setInput] = useState('')
  const [favorite, setFavorite] = useState(false)
  const [isFavorite, setIsFavorite] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const valueInput = ({ value }) => {
    setInput(value)

  }


  const { user } = useSelector(store => store.users)

  const { places } = useSelector(store => store.places);
  console.log(places);
  console.log(user);

  const addFavorite = (data) => {
    setIsFavorite('favorite')
    const isFavorite = user.favorites.filter(fav => fav.id === data.id)

    if (!isFavorite.length) {
      dispatch(addFavoriteAsync(data))
      toast('✔ Se ha agregado correctamente!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    } else {
      Swal.fire({
        icon: 'info',
        title: 'Este lugar ya está en favoritos',

      })
    }

  }






  useEffect(() => {
    dispatch(getPlacesAsync())

  }, [])

  const arrayFiltered = places[0]?.filter(place => place.name.toLowerCase().includes(input.toLowerCase()))




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
        <h1>Destinos populares</h1>
        <div>
          {input ? arrayFiltered.map((e, index) =>
            <figure key={index} onClick={() => navigate(`/description/${e.id}`)}>
              <img src={e.imgPlace2} alt="caballo" className='home__main__photo' />
              <figcaption>
                <h3>{e.name}</h3>
                <p>{e.description}</p>
                <small><BiTime /> {e.schedules}</small>
                <span> <img src={location} alt="location" />{` ${e.location} - ${e.department}`}</span>
                <section>
                  {e.category.map((act, index) => <small key={index}>{act}</small>)}
                </section>
                <section>
                  {e.icons.map((icon) => {
                    if (icon === 'car') {
                      return <BsFillCarFrontFill />

                    }
                    if (icon === 'moto') {
                      return <RiMotorbikeFill />

                    }
                    if (icon === 'walking') {
                      return <BiWalk />

                    }
                    if (icon === 'bici') {
                      return <IoMdBicycle />

                    }
                    if (icon === 'bus') {
                      return <FaBus />

                    }
                    if (icon === 'ship') {
                      return <RiShipLine />

                    }

                  }

                  )}
                </section>
                <Rate disabled defaultValue={e.rate} />
                <BsFillHeartFill className='heart' />
              </figcaption>
            </figure>) : <>
            {places[0] ? places[0].map((place, index) =>
              <figure key={index} onClick={() => navigate(`/description/${place.id}`)}>
                <img src={place.imgPlace2} alt="caballo" className='home__main__photo' />
                <figcaption>
                  <h3>{place.name}</h3>
                  <p>{place.description}</p>
                  <small><BiTime /> {place.schedules}</small>
                  <span> <img src={location} alt="location" />{` ${place.location} - ${place.department}`}</span>
                  <section>
                    {place.category.map((act, index) => <small key={index}>{act}</small>)}
                  </section>
                  <section>
                    {place.icons.map((icon) => {
                      if (icon === 'car') {
                        return <BsFillCarFrontFill />

                      }
                      if (icon === 'moto') {
                        return <RiMotorbikeFill />

                      }
                      if (icon === 'walking') {
                        return <BiWalk />

                      }
                      if (icon === 'bici') {
                        return <IoMdBicycle />

                      }
                      if (icon === 'bus') {
                        return <FaBus />

                      }
                      if (icon === 'ship') {
                        return <RiShipLine />

                      }

                    }

                    )}


                  </section>
                  <Rate disabled defaultValue={place.rate} />
                  <BsFillHeartFill onClick={() => addFavorite(place)} className={`heart ${isFavorite}`} />

                </figcaption>
              </figure>

            ) : <></>}</>}
          {input && !arrayFiltered.length ? <div className='error404'>
            <h1>Lugar no encontrado</h1>
            <p>Por favor ingresa una nueva busqueda.</p>
          </div> : <></>}

        </div>



      </div>
      <ToastContainer />

    </article>
  )
}

export default Home