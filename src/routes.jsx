import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route
        path="*"
        element={
          <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-serif text-[#FFD700] mb-6">Page Not Found</h1>
            <p className="text-white/60">This route does not exist.</p>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
