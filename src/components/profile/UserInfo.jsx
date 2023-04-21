import React, { useEffect } from 'react'
import './profile.scss'
import generalKenobi from '../../assets/obi-wan-kenobi-2678395.webp'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'
import { getUsers } from '../../services/getUsers'
import { loginUser } from '../../redux/actions/userActions'

const UserInfo = () => {
    const {user} = useSelector(store => store.users)
    const dispatch = useDispatch()
    console.log(user);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            getUsers(user.uid)
              .then((response) => {
                dispatch(loginUser(response, { status: false, message: "" }));
              })
              .catch((error) => {
                dispatch(loginUser({}, { status: true, message: error.message }));
              });
          } else {
            console.log("No tas");
          }
        });
      }, []);
    return (
        <>
            <section className='logout-section'>
                <main className='logout-section__main' >
                    <section className='photo-btns-section'>
                        <figure className='profile-photo-fig'>
                            <img src={user?.photo} alt="hello there" />
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
                            <h3 className='h3s' type="text" >{user?.name}</h3>
                        </label>

                        <label className='info-container-section__label'>
                            <h4>Correo electronico</h4>
                            <h3 className='h3s' type="text" >{user?.email}</h3>
                        </label>

                        <label className='info-container-section__label'>
                            <h4>Numero de telefono</h4>
                            <h3 className='h3s' type="text" >3154444555</h3>
                        </label>

                        <label className='info-container-section__label'>
                            <h4>Dirección</h4>
                            <h3 className='h3s' type="text" >{user?.location}</h3>
                        </label>

                        <label className='info-container-section__label'>
                            <h4>Descripción</h4>
                            <h3 className='h3-area' >{user?.description}</h3>
                        </label>
                    </section>

                </main>
            </section>
        </>
    )
}

export default UserInfo