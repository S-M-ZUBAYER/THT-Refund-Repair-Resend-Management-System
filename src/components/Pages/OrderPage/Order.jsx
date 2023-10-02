import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/UserContext';
import Warehouse from '../RefundPage/Warehouse';
import OrderInfoTable from './OrderInfoTable';

const Order = () => {
    const [allOrder, setAllOrder] = useState([]);

    const { user, selectedLanguage } = useContext(AuthContext);
console.log(user)
  
    const fetchData = async () => {
        try {

            const response = await axios.get('http://localhost:5000/tht/allOrder');
            const data = response.data;
            setAllOrder(data.filter(each=>each.warehouseName===user?.warehouseName));
        } catch (error) {
            console.error('Error occurred during the request:', error);

        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);


    return (
        <div className='max-w-[1240px] mx-auto py-16 px-4 text-center'>
            {
                user?.role === "~Warehouse~" && <> <div className="mt-5 mb-5">
                    {selectedLanguage === "zh-CN" &&
                        <>
                            <h1>需要由仓库管理员处理和批准的订单</h1>
                            <p className='py-4'>这些是当前的所有订单请求列表。在这里，您可以查看所有信息并完成订单放置过程。然后，请更新订单发送过程。</p>
                        </>
                    }


                    {selectedLanguage === "en-US" &&
                        <>
                            <h1>Orders Need To   Process and Approved By Warehouse Man</h1>
                            <p className='py-4'>These are all the list of order request at these moment. Here you can check all information and complete the order placement process. And then please update the order sending process.</p>
                        </>
                    }

                    {selectedLanguage === "fil-PH" &&
                        <>
                            <h1>Mga Order na Kailangang I-proseso at Aprubahan ng Warehouse Man</h1>
                            <p className='py-4'>Ito ang lahat ng listahan ng mga kahilingan sa order sa ngayon. Dito, maaari mong suriin ang lahat ng impormasyon at tapusin ang proseso ng paglalagay ng order. Pagkatapos, mangyaring i-update ang proseso ng pagpapadala ng order.</p>
                        </>
                    }


                    {selectedLanguage === "ms-MY" &&
                        <>
                            <h1>Pesanan Perlu Diproses dan Diluluskan oleh Pengurus Gudang</h1>
                            <p className='py-4'>Ini adalah senarai permintaan pesanan pada masa ini. Di sini anda boleh menyemak semua maklumat dan lengkapkan proses penempatan pesanan. Kemudian, sila kemaskini proses penghantaran pesanan.</p>
                        </>
                    }


                    {selectedLanguage === "th-TH" &&
                        <>
                            <h1>คำสั่งที่ต้องดำเนินการและอนุมัติโดยผู้จัดเก็บ</h1>
                            <p className='py-4'>นี่คือรายการคำสั่งที่ขอให้ดำเนินการในขณะนี้ ที่นี่คุณสามารถตรวจสอบข้อมูลทั้งหมดและดำเนินกระบวนการสั่งซื้อให้เสร็จสิ้น และแล้วกรุณาอัปเดตกระบวนการส่งคำสั่ง</p>
                        </>
                    }


                    {selectedLanguage === "vi-VN" &&
                        <>
                            <h1>Đơn Hàng Cần Được Xử Lý và Phê Duyệt Bởi Người Quản Lý Kho</h1>
                            <p className='py-4'>Đây là danh sách các đơn đặt hàng yêu cầu tại thời điểm này. Tại đây, bạn có thể kiểm tra tất cả thông tin và hoàn thành quy trình đặt hàng. Sau đó, vui lòng cập nhật quy trình gửi đơn hàng.</p>
                        </>
                    }


                    {selectedLanguage === "id-ID" &&
                        <>
                            <h1>Pesanan Perlu Diproses dan Disetujui oleh Pengelola Gudang</h1>
                            <p className='py-4'>Ini adalah daftar permintaan pesanan saat ini. Di sini Anda dapat memeriksa semua informasi dan menyelesaikan proses penempatan pesanan. Kemudian, harap perbarui proses pengiriman pesanan.</p>
                        </>
                    }


                </div>

                <OrderInfoTable
                allOrder={allOrder}
                ></OrderInfoTable>

                </>
            }
        </div>
    );
};

export default Order;