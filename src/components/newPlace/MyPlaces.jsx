import { Rate } from 'antd';
import React, { useEffect, useState } from 'react'
import { BiTime } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { BsFillCarFrontFill } from 'react-icons/bs'
import { RiMotorbikeFill } from 'react-icons/ri'
import { BiWalk } from 'react-icons/bi'
import { FaBus } from 'react-icons/fa'
import { IoMdBicycle } from 'react-icons/io'
import { RiShipLine } from 'react-icons/ri'
import { motion } from 'framer-motion';
import Loader from '../loader/Loader';
import { MdCancel } from 'react-icons/md'
import Swal from 'sweetalert2';
import { deletePostAsync } from '../../redux/actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




const MyPlaces = () => {
    const [myPlaces, setMyPlaces] = useState([])
    const [showModal, setShowModal] = useState(false)
    const { user } = useSelector(store => store.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const deletePost = (post) => {
        Swal.fire({
            icon: 'warning',
            title: `Se eliminará esta publicación.`,
            // text : `${post.name}`,
            showCancelButton: true,
            showConfirmButton: true,


        }).then(response => {
            if (response.isConfirmed) {
                console.log('di click en', post.id);
                dispatch(deletePostAsync(post))
                console.log('Se borró la publicación');
                toast('✔ El post ha sido borrado!', {
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
            else {
                console.log('Se canceló');
            }
        }).catch((error) => console.log('No se borró nada'))




    }
    useEffect(() => {
        setMyPlaces(user.posts)


    }, [user.posts])

    const handleShowModal = () => {
        setShowModal(!showModal)
    }

    return (
        <article className='myPlaces' style={user.posts.length > 2 ? { height: '100%' } : { height: '100vh' }}>
            <div>
                {myPlaces.length ? myPlaces.map((post, index) =>
                    <motion.figure initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1 }} key={index}>
                        <img src={post.images[0]} alt="image" />

                        <figcaption>
                            <h3>{post.name} <MdCancel className='delete' onClick={() => deletePost(post)} /></h3>
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
                            {/* <Rate disabled defaultValue={post.rate} /> */}
                            <button onClick={() => navigate(`/newPlace/myPlaces/${post.id}`)}>Editar publicación</button>

                        </figcaption>



                    </motion.figure>
                ) : <><h1>Aun no has publicado nada</h1></>}
            </div>
        </article>
    )
}

export default MyPlaces