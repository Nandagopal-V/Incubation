import {BrowserRouter,Route,Routes,useNavigate } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import AdminLayout from './pages/AdminLayout';
import Userbody from './pages/userbody';
import { Applicationlist } from './components/admin/applicationlist';
import Recordedtrack from './components/admin/recordedtrack';
import Bookingslots from './components/admin/bookingslots';
import Scheduleevents from './components/admin/scheduleevents';
import AdminLogin from './components/admin/adminlogin';
import Declinedlist from './components/admin/declinedlist';




function App() {
  return (
     <div>
      <BrowserRouter>
      <Routes>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path='/admin' element={  <AdminLayout/>}>
               <Route exact path='applicationlist' element={ <Applicationlist/>}/>
               <Route exact path='recordedtrack' element={ <Recordedtrack/>}/>
               <Route exact path='bookingslots' element={<Bookingslots/>}/>
               <Route exact path='scheduleevents' element={<Scheduleevents/>}/>
               <Route exact path='declinedlist' element={ <Declinedlist/>}/>


              
                
      </Route>
      <Route exact path='/adminlogin' element={<AdminLogin/>}/>

      <Route exact path='/' element={<Userbody/> }/>
           

      
      
      </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;
