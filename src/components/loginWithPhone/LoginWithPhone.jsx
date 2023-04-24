import React from 'react'
import { Outlet } from 'react-router-dom'
import './loginPhone.scss'
import logo from '../../assets/cafe.svg'
import name from '../../assets/terruño.svg'
import { motion } from 'framer-motion'

const LoginWithPhone = () => {
    
    return (
        <article className='loginWithPhone'>
            <motion.div initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}>
                <figure>
                    <img src={logo} alt="logo" />
                    <img src={name} alt="name" />
                </figure>
                <Outlet />
                


            </motion.div>
            <section id='recaptch-container'></section>

            
            
        </article>
    )
}

export default LoginWithPhone