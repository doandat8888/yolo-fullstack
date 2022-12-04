import pool from '../config/connectDB.js';
//import _ from 'lodash';

let addNewProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.productName || !data.productPrice || !data.productSlug || !data.productImg1 || 
                !data.productImg2 || !data.productColors || !data.productSizes || !data.productQuantity || !data.productCategorySlug || 
                !data.contentHTML || !data.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameter'
                })
            }else {
                let response = await getAllProduct();
                
                if(response && response.errCode === 0) {
                    let count = 0;
                    let products = response.data;
                    for(let i = 0; i < products.length; i++) {
                        if(products[i].slug === data.productSlug) {
                            count++;
                        }
                    }
                    if(count !== 0) {
                        resolve({
                            errCode: 2,
                            errMessage: 'Product has existed. Please try again!'
                        })
                    }else {
                        await pool.execute('INSERT INTO products (title, price, image01, image02, categorySlug, colors, slug, sizes, quantity, contentHTML, contentMarkdown) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                            [data.productName, data.productPrice, data.productImg1, data.productImg2, data.productCategorySlug,
                            data.productColors, data.productSlug, data.productSizes, data.productQuantity, data.contentHTML, data.contentMarkdown]
                        );
                        resolve({
                            errCode: 0,
                            errMessage: 'Add new product successfully!'
                        })
                    }
                }
                
                
            }
        } catch (e) {
            reject(e);
        }
    })
    
}

let editProduct = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.productName || !data.productPrice || !data.productSlug || !data.productImg1 || 
                !data.productImg2 || !data.productColors || !data.productSizes || !data.productCategorySlug || 
                !data.contentHTML || !data.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameter'
                })
            }else {
                const [products] = await pool.execute('SELECT * FROM products WHERE slug = ?', [data.productSlug])
                await pool.execute('UPDATE products SET title = ?, price = ?, image01 = ?, image02 = ?, categorySlug = ?, colors = ?, slug = ?, sizes = ?, quantity = ?, contentHTML = ?, contentMarkdown = ? WHERE slug = ?', 
                [data.productName, data.productPrice, data.productImg1 === 'NO UPDATE' ? products[0].image01 : data.productImg1, data.productImg2 === 'NO UPDATE' ? products[0].image02 : data.productImg2, data.productCategorySlug, data.productColors, data.productSlug, data.productSizes, data.productQuantity, data.contentHTML, data.contentMarkdown, data.productSlug])
                
                // if(products) {
                //     products[0].title = data.productName;
                //     products[0].price = data.productPrice;
                //     products[0].image01 = data.productImg01;
                //     products[0].image02 = data.productImg02;
                //     products[0].categorySlug = data.productCategorySlug;
                //     products[0].colors = data.productColors;
                //     products[0].slug = data.productSlug;
                //     products[0].sizes = data.productSizes;
                //     products[0].contentHTML = data.contentHTML;
                //     products[0].contentMarkdown = data.contentMarkdown;
                // }
                resolve({
                    errCode: 0,
                    errMessage: 'Update product successfully!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteProduct = (dataSlug) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!dataSlug) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameter'
                })
            }else {
                await pool.execute('DELETE FROM products WHERE slug = ?', [dataSlug]);
                resolve({
                    errCode: 0,
                    errMessage: 'Delete product successfully!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            
            let [products] = await pool.execute('SELECT * FROM products')
            if(products) {
                for(let i = 0; i < products.length; i++) {
                    products[i].image01 = Buffer.from(products[i].image01, 'base64').toString('binary');
                    products[i].image02 = Buffer.from(products[i].image02, 'base64').toString('binary');
                }
            }
            resolve({
                errCode: 0,
                data: products
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getProductBySlug = (slug) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!slug) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameter'
                })
            }else {
                let [products] = await pool.execute('SELECT * FROM products WHERE slug = ?', [slug]);
                if(products[0]) {
                    products[0].image01 = Buffer.from(products[0].image01, 'base64').toString('binary');
                    products[0].image02 = Buffer.from(products[0].image02, 'base64').toString('binary');
                    resolve({
                        errCode: 0,
                        data: products[0]
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
        
    })
}


export default {
    addNewProduct,
    getAllProduct,
    editProduct,
    deleteProduct,
    getProductBySlug
}