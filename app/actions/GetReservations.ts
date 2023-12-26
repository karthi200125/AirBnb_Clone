import prisma from '../libs/prismadb'

interface IParams {
    listingId?: string;
    userId?: string,
    authorId?: string
}

export default async function getReseravtions(params: IParams) {
    try {
        const { listingId, userId, authorId } = params
        const query: any = {};
        if (listingId) { query.listingId = listingId }
        if (userId) { query.userId = userId }
        if (authorId) { query.listing = { userId: authorId } }

        const reservations = await prisma.reservation.findMany({ where: query, include: { listing: true }, orderBy: { createdAt: 'desc' } })

        const safeReservation = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startdate: reservation.startdate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing?.createdAt.toISOString()
            }
        }))
        return safeReservation
    } catch (error:any) {
        throw new Error(error);
      }
}
