import { motion, useAnimation, BezierDefinition } from 'framer-motion';
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { mockFirstNames, mockLastNames } from '@/lib/data';

interface SlotMachineProps {
  onSpinComplete: (firstIdx: number, lastIdx: number) => void;
}

const SlotMachine: React.FC<SlotMachineProps> = ({ onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const firstControls = useAnimation();
  const lastControls = useAnimation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create long strips of names for the rolling effect
  const firstNamesStrip = useMemo(() => [...mockFirstNames, ...mockFirstNames, ...mockFirstNames, ...mockFirstNames, ...mockFirstNames], []);
  const lastNamesStrip = useMemo(() => [...mockLastNames, ...mockLastNames, ...mockLastNames, ...mockLastNames, ...mockLastNames], []);

  const ITEM_HEIGHT = 128; // h-32 = 128px

  const spin = useCallback(async () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const finalFirstIdx = Math.floor(Math.random() * mockFirstNames.length);
    const finalLastIdx = Math.floor(Math.random() * mockLastNames.length);

    // Calculate target positions
    const targetFirstY = -( (mockFirstNames.length * 3 + finalFirstIdx) * ITEM_HEIGHT );
    const targetLastY = -( (mockLastNames.length * 3 + finalLastIdx) * ITEM_HEIGHT );

    // Reset positions without animation
    firstControls.set({ y: 0 });
    lastControls.set({ y: 0 });

    // Animate with a smooth cubic-bezier for that casino feel
    const spinTransition = {
      duration: 3,
      ease: [0.45, 0.05, 0.55, 0.95] as BezierDefinition,
    };

    await Promise.all([
      firstControls.start({ y: targetFirstY, transition: spinTransition }),
      lastControls.start({ y: targetLastY, transition: spinTransition }),
    ]);

    onSpinComplete(finalFirstIdx, finalLastIdx);
    setIsSpinning(false);
  }, [isSpinning, onSpinComplete, firstControls, lastControls]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Names Row */}
      <div className="flex flex-row items-center gap-4 md:gap-8">
        {/* First Name Column */}
        <div className="relative w-40 md:w-72">
          <div className="w-full h-32 bg-slate-800/50 border-2 border-slate-600 rounded-xl overflow-hidden relative">
            <motion.div
              animate={firstControls}
              className="absolute top-0 left-0 w-full"
            >
              {firstNamesStrip.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="h-32 flex items-center justify-center text-2xl md:text-4xl font-bold text-white"
                >
                  {item.name}
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50" />
          </div>
          <div className="text-center mt-2 text-xs md:text-sm text-slate-400 uppercase tracking-wide">
            First Name
          </div>
        </div>

        {/* Last Name Column */}
        <div className="relative w-40 md:w-72">
          <div className="w-full h-32 bg-slate-800/50 border-2 border-slate-600 rounded-xl overflow-hidden relative">
            <motion.div
              animate={lastControls}
              className="absolute top-0 left-0 w-full"
            >
              {lastNamesStrip.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="h-32 flex items-center justify-center text-2xl md:text-4xl font-bold text-white"
                >
                  {item.name}
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50" />
          </div>
          <div className="text-center mt-2 text-xs md:text-sm text-slate-400 uppercase tracking-wide">
            Last Name
          </div>
        </div>
      </div>

      {/* Spin Button below names */}
      <motion.button
        onClick={spin}
        disabled={isSpinning}
        className={`w-28 h-28 md:w-32 md:h-32 rounded-full font-black text-xl md:text-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all z-20 ${
          isSpinning
            ? 'bg-slate-600 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-400 hover:to-red-600 active:scale-90'
        } text-white border-4 border-red-400/30`}
        whileHover={!isSpinning ? { scale: 1.1 } : {}}
        whileTap={!isSpinning ? { scale: 0.95 } : {}}
      >
        {isSpinning ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            ⟳
          </motion.div>
        ) : (
          'PACO SPIN'
        )}
      </motion.button>
    </div>
  );
};

export default SlotMachine;