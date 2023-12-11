const jwt = require ('jsonwebtoken')
const generateAccessToken = (uid,role)=>{
    return jwt.sign({_id: uid, role},process.env.JWT_SECRET,{expiresIn: '20s'})
}

const generateRefreshToken = (uid,role)=>{
    return jwt.sign({_id: uid},process.env.JWT_SECRET,{expiresIn: '60s'})
}
module.exports = {
    generateAccessToken, generateRefreshToken
}