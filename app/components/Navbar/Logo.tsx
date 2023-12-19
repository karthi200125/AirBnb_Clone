"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    return (
        <Image className='hidden md:block cursor-pointer' alt='LOGO' height="100" width="100" src='/images/logo.png'/>
    )
}

export default Logo