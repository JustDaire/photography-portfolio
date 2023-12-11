import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLayout from './pages/AdminLayout';
import Dashboard from './admin/Pages/Dashboard';
import Galleries from './admin/Pages/Galleries';
import Media from './admin/Pages/Media';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path='/news/:category/:id/:title' component={SingleArticle} /> */}
            {/* <Route path='*' component={NotFound} /> */}
          </Route>
          <Route path="/admin/" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="galleries" element={<Galleries />} >
              <Route path="edit" element={<Galleries />} />
            </Route>
            <Route path="media" element={<Media />} />
            {/* <Route path="report-stocks" element={<ReportStocks />} /> */}
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
