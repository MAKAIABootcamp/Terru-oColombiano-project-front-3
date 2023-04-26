import React, { useEffect, useState } from 'react'
import './home.scss'
import search from '../../assets/searchNav.svg'
import location from '../../assets/locationGray.svg'
import cancel from '../../assets/cancel.png'
import Navbar from '../navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getPlacesAsync } from '../../redux/actions/placesActions'
import { BsCloudSun, BsFillCarFrontFill, BsSun } from 'react-icons/bs'
import { RiMotorbikeFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import { BiWalk } from 'react-icons/bi'
import { FaBus } from 'react-icons/fa'
import { IoMdBicycle } from 'react-icons/io'
import { RiShipLine } from 'react-icons/ri'
import { Rate } from 'antd'
import { BsFillHeartFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { addFavoriteAsync } from '../../redux/actions/userActions'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import Loader from '../loader/Loader';
import Swal from 'sweetalert2'
import { motion } from "framer-motion";
import { CiSun } from 'react-icons/ci'
import { WiDayRainMix } from 'react-icons/wi'

const Home = () => {
  const [input, setInput] = useState('')
  const [select, setSelect] = useState('')
  const [favorites, setFavorites] = useState([])
  const [isFavorite, setIsFavorite] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const valueInput = ({ value }) => {
    setInput(value)
  }
  const valueSelect = ({ value }) => {
    setSelect(value)
  }

  const { user } = useSelector(store => store.users)
  const { places } = useSelector(store => store.places);

  const addFavorite = (data) => {
    const isFavorite = user.favorites.filter(fav => fav.id === data.id)

    if (!isFavorite.length) {
      dispatch(addFavoriteAsync(data))
      setFavorites([...favorites, data.id])
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
    user?.favorites.forEach(e => {
      setFavorites(favorites => [...favorites, e.id])
    })

  }, [dispatch])

  const arrayFiltered = places[0]?.filter(place => place.location.toLowerCase().includes(input.toLowerCase()) || place.department.toLowerCase().includes(input.toLowerCase()))

  const arraySelectFiltred = places[0]?.filter(place => place.category.includes(select))
  const variants = {
    hidden: {
      opacity: 0,
      x: "-100vw"
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1
      }
    }
  };


  return (
    <article className='home' initial="hidden"
      animate="visible"
      variants={variants}>
      <div className='home__header'>
        <Navbar />
        <label>
          <img src={search} alt="lupa" />
          <input type="text" placeholder='Buscar un lugar...' onChange={(e) => valueInput(e.target)} />
          {input ? <img src={cancel} alt="lupa" /> : <></>}


        </label>
        <section className='home__header__btns'>
          <select >
            <option value="">Actividades</option>
            <option value="Deportes" onClick={(e) => valueSelect(e.target)}>Deportes</option>
            <option value="Camping" onClick={(e) => valueSelect(e.target)}>Camping</option>
            <option value="Mirador" onClick={(e) => valueSelect(e.target)}>Mirador</option>
            <option value="Natación" onClick={(e) => valueSelect(e.target)}>Natación</option>
          </select>
          <select>
            <option value="">Departamentos</option>
            <option value="1">Amazonas</option>
            <option value="2">Antioquia</option>
            <option value="3">Arauca</option>
            <option value="4">Atlántico</option>
            <option value="5">Bogotá</option>
            <option value="6">Bolívar</option>
            <option value="7">Boyacá</option>
            <option value="8">Caldas</option>
            <option value="9">Caquetá</option>
            <option value="10">Casanare</option>
            <option value="11">Cauca</option>
            <option value="12">Cesar</option>
            <option value="13">Chocó</option>
            <option value="14">Córdoba</option>
            <option value="15">Cundinamarca</option>
            <option value="16">Guainía</option>
            <option value="17">Guaviare</option>
            <option value="18">Huila</option>
            <option value="19">La Guajira</option>
            <option value="20">Magdalena</option>
            <option value="21">Meta</option>
            <option value="22">Nariño</option>
            <option value="23">Norte de Santander</option>
            <option value="24">Putumayo</option>
            <option value="25">Quindío</option>
            <option value="26">Risaralda</option>
            <option value="27">San Andrés y Providencia</option>
            <option value="28">Santander</option>
            <option value="29">Sucre</option>
            <option value="30">Tolima</option>
            <option value="31">Valle</option>
            <option value="32">Vaupés</option>
            <option value="33">Vichada</option>

          </select>
          <select>
            <option value="">Clima</option>
            <option value="1">Calido</option>
          </select>
          <button>Más votados</button>

        </section>
      </div>
      <div className='home__main'>
        <h1>Destinos populares</h1>
        {!places.length ? <Loader /> : <></>}
        <div>
          {input ? arrayFiltered.map((e, index) =>
            <motion.figure key={index} initial="hidden"
              animate="visible"
              variants={variants}>
              <img src={e.imgPlace2} alt="caballo" className='home__main__photo' />
              <figcaption >
                <h3>{e.name}{e.weather === "1" ? <BsCloudSun className='icons' /> : e.weather === "2" ? <CiSun className='icons' /> : e.weather === "3" ? <WiDayRainMix className='icons' /> : <BsSun className='icons' />}</h3>
                <p onClick={() => navigate(`/description/${e.id}`)}>{e.description}</p>
                <small><BiTime /> {e.schedules}</small>
                <span> <img src={location} alt="location" />{` ${e.location} - ${e.department}`}</span>
                <section>
                  {e.category.map((act, index) => <small key={index}>{act}</small>)}
                </section>
                <section>
                  {e.icons.map((icon, index) => {
                    if (icon === 'car') {
                      return <BsFillCarFrontFill key={index + 80} />

                    }
                    if (icon === 'moto') {
                      return <RiMotorbikeFill key={index + 25} />

                    }
                    if (icon === 'walking') {
                      return <BiWalk key={index + 38} />

                    }
                    if (icon === 'bici') {
                      return <IoMdBicycle key={index + 18} />

                    }
                    if (icon === 'bus') {
                      return <FaBus key={index + 10} />

                    }
                    if (icon === 'ship') {
                      return <RiShipLine key={index + 41} />

                    }
                  }

                  )}
                </section>
                <Rate disabled defaultValue={e.rate} />
                <BsFillHeartFill className='heart' />
              </figcaption>
            </motion.figure>) : <>
            {places[0] ? places[0].map((place, index) =>
              <motion.figure key={index} initial="hidden"
                animate="visible"
                variants={variants} >
                <img src={place.imgPlace2} alt="caballo" className='home__main__photo' />
                <figcaption>
                  <h3>{place.name} {place.weather === "1" ? <BsCloudSun className='icons' /> : place.weather === "2" ? <CiSun className='icons' /> : place.weather === "3" ? <WiDayRainMix className='icons' /> : <BsSun className='icons' />}</h3>
                  <p onClick={() => navigate(`/description/${place.id}`)}>{place.description}</p>
                  <small><BiTime /> {place.schedules}</small>
                  <span> <img src={location} alt="location" />{` ${place.location} - ${place.department}`}</span>
                  <section>
                    {place.category.map((act, index) => <small key={index}>{act}</small>)}
                  </section>
                  <section>
                    {place.icons.map((icon) => {
                      if (icon === 'car') {
                        return <BsFillCarFrontFill key={index + 1} />

                      }
                      if (icon === 'moto') {
                        return <RiMotorbikeFill key={index + 2} />

                      }
                      if (icon === 'walking') {
                        return <BiWalk key={index + 7} />

                      }
                      if (icon === 'bici') {
                        return <IoMdBicycle key={index + 9} />

                      }
                      if (icon === 'bus') {
                        return <FaBus key={index + 10} />

                      }
                      if (icon === 'ship') {
                        return <RiShipLine key={index + 11} />

                      }

                    }

                    )}


                  </section>
                  <Rate disabled defaultValue={place.rate} />
                  <BsFillHeartFill onClick={() => addFavorite(place)} className={`heart ${favorites.includes(place.id) ? 'favorite' : ''}`} />

                </figcaption>
              </motion.figure>

            ) : <></>}</>}
          {input && !arrayFiltered.length ? <div className='error404'>
            <h1>Lugar no encontrado</h1>
            <p>Por favor ingresa una nueva busqueda.</p>
          </div> : select ? arraySelectFiltred.map((e, index) =>
            <motion.figure key={index} initial="hidden"
              animate="visible"
              variants={variants}>
              <img src={e.imgPlace2} alt="caballo" className='home__main__photo' />
              <figcaption >
                <h3>{e.name}{e.weather === "1" ? <BsCloudSun className='icons' /> : e.weather === "2" ? <CiSun className='icons' /> : e.weather === "3" ? <WiDayRainMix className='icons' /> : <BsSun className='icons' />}</h3>
                <p onClick={() => navigate(`/description/${e.id}`)}>{e.description}</p>
                <small><BiTime /> {e.schedules}</small>
                <span> <img src={location} alt="location" />{` ${e.location} - ${e.department}`}</span>
                <section>
                  {e.category.map((act, index) => <small key={index}>{act}</small>)}
                </section>
                <section>
                  {e.icons.map((icon, index) => {
                    if (icon === 'car') {
                      return <BsFillCarFrontFill key={index + 80} />

                    }
                    if (icon === 'moto') {
                      return <RiMotorbikeFill key={index + 25} />

                    }
                    if (icon === 'walking') {
                      return <BiWalk key={index + 38} />

                    }
                    if (icon === 'bici') {
                      return <IoMdBicycle key={index + 18} />

                    }
                    if (icon === 'bus') {
                      return <FaBus key={index + 10} />

                    }
                    if (icon === 'ship') {
                      return <RiShipLine key={index + 41} />

                    }
                  }

                  )}
                </section>
                <Rate disabled defaultValue={e.rate} />
                <BsFillHeartFill className='heart' />
              </figcaption>
            </motion.figure>) : <>
            {places[0] ? places[0].map((place, index) =>
              <motion.figure key={index} initial="hidden"
                animate="visible"
                variants={variants} >
                <img src={place.imgPlace2} alt="caballo" className='home__main__photo' />
                <figcaption>
                  <h3>{place.name} {place.weather === "1" ? <BsCloudSun className='icons' /> : place.weather === "2" ? <CiSun className='icons' /> : place.weather === "3" ? <WiDayRainMix className='icons' /> : <BsSun className='icons' />}</h3>
                  <p onClick={() => navigate(`/description/${place.id}`)}>{place.description}</p>
                  <small><BiTime /> {place.schedules}</small>
                  <span> <img src={location} alt="location" />{` ${place.location} - ${place.department}`}</span>
                  <section>
                    {place.category.map((act, index) => <small key={index}>{act}</small>)}
                  </section>
                  <section>
                    {place.icons.map((icon) => {
                      if (icon === 'car') {
                        return <BsFillCarFrontFill key={index + 1} />

                      }
                      if (icon === 'moto') {
                        return <RiMotorbikeFill key={index + 2} />

                      }
                      if (icon === 'walking') {
                        return <BiWalk key={index + 7} />

                      }
                      if (icon === 'bici') {
                        return <IoMdBicycle key={index + 9} />

                      }
                      if (icon === 'bus') {
                        return <FaBus key={index + 10} />

                      }
                      if (icon === 'ship') {
                        return <RiShipLine key={index + 11} />

                      }

                    }

                    )}


                  </section>
                  <Rate disabled defaultValue={place.rate} />
                  <BsFillHeartFill onClick={() => addFavorite(place)} className={`heart ${favorites.includes(place.id) ? 'favorite' : ''}`} />

                </figcaption>
              </motion.figure>

            ) : <></>}</>}
          {input && !arrayFiltered.length ? <div className='error404'>
            <h1>Lugar no encontrado</h1>
            <p>Por favor ingresa una nueva busqueda.</p>
          </div> :<></>}

        </div>



      </div>
      <ToastContainer />

    </article>
  )
}

export default Home