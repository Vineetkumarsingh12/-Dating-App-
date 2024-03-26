import multer from "multer";
export const uploadImage = multer({
    limits:{
        fileSize:1024*1024*5
    },
});
// 5mb
