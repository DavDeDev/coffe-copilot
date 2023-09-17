import Image from 'next/image';
import Link from 'next/link';
import ModeToggle from '../ui/mode-toggle';
import React from 'react';

function Topbar() {
  return (
    <nav className="h-fit w-screen bg-accent flex justify-between p-5">
      <Link href="/" className="flex items-center gap-5">
        {/* <Image src="/assets/logo.svg" alt="logo" width={28} height={28} /> */}
        <p className="font-bold">Coffee Copilot</p>
      </Link>

      <ModeToggle />
    </nav>
  );
}

export default Topbar;
