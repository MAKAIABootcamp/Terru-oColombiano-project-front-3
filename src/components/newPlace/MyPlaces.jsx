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


const MyPlaces = () => {
    const { user } = useSelector(store => store.users)
    console.log(user);
    return (
        <article className='myPlaces'>
            <div>
                {user.posts ? user.posts.map(post =>
                    <figure>
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



                    </figure>
                ) : <></>}
            </div>
        </article>
    )
}

export default MyPlaces