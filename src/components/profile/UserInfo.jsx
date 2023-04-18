import React from 'react'
import './profile.scss'
import generalKenobi from '../../assets/obi-wan-kenobi-2678395.webp'
import { Link } from 'react-router-dom'

const UserInfo = () => {
    return (
        <>
            <section className='logout-section'>
                <main className='logout-section__main' >
                    <section className='photo-btns-section'>
                        <figure className='profile-photo-fig'>
                            <img src={generalKenobi} alt="hello there" />
                        </figure>

                        <div className='btns-container-div'>
                            <Link to='/update-user' className='btns'>
                                Actualizar perfil
                            </Link>
                            <Link className='btns'>
                                Cerrar seción
                            </Link>
                        </div>
                    </section>

                    <section className='info-container-section'>

                        <label className='info-container-section__label'>
                            <h4>Nombre de usuario</h4>
                            <h3 className='h3s' type="text" >Obi-Wan Kenobi</h3>
                        </label>

                        <label className='info-container-section__label'>
                            <h4>Correo electronico</h4>
                            <h3 className='h3s' type="text" >generalKenobi@jedicuncil.com</h3>
                        </label>

                        <label className='info-container-section__label'>
                            <h4>Numero de telefono</h4>
                            <h3 className='h3s' type="text" >3154444555</h3>
                        </label>

                        <label className='info-container-section__label'>
                            <h4>Dirección</h4>
                            <h3 className='h3s' type="text" >distrito 25 edificio 75 piso 9</h3>
                        </label>

                        <label className='info-container-section__label'>
                            <h4>Descripción</h4>
                            <h3 className='h3-area' >part of the jedy council, general in charch of batalion 66 and master of the chosen one</h3>
                        </label>
                    </section>

                </main>
            </section>
        </>
    )
}

export default UserInfo