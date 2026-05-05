import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Utensils, Award, Clock, Users, ArrowRight, ExternalLink } from 'lucide-react';
import siteData from '../data/siteData.json';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

import gallery1 from '../asserts/gallery1.jpg';
import gallery2 from '../asserts/gallery2.jpg';
import gallery3 from '../asserts/gallery3.jpg';
import gallery4 from '../asserts/gallery4.png';
import gallery5 from '../asserts/gallery5.png';
import logo35 from '../asserts/35logo.png';
import logoMain from '../asserts/house-of-biryani.png';
import vector from '../asserts/Vector.png';

import menu1 from '../asserts/menu1.jpg';
import menu2 from '../asserts/menu2.jpg';
import menu3 from '../asserts/menu3.jpg';
import menu4 from '../asserts/menu4.jpg';

const menuImageMap = {
  '/menu1.jpg': menu1,
  '/menu2.jpg': menu2,
  '/menu3.jpg': menu3,
  '/menu4.jpg': menu4,
};

const baseGalleryItems = [
  { id: 1, image: gallery1, name: 'South Indian Thali' },
  { id: 2, image: gallery2, name: 'Chicken Tikka Kebab' },
  { id: 3, image: gallery3, name: 'Paneer Butter Masala' },
  { id: 4, image: gallery4, name: 'Mutton Biryani' },
  { id: 5, image: gallery5, name: 'Fish Fry' },
];

const galleryItems = [
  ...baseGalleryItems,
  ...baseGalleryItems,
  ...baseGalleryItems,
  ...baseGalleryItems,
  ...baseGalleryItems,
  ...baseGalleryItems,
].map((item, idx) => ({ ...item, uniqueId: `${item.id}-${idx}` }));

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All Foods');
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(15);
  const [isMenuScrolling, setIsMenuScrolling] = useState(false);
  const galleryRef = useRef(null);
  const menuRef = useRef(null);
  const menuScrollTimeoutRef = useRef(null);

  const handleMenuScroll = () => {
    setIsMenuScrolling(true);
    if (menuScrollTimeoutRef.current) {
      clearTimeout(menuScrollTimeoutRef.current);
    }
    menuScrollTimeoutRef.current = setTimeout(() => {
      setIsMenuScrolling(false);
    }, 200);
  };

  const filteredMenu = activeCategory === 'All Foods'
    ? siteData.menu
    : siteData.menu.filter(item => item.category === activeCategory);

  useEffect(() => {
    setActiveMenuIndex(0);
  }, [activeCategory]);

  const handleGalleryScroll = () => {
    if (!galleryRef.current) return;
    const container = galleryRef.current;
    
    // Infinite loop logic
    const { scrollLeft, scrollWidth, clientWidth } = container;
    
    // Calculate the width of one full cycle (baseGalleryItems.length items)
    // We use the distance between item 0 and item 5 to get the exact width including gaps
    if (container.children.length > baseGalleryItems.length) {
      const cycleWidth = container.children[baseGalleryItems.length].offsetLeft - container.children[0].offsetLeft;
      
      if (scrollLeft < cycleWidth) {
        // Jump forward by 2 cycles to stay in the middle
        container.scrollLeft = scrollLeft + cycleWidth * 2;
        return;
      } else if (scrollLeft > cycleWidth * 4) {
        // Jump backward by 2 cycles
        container.scrollLeft = scrollLeft - cycleWidth * 2;
        return;
      }
    }

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = activeGalleryIndex;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(childCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeGalleryIndex) {
      setActiveGalleryIndex(closestIndex);
    }
  };

  useEffect(() => {
    // Scroll to the active item initially
    if (galleryRef.current) {
      const container = galleryRef.current;
      const activeChild = container.children[activeGalleryIndex];
      if (activeChild) {
        container.scrollLeft = activeChild.offsetLeft - container.clientWidth / 2 + activeChild.clientWidth / 2;
      }
    }
  }, []);

  return (
    <div id="home" className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen pt-[350px] lg:pt-[300px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/home.png"
            alt="Hero Biryani"
            className="w-full h-full object-cover scale-105"
          />
          {/* Background Overlays for better readability and depth */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto pt-10 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >

            <h1
              className="mb-6 md:mb-8 text-white leading-none text-5xl md:text-[64px]"
              style={{
                fontFamily: 'Constantia, serif',
                fontWeight: 400,
                fontStyle: 'regular',
                lineHeight: '100%',
                letterSpacing: '0',
              }}
            >
              Authentic Cuisine
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mt-2">
              <button className="group flex items-center gap-2 rounded-full border border-[#D8AA3E] bg-black/35 px-4 md:px-5 py-2 md:py-2 font-['Playfair_Display'] text-base md:text-[16px] leading-none text-white/95 hover:bg-black/50 transition-all">
                <span>Reserve Your Table</span>
                <span className="flex items-center justify-center rounded-full border border-[#D8AA3E] w-6 h-6 md:w-7 md:h-7">
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#E1B443]" />
                </span>
              </button>

              <div
                className="hidden md:block w-[12px] h-[92px] bg-center bg-contain bg-no-repeat opacity-90"
                style={{ backgroundImage: 'url("/style-1.png")' }}
                aria-hidden="true"
              />

              <p
                className="max-w-3xl md:text-left text-white/95 text-2xl md:text-[36px]"
                style={{
                  fontFamily: 'Constantia, serif',
                  fontWeight: 400,
                  fontStyle: 'regular',
                  lineHeight: '100%',
                  letterSpacing: '0',
                }}
              >
                Bringing the Bold Flavors of Hyderabadi Cuisine to Tampa, USA
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-us" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative overflow-visible">
            {/* Decorative box behind */}
            <div
              aria-hidden="true"
              className="absolute -left-6 md:-left-12 top-6 md:top-12 w-full max-w-[500px] h-[320px] md:h-[520px] z-0 pointer-events-none rounded-[24px] md:rounded-[30px] border border-[#D8AA3E]"
            />

            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              src="/about.png"
              alt="About Our Restaurant"
              className="relative z-10 rounded-[24px] md:rounded-[30px] shadow-2xl w-full max-w-[500px] h-[320px] md:h-[520px] object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex flex-row items-end gap-4 sm:gap-6">
              <h2
                className="title-with-line text-4xl md:text-[48px]"
                style={{
                  fontFamily: 'Constantia, serif',
                  fontWeight: 400,
                  fontStyle: 'regular',
                  lineHeight: '1.2',
                  letterSpacing: '0',
                }}
              >
                About Our Restaurant
              </h2>
              <div className="flex-shrink-0">
                <img src={vector} alt="Cloche" className="w-11 h-11 object-contain opacity-90" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-serif leading-tight text-white/92">
                Authentic South Indian <br />
                Non-Veg Flavors in the USA
              </h3>
              <p className="text-white/75 leading-relaxed font-serif text-sm md:text-base">
                Our restaurant was created with a passion for sharing the rich and bold flavors of South Indian non-vegetarian cuisine with the community in the United States. Inspired by traditional recipes from Tamil Nadu and other South Indian regions, we prepare every dish using authentic spices, fresh ingredients, and time-honored cooking techniques. Our goal is to provide a warm dining experience where guests can enjoy delicious food, great service, and the true taste of South India.
              </p>
            </div>

            <button className="group inline-flex items-center gap-3 rounded-full border border-[#D8AA3E] bg-black/35 text-white px-5 py-2 font-serif text-lg hover:bg-black/50 transition-all">
              <span>Our Story</span>
              <ArrowRight className="w-5 h-5 text-[#E1B443]" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-start justify-between gap-6 mb-8">
              <div className="flex items-end gap-2">
                <h2 className="title-with-line text-4xl md:text-6xl font-serif">Menu</h2>
                <div className="flex-shrink-0">
                  <img src={vector} alt="Cloche" className="w-8 h-8 object-contain" />
                </div>
              </div>

              <button
                className="group inline-flex items-center justify-center bg-transparent text-white font-serif leading-[100%] hover:bg-[#D8AA3E]/10 transition-all mt-1"
                style={{
                  width: '165px',
                  height: '55px',
                  opacity: 1,
                  gap: '10px',
                  borderRadius: '40px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#D8AA3E',
                  paddingTop: '16px',
                  paddingRight: '32px',
                  paddingBottom: '16px',
                  paddingLeft: '32px',
                }}
              >
                <span>View All</span>
                <ArrowRight className="w-5 h-5 text-[#E1B443]" />
              </button>
            </div>

            <div className="flex flex-wrap gap-6 md:gap-10 items-center border-b border-white/10 pb-4">
              {siteData.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xl md:text-2xl font-serif transition-all pb-2 relative ${activeCategory === cat ? 'text-white underline decoration-[#FFD700] underline-offset-8' : 'text-white/40 hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={menuRef}
            onScroll={handleMenuScroll}
            className="flex overflow-x-auto gap-6 md:gap-8 pb-4 pl-4 md:pl-8 no-scrollbar scroll-smooth"
          >
            {filteredMenu.map((item, index) => {
              const isExpanded = activeMenuIndex === index;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    if (!isMenuScrolling) {
                      setActiveMenuIndex(index);
                    }
                  }}
                  onClick={() => {
                    setActiveMenuIndex(index);
                    if (menuRef.current) {
                      const container = menuRef.current;
                      const child = container.children[index];
                      if (child) {
                        const scrollLeft = child.offsetLeft - container.clientWidth / 2 + child.clientWidth / 2;
                        container.scrollTo({
                          left: scrollLeft,
                          behavior: 'smooth'
                        });
                      }
                    }
                  }}
                  className={`group relative flex-shrink-0 overflow-hidden cursor-pointer shadow-2xl border border-white/20 transition-all duration-500 ease-in-out ${isExpanded
                    ? 'w-[320px] md:w-[420px] h-[420px] md:h-[460px] rounded-[26px]'
                    : 'w-[250px] md:w-[280px] h-[420px] md:h-[460px] rounded-[22px]'
                    }`}
                >
                  <img
                    src={menuImageMap[item.image] || item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-black shadow-lg">
                    ${item.price}
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent p-5 md:p-6 flex flex-col justify-end">
                    <h4 className={`font-serif text-white mb-2 transition-all duration-500 ${isExpanded ? 'text-3xl' : 'text-2xl'}`}>{item.name}</h4>
                    <p className="text-white/75 text-sm font-serif line-clamp-2 mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#FFD700] text-xs font-serif tracking-wide group-hover:gap-4 transition-all">
                      View More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-5 mb-14">
            <div className="flex flex-row items-end justify-center gap-4">
              <h2 className="title-with-line text-3xl md:text-5xl font-serif text-center">Why People Choose Us?</h2>
              <div className="flex-shrink-0">
                <img src={vector} alt="Cloche" className="w-8 h-8 object-contain" />
              </div>
            </div>
            <p className="text-white/80 max-w-3xl mx-auto font-serif text-base md:text-lg leading-relaxed">
              We serve authentic South Indian non-veg dishes prepared with fresh ingredients, <br className="hidden md:block" /> traditional spices, and a commitment to quality and great hospitality.
            </p>
          </div>

          {/* Glass Outer Container */}
          <div className="relative p-3 md:p-6 bg-white/5 backdrop-blur-sm rounded-[30px] md:rounded-[72px] border border-white/10 max-w-6xl mx-auto">
            {/* Yellow Pill Container */}
            <div className="bg-[#FDC700] rounded-[24px] md:rounded-[60px] overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-stretch shadow-2xl">
              {siteData.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-7 md:p-8 text-black transition-all duration-500 hover:bg-black/5"
                >
                  <div className="h-14 w-14 md:h-16 md:w-16 mb-4 flex items-center justify-center">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-xl md:text-2xl font-serif mb-3">{feature.title}</h4>
                  <p className="text-xs md:text-sm text-black leading-relaxed font-serif max-w-[190px]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-black">
        <div className="w-full px-4 md:px-10">
          <div className="flex items-end gap-4 mb-20 justify-center">
            <h2 className="title-with-line text-4xl md:text-6xl font-serif tracking-widest text-center">Gallery</h2>
            <div className="flex-shrink-0">
              <img src={vector} alt="Cloche" className="w-8 h-8 object-contain" />
            </div>
          </div>

          <div
            ref={galleryRef}
            onScroll={handleGalleryScroll}
            className="relative flex overflow-x-auto gap-4 md:gap-8 pb-8 px-[calc(50vw-150px)] md:px-[calc(50vw-200px)] no-scrollbar snap-x snap-mandatory items-center justify-start cursor-grab active:cursor-grabbing"
          >
            {galleryItems.map((item, index) => {
              const isActive = activeGalleryIndex === index;
              return (
                <div
                  key={item.uniqueId}
                  onClick={() => {
                    setActiveGalleryIndex(index);
                    const container = galleryRef.current;
                    const child = container.children[index];
                    container.scrollTo({
                      left: child.offsetLeft - container.clientWidth / 2 + child.clientWidth / 2,
                      behavior: 'smooth'
                    });
                  }}
                  className={`group relative flex-shrink-0 cursor-pointer snap-center transition-all duration-500 ease-in-out flex flex-col items-center gap-4 ${isActive ? 'w-[300px] md:w-[400px]' : 'w-[200px] md:w-[250px]'}`}
                >
                  <div className={`w-full overflow-hidden rounded-[8px] transition-all duration-500 ${isActive ? 'h-[350px] md:h-[450px] border border-[#FDC700] shadow-[0_0_20px_rgba(253,199,0,0.2)]' : 'h-[250px] md:h-[300px] border border-white/20 hover:border-white/50'}`}>
                    <img
                      src={item.image}
                      className="w-full h-[120%] object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      alt={item.name}
                    />
                  </div>
                  {/* Name below the card */}
                  <div className={`transition-all duration-500 overflow-hidden flex items-center justify-center ${isActive ? 'h-[40px] opacity-100' : 'h-0 opacity-0'}`}>
                    <p className="text-[#FDC700] font-serif text-[20px] md:text-[28px] leading-none text-center whitespace-nowrap">
                      {item.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
