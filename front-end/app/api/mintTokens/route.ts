import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { points } = data;

    // Ajoutez ici la logique pour minter les tokens avec les points reçus

    return NextResponse.json({ success: true, points }, { status: 200 });
  } catch (error) {
    console.error('Error while processing the request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}