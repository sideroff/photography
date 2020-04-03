import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

import './Header.scss'



const MENU_LINKS = [
  {
    link: '/gallery',
    text: 'Gallery'
  },
  {
    link: '/about',
    text: 'About'
  },
  {
    link: '/contact',
    text: 'Contact'
  }
]

export default function Header() {

  let [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <header>
      <NavLink to='/'>
        <div className='title'>
          Damyan Georgiev photography
        </div>
      </NavLink>


      <div className='nav-menu'>
        <FaBars onClick={() => setIsNavOpen(!isNavOpen)} className='hamburger' />

        <nav className={isNavOpen ? '' : ' closed'}>
          {MENU_LINKS.map(entry => (
            <NavLink to={entry.link} onClick={() => setIsNavOpen(!isNavOpen)} className='nav-link' key={entry.link}>
              {entry.text}
            </NavLink>
          ))}
        </nav>
      </div>
    </header >
  )
}