import { NextResponse } from 'next/server';
import { mockAssets } from '@/data/mockAssets';

export async function GET() {
  // Simulate database/network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  return NextResponse.json(mockAssets);
}
