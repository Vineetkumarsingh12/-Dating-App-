import { NextResponse } from "next/server";
import { headers } from 'next/headers'
import decodeCookie from "../../../utils/decodeCookie";

export async function GET(req) {
    // await dbConnect();
    try {
        
        const userId = await decodeCookie(req);
        console.log(userId);

        return NextResponse.json({ success: true});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
    }