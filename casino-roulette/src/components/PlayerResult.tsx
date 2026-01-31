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
      className="bg-slate-800/50 backdrop-blur-xl border border-slate-600 rounded-3xl p-6 shadow-2xl max-w-3xl mx-auto text-center relative overflow-hidden"
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Image Result - Fixed Large Size */}
        <motion.div
          className="w-full aspect-square max-w-[600px] overflow-hidden shadow-2xl border-4 border-slate-600 rounded-2xl bg-slate-900/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(96,165,250,0.5)] hover:border-blue-400 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-full h-full p-4">
            <Image
              src={lastName.image_url ?? '/images/player1.svg'}
              alt="Winner Result"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlayerResult;