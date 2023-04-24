import React from 'react'
import './welcome.scss'
import granos from '../../assets/cafe.svg'
import logo from '../../assets/terruño.svg'
import { NavLink } from 'react-router-dom'

function Welcome() {
  return (
    <>
      <div className='background'>
        <figure className='granos'>
          <section>

            <img src={granos} alt="" />
            <img src={logo} alt="" />
          </section>
          <section>

            <NavLink to='/login' className='btns'>Iniciar sesión</NavLink>
            <NavLink to='/register' className='btns'>Registrarse</NavLink>
          </section>

        </figure>
        <h1 className='tittle'>Descubre la esencia de Colombia en cada rincón de nuestro terruño.</h1>
      </div >
    </>

  )
}

export default Welcome