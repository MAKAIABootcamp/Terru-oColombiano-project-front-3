import React from 'react'

const PublicRouter = ({logged}) => {
    const { user } = useSelector(store => store.users)
    console.log(user);
    return (
      <div>{logged ? <Navigate to='/login' /> : <Outlet />}</div>
    )
  }

export default PublicRouter