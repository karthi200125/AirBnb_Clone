import getCurrentUser from "../actions/GetCurrentUser"
import getFavoritesListings from "../actions/GetFavoriteListings"
import EmptyState from "../components/EmptyState"
import FavoritesClient from "./FavoritesClient"


const ListingPage = async () => {

    const listings = await getFavoritesListings()
    const CurrentUser = await getCurrentUser()
    if (listings.length === 0) return <EmptyState title="No Favorites Found" subtitle="Lokks Like you have no Favorite Listings" />

    return (
        <FavoritesClient listings={listings} CurrentUser={CurrentUser} />
    )
}

export default ListingPage