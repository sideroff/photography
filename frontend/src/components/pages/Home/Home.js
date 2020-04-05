import React from 'react'


import './Home.scss'

export default function Home() {
  return (
    <React.Fragment>
      <div className="parallax" style={{ backgroundImage: "url('/hero.jpg')" }}></div>
      <div className="add-scroling">home page</div>
    </React.Fragment>
  )
}