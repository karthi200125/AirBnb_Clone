import { NextResponse } from 'next/server';
import getCurrentUser from '../../actions/GetCurrentUser';
import prisma from '../../libs/prismadb';

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const body = await request.json();
    const { listingId, startDate:startdate, endDate, totalPrice } = body;
    if (!listingId || !startdate || !endDate || !totalPrice) return NextResponse.error();

    const listingAndReservation = await prisma.listing.update({
        where: { id: listingId },
        data: {
            reservations: {
                create: { userId: currentUser.id, startdate, endDate, totalPrice }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}
