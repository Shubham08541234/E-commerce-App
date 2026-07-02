import jwt from 'jsonwebtoken'

const adminAuth = (req, res, next) => {
    try {
        const {token} = req.headers;
        if(!token) return res.json({success: false, message: "Not authorized coz!"});
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded_token.email !== process.env.ADMIN_EMAIL && decoded_token.password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Not authorized not coz!"});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:error.message});
    }
}

export default adminAuth;