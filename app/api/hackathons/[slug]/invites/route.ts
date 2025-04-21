import { NextRequest, NextResponse } from 'next/server';
import { createInvite, acceptInvite } from '@/db/queries';

export async function POST(req: NextRequest) {
  try {
    const { userId, teamId, farcasterUsername } = await req.json();
    if (!userId || !teamId) {
      return NextResponse.json({ error: "Missing userId or teamId" }, { status: 400 });
    }
    
    const token = await createInvite(userId, teamId);
    
    if (farcasterUsername) {
      console.log(`Invite created for Farcaster user: @${farcasterUsername}`);
    }
    
    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { token, userId } = await req.json();
    if (!token || !userId) {
      return NextResponse.json({ error: "Missing token or userId" }, { status: 400 });
    }
    await acceptInvite(token, userId);
    return NextResponse.json({ message: "Invite accepted successfully" });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
  }
}