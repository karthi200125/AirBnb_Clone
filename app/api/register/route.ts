import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({ data: { name, email, hashedpassword } });
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error in POST request:', error);
        return NextResponse.error();
    }
}
