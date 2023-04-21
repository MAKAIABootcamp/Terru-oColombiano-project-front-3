import React, { useEffect } from 'react'
import './foro.scss'
import { useDispatch, useSelector } from 'react-redux'
import { createCommentAsync, getPlacesAsync } from '../../redux/actions/placesActions'
import { FaRegCommentAlt } from 'react-icons/fa'
import ModalMain from '../modal/ModalMain'
import { motion } from 'framer-motion'


const Foro = () => {
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(getPlacesAsync())



  }, [])
  const variants = {
    hidden: { y: "100%" },
    visible: { y: 0 }
  };


  const { places } = useSelector(store => store.places)
  const { user } = useSelector(store => store.users)
  console.log(places);
  return (
    <article className='foro'>
      <h1>Bienvenido al foro</h1>
      <div className='foro__container'>

        {places.length ? places[0].map((post, index) =>
          <motion.section className='foro__container__main' key={index} variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}>
            <div>
              <img src={post.postedByImg} alt="user" />
              <section>
                <strong>{post.postedBy}</strong>
                <small>Hace 10 min</small>
              </section>
            </div>
            <figure>
              <img src={post.imgPlace} alt="post" onClick={() => dispatch(createCommentAsync('zMyNEtn4WLhYEIU5WBV2'))} />

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