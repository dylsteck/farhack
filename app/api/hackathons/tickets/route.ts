import { addTicket } from '@/db/queries';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { user_id, user_address, hackathon_id, txn_hash, ticket_type, amount } = body;

        if (!user_id || !user_address || !hackathon_id || !txn_hash || !ticket_type || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const resp = await addTicket(user_id, user_address, hackathon_id, txn_hash, ticket_type, amount);
        
        if (!resp) {
            return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 });
        }

        return NextResponse.json(resp);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}