import { useEffect, useState } from "react";
import orderService from "../services/orderService";

const ManageCustomer = () => {


    let [bills, setBills] = useState([]);
    let [keywords, setKeywords] = useState('');
    
    useEffect(async() => {
        let response = await orderService.getAllOrder();
        if(response && response.errCode === 0) {
            setBills(response.data)
        }
        setKeywords(keywords)
    }, [bills], [keywords])

    if(keywords) {
        bills = bills.filter((bill) => {
            let fullName = bill.firstName + ' ' + bill.lastName;
            return fullName.includes(keywords)
        })
    }

    
    return (
        <div className="manage-product-container">
            <div className="manage-product-container-title">
                <p className="manage-product-container-title-content">Quản lí khách hàng</p>
            </div>
            <div className="manage-product-container-body">
                <div className="manage-product-container-body-top">
                    <div className="manage-product-container-body-top-left">
                        <i className='bx bx-search manage-product-container-body-top-left-icon'></i>
                        <input type="text" className="manage-product-container-body-top-left-input-search" placeholder="Tìm thông tin khách hàng theo tên..." onChange={(e) => setKeywords(e.target.value)}/>
                    </div>
                </div>
                <div className='products-table mt-4 mx-1'>
                    <table id="products">
                        <tr>
                            <th>STT</th>
                            <th>Mã hóa đơn</th>
                            <th>Họ tên</th>
                            <th>SĐT</th>
                            <th>Địa chỉ</th>
                            <th>Tổng mua</th>
                        </tr>
                        {bills && bills.length > 0 && bills.map((bill, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{bill.id}</td>
                                    <td>{bill.firstName} {bill.lastName}</td>
                                    <td>{bill.phoneNumber}</td>
                                    <td>{bill.address}</td>
                                    <td>{bill.total}</td>
                                    {/* <td>{bill.quantity}</td>
                                    <td className="products-table-action">
                                        <button className="products-table-btn-edit">
                                            <i className='bx bx-pencil products-table-btn-edit-icon'></i>
                                            <p className="products-table-btn-edit-content" onClick={hanldeConfirm}>Xác nhận</p>
                                        </button>
                                        <button className="products-table-btn-cancel" onClick={() => onDeleteProduct(product)}>
                                            <i className='bx bx-trash products-table-btn-del-icon'></i>
                                            <p className="products-table-btn-cancel-content">Xóa</p>
                                        </button>
                                    </td> */}
                                </tr>
                            )
                            
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageCustomer;