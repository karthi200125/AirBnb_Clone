'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types"
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface ReservationpageProps {
    reservations: SafeReservation[];
    CurrentUser?: SafeUser | null
}

const ReservationsClient: React.FC<ReservationpageProps> = ({ reservations, CurrentUser }) => {
    const router = useRouter()
    const [DeletingId, setDeletingId] = useState('')
    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        try {
            axios.delete(`/api/reservations/${id}`)
            toast.success('Resrevation cancelled')
            router.refresh()
        } catch (error) {
            toast.error('Somthing went error')
        } finally {
            setDeletingId('')
        }
    }, [router])
    return (
        <Container>
            <Heading title="Reservations" subtitle="Booking on your Properties" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation) => (
                    <ListingCard key={reservation.id} data={reservation.listing} actionId={reservation.id} reservation={reservation} actionLabel="Cancel Guest reservation" onAction={onCancel} disabled={DeletingId === reservation.id} currentUser={CurrentUser}/>
                ))}
            </div>
        </Container>
    )
}

export default ReservationsClient