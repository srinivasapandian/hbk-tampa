import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logo35 from '../../asserts/35logo.png';
import logoMain from '../../asserts/house-of-biryani.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/#about-us' },
    { name: 'Menu', path: '/menu' },
    { name: 'Catering', path: '/#services' },
    { name: 'Buffet', path: '/#gallery' },
    { name: 'Contact Us', path: '/#contact-us' },
  ];

  return (
    <nav className={`absolute top-0 left-0 w-full z-50 px-6 transition-all duration-500 ${scrolled ? 'py-2 bg-black/70 backdrop-blur-lg' : 'py-3 bg-transparent'}`}>
      <div className="max-w-[1200px] mx-auto w-full flex flex-col items-center relative z-[60]">
        {/* Mobile View Top Bar */}
        <div className={`w-full flex flex-col md:hidden relative items-center transition-all duration-500 ${scrolled ? 'h-14' : 'pt-6 pb-2'}`}>
          <div className="flex w-full items-center justify-center relative">
            <Link
              to="/"
              className={`flex items-center justify-center z-[60] transition-all duration-500 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 translate-y-0'}`}
            >
              <img
                src={logoMain}
                alt="House of Biryani Logo"
                className={`object-contain transition-all duration-500 ${scrolled ? 'h-12 w-12' : 'h-32 w-32'}`}
              />
            </Link>
            <button
              className="absolute right-0 text-[#D8AA3E] p-2 hover:text-[#FFD700] transition-all duration-500 opacity-100 translate-y-0 z-[60]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={36} /> : <Menu size={36} />}
            </button>
          </div>

          {/* Mobile Badges - only visible when not scrolled */}
          {!scrolled && !isOpen && (
            <div className="flex items-center justify-center gap-10 mt-16 transition-all duration-500 opacity-100 translate-y-0">
              <img
                src="/halal.png"
                alt="Halal Logo"
                className="h-16 w-16 object-contain"
              />
              <img
                src={logo35}
                alt="30+ Locations Logo"
                className="h-20 w-20 object-contain"
              />
            </div>
          )}
        </div>

        {/* Desktop View Logos */}
        <div className={`hidden md:flex flex-col items-center justify-center transition-all duration-500 origin-top overflow-hidden ${scrolled ? 'h-0 opacity-0 scale-y-0' : 'h-[150px] opacity-100 scale-y-100'}`}>
          <Link to="/" className="flex-shrink-0 z-[60]">
            <div className="flex items-center md:gap-10">
              <img
                src="/halal.png"
                alt="Halal Logo"
                className="md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain"
              />
              <img
                src={logoMain}
                alt="House of Biryani Logo"
                className="md:h-32 md:w-32 lg:h-[150px] lg:w-[150px] object-contain"
              />
              <img
                src={logo35}
                alt="35+ Locations Logo"
                className="md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain"
              />
            </div>
          </Link>
        </div>

        <div
          className={`hidden lg:flex items-center justify-center border border-white/10 rounded-[50px] mx-auto transition-all duration-500 ${scrolled ? 'mt-0' : 'mt-6 lg:mt-10'}`}
          style={{
            width: '792px',
            height: '70px',
            opacity: 1,
            gap: '10px',
            paddingTop: '10px',
            paddingRight: '36px',
            paddingBottom: '10px',
            paddingLeft: '36px',
            backgroundColor: '#0F1115',
            boxShadow: '0px 4px 4px 0px #00000040',
          }}
        >
          <div className="flex items-center gap-[10px] w-full justify-between">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[20px] leading-[100%] tracking-[0] font-normal [font-family:'Bellefair',serif] text-white/95 hover:text-[#FFD700] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button className="text-[20px] leading-[100%] tracking-[0] font-normal [font-family:'Bellefair',serif] text-white px-4 py-1.5 rounded-full border border-[#D8AA3E] hover:bg-[#D8AA3E]/10 transition-colors">
              Order Online
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center gap-8 lg:hidden overflow-hidden"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="text-2xl font-serif text-white hover:text-[#FFD700] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + navLinks.length * 0.1 }}
              className="mt-4"
            >
              <button className="bg-[#FFD700] text-black px-10 py-4 rounded-md text-sm font-bold uppercase tracking-widest">
                Order Online
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
