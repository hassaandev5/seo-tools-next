import { NextResponse } from "next/server";

export async function GET() {
  // this is going to be my JSON response

  const results = {
    message: "Hello World!",
  };

  // response with the JSON object

  return NextResponse.json(results);
}
