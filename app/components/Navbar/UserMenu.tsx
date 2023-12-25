'use client';

import UseLoginModal from "@/app/Hooks/UseLoginModal";
import UseRentModal from "@/app/Hooks/UseRentModal";
import UseregisterModal from "@/app/Hooks/UseregisterModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  CurrentUser: SafeUser | null | undefined;
}

const UserMenu: React.FC<UserMenuProps> = ({ CurrentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = UseregisterModal();
  const loginModal = UseLoginModal();
  const rentModal = UseRentModal();
  const router = useRouter()

  const toggleOpen = useCallback(() => {
    setIsOpen((prevValue) => !prevValue);
  }, []);

  const onRent = useCallback(() => {
    if (CurrentUser) return rentModal.onOpen()
    rentModal.onOpen()
  }, [CurrentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-4 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-2 md:px-4 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={CurrentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[10vw] md:w-[3/4] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {CurrentUser ? (
              <>
                <MenuItem onClick={() => router.push('/trips')} label="My trips" />
                <MenuItem onClick={() => router.push('/reservations')} label="My favourites" />
                <MenuItem onClick={() => { }} label="My reservations" />
                <MenuItem onClick={() => { }} label="My Properties" />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my Home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="SignUp" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
