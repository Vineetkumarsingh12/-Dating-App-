import { NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../model/user";
import bcrypt, { hash } from "bcryptjs"; // Corrected import name
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// login
export async function POST(req) {
    await dbConnect();
    try {
        
        const { email, password } = await req.json();
        console.log(email, password);

        // check if the user exists
        const user = await User.findOne({ email }).select('+password');

        console.log(user);
        if (!user) {
            return NextResponse.json({ error: 'User not exist', success: false }, { status: 400 });
        }
        console.log("pass1");

        // check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials', success: false }, { status: 400 });
        }
        console.log("pass2");
        // generate jwt token and set cookie
        const payload = {
            user: {
                id: user.id,
                password:user.password
            }
        };
        console.log("pass3");
        // process.env.JWT_SECRET
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }); // expiresIn expects string
        user.password = ''; // Remove password from user object before sending
        console.log("pass4");

        const cookieStore = cookies();
        cookieStore.set('token', token, { httpOnly: true, maxAge: 3600 });
      
        return NextResponse.json({ message: 'Login success', success: true, user: user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
