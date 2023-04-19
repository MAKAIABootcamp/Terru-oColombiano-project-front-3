import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/getUsers';
import { loginUser } from '../redux/actions/userActions';
import { auth } from '../firebase/firebaseConfig';

const PrivateRouter = ({children}) => {
    const [logged, setLogged] = useState(undefined)
    const dispatch = useDispatch();
    const navigate = useNavigate()
  
    useEffect(() => {
      
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          console.log(user);
          getUsers(user.uid)
            .then((response) => {
              dispatch(loginUser(response, { status: false, message: "" }));
              setLogged(true)
            })
            .catch((error) => {
              dispatch(loginUser({}, { status: true, message: error.message }));
              
            });
        } else {
          console.log("No estás loggeado");
          setLogged(false)
          navigate('/login')
          
        }
      });
    }, []);
    return (
      <div>{logged ? children : <></>}</div>
    )
  }

export default PrivateRouter