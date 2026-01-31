'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import SlotMachine from '@/components/SlotMachine';
import PlayerResult from '@/components/PlayerResult';
import type { FirstName, LastName } from '@/lib/types';

export default function Home() {
  const [selectedFirst, setSelectedFirst] = useState<FirstName | null>(null);
  const [selectedLast, setSelectedLast] = useState<LastName | null>(null);
  const [firstNames, setFirstNames] = useState<FirstName[]>([]);
  const [lastNames, setLastNames] = useState<LastName[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNames() {
      try {
        const [firstRes, lastRes] = await Promise.all([
          supabase.from('paconames').select('id, firstname'),
          supabase.from('pacosurname').select('id, lastname, image')
        ]);

        if (firstRes.error) throw firstRes.error;
        if (lastRes.error) throw lastRes.error;

        const mappedFirsts: FirstName[] = (firstRes.data ?? []).map((row: any) => ({
          id: Number(row.id),
          name: row.firstname
        }));

        const mappedLasts: LastName[] = (lastRes.data ?? []).map((row: any) => ({
          id: Number(row.id),
          name: row.lastname ?? 'Unknown',
          image_url: row.image ?? '/images/player1.svg'
        }));

        setFirstNames(mappedFirsts);
        setLastNames(mappedLasts);
      } catch (err) {
        console.error('Failed to fetch names:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNames();
  }, []);

  const handleSpinComplete = (firstIdx: number, lastIdx: number) => {
    const safeFirstIdx = firstNames.length > 0 ? firstIdx % firstNames.length : 0;
    const safeLastIdx = lastNames.length > 0 ? lastIdx % lastNames.length : 0;
    setSelectedFirst(firstNames[safeFirstIdx] ?? null);
    setSelectedLast(lastNames[safeLastIdx] ?? null);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">
        <div className="text-2xl font-bold">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-8 gap-16 text-white">
      <div className="flex flex-col items-center gap-12 w-full max-w-4xl">
        {selectedFirst && selectedLast && (
          <PlayerResult firstName={selectedFirst} lastName={selectedLast} />
        )}

        <SlotMachine 
          firstNames={firstNames} 
          lastNames={lastNames} 
          onSpinComplete={handleSpinComplete} 
        />
      </div>
    </main>
  );
}
