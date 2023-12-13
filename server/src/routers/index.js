const userRouter = require ('./user')
const productRouter = require ('./product')
const {notFound, errorHandler} = require ('../middlewares/errHandler')
const initRouters = (app)=>{
    app.use('/api/user',userRouter)
    app.use('/api/product',productRouter)

// add middlewares để dễ xét lỗi
    app.use(notFound)
    app.use(errorHandler)
}

module.exports = initRouters