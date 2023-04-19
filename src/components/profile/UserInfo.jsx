import React from 'react'
import './profile.scss'
import generalKenobi from '../../assets/obi-wan-kenobi-2678395.webp'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserInfo = () => {
    const {user} = useSelector(store => store.users)
    console.log(user);
    return (
        <>
            <section className='logout-section'>
                <main className='logout-section__main' >
                    <section className='photo-btns-section'>
                        <figure className='profile-photo-fig'>
                            <img src={user.photo} alt="hello there" />
                        </figure>

                        <div className='btns-container-div'>
                            <Link to='/update-user' className='btns'>
                                Actualizar perfil
                            </Link>
            
                        </div>
                    </section>

                    <section className='info-container-section'>

                        <label className='info-container-section__label'>
                            <h4>Nombre de usuario</h4>
                            <h3 className='h3s' type="text" >{user.name}</h3>
                        </label>

                        <label className='info-container-section__label'>
                            <h4>Correo electronico</h4>
                            <h3 className='h3s' type="text" >{user.email}</h3>
                        </label>

                        <label className='info-container-section__label'>
                            <h4>Numero de telefono</h4>
                            <h3 className='h3s' type="text" >3154444555</h3>
                        </label>

                        <label className='info-container-section__label'>
                            <h4>Dirección</h4>
                            <h3 className='h3s' type="text" >{user.location}</h3>
                        </label>

                        <label className='info-container-section__label'>
                            <h4>Descripción</h4>
                            <h3 className='h3-area' >{user.description}</h3>
                        </label>
                    </section>

                </main>
            </section>
        </>
    )
}

export default UserInfo