const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const { notFound, errorHandler } = require("../middlewares/errHandler");
const initRouters = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/productCategory", productCategoryRouter);
  // add middlewares để dễ xét lỗi
  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRouters;
