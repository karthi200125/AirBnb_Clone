import prisma from '../libs/prismadb'

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(params: IListingsParams) {
    try {
        const { userId, guestCount, bathroomCount, roomCount, startDate: startdate, endDate, locationValue, category } = params
        let query: any = {}

        if (userId) query.userId = userId
        if (category) query.category = category
        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if (locationValue) query.locationValue = locationValue
        if (startdate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            { endDate: { gte: startdate }, startdate: { lte: startdate } },
                            { startdate: { lte: endDate }, endDate: { gte: endDate } }
                        ]
                    }
                }
            }
        }


        const listings = await prisma.listing.findMany({ where: query, orderBy: { createdAt: 'desc' } })

        const SafeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))

        return SafeListings;
    } catch (error: any) {
        throw new Error(error)
    }
}