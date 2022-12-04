import mysql from 'mysql2/promise';

console.log("Creating connection pool"); //Giúp kết nối đến DB mà không cần phải xác thực nhiều lần
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'yolo',
})

export default pool