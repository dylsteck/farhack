import { NextRequest, NextResponse } from 'next/server';
import { NeynarUserSearchResponse } from '@/lib/types';

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY || 'NEYNAR_API_DOCS';
const NEYNAR_API_URL = 'https://api.neynar.com/v2/farcaster/user/search';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const limit = searchParams.get('limit') || '5';
    const cursor = searchParams.get('cursor') || '';

    if (!query) {
      return NextResponse.json({ message: 'Search query is required' }, { status: 400 });
    }

    const queryParams = new URLSearchParams();
    queryParams.append('q', query);
    queryParams.append('limit', limit);
    if (cursor) {
      queryParams.append('cursor', cursor);
    }

    const apiUrl = `${NEYNAR_API_URL}?${queryParams.toString()}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-api-key': NEYNAR_API_KEY,
        'x-neynar-experimental': 'false'
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API Search] Neynar API error: ${response.status} ${errorText}`);
      return NextResponse.json({ message: `Neynar API Error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json() as NeynarUserSearchResponse;
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Search] Internal server error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ 
      message: `Internal server error: ${errorMessage}`
    }, { status: 500 });
  }
} 