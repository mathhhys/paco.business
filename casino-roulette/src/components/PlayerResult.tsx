import Image from 'next/image';
import { motion } from 'framer-motion';
import type { FirstName, LastName } from '@/lib/types';

interface PlayerResultProps {
  firstName: FirstName;
  lastName: LastName;
}

const PlayerResult: React.FC<PlayerResultProps> = ({ firstName, lastName }) => {
  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-xl border border-slate-600 rounded-3xl p-8 shadow-2xl max-w-md mx-auto text-center relative overflow-hidden"
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Image at Top with Hover Effect */}
        <motion.div
          className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-slate-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(96,165,250,0.6)] hover:border-blue-400"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={lastName.image_url}
            alt={`${firstName.name} ${lastName.name}`}
            width={192}
            height={192}
            className="object-cover w-full h-full"
          />
        </motion.div>
        
        {/* Winner Name */}
        <div>
          <h2 className="text-5xl font-black text-white drop-shadow-lg mb-2 tracking-wide">
            {firstName.name} {lastName.name}
          </h2>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerResult;