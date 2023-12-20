const jwt = require ('jsonwebtoken')
const generateAccessToken = (uid,role)=>{
    return jwt.sign({_id: uid, role},process.env.JWT_SECRET,{expiresIn: '30d'})
}

const generateRefreshToken = (uid,role)=>{
    return jwt.sign({_id: uid},process.env.JWT_SECRET,{expiresIn: '365d'})
}

module.exports = {
    generateAccessToken, generateRefreshToken
}