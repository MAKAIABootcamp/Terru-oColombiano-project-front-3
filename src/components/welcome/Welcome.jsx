import React from 'react'
import './welcome.scss'
import granos from '../../assets/cafe.svg'
import logo from '../../assets/terruño.svg'

function Welcome() {
  return (
    <>
      <div className='background'>
        <figure className='granos'>
          <img src={granos} alt="" />
        </figure>
        <figure className='logo'>
          <img src={logo} alt="" />
        </figure>
        <h1 className='tittle'>Descubre La Esencia De Colombia En Cada Rincón De Nuestro Terruño...</h1>
        <div className='logo'>
        </div>
      </div >
    </>

  )
}

export default Welcome