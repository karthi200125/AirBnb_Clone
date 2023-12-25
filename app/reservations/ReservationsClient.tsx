'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types"
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
            toast.success('')
        } catch (error) {

        }
    }, [])
    return (
        <Container>
            <Heading title="Reservations" subtitle="Booking on your Properties" />
        </Container>
    )
}

export default ReservationsClient