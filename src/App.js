import { Route, BrowserRouter as Router, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Sessions from './Pages/Sessions';



import StartPage from './Pages/StartPage';
import ProtectedRoutes from './ProtectedRoutes';
import SesSettings from './Util/SesSettings';
import Timer from './Util/Timer';
import SignUp from './Pages/SignUp';

import Trends from './Pages/Trends';

import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  
const user =sessionStorage.getItem('useraidt');

 

  

  return (
   <div className='App'>
     <Router >
     
     
    

      <Routes>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/' element={<StartPage />}/>
     
        <Route path='/' element={<ProtectedRoutes/>}>
        <Route path={`/Trends/${user}`} element={<Trends/>}/>
        <Route path={`/Dashboard/${user}`} element={<Dashboard/>}/>
        <Route path={`/SesSettings/${user}`} element={<SesSettings/>}/>
        <Route path={`/Timer/${user}`} element={<Timer/>}/>
        <Route path={`/Sessions/${user}`} element={<Sessions/>}/>
        
        </Route>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
