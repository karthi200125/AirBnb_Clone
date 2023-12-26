import getCurrentUser from "../actions/GetCurrentUser";
import getListings from "../actions/GetListing";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
    const CurrentUser = await getCurrentUser();
    if (!CurrentUser) return <EmptyState title="UnAuthorized" subtitle="Please Login" />

    const listings = await getListings({ userId: CurrentUser.id })    
    if (listings.length === 0) return <EmptyState title="No Properties found" subtitle="looks like you have no properties" />

    return <PropertiesClient listings={listings} CurrentUser={CurrentUser} />    
}

export default PropertiesPage;