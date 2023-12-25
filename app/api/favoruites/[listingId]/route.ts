import { NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb';
import getCurrentUser from '@/app/actions/GetCurrentUser';

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') throw new Error('Invalid Id');

  const favouriteIds = [...(currentUser.favouriteIds || []), listingId];
  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favouriteIds },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') throw new Error('Invalid Id');

  let favouriteIds = [...(currentUser.favouriteIds || [])];
  favouriteIds = favouriteIds.filter((id) => id !== listingId); 

  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favouriteIds },
  });

  return NextResponse.json(updatedUser);
}
