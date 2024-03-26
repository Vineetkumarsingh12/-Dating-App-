import { NextResponse } from 'next/server';
import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../model/user";
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier'; // Import streamifier for converting buffer to stream

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req) { // Use `default` for Next.js API route
  await dbConnect();

  try {
    // Extract form data
    const formData = await req.formData();
    const name = formData.get('name');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const file = formData.get('file');

    // Check file size
    const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit
    if (file.size > fileSizeLimit) {
      return NextResponse.json({ error: 'File size too large. Max file size is 5MB', success: false }, { status: 400 });
    }

    // // Check file format
    // const allowedFormats = ['image/jpeg', 'image/png']; // Add more formats if needed
    // if (!allowedFormats.includes(file.type)) {
    //   return NextResponse.json({ error: 'File format not supported. Supported formats are JPEG and PNG', success: false }, { status: 400 });
    // }

    // Convert file buffer to stream
    const buffer = await file.arrayBuffer();
    const readableStream = streamifier.createReadStream(Buffer.from(buffer));

    // Upload image to Cloudinary
    const cloudinaryResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({}, (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      readableStream.pipe(stream);
    });

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists', success: false }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      avatar: {
        public_id: cloudinaryResult.public_id,
        url: cloudinaryResult.secure_url
      }
    });

    return NextResponse.json({ message: "User Created", success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error', success: false }, { status: 500 });
  }
}
