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



function App() {
  const [isAuth, setIsAuth]= useState(false);

  

  return (
   <div className='App'>
     <Router >
     
     
    

      <Routes>
      <Route path='/Login' element={<Login/>}/>
        <Route path='/' element={<StartPage isAuth={isAuth}/>}/>
        <Route path='/' element={<ProtectedRoutes/>}>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        
        <Route path='/Sessions' element={<Sessions/>}/>
        <Route path='/InProg' element={<InProg/>}/>
        </Route>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
