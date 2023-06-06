import { Route, BrowserRouter as Router, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Sessions from './Pages/Sessions';
import NotFound from './Pages/notFound';



import ProtectedRoutes from './ProtectedRoutes';

import Timer from './Pages/Timer';
import SignUp from './Pages/SignUp';

import Trends from './Pages/Trends';

import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';


import Settings from './Pages/Settings';

import PrivPol from './Pages/PrivPol';
import TsCs from './Pages/TsCs';
import FreeTimer from './Pages/FreeTimer';
import Templates from './Pages/Templates';
import Projects from './Pages/Projects';





function App() {
  
const cookies = new Cookies();
const user =cookies.get('useraidt');



 

  

  return (
   <div className='App'>
     <Router >
     
     
    

      <Routes>
      <Route path='/' element={<FreeTimer/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/PrivacyPolicy' element={<PrivPol/>}/> 
      <Route path='/Ts&Cs' element={<TsCs/>}/>
      <Route path='*' element={<NotFound/>}/>
        <Route path='/' element={<Login />}/>
     
        <Route path='/' element={<ProtectedRoutes/>}>
        <Route path={`/Trends/`} element={<Trends/>}/>
        <Route path={`/Dashboard/`} element={<Dashboard/>}/>
   
        <Route path={`/Timer/`} element={<Timer/>}/>
        <Route path={`/Sessions/`} element={<Sessions/>}/>
        <Route path={`/Projects/`} element={<Projects/>}/>
       <Route path={'/Templates'} element={<Templates/>}/>

    
        <Route path={`/Settings`} element={<Settings/>}/>
        
        </Route>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
