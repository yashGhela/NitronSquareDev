import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
  const user=sessionStorage.getItem('isAuth')
  if(user){
    return true
  } else {
    return false
  }
}

const  ProtectedRoutes=(props) =>{

  const auth=useAuth()

  return auth?<Outlet/>: <Navigate to="/Login"/>
}

export default ProtectedRoutes;