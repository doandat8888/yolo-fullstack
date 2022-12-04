import productService from '../services/productService.js';

let addNewProduct = async(req, res) => {
    try {
        let response = await productService.addNewProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

let getAllProduct = async(req, res) => {
    try {
        let response = await productService.getAllProduct();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

let editProduct = async(req, res) => {
    try {
        let response = await productService.editProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

let deleteProduct = async (req, res) => {
    try {
        let {slug} = req.body;
        let response = await productService.deleteProduct(slug);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

let getProductBySlug = async(req, res) => {
    try {
        let slug = req.query.slug;
        let response = await productService.getProductBySlug(slug);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

export default {
    addNewProduct,
    getAllProduct,
    editProduct,
    deleteProduct,
    getProductBySlug
}