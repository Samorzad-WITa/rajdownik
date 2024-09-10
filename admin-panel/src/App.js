import './App.css';
import Announcements from './Components/announcements.js';
import Navbar from './Components/navbar.js';
import Participants from './Components/participants.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Schedule from './Components/schedule.js';
import Staff from './Components/staff.js';
import Settings from './Components/settings.js';
import NotFound from './Components/notFound.js';
import Test from './Components/test'
import Login from './Components/login';


function App() {
  return (
    <div className="App">
      <div className='container'>
    <div className='navPlaceHolder'>    {/*wygląda to komicznie, ale bez tego strona się rozjeżdża  */}
      <Navbar/>
      </div>

        <div className='content'>
        <Router>
<Routes>
          <Route path="/" element={<Participants/>}/>
          <Route path="/announcements" element={<Announcements/>}/>
          <Route path="/participants" element={<Participants/>}/>
          <Route path="/schedule" element={<Schedule/>}/>
          <Route path="/staff" element={<Staff/>}/>
          <Route path="/settings" element={<Settings/>}/>
           <Route path="/test" element={<Test/>}/> 
           <Route path="/login" element={<Login/>}/> 
          <Route path='*' element={<NotFound />}/>

        </Routes>
  </Router>        
        </div>


      </div>
    </div>
  );
}

export default App;