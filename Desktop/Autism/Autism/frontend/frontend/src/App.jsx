import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Navbar from './component/Navbar'; // Fixed import path
import './styles/main.css';

export default function App() {
  return (
    <div className="app">
      <Navbar /> {/* Now properly imported */}
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}