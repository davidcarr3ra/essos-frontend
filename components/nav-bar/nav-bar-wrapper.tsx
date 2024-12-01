'use client';

import { usePathname } from 'next/navigation';
import NavBar from './nav-bar';

export default function NavBarWrapper() {
  const pathname = usePathname();
  
  // Don't render navbar on home page
  if (pathname === '/') {
    return null;
  }
  
  return <NavBar />;
} 