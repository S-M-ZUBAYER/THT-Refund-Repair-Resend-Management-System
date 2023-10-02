import React, { useContext, useState } from 'react';
import RefundRequestForm from '../RefundPage/RefundRequestForm';
import RefundRequestList from '../RefundPage/RefundRequestList';
import Hero from '../../SharePage/Hero';
import Warehouse from '../RefundPage/Warehouse';
import { AuthContext } from '../../../context/UserContext';
import LeaderStatus from '../RefundPage/LeaderStatus';
import WarehouseManager from '../RefundPage/WarehouseManager';
import Finance from '../RefundPage/Finance';
import StatusBar from '../RefundPage/StatusBar';
import ResendForm from './ResendForm';

const Resend = () => {

    const { user,selectedLanguage } = useContext(AuthContext)


    return (

        <div className='max-w-[1240px] mx-auto py-16 px-4 text-center'>
            {user?.role === "~Customer-Service~" && <>
            <div>
  <h1>
    {selectedLanguage === "zh-CN" && "请填写重新发送/再次发货表格"}
    {selectedLanguage === "en-US" && "Please Complete the Resend/Shipped Again Form"}
    {selectedLanguage === "fil-PH" && "Paki-kumpletuhin ang Porma ng Pagpapadala Ipinadala Ipinadala Ipinadala Muli"}
    {selectedLanguage === "ms-MY" && "Sila Lengkapkan Borang Penghantaran Semula/Dihantar Semula"}
    {selectedLanguage === "th-TH" && "โปรดกรอกแบบฟอร์มการส่งคืน/การส่งสินค้าอีกครั้ง"}
    {selectedLanguage === "vi-VN" && "Vui lòng điền đầy đủ thông tin vào biểu mẫu Gửi lại/Gửi lại"}
    {selectedLanguage === "id-ID" && "Silakan Isi Formulir Pengiriman Ulang/Kirim Ulang dengan Teliti"}
  </h1>
  <p className='py-4'>
    {selectedLanguage === "zh-CN" && "请仔细填写所有信息并提交，以开始获得来自~客户服务主管~的批准。"}
    {selectedLanguage === "en-US" && "Please fill all of the information carefully and submit to start the next step to get the approval from ~Customer-Service-Leader~."}
    {selectedLanguage === "fil-PH" && "Mangyaring punan ang lahat ng impormasyon nang maingat at i-submit upang simulan ang susunod na hakbang upang makuha ang pahintulot mula sa ~Customer-Service-Leader~."}
    {selectedLanguage === "ms-MY" && "Sila isikan semua maklumat dengan teliti dan hantar untuk memulakan langkah seterusnya untuk mendapatkan kelulusan daripada ~Pemimpin Perkhidmatan Pelanggan~."}
    {selectedLanguage === "th-TH" && "โปรดกรอกข้อมูลทั้งหมดโดยรอบและส่งเพื่อเริ่มขั้นตอนถัดไปในการขออนุมัติจาก ~ ผู้นำบริการลูกค้า ~"}
    {selectedLanguage === "vi-VN" && "Vui lòng điền đầy đủ tất cả thông tin và gửi để bắt đầu bước tiếp theo để nhận được sự phê duyệt từ ~Chỉ huy Dịch vụ Khách hàng~."}
    {selectedLanguage === "id-ID" && "Harap isi semua informasi dengan cermat dan kirim untuk memulai langkah berikutnya untuk mendapatkan persetujuan dari ~Pemimpin Layanan Pelanggan~."}
  </p>
</div>

                <ResendForm></ResendForm>


                <div className="mt-16 mb-5">
                    <h1>Show The List Available Refund Request</h1>
                    <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information. </p>
                </div>
                <RefundRequestList></RefundRequestList>
            </>}

            {
                user?.role === "Warehouse" && <> <div className="mt-16 mb-5">
                    <h1>Requests Need To Approved By Warehouse Man</h1>
                    <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information.And then please approved their refund request.  </p>
                </div>

                    <Warehouse></Warehouse></>
            }

            {
                user?.role === "~Customer-Service-Leader~" && <> <div className="mt-16 mb-5">
                    <h1>Requests Need To Approved By ~Customer-Service-Leader~</h1>
                    <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information.And then please approved their refund request.  </p>
                </div>

                    <LeaderStatus></LeaderStatus> </>
            }

            {
                user?.role === "~Warehouse-Manager~" && <> <div className="mt-16 mb-5">
                    <h1>Requests Need To Approved By ~Warehouse-Manager~</h1>
                    <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information.And then please approved their refund request.  </p>
                </div>

                    <WarehouseManager></WarehouseManager> </>
            }

            {
                user?.role === "Finance" && <> <div className="mt-16 mb-5">
                    <h1>Requests Need To Approved By Finance</h1>
                    <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information.And then please approved their refund request.  </p>
                </div>

                    <Finance></Finance> </>
            }

            <div className="mt-32 mb-5">
                <hr className='border-2 border-gray-800 my-5'></hr>
                <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">Refund Request Status Bar</span></h1>
                <p className='py-4'>These are all the list of special refund request at these moment. Here you can see the current condition of any request. And also you can check all the information about the refund request.  </p>
            </div>

            {/* <StatusBar></StatusBar> */}

        </div>
    );
};

export default Resend;