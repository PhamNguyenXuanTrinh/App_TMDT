const notFound = (req, res, next)=>{
    const error = new Error('Router: ${req.originalUrl} is not found')
    res.status(400)
    next()
}
const errorHandler = (err, req,res,next)=>{
    const statusCode = res.statusCode === 200? 500 : res.statusCode
    return res.status(statusCode).json({
        status: false,
        message: err?.message,
    })
}

module.exports = {
    notFound, errorHandler
}