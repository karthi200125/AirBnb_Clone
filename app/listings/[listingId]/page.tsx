import getCurrentUser from "@/app/actions/GetCurrentUser";
import getListingById from "@/app/actions/GetListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReseravtions from "@/app/actions/GetReservations";

interface IParams {
    listingId?: string;
}

const page = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const reservations = await getReseravtions(params);
    if (!listing) return <EmptyState />;

    const currentUser = await getCurrentUser();

    return (
        <div className="">
            <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
        </div>
    );
};

export default page;
