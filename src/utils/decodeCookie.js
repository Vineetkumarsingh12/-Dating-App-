import jwt from "jsonwebtoken";

export default  async function  decodeCookie(req) {
    try{
        const token= req.cookies.get('token').value;
       
        // console.log("decode11234",token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return decoded.user.id;

    }catch(e){
        console.log("Error in decodeCookie: ", e);
    }
}
  