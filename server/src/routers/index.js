const userRouter = require ('./user')

const {notFound, errorHandler} = require ('../middlewares/errHandler')
const initRouters = (app)=>{
    app.use('/api/user',userRouter)

// add middlewares để dễ xét lỗi
    app.use(notFound)
    app.use(errorHandler)
}

module.exports = initRouters