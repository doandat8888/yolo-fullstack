import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
let sendEmail = async(email, dataBills, dataDetailBills) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    let htmlContent = dataDetailBills.map((dataDetailBill, index) => (
        `
            <h3>Sản phẩm thứ ${index + 1}</h3>
            <p>Tên sản phẩm: ${dataDetailBill.productName}</p>
            <p>Màu sắc: ${dataDetailBill.productColor}</p>
            <p>Kích thước: ${dataDetailBill.productSize}</p>
            <p>Giá: ${dataDetailBill.productPrice}</p>
            <p>Số lượng: ${dataDetailBill.productQuantity}</p>
        `
    ));
    

    let info = await transporter.sendMail({
        from: '"YOLO Shop" <yoloshop3108@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Thông tin hóa đơn", // Subject line
        html: `
            <h3>Xin chào ${dataBills.firstName} ${dataBills.lastName}!</h3>
            <p>Địa chỉ: ${dataBills.address}</p>
            <p>Bạn nhận được email này vì đã đặt hàng trên Yolo shop</p>
            <h3>Thông tin đặt hàng của bạn:</h3>
            ${htmlContent}
            <h3>Tổng: ${dataBills.total} VNĐ</h3>
            <h3>Chân thành cảm ơn bạn đã tin tưởng Yolo!</h3>
            <p>Thân ái!</p>
        `, // html body
    });

    

}

export default {
    sendEmail
}