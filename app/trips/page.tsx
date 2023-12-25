import getCurrentUser from "../actions/GetCurrentUser";
import getReseravtions from "../actions/GetReservations";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripPage = async () => {
    const CurrentUser = await getCurrentUser();
    if (!CurrentUser) return <EmptyState title="UnAuthorized" subtitle="Please Login" />

    const reservations = await getReseravtions({ userId: CurrentUser.id })    
    if (reservations.length === 0) return <EmptyState title="No trips found" subtitle="looks like you havent reserved any trips" />

    return <TripsClient reservations={reservations} CurrentUser={CurrentUser} />    
}

export default TripPage;