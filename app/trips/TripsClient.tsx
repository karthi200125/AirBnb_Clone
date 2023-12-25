'use client'

import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../types"
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    reservations: SafeReservation[];
    CurrentUser?: SafeUser;
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations, CurrentUser }) => {

    const router = useRouter();
    const [DeletingId, setDeletingId] = useState('')
    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        try {
            axios.delete(`/api/reservation/${id}`)
            toast.success("reservation Cancelled")
            router.refresh()
        } catch (error: any) {
            toast.error(error?.response?.data?.error)
        } finally {
            setDeletingId('')
        }
    }, [router])

    return (
        <Container >
            <Heading title="trips" subtitle="Where you've been and where you're going" />
            <div className="mt-10  grid  grid-cols-1  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation) => (
                    <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id} onAction={onCancel} disabled={DeletingId === reservation.id} actionLabel='Cancel Reservation' currentUser={CurrentUser} />
                ))}
            </div>
        </Container>
    )
}

export default TripsClient