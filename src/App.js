import { Route, BrowserRouter as Router, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Sessions from './Pages/Sessions';
import NotFound from './Pages/notFound';
import Todos from './Pages/Todos';


import ProtectedRoutes from './ProtectedRoutes';

import Timer from './Util/Timer';
import SignUp from './Pages/SignUp';

import Trends from './Pages/Trends';

import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import Scope from './Pages/Scope';

import Settings from './Pages/Settings';
import { useEffect } from 'react';
import PrivPol from './Pages/PrivPol';
import TsCs from './Pages/TsCs';
import Cards from './Pages/Cards';




function App() {
  
const cookies = new Cookies();
const user =cookies.get('useraidt');



 

  

  return (
   <div className='App'>
     <Router >
     
     
    

      <Routes>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/PrivacyPolicy' element={<PrivPol/>}/>
      <Route path='/Ts&Cs' element={<TsCs/>}/>
      <Route path='*' element={<NotFound/>}/>
        <Route path='/' element={<Login />}/>
     
        <Route path='/' element={<ProtectedRoutes/>}>
        <Route path={`/Trends/`} element={<Trends/>}/>
        <Route path={`/Dashboard/`} element={<Dashboard/>}/>
        <Route path={`/Todos/`} element={<Todos/>}/>
        <Route path={`/Timer/`} element={<Timer/>}/>
        <Route path={`/Sessions/`} element={<Sessions/>}/>
        <Route path={`/Scopes/`} element={<Scope/>}/>
        <Route path={`/Cards/`} element={<Cards/>}/>

    
        <Route path={`/Settings`} element={<Settings/>}/>
        
        </Route>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
