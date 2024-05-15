import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import tezbritLogo from '/tezbrit.svg'
import './App.css'
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Discografia from './Components/Discografia/Discografia';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>

      < Header />
      <Routes>
        <Route path='/' element={
          <>
            < Home />
            < Footer />
          </>
        } />
        <Route path='/discografia' element={< Discografia/>} />
      </Routes>

      
    </Router>
  )
}

export default App
