import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

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