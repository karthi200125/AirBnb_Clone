'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="flex-row items-center cursor-pointer hidden md:flex " onClick={() => router.push('/')}>
      <Image        
        className="hidden md:block "
        src="/images/logo.png"
        height="50"
        width="50"
        alt="Logo"
      />      
      <h1 className="font-bold text-rose-400 text-[30px]">staymate</h1>
    </div>
  );
}

export default Logo;
