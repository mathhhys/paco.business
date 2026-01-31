'use client';

import Link from 'next/link'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function NotFound() {
  const pathname = usePathname()

  useEffect(() => {
    console.error(`404 Error: Page not found at ${pathname}`)
  }, [pathname])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold mb-4">Not Found</h2>
      <p className="text-lg mb-8">Could not find requested resource</p>
      <Link 
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}