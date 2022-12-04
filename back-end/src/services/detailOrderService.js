import pool from '../config/connectDB.js';

let addNewDetailOrder = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.id || !data.productName || !data.productColor || !data.productSize || !data.productPrice || !data.productQuantity || !data.productSlug) {
                resolve({
                    errCode: 0,
                    errMessage: 'Missing input parameters!'
                })
            }else {
                await pool.execute('INSERT INTO detail_bill (billId, productName, productColor, productSize, price, quantity) VALUES (?, ?, ?, ?, ?, ?)',
                [data.id, data.productName, data.productColor, data.productSize, data.productPrice, data.productQuantity]);
                let [products] = await pool.execute('SELECT * from products WHERE slug = ?', [data.productSlug]);
                if(products[0]) {
                    let product = products[0];
                    let quantity = product.quantity - data.productQuantity;
                    await pool.execute('UPDATE products SET quantity = ? WHERE slug = ?', [quantity, data.productSlug]);
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Add new detail order successfully!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDetailOrder = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let [detailBills] = await pool.execute('SELECT * FROM detail_bill');
            if(detailBills[0]) {
                resolve({
                    errCode: 0,
                    data: detailBills
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

export default {
    addNewDetailOrder,
    getAllDetailOrder
}