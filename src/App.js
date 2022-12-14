
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Card } from './components/Card';
import { Navbar } from './components/Navbar';
import { CardRegister } from './components/register/CardRegister';
import { Profile } from './components/student/Profile';
import {useState} from 'react'
import { Panel } from './components/admin/Panel';
import { Score } from './components/student/Score';
import Chart from './components/student/Chart';

function App() {
 const [token,setToken] = useState(JSON.parse(localStorage.getItem('token')));
  return (
    <BrowserRouter>
      <div className="App container-fluid">
        <Navbar />
        <Routes>
          <Route path='/' element={token == null?<CardRegister />:<Profile setToken={setToken}/>} />
          <Route path='/login' element={<Card setToken={setToken} />} />
          <Route path='/admin' element={token == null ?<CardRegister />:<Panel />} />
          <Route path='/profile' element ={token == null?<CardRegister />:<Profile setToken={setToken}/>}/>
          <Route path='/score' element={<Score setToken={setToken} />} />
          <Route path='/chart' element={<Chart />} />
        </Routes>
        
      </div>
    

    </BrowserRouter>
  );
}

export default App;
