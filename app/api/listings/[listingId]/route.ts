import { NextResponse } from 'next/server'
import prisma from '../../../libs/prismadb';
import getCurrentUser from '@/app/actions/GetCurrentUser';

interface IParams {
    listingId?: string
}


export async function DELETE(request: Request, { params }: { params: IParams }) {
    const Currentuser = await getCurrentUser()
    if (!Currentuser) return NextResponse.error()

    const { listingId } = params
    if (!listingId || typeof listingId !== 'string') {
        throw new Error("Invalid Id")
    }

    const listings = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: Currentuser.id
        }
    })

    return NextResponse.json(listings)
}