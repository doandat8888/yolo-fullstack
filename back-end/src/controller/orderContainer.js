import orderService from '../services/orderService.js';
let addNewOrder = async(req, res) => {
    try {
        let response = await orderService.addNewOrder(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

let getAllOrder = async (req, res) => {
    try {
        let response = await orderService.getAllOrder();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

let getOrderByPhone = async (req, res) => {
    try {
        let response = await orderService.getOrderByPhone(req.query.phoneNumber);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

let sendOrderInfo = async(req, res) => {
    try {
        let response = await orderService.sendOrderInfo(req.body);
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
    addNewOrder,
    getOrderByPhone,
    getAllOrder,
    sendOrderInfo
}