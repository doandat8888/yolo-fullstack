import pool from '../config/connectDB.js';
import emailService from '../services/emailService.js';

let addNewOrder = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.id || !data.firstName || !data.lastName || !data.phoneNumber || !data.address || !data.total) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameters'
                })
            }else {
                
                await pool.execute("INSERT INTO bills (id, firstName, lastName, phoneNumber, address, total) VALUES (?, ?, ?, ?, ?, ?)", 
                [data.id, data.firstName, data.lastName, data.phoneNumber, data.address, data.total]);
                resolve({
                    errCode: 0,
                    errMessage: 'Add new order successfully!'
                })
                
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllOrder = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let [bills] = await pool.execute('SELECT * FROM bills');
            //if(bills[0]) {
                resolve({
                    errCode: 0,
                    data: bills
                })
            //}else {
                // resolve({
                //     errCode: 1,
                //     errMessage: 'No bill was found!'
                // })
            //}
        } catch (e) {
            reject(e);
        }
    })
}

let getOrderByPhone = (phoneNumber) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!phoneNumber) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameters!'
                })
            }else {
                let [allBills] = await pool.execute('SELECT * FROM bills');
                if(allBills) {
                    let [bills] = await pool.execute('SELECT * FROM bills WHERE phoneNumber = ?', [phoneNumber]);
                    if(bills[0]) {
                        let bill = bills[0];
                        resolve({
                            errCode: 0,
                            data: bill
                        })
                    }else {
                        resolve({
                            errCode: 3,
                            errMessage: 'No bill is found'
                        })
                    }
                }else {
                    resolve({
                        errCode: 2,
                        errMessage: 'No bill is database. Try again!'
                    })
                }
                
            }
        } catch (e) {
            reject(e);
        }
    })
}


let sendOrderInfo = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.email || !data.dataBills || !data.dataDetailBills) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameters'
                })
            }else {
                await emailService.sendEmail(data.email, data.dataBills, data.dataDetailBills);
                resolve({
                    errCode: 0,
                    errMessage: 'Send bill info successfully'
                })
            }
            
        } catch (e) {
            reject(e);
        }
    })
}

export default {
    addNewOrder,
    getOrderByPhone,
    getAllOrder,
    sendOrderInfo
}