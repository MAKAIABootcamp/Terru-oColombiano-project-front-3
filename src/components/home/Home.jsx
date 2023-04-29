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
import { addFavoriteAsync } from '../../redux/actions/userActions'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import Loader from '../loader/Loader';
import Swal from 'sweetalert2'
import { motion } from "framer-motion";
import { CiSun } from 'react-icons/ci'
import { WiDayRainMix } from 'react-icons/wi'
import { useNavigate } from 'react-router-dom'
import MapContainer from '../Map/MapContainer'


const Home = () => {
  const [input, setInput] = useState('')
  const [select, setSelect] = useState('')
  const [department, setDepartment] = useState('')
  const [weather, setWeather] = useState('')
  const [favorites, setFavorites] = useState([])
  const [allPlaces, setAllPlaces] = useState([])
  const [dataFiltered, setDataFiltered] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filters, setFilters] = useState({})

  const valueInput = ({ value }) => {
    setInput(value)
    console.log(input);
  }
  const filtersSelected = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    })

  }
  console.log(filters);



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
    setAllPlaces(places)
    user?.favorites.forEach(e => {
      setFavorites(favorites => [...favorites, e.id])
    })

  }, [])


  const arrayFiltered = places?.filter(place => place.location.place.formatted_address.toLowerCase().includes(input.toLowerCase()))


  const allFilters = places?.filter(place => {
    if (filters.activities && filters.departments && filters.weather) {
      return place.category.includes(filters.activities) && place.location.place.formatted_address.toLowerCase().includes(filters.departments.toLowerCase()) && place.weather.includes(filters.weather);
    } else if (filters.activities && filters.weather) {
      return place.category.includes(filters.activities) && place.weather.includes(filters.weather);
    } else if (filters.departments && filters.weather) {
      return place.location.place.formatted_address.toLowerCase().includes(filters.departments.toLowerCase()) && place.weather.includes(filters.weather);
    } else if (filters.activities && filters.departments) {
      return place.category.includes(filters.activities) && place.location.place.formatted_address.toLowerCase().includes(filters.departments.toLowerCase());
    } else if (filters.activities) {
      return place.category.includes(filters.activities);
    } else if (filters.departments) {
      return place.location.place.formatted_address.toLowerCase().includes(filters.departments.toLowerCase());
    } else if (filters.weather) {
      return place.weather.includes(filters.weather);
    } else {
      return true;
    }
  });
  console.log(allFilters);




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
          <select name='activities' onChange={filtersSelected}>
            <option value="">Actividades</option>
            <option value="Camping">Camping</option>
            <option value="Mirador">Mirador</option>
            <option value="Natación">Natación</option>
            <option value="Ciclismo">Ciclismo</option>
            <option value="Senderismo">Senderismo</option>
            <option value="Atracciones">Atracciones</option>
            <option value="Cultura">Cultura</option>
            <option value="Restaurantes">Restaurantes</option>
          </select>
          <select name='departments' onChange={filtersSelected}>
            <option value="">Departamentos</option>
            <option value="Amazonas">Amazonas</option>
            <option value="Antioquia">Antioquia</option>
            <option value="Arauca">Arauca</option>
            <option value="Atlántico">Atlántico</option>
            <option value="Bogotá">Bogotá</option>
            <option value="Bolívar">Bolívar</option>
            <option value="Boyacá">Boyacá</option>
            <option value="Caldas">Caldas</option>
            <option value="Caquetá">Caquetá</option>
            <option value="Casanare">Casanare</option>
            <option value="Cauca">Cauca</option>
            <option value="Cesar">Cesar</option>
            <option value="Chocó">Chocó</option>
            <option value="Córdoba">Córdoba</option>
            <option value="Cundinamarca">Cundinamarca</option>
            <option value="Guainía">Guainía</option>
            <option value="Guaviare">Guaviare</option>
            <option value="Huila">Huila</option>
            <option value="La Guajira">La Guajira</option>
            <option value="Magdalena">Magdalena</option>
            <option value="Meta">Meta</option>
            <option value="Nariño">Nariño</option>
            <option value="Norte de Santander">Norte de Santander</option>
            <option value="Putumayo">Putumayo</option>
            <option value="Quindío">Quindío</option>
            <option value="Risaralda">Risaralda</option>
            <option value="San Andrés y Providencia">San Andrés y Providencia</option>
            <option value="Santander">Santander</option>
            <option value="Sucre">Sucre</option>
            <option value="Tolima">Tolima</option>
            <option value="Valle">Valle</option>
            <option value="Vaupés">Vaupés</option>
            <option value="Vichada">Vichada</option>

          </select>
          <select name='weather' onChange={filtersSelected}>
            <option value="">Clima</option>
            <option value="1">Seco</option>
            <option value="2">Templado</option>
            <option value="3">De montaña</option>
            <option value="4">Tropical humedo</option>
          </select>

        </section>
      </div>
      <div className='home__main'>
        <h1>Destinos populares</h1>
        {!places.length ? <Loader /> : <></>}
        <div>
          {input ? arrayFiltered.filter(place => place.status === 'Aceptado').map((e, index) =>
            <motion.figure key={index} initial="hidden"
              animate="visible"
              variants={variants}>
              <img src={e.images[0]} alt="caballo" className='home__main__photo' />
              <figcaption >
                <h3>{e.name}{e.weather === "1" ? <BsCloudSun className='icons' /> : e.weather === "2" ? <CiSun className='icons' /> : e.weather === "3" ? <WiDayRainMix className='icons' /> : <BsSun className='icons' />}</h3>
                <p onClick={() => navigate(`/description/${e.id}`)}>{e.description}</p>
                <small><BiTime /> {e.schedules}</small>
                <span> <img src={location} alt="location" />{e.location.place.formatted_address}</span>
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
                <BsFillHeartFill onClick={() => addFavorite(e)} className={`heart ${favorites.includes(e.id) ? 'favorite' : ''}`} />
              </figcaption>
            </motion.figure>) : allFilters.length ? allFilters.filter(place => place.status === 'Aceptado').map((e, index) =>
              <motion.figure key={index} initial="hidden"
                animate="visible"
                variants={variants}>
                <img src={e.images[0]} alt="caballo" className='home__main__photo' />
                <figcaption >
                  <h3>{e.name}{e.weather === "1" ? <BsCloudSun className='icons' /> : e.weather === "2" ? <CiSun className='icons' /> : e.weather === "3" ? <WiDayRainMix className='icons' /> : <BsSun className='icons' />}</h3>
                  <p onClick={() => navigate(`/description/${e.id}`)}>{e.description}</p>
                  <small><BiTime /> {e.schedules}</small>
                  <span> <img src={location} alt="location" />{e.location.place.formatted_address}</span>
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
                  <BsFillHeartFill onClick={() => addFavorite(e)} className={`heart ${favorites.includes(e.id) ? 'favorite' : ''}`} />
                </figcaption>
              </motion.figure>) : filters && !allFilters.length ?
            <h2>Lugar no encontrado, por favor ingrese nuevos filtros.</h2>
            :
            places ? places.filter(place => place.status === 'Aceptado').map((e, index) =>
              <motion.figure key={index} initial="hidden"
                animate="visible"
                variants={variants}>
                <img src={e.images[0]} alt="caballo" className='home__main__photo' />
                <figcaption >
                  <h3>{e.name}{e.weather === "1" ? <BsCloudSun className='icons' /> : e.weather === "2" ? <CiSun className='icons' /> : e.weather === "3" ? <WiDayRainMix className='icons' /> : <BsSun className='icons' />}</h3>
                  <p onClick={() => navigate(`/description/${e.id}`)}>{e.description}</p>
                  <small><BiTime /> {e.schedules}</small>
                  <span> <img src={location} alt="location" />{e.location.place.formatted_address}</span>
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
                  <BsFillHeartFill onClick={() => addFavorite(e)} className={`heart ${favorites.includes(e.id) ? 'favorite' : ''}`} />
                </figcaption>
              </motion.figure>) : <></>}

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