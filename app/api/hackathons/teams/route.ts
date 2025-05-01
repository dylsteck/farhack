import { getTeam, getTeams, createTeam, updateTeam, handleDeleteTeam } from '@/db/queries';
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

export async function POST(req: NextRequest) {
    const { name, description, hackathonId, userId } = await req.json();
    const team = await createTeam(name, description, hackathonId, userId);
    return NextResponse.json(team, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const { id, ...updates } = await req.json();
    
    // Convert date strings to Date objects if necessary
    for (const key in updates) {
        if (updates[key] && typeof updates[key] === 'string' && !isNaN(Date.parse(updates[key]))) {
            updates[key] = new Date(updates[key]);
        }
    }

    // Ensure submitted_at is a string if it's being sent as a timestamp
    if (updates.submitted_at && typeof updates.submitted_at === 'string') {
        updates.submitted_at = updates.submitted_at;
    }

    try {
        await updateTeam(id, updates);
        return NextResponse.json({ message: "Team updated successfully" });
    } catch (error) {
        console.error("Error updating team:", (error as Error).message);
        return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    await handleDeleteTeam(id);
    return NextResponse.json({ message: "Team deleted successfully" });
}