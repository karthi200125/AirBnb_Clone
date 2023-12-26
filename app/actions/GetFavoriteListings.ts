

import prisma from '../libs/prismadb'
import getCurrentUser from './GetCurrentUser'

export default async function getFavoritesListings() {
    try {

        const CurrentUser = await getCurrentUser()
        if (!CurrentUser) return [];

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(CurrentUser.favouriteIds || [])]
                }
            }
        })
        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }))

        return safeFavorites
    } catch (error: any) {
        throw new Error(error)
    }
}