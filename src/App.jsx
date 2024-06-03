import React, { Suspense } from 'react';
import './App.css';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

const CityForm = React.lazy(()=> import ('./pages/Forecast'))
const Event = React.lazy(()=> import ('./pages/Event'))
const Loading = React.lazy(()=> import('./components/loading'))

function App() {
  const appid = import.meta.env.VITE_WEATHER_API;

  return (
    <Router>
    <div className='App'>
      <Navbar/>
      <Routes>
        <Route path='/' element={
          <Suspense fallback={<Loading/>}>
            <CityForm appid={appid}/>
          </Suspense>
        }/>
      </Routes>
      <Routes>
        <Route path='/event' element={
          <Suspense fallback={<Loading/>}>
            <Event/>
          </Suspense>
        }/>
      </Routes>
      <SpeedInsights/>
    </div>
    </Router>
  );
}

export default App;
