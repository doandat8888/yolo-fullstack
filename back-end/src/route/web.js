import express from "express";
import userController from "../controller/userController.js";
import productContainer from "../controller/productContainer.js";
import orderContainer from "../controller/orderContainer.js";
import detailOrderContainer from "../controller/detailOrderContainer.js";

let router = express.Router();

const initWebRoute = (app) => {
    router.post('/api/check-login', userController.handleLogin);
    router.post('/api/add-new-product', productContainer.addNewProduct);
    router.get('/api/get-all-product', productContainer.getAllProduct);
    router.post('/api/edit-product', productContainer.editProduct);
    router.delete('/api/delete-product', productContainer.deleteProduct);
    router.get('/api/get-product-by-slug', productContainer.getProductBySlug);
    router.post('/api/add-new-order', orderContainer.addNewOrder);
    router.get('/api/get-all-order', orderContainer.getAllOrder);
    router.get('/api/get-order-by-phone', orderContainer.getOrderByPhone);
    router.post('/api/add-new-detail-order', detailOrderContainer.addNewDetailOrder);
    router.get('/api/get-all-detail-order', detailOrderContainer.getAllDetailOrder);
    router.post('/api/send-order-info', orderContainer.sendOrderInfo);
    return app.use('/', router);
}


export default initWebRoute