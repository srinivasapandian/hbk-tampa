import { MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoMain from '../../asserts/house-of-biryani.png';
import footerLogo from '../../asserts/footer.png';

const Footer = () => {
  return (
    <footer className="bg-black pt-10 pb-6 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div
          className="h-[2px] w-full bg-center bg-no-repeat bg-contain opacity-95 mb-12"
          style={{ backgroundImage: 'url("/line.png")' }}
        />

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 items-start"
          style={{
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '15px',
            lineHeight: '100%',
            letterSpacing: '0',
          }}
        >
          <div className="space-y-5 flex flex-col items-center md:items-start">
            <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center -mt-4">
              <Link to="/">
                <img src={logoMain} alt="House of Biryani Logo" className="w-full h-full object-contain" />
              </Link>
            </div>
            <p className="text-[14px] leading-relaxed text-white/60 text-center md:text-left font-sans">
              Privacy Policy | Terms & <br /> Conditions | Refund Policy
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[18px] font-bold text-white uppercase tracking-wider mb-2">
              Quick Link
            </h4>
            <div className="h-[2px] w-10 bg-[#FFD700] mb-4"></div>
            <ul className="space-y-2 text-[15px] leading-[1.4] text-white/80 text-center md:text-left font-sans">
              <li><Link to="/" className="hover:text-[#FFD700] transition-colors">Home</Link></li>
              <li><Link to="/#about-us" className="hover:text-[#FFD700] transition-colors">About Us</Link></li>
              <li><Link to="/menu" className="hover:text-[#FFD700] transition-colors">Menu</Link></li>
              <li><Link to="/#services" className="hover:text-[#FFD700] transition-colors">Catering</Link></li>
              <li><Link to="/#gallery" className="hover:text-[#FFD700] transition-colors">Buffet</Link></li>
              <li><Link to="/#contact-us" className="hover:text-[#FFD700] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[18px] font-bold text-white uppercase tracking-wider mb-2">
              Services
            </h4>
            <div className="h-[2px] w-10 bg-[#FFD700] mb-4"></div>
            <ul className="space-y-2 text-[15px] leading-[1.4] text-white/80 text-center md:text-left font-sans">
              <li>Dine-in</li>
              <li>Take away</li>
              <li>Delivery</li>
              <li>Catering</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[18px] font-bold text-white uppercase tracking-wider mb-2">
              Newsletter
            </h4>
            <div className="h-[2px] w-10 bg-[#FFD700] mb-4"></div>
            <ul className="space-y-2 text-[15px] leading-[1.4] text-white/80 text-center md:text-left font-sans">
              <li>Offer</li>
              <li>Updates</li>
              <li>Announcements</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[18px] font-bold text-white uppercase tracking-wider mb-2">Lets Stay In Touch</h4>
            <div className="h-[2px] w-10 bg-[#FFD700] mb-4"></div>
            
            <div className="flex items-start gap-3 mb-5">
              <Phone className="w-4 h-4 text-[#FDC700] mt-1" />
              <div className="text-left" style={{ fontWeight: 400, fontStyle: 'normal', letterSpacing: '0' }}>
                <p className="text-[13px] leading-[1.4] text-white/60 mb-1 font-sans">Have Question?</p>
                <p className="text-[16px] font-bold text-white font-sans">FREE (813) 388-6777</p>
              </div>
            </div>

            <a href="https://hbk-tampa.maghil.com/restaurant/hbk-tampa/menu/Pickup" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center rounded-full border border-[#D8AA3E] bg-black text-white px-6 py-1.5 text-[15px] font-sans hover:bg-[#D8AA3E] hover:text-black transition-all">
              <span>Order Online</span>
            </a>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-3 text-[14px] text-white/60 font-sans">
            <span>© Power By</span>
            <a href="https://www.brisque.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src={footerLogo} alt="maghil" className="h-5 md:h-6 w-auto object-contain" />
            </a>
            <span>2026</span>
          </div>
        </div>

        <div className="h-[6px] bg-white/10 w-[calc(100%+48px)] -ml-6 mt-6" />
      </div>
    </footer>
  );
};

export default Footer;
