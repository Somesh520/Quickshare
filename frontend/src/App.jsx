import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Uses from './components/Uses';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center p-4 relative overflow-hidden text-white font-sans">
        <div className="background-blob" />

        <Navbar />

        <div className="w-full max-w-7xl mx-auto z-10 pt-32">
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/uses" element={<Uses />} />
        <Route path="/download/:uuid" element={<Download />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
