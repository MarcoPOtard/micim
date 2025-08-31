import { NextRequest, NextResponse } from 'next/server';
import { showData } from '@/utils/dataProcessing';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Show ID is required' },
        { status: 400 }
      );
    }

    const shows = await showData();
    const show = shows.find(show => show.id === id);

    if (!show) {
      return NextResponse.json(
        { error: 'Show not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(show);
  } catch (error) {
    console.error('Error fetching show:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}