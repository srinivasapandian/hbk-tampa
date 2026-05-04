import { MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact-us" className="bg-black pt-10 pb-6 px-6">
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
            fontSize: '20px',
            lineHeight: '100%',
            letterSpacing: '0',
          }}
        >
          <div className="space-y-5 flex flex-col items-center md:items-start">
            <div className="w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
              <img src="/house-of-biryani.png" alt="House of Biryani Logo" className="w-full h-full object-contain" />
            </div>
            <p className="text-[16px] leading-relaxed text-white/60 text-center md:text-left font-sans">
              Privacy Policy | Terms & <br /> Conditions | Refund Policy
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[22px] font-bold text-white uppercase tracking-wider mb-2">
              Quick Link
            </h4>
            <div className="h-[2px] w-12 bg-[#FFD700] mb-6"></div>
            <ul className="space-y-3 text-[18px] leading-[1.4] text-white/80 text-center md:text-left font-sans">
              <li><a href="/#home" className="hover:text-[#FFD700] transition-colors">Home</a></li>
              <li><a href="/#about-us" className="hover:text-[#FFD700] transition-colors">About Us</a></li>
              <li><a href="/#menu" className="hover:text-[#FFD700] transition-colors">Menu</a></li>
              <li><a href="/#services" className="hover:text-[#FFD700] transition-colors">Catering</a></li>
              <li><a href="/#events" className="hover:text-[#FFD700] transition-colors">Blog</a></li>
              <li><a href="/#gallery" className="hover:text-[#FFD700] transition-colors">Buffet</a></li>
              <li><a href="/#contact-us" className="hover:text-[#FFD700] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[22px] font-bold text-white uppercase tracking-wider mb-2">
              Services
            </h4>
            <div className="h-[2px] w-12 bg-[#FFD700] mb-6"></div>
            <ul className="space-y-3 text-[18px] leading-[1.4] text-white/80 text-center md:text-left font-sans">
              <li>Dine-in</li>
              <li>Take away</li>
              <li>Delivery</li>
              <li>Catering</li>
              <li>Private Events</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[22px] font-bold text-white uppercase tracking-wider mb-2">
              Newsletter
            </h4>
            <div className="h-[2px] w-12 bg-[#FFD700] mb-6"></div>
            <ul className="space-y-3 text-[18px] leading-[1.4] text-white/80 text-center md:text-left font-sans">
              <li>Offer</li>
              <li>Updates</li>
              <li>Announcements</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[22px] font-bold text-white uppercase tracking-wider mb-2">Lets Stay In Touch</h4>
            <div className="h-[2px] w-12 bg-[#FFD700] mb-6"></div>
            
            <div className="flex items-start gap-3 mb-6">
              <Phone className="w-5 h-5 text-[#FDC700] mt-1" />
              <div className="text-left" style={{ fontWeight: 400, fontStyle: 'normal', letterSpacing: '0' }}>
                <p className="text-[14px] leading-[1.4] text-white/60 mb-1 font-sans">Have Question?</p>
                <p className="text-[18px] font-bold text-white font-sans">FREE 8136676445</p>
              </div>
            </div>

            <button className="group inline-flex items-center justify-center rounded-full border border-[#D8AA3E] bg-black text-white px-8 py-2 text-[18px] font-sans hover:bg-[#D8AA3E] hover:text-black transition-all">
              <span>Order Online</span>
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-3 text-[16px] text-white/60 font-sans">
            <span>© Power By</span>
            <a href="https://maghil.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/footer.png" alt="maghil" className="h-5 object-contain opacity-80" />
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
