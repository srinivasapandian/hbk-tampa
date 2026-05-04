import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import blogData from '../data/blogData.json';

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-serif text-[#FFD700] mb-6">Blog Post Not Found</h1>
        <Link to="/" className="text-[#FFD700] hover:underline flex items-center justify-center gap-2">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-[#FFD700] transition-colors mb-12 group"
        >
          <div className="p-2 rounded-full border border-white/10 group-hover:border-[#FFD700]/50 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="font-serif italic text-lg">Back to Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6 text-[#FFD700]/80">
            <div className="flex items-center gap-1.5 text-sm font-serif tracking-wider uppercase">
              <Calendar size={14} />
              {blog.date}
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-1.5 text-sm font-serif tracking-wider uppercase">
              <Tag size={14} />
              Special Event
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif mb-12 leading-tight">
            {blog.title}
          </h1>

          <div className="relative aspect-[16/9] mb-16 overflow-hidden rounded-[32px] border border-white/10 shadow-2xl">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <p className="text-xl md:text-2xl text-white/90 font-serif leading-relaxed italic border-l-2 border-[#FFD700] pl-8 py-2">
                Experience the finest South Indian flavors with our {blog.title}. Join us for an unforgettable culinary journey.
              </p>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-white/70 text-lg leading-relaxed font-serif">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p className="text-white/70 text-lg leading-relaxed font-serif">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                </p>
                <div className="my-12 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <h3 className="text-[#FFD700] font-serif text-2xl mb-4">Highlights of the Event</h3>
                  <ul className="space-y-3 text-white/80 font-serif">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
                      Authentic recipes from South India
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
                      Special curated menu for a limited time
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
                      Live music and vibrant atmosphere
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                <h4 className="text-xl font-serif text-[#FFD700] mb-6">Share this post</h4>
                <div className="flex gap-4">
                  {['FB', 'TW', 'IG', 'LI'].map((social) => (
                    <button 
                      key={social}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-all"
                    >
                      {social}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-[#FFD700] rounded-3xl text-black">
                <h4 className="text-xl font-serif mb-4">Reserve Your Spot</h4>
                <p className="text-sm mb-6 font-medium">Don't miss out on this special {blog.title.toLowerCase()}!</p>
                <button className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black/80 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
