import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Sparkles, TrendingUp, Zap, Briefcase, Building2 } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export function EnhancedHero() {
  const [searchText, setSearchText] = useState('');
  const [typedText, setTypedText] = useState('');
  const roles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'DevOps Engineer'];
  const [currentRole, setCurrentRole] = useState(0);

  // Typing animation
  useEffect(() => {
    let index = 0;
    const role = roles[currentRole];
    const typingInterval = setInterval(() => {
      if (index <= role.length) {
        setTypedText(role.substring(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentRole]);

  const stats = [
    { label: 'Active Jobs', value: 50000, suffix: '+', icon: Briefcase },
    { label: 'Companies', value: 10000, suffix: '+', icon: Building2 },
    { label: 'Success Stories', value: 95, suffix: '%', icon: TrendingUp },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main hero content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-sm font-medium">Your Dream Tech Job Awaits</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Find Your Next
            <br />
            <span className="relative inline-block">
              <span className="text-yellow-300">{typedText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-1 h-12 md:h-16 bg-yellow-300 ml-1 align-middle"
              />
            </span>
            <br />
            Role
          </h1>

          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Connect with top tech companies and find opportunities that match your skills and ambitions
          </p>

          {/* Enhanced search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto glass rounded-2xl p-2 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl">
                <Search className="text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-1 outline-none text-gray-800"
                />
              </div>

              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl">
                <MapPin className="text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  className="flex-1 outline-none text-gray-800"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 justify-center"
              >
                <Zap size={20} />
                <span>Search Jobs</span>
              </motion.button>
            </div>

            {/* Quick filters */}
            <div className="flex flex-wrap gap-2 mt-3 px-2">
              {['Remote', 'Full-time', 'Senior Level', '$150K+', 'Startup'].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-2xl text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/80 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted by section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-white/70 text-sm mb-4">Trusted by professionals from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Netflix'].map((company) => (
              <div key={company} className="text-white font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
