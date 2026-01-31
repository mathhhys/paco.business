'use client';

import { useState } from 'react';
import { mockFirstNames, mockLastNames } from '@/lib/data';
import SlotMachine from '@/components/SlotMachine';
import PlayerResult from '@/components/PlayerResult';
import type { FirstName, LastName } from '@/lib/types';

export default function Home() {
  const [selectedFirst, setSelectedFirst] = useState<FirstName | null>(null);
  const [selectedLast, setSelectedLast] = useState<LastName | null>(null);

  const handleSpinComplete = (firstIdx: number, lastIdx: number) => {
    setSelectedFirst(mockFirstNames[firstIdx]);
    setSelectedLast(mockLastNames[lastIdx]);
  };

  return (
    <main className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-8 gap-16 text-white">
      <div className="flex flex-col items-center gap-12 w-full max-w-4xl">
        {selectedFirst && selectedLast && (
          <PlayerResult firstName={selectedFirst} lastName={selectedLast} />
        )}

        <SlotMachine onSpinComplete={handleSpinComplete} />
      </div>
    </main>
  );
}
