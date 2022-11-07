import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Sessions from './Pages/Sessions';
import InProg from './Pages/InProg';
import { useEffect, useState } from 'react';
import Sidebar from './Components/Sidebar';
import StartPage from './Pages/StartPage';
import ProtectedRoutes from './ProtectedRoutes';
import SesSettings from './Pages/SesSettings';



function App() {
  const [isAuth, setIsAuth]= useState(localStorage.getItem('isAuth'));



  

  return (
   <div className='App'>
     <Router >
     
     
    

      <Routes>
      <Route path='/Login' element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path='/' element={<StartPage />}/>
        <Route path='/' element={<ProtectedRoutes/>}>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/SesSettings' element={<SesSettings/>}/>
        
        <Route path='/Sessions' element={<Sessions/>}/>
        <Route path='/InProg' element={<InProg/>}/>
        </Route>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
