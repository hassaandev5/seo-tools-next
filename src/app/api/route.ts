import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
  // this is going to be my JSON response

  const results = {
    message: 'Hello World!',
  }

  // response with the JSON object

  return NextResponse.json(results)
}