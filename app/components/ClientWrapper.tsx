'use client';

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./Navbar').catch(() => ({ default: () => <div className="fixed top-0 left-0 w-full h-20 z-50" /> })), {
  ssr: false,
  loading: () => <div className="fixed top-0 left-0 w-full h-20 z-50" />,
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

