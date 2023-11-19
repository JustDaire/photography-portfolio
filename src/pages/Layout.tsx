import React, { ReactNode } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from './Home';
import About from './About';
import Contact from './Contact';

interface Props {
  children?: ReactNode
  // any props that come into the component
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className='main'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout;