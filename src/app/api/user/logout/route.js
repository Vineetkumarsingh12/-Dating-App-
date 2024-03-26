import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  //create cookie

    const cookieStore = cookies();
    console.log('logout');
    cookieStore.set('token', '', { httpOnly: true, maxAge: 0 });
    console.log('logout');
    return NextResponse.json({ message: 'Logout success', success: true }, { status: 200 });

}