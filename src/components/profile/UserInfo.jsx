import React from 'react'
import './profile.scss'
import generalKenobi from '../../assets/obi-wan-kenobi-2678395.webp'
import { Link } from 'react-router-dom'

const UserInfo = () => {
  return (
    <>
        <section className='logout-sec'>
            <main>
                <figure className='profile-photo'>
                    <img src={generalKenobi} alt="hello there" />
                </figure>

                <Link to='/update-user' className='btns'>
                    Actualizar perfil
                </Link>
                <Link className='btns'>
                    Cerrar seción
                </Link>
            </main>
        </section>
    </>
)
}

export default UserInfo