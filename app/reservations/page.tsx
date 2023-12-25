'use client'

import getCurrentUser from "../actions/GetCurrentUser"
import getReseravtions from "../actions/GetReservations"
import EmptyState from "../components/EmptyState"
import ReservationsClient from "./ReservationsClient"

const Reservationpage = async () => {

    const CurrentUser = await getCurrentUser()
    if (!CurrentUser) {
        return (
            <EmptyState title="UnAuthorized" subtitle="Please Login" />
        )
    }

    const reservations = await getReseravtions({ authorId: CurrentUser.id })
    if (reservations.length === 0) {
        return (
            <EmptyState title="No reservations Found" subtitle="Looks like you no reservations" />
        )
    }

    return (
        // <ReservationsClient reservations={reservations} CurrentUser={CurrentUser} />
        'hi'
    )

}

export default Reservationpage