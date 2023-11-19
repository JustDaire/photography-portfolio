import React, { Component } from 'react';
import Toolbar from '../admin/Toolbar'
import Sidebar from '../admin/Sidebar';
import { Outlet } from 'react-router-dom';

class AdminLayout extends Component {
  render() {
    return (
      <>
        <Toolbar />
        <div className="row m-0 mt-5">
          <Sidebar />
          <div className="col-md-9 col-lg-10 mt-3">
            <Outlet />
          </div>
        </div>
      </>
    );
  }
}

export default AdminLayout;