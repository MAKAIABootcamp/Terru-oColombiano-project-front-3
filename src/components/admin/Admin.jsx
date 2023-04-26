import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { BsPostcard } from 'react-icons/bs'
import { CiCoffeeBean } from 'react-icons/ci'

import './admin.scss'
import { ToastContainer } from 'react-toastify'

const Admin = () => {
    const { user } = useSelector(store => store.users)
    const navigate = useNavigate()

    useEffect(() => {

        if (user) {
            if (user.type === "user") {
                navigate('/')

            }

        }



    }, [])

    return (
        <article className='admin'>
            <aside>
                <figure>
                    <img src={user.photo} alt="photo" />
                    <h4>{user.name}</h4>
                </figure>
                <small onClick={() => navigate('showPosts')}><BsPostcard />Ver publicaciones</small>
                <small onClick={() => navigate('myAccount')}><AiOutlineUser />Mi cuenta</small>
                <small onClick={() => navigate('/')}><CiCoffeeBean />Terruño Colombiano</small>

            </aside>
            <main>
                <Outlet />


            </main>
            <ToastContainer />
        </article>

    )
}

export default Admin