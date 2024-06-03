import React,{useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    if(isOpen){
      document.documentElement.setAttribute('data-theme', 'light');
    }else{
      document.documentElement.setAttribute('data-theme', 'synthwave')
    }
  }, [isOpen])

  const handleToggle=()=>{
    setIsOpen(!isOpen)
  }
  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="navbar-start">
          <NavLink to="/" className="text-2xl font-bold text-primary">WeatherApp</NavLink>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal p-0">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/event" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
                event
              </NavLink>
            </li>
            <li>
            <input type="checkbox" className="toggle mt-2" checked={isOpen} onChange={handleToggle} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
