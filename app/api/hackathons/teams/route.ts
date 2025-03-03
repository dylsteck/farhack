import { getTeam, getTeams } from '@/db/queries';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { pathname, searchParams } = new URL(req.url);
        const id = pathname.split("/").pop();
        const type = searchParams.get('type');
        const identifier = searchParams.get('identifier');

        if (type && identifier) {
            const idNum = parseInt(identifier, 10);
            if (isNaN(idNum)) {
                throw new Error("Invalid identifier");
            }
            const resp = await getTeam(type as 'teamId' | 'userId', idNum);
            return NextResponse.json(resp);
        }

        const resp = await getTeams();
        return NextResponse.json(resp);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
    }
}