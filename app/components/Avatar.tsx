'use client';

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image className=" rounded-full" width='30' height='30' src={src || "/images/placeholder.jpg"} alt="User Avatar"alt="user Logo"/>
  )
}
 
export default Avatar;