import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'

export default function Layout({test}) {
  return (
    <div>
      <Navbar test={test}></Navbar>
      <Outlet></Outlet>
      <Footer  />
    </div>
  )
}
