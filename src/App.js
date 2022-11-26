import { Route, BrowserRouter as Router, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Sessions from './Pages/Sessions';
import InProg from './Pages/InProg';


import StartPage from './Pages/StartPage';
import ProtectedRoutes from './ProtectedRoutes';
import SesSettings from './Util/SesSettings';
import Timer from './Util/Timer';
import SignUp from './Pages/SignUp';
import FirstTimeSrt from './Pages/FirstTimeSrt';
import Trends from './Pages/Trends';
import { useEffect } from 'react';






function App() {
  


 

  

  return (
   <div className='App'>
     <Router >
     
     
    

      <Routes>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/' element={<StartPage />}/>
        <Route path='/FirstTimeSrt' element={<FirstTimeSrt/>}/>
        <Route path='/' element={<ProtectedRoutes/>}>
        <Route path='/Trends' element={<Trends/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/SesSettings' element={<SesSettings/>}/>
        <Route path='/Timer' element={<Timer/>}/>
        <Route path='/Sessions' element={<Sessions/>}/>
        <Route path='/InProg' element={<InProg/>}/>
        </Route>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
