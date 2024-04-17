import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
// import {header}

const isAuthenticated = async (req: NextRequest) => {
    const url= req.nextUrl.clone();
    try {
         const token = req.cookies.get('token');
         
     console.log('Token found in cookies^^^^^^^^^^^^^^^:', token);
        if (!token) {
            console.log('No token found in cookies');
            url.pathname = '/login';
            return Promise.reject(NextResponse.redirect(url));
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

    else if(req.url.includes('/login')||req.url.includes('/signup')){ 
        try{
            const token = req.cookies.get('token');
            const url = req.nextUrl.clone(); // Clone the original URL
            console.log('Token found in cookies:', token);
            if (token) {
                // Redirect to login page if token is not found
                url.pathname = '/';
                return NextResponse.redirect(url);
              }
       
            
        }
        catch(error){
            console.error('Error in middleware:', error);
            return NextResponse.error();
        }
    }

    return NextResponse.next();
}


// Apply middleware to all requests within the root directory
export const config = {
  matcher: ['/api/profile','/login','/signup'],
};
