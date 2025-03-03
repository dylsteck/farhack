import { getHackathons, getHackathon } from '@/db/queries';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { pathname } = new URL(req.url);
        const slug = pathname.split("/").pop();

        if (!slug) {
            throw new Error("Slug is required");
        }

        const resp = await getHackathon(slug);

        if (req.headers.get('Cache-Control') !== 'no-cache') {
            req.headers.set('Cache-Control', 'max-age=3600');
        }

        if (!resp) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        return NextResponse.json(resp);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
    }
}