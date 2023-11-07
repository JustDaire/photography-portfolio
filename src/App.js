import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery'
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className='main'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
