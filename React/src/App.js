
import React from 'react'
import Navgation from './components/seller_back/Navgation'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './components/seller_back/Navbar.scss'
import './style/variable.scss'
import Container from './components/seller_back/Container'
import Footer from './components/seller_back/Footer'
function App(props) {
  console.log(props)
  return (
    <React.Fragment>
      <Router>
        <Navgation />
        <Container />
        <Footer />
      </Router>
    </React.Fragment>
  )
}

export default App
