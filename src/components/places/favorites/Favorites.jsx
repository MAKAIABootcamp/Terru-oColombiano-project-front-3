import React from 'react'
import close from '../../../assets/icon-close.svg'
import { BsFillHeartFill } from 'react-icons/bs'
import './favorites.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFavoriteAsync } from '../../../redux/actions/userActions'
import { ToastContainer, toast } from 'react-toastify'

const Favorites = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(store => store.users)

  const deleteFav = (item) => {

    dispatch(deleteFavoriteAsync(item))
    toast('✔ Se ha eliminado correctamente!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  }



  const navigate = useNavigate()



  return (
    <>
      <main className='main-fav' >
        <section className='cards-section'>
          {user.favorites.length ? user.favorites.map((item, index) => (
            <article className="main__article" key={index}>
              <section className='image-fig'>
                <figure className='close-fig'>
                  <img src={close} alt="" onClick={() => deleteFav(item)} />
                </figure>

                <div className='div-container' onClick={() => navigate(`/description/${item.id}`)}>
                  <figure className='img-link-fig'>
                    <img className='img' src={item.imgPlace} alt={item.name} />
                    <p className='details'>{item.description}</p>

                  </figure>
                  <div className="info-icon-div">
                    <BsFillHeartFill className='heart' />
                    <h3>{item.name}</h3>
                  </div>
                </div>
              </section>
            </article>
          )) : <><h1>Aun no tienes nada agregado a favoritos</h1></>}

        </section>
        <ToastContainer />
      </main>
    </>
  )
}

export default Favorites