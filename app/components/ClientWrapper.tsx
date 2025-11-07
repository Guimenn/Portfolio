'use client';

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./Navbar'), {
  ssr: false,
});

const SplashScreen = dynamic(() => import('./SplashScreen'), {
  ssr: false,
});

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <>
      <SplashScreen />
      <div className="main-content">
        <Navbar />
        {children}
      </div>
    </>
  );
}

