import React from 'react'
import { Outlet } from 'react-router-dom'
import './loginPhone.scss'
import logo from '../../assets/cafe.svg'
import name from '../../assets/terruño.svg'

const LoginWithPhone = () => {
    return (
        <article className='loginWithPhone'>
            <div>
                <figure>
                    <img src={logo} alt="logo" />
                    <img src={name} alt="name" />
                </figure>
                <Outlet />
                


            </div>
            <section id='recaptch-container'></section>

            
            
        </article>
    )
}

export default LoginWithPhone