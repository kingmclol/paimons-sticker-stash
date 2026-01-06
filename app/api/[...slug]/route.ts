import { NextResponse } from "next/server";
export async function GET() {
  return new NextResponse(
    JSON.stringify({ 
      error: "API Route not found. Check out docs at /api",
      status: 404 
    }),
    {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export const POST = GET;
export const PUT = GET;
export const DELETE = GET;