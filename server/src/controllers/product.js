const { query } = require("express");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require ('slugify')

const createProduct = asyncHandler(async(req, res)=>{
    if(Object.keys(req.body).length ==0) throw new Error('missing input')
    if(req.body && req.body.title){
        req.body.slug = slugify(req.body.title)
    }
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        status: 'OK',
        message: 'success',
        data: newProduct
    })
})
// get one product
const getOneProduct = asyncHandler(async(req, res)=>{
    const {pid}= req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        status: 'OK',
        message: product? 'success': 'failure',
        data: product 
    })
})

// get all product, filtering, sorting, pagination 
const getAllProduct = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    // Tách trường đặt biết ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach(el => delete queries[el]);

    // Format lại operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, el => '$' + el);

    const formatQuery = JSON.parse(queryString);

    // Xây dựng query cho filtering
    if (queries?.title) {
        formatQuery.title = { $regex: queries.title, $options: 'i' };
    }

        // Tạo query cho filtering
    let queryCommand = Product.find(formatQuery);
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand =queryCommand.sort(sortBy)
    }


    // Thực hiện query và lấy số lượng sản phẩm thỏa mãn điều kiện
    try {
        const response = await queryCommand.exec();
        const counts = await Product.countDocuments(formatQuery);

        return res.status(200).json({
            status: 'OK',
            message: response ? 'success' : 'failure',
            counts,
            data: response
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
});
///delete product
const deleteProduct = asyncHandler(async(req, res)=>{
    const {pid}= req.params
    const deleteProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        status: 'OK',
        message: deleteProduct? 'success': 'failure',
        data: deleteProduct 
    })
})

/// update product
const updateProduct = asyncHandler(async(req, res)=>{
    const {pid}= req.params
    if(req.body && req.body.title){
        req.body.slug = slugify(req.body.title, {new: true})
    }
    const updateProduct = await Product.findByIdAndUpdate(pid, req.body)
    return res.status(200).json({
        status: 'OK',
        message: updateProduct? 'success': 'failure',
        data: updateProduct 
    })
})


module.exports = {
    createProduct, 
    getOneProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
}