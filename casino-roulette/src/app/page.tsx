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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNames() {
      try {
        const [firstRes, lastRes] = await Promise.all([
          supabase.from('paconames').select('id, firstname'),
          supabase.from('pacosurname').select('id, lastname, images')
        ]);

        console.log('First Names Response:', firstRes);
        console.log('Last Names Response:', lastRes);

        if (firstRes.error) throw firstRes.error;
        if (lastRes.error) throw lastRes.error;

        const mappedFirsts: FirstName[] = (firstRes.data ?? []).map((row: any) => ({
          id: Number(row.id),
          name: row.firstname
        }));

        const mappedLasts: LastName[] = (lastRes.data ?? []).map((row: any) => ({
          id: Number(row.id),
          name: row.lastname ?? 'Unknown',
          image_url: row.images ?? '/images/player1.svg'
        }));

        setFirstNames(mappedFirsts);
        setLastNames(mappedLasts);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch names:', err);
        setError(err?.message || 'Failed to connect to database. Please check your Supabase configuration.');
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

  if (error) {
    return (
      <main className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white p-8">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">Connection Error</h2>
          <p className="text-slate-300 mb-6">{error}</p>
          <p className="text-sm text-slate-500">
            Make sure your <code className="bg-slate-800 px-2 py-1 rounded">.env.local</code> file contains valid Supabase credentials.
          </p>
        </div>
      </main>
    );
  }

  if (firstNames.length === 0 || lastNames.length === 0) {
    return (
      <main className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white p-8">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">No Data Available</h2>
          <p className="text-slate-300 mb-6">
            The database tables appear to be empty. Please add data to the
            <code className="bg-slate-800 px-2 py-1 rounded mx-1">paconames</code> and
            <code className="bg-slate-800 px-2 py-1 rounded mx-1">pacosurname</code> tables.
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Note: If you have data, check your <strong>Row Level Security (RLS)</strong> policies in Supabase.
            You may need to add a policy to allow "Enable read access for all users" (SELECT) for these tables.
          </p>
        </div>
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
