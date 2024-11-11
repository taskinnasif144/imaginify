import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("___________________ HI _____________________________");

  return NextResponse.json({ message: "OK" });
}
