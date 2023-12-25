import axios from 'axios';
import { SafeUser } from '../types';
import { useRouter } from 'next/navigation'; 
import useLoginModal from './UseLoginModal'; 
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

interface IUseFavorite {
    listingId: string;
    currentUser: SafeUser | null | undefined;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal(); 

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favouriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) return loginModal.onOpen();
        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favoruites/${listingId}`);  
            } else {
                request = () => axios.post(`/api/favoruites/${listingId}`); 
            }

            await request();
            router.refresh();
            toast.success("Success");
        } catch (error) {
            toast.error("Something went wrong");  
        }
    }, [currentUser, hasFavorited, listingId, loginModal, router]);

    return { hasFavorited, toggleFavorite };
};

export default useFavorite;
