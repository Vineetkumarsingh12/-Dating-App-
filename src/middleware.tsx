import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
// import {header}

const isAuthenticated = async (req: NextRequest) => {
    try {
         const token = req.cookies.get('token');
         

        if (!token) {
            return Promise.reject(NextResponse.redirect('/api/user/login'));
        }
        return Promise.resolve(NextResponse.next());
     
    } catch (error) {
        console.error('Error in isAuthenticated middleware:', error);
        return Promise.reject(NextResponse.error());
    }
};




export async function middleware(req: NextRequest) {
    console.log(`Request received: ${req.url}`);

    if (req.url.includes('/profile')) {
        try {
            await isAuthenticated(req);
        } catch (error) {
            console.error('Error in middleware:', error);
            return NextResponse.error();
        }
    }

    return NextResponse.next();
}


// Apply middleware to all requests within the root directory
export const config = {
  matcher: ['/api/profile'],
};
