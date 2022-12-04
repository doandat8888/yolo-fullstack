import detailOrderService from '../services/detailOrderService.js';

let addNewDetailOrder = async(req, res) => {
    try {
        let response = await detailOrderService.addNewDetailOrder(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

let getAllDetailOrder = async (req, res) => {
    try {
        let response = await detailOrderService.getAllDetailOrder();
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
    addNewDetailOrder,
    getAllDetailOrder
}