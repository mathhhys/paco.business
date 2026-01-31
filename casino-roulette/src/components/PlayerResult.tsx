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
      className="bg-slate-800/50 backdrop-blur-xl border border-slate-600 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto text-center relative overflow-hidden"
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Image Result */}
        <motion.div
          className="w-full max-h-[70vh] overflow-hidden shadow-2xl border-4 border-slate-600 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(96,165,250,0.4)] hover:border-blue-400"
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src={lastName.image_url ?? '/images/player1.svg'}
            alt="Winner Result"
            width={800}
            height={800}
            className="object-contain w-full h-auto max-h-[70vh]"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlayerResult;