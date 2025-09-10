'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the HomeQuickJoin component with SSR disabled
const HomeQuickJoin = dynamic(
  () => import('./HomeQuickJoin'),
  { ssr: false }
);

export default function ClientHomeQuickJoin() {
  const [isMounted, setIsMounted] = useState(false);

  // This ensures the component is only rendered on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a placeholder or null during SSR and initial hydration
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return <HomeQuickJoin />;
}
