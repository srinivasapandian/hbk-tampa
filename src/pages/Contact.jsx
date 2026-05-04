const Contact = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
      <h1 className="text-4xl font-serif text-[#FFD700] mb-8">Contact Us</h1>
      <p className="text-white/60 mb-10">Have questions or want to make a reservation?</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-[#0D0D0D] rounded-xl border border-white/5">
          <h3 className="font-serif mb-2">Call Us</h3>
          <p className="text-[#FFD700]">+1 (813) 546-2460</p>
        </div>
        <div className="p-8 bg-[#0D0D0D] rounded-xl border border-white/5">
          <h3 className="font-serif mb-2">Visit Us</h3>
          <p className="text-[#FFD700]">Tampa, FL, USA</p>
        </div>
        <div className="p-8 bg-[#0D0D0D] rounded-xl border border-white/5">
          <h3 className="font-serif mb-2">Email Us</h3>
          <p className="text-[#FFD700]">info@hbktampa.com</p>
        </div>
      </div>
    </div>
  );
};
export default Contact;
