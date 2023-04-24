import { Rate } from 'antd';
import React from 'react'
import { BiTime } from 'react-icons/bi';
import { useSelector } from 'react-redux'
import { BsFillCarFrontFill } from 'react-icons/bs'
import { RiMotorbikeFill } from 'react-icons/ri'
import { BiWalk } from 'react-icons/bi'
import { FaBus } from 'react-icons/fa'
import { IoMdBicycle } from 'react-icons/io'
import { RiShipLine } from 'react-icons/ri'
import { motion } from 'framer-motion';
import Loader from '../loader/Loader';




const MyPlaces = () => {
    const { user } = useSelector(store => store.users)
    return (
        <article className='myPlaces' style={user.posts.length > 2 ? {height : '100%'}: {height : '100vh'}}>
            <div>
                {user.posts.length ? user.posts.map(post =>
                    <motion.figure initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1 }}>
                        <img src={post.imgPlace} alt="image" />

                        <figcaption>
                            <h3>{post.name}</h3>
                            <p>{post.description}</p>
                            <small><BiTime /> {post.schedules}</small>
                            <section>
                                {post.category.map((e, index) => <small key={index}>{e}</small>)}
                            </section>
                            <section>
                                {post.icons.map((icon) => {
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
                            <Rate disabled defaultValue={post.rate} />

                        </figcaption>



                    </motion.figure>
                ) : <><h1>Aun no has publicado nada</h1></>}
            </div>
        </article>
    )
}

export default MyPlaces