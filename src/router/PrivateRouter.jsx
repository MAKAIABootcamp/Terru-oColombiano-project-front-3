import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/getUsers';
import { loginUser } from '../redux/actions/userActions';
import { auth } from '../firebase/firebaseConfig';
import Loader from '../components/loader/Loader';
import { getPlacesAsync } from '../redux/actions/placesActions';

const PrivateRouter = ({ children }) => {
  const [logged, setLogged] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPlacesAsync())

  }, [])



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        console.log('user1', user);
        getUsers(user.uid)
          .then((response) => {
            console.log(response);
            dispatch(loginUser(response, { status: false, message: "" }));
            setLogged(true);
            setLoading(false);
            console.log('se private');
            console.log(user);
          })
          .catch((error) => {
            console.log(error);
            dispatch(loginUser({}, { status: true, message: error.message }));
            setLogged(false);
            setLoading(false);

          });
      } else {
        setLogged(false);
        setLoading(false);

      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <Loader className='loader' />;
  }



  return (
    <div>{logged ? children : <></>}</div>
  )
};

export default PrivateRouter;