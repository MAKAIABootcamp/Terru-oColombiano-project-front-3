import React, { useEffect, useState } from 'react'
import './foro.scss'
import { useDispatch, useSelector } from 'react-redux'
import { createCommentAsync, getPlacesAsync } from '../../redux/actions/placesActions'
import ModalMain from '../modal/ModalMain'
import { motion } from 'framer-motion'
import Loader from '../loader/Loader'


const Foro = () => {
  const [allPlaces, setAllPlaces] = useState([])
  const { user } = useSelector(store => store.users)
  const dispatch = useDispatch()
  const { places } = useSelector(store => store.places)
  useEffect(() => {
    setAllPlaces(places)

  }, [allPlaces])
  const variants = {
    hidden: { y: "100%" },
    visible: { y: 0 }
  };

  console.log(places);
  console.log(allPlaces);



  return (
    <article className='foro'>
      <h1>Bienvenido al foro</h1>
      <div className='foro__container'>
        {!allPlaces.length ? <Loader /> : <></>}

        {allPlaces.length ? allPlaces.map((post, index) =>
          <motion.section className='foro__container__main' key={index} variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}>
            <div>
              <img src={post.postedByImg} alt="user" />
              <section>
                <strong>{post.postedBy}</strong>
                {/* <small>Hace 10 min</small> */}
              </section>
            </div>
            <figure>
              <img src={post.images[0]} alt="post" />

              <figcaption>
                <h4>{post.name}</h4>
                <p>{post.description}</p>
                <ModalMain place={post} />
              </figcaption>
            </figure>

          </motion.section>
        ) : <></>}
      </div>
    </article>
  )
}

export default Foro