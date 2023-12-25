import getCurrentUser from '@/app/actions/GetCurrentUser';
import prisma from '../../../libs/prismadb'
import { NextResponse } from 'next/server';

interface IParams {
    reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const CurrentUser = await getCurrentUser()
    if (!CurrentUser) return NextResponse.error()

    const { reservationId } = params
    if (!reservationId || typeof reservationId !== 'string') throw new Error("Invalid id")

    const reservation = await prisma.reservation.delete({
        where: {
            id: reservationId,
            OR: [
                { userId: CurrentUser.id },
                { listing: { userId: CurrentUser.id } }
            ]
        },
    })
    return NextResponse.json(reservation)
}