import pool from '../config/connectDB.js';

let handleLogin = (username, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!username) {
                if(!password) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Vui lòng nhập tài khoản và mật khẩu'
                    })
                }else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Vui lòng nhập tài khoản'
                    })
                }
            }else {
                if(!password) {
                    resolve({
                        errCode: 3,
                        errMessage: 'Vui lòng nhập mật khẩu'
                    })
                }else {
                    let [user] = await pool.execute(`SELECT * FROM users WHERE username = ?`, [username]);
                    if(user[0]) {
                        let userLogin = user.find((user) => user.password === password);
                        if(userLogin && userLogin.username) {
                            resolve({
                                errCode: 0,
                                data: userLogin
                            })
                        }else {
                            resolve({
                                errCode: 4,
                                errMessage: 'Mật khẩu không chính xác'
                            })
                        }
                    }else if(!user[0]) {
                        resolve({
                            errCode: 5,
                            errMessage: 'Tài khoản không chính xác'
                        })
                    }
                }
                
            }
        } catch (e) {
            reject(e);
        }
    })
}
export default {
    handleLogin
}