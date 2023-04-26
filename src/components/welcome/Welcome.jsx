import React from 'react'
import './welcome.scss'
import granos from '../../assets/cafe.svg'
import logo from '../../assets/terruño.svg'
import { NavLink } from 'react-router-dom'
import welcome from '../../assets/welcome.jpeg'
import niño from '../../assets/niño.jpeg'
import alegre from '../../assets/aleegre.jpeg'
import porton from '../../assets/int.jpg'
import { FaEnvelope, FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';

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

        <div className='background__explore'>
          <section>
            <h2>Explora</h2>
            <p>Descubre Colombia como nunca antes lo habías hecho. Explora la riqueza de su cultura, la diversidad de su naturaleza y la historia detrás de sus ciudades y pueblos. Con nuestra plataforma, puedes disfrutar de tours virtuales, contenido multimedia y mucho más, todo diseñado para llevarte a un viaje único por Colombia</p>
            <button>Ver más</button>
          </section>
          <figure>
            <img src={alegre} alt="explora" />
          </figure>
        </div>
        <div className='background__explore'>
          <figure>
            <img src={niño} alt="explora" />
          </figure>
          <section>
            <h2>Comparte</h2>
            <p>Compartir la experiencia de explorar Colombia puede hacer que sea aún más especial. En nuestra plataforma, no solo puedes descubrir los tesoros ocultos del país, sino también conectarte con otros usuarios apasionados por la cultura y la naturaleza de Colombia. Crea tu perfil, comparte tus experiencias y únete a una comunidad de viajeros virtuales en busca de aventuras.</p>
          </section>
        </div>
        <div className='background__explore'>
          <section>
            <h2>Interactúa</h2>
            <p>En nuestra plataforma, la interacción es la clave para una experiencia de exploración más profunda y enriquecedora. Conéctate con otros usuarios, aprende de sus experiencias y comparte tus propias aventuras.</p>
          </section>
          <figure>
            <img src={porton} alt="explora" />
          </figure>
        </div>

        <footer className='footer'>
          <figure>
            <img src={logo} alt="logo" />
            <section>
              <FaEnvelope className='footer__icon'/> 
              <FaFacebookSquare className='footer__icon' /> 
              <FaInstagram className='footer__icon' /> 
              <FaTwitter className='footer__icon' /> 
            </section>
          </figure>
          <section>
            <small><strong>Creador por : </strong>Wilinton Ascanio, Alejandro Soto, Daniel Salazar</small>
            
          </section>
        </footer>

      </div >
    </>

  )
}

export default Welcome