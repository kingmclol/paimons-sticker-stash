import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (request.method === "OPTIONS") {
    return NextResponse.json(
      {},
      {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    );
  }

  // Handle simple requests
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
