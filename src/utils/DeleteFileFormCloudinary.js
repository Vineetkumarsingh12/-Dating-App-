import { v2 as cloudinary}  from "cloudinary";

 
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

  

export const deleteFileFromCloudinary = async (public_ids) => {
  try {

   // delete multiple files from cloudinary
    const result = await Promise.all(
      public_ids.map(async (public_id) => {
        const res = await cloudinary.uploader.destroy(public_id);
        return res;
      })
    );
    return result;
  } catch (error) {
    console.log("Error in deleteFileFromCloudinary: ", error);
    return null;
  }
}