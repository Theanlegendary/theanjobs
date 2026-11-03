import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Briefcase, Building2, FileText, X } from 'lucide-react';
import { Link } from 'wouter';

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Briefcase, label: 'Post a Job', href: '/post-job', color: 'bg-blue-500' },
    { icon: Building2, label: 'Add Company', href: '/companies', color: 'bg-purple-500' },
    { icon: FileText, label: 'Build Resume', href: '/cv-builder', color: 'bg-green-500' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 flex flex-col-reverse gap-3 mb-2"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <span className="px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
                  {action.label}
                </span>
                <Link href={action.href}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`${action.color} w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center hover-scale`}
                  >
                    <action.icon size={20} />
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl flex items-center justify-center hover:shadow-blue-500/50 transition-shadow"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <Plus size={24} />}
        </motion.div>
      </motion.button>
    </div>
  );
}
