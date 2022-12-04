import React from 'react';
import Cookies from 'universal-cookie';
import {Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
 const cookies = new Cookies() 
  const user=cookies.get('useraidt')
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