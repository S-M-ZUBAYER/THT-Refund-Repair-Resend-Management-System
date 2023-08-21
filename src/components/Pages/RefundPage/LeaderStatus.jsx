
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
// Import the correct DisplaySpinner component based on its actual location
import DisplaySpinner from '../../Loading/DisplaySpinner';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';
import { Link } from 'react-router-dom';

const LeaderStatus = () => {

    const [loading, setLoading] = useState(false);
    const [allLeaderRequest, setAllLeaderRequest] = useState([]);
    const [allSpecialRequest, setAllSpecialRequest] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchAllQuery, setSearchAllQuery] = useState('');

    const { selectedLanguage, user } = useContext(AuthContext)

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleSearchAllChange = (event) => {
        setSearchAllQuery(event.target.value);
    };

    const filteredAllRequests = allLeaderRequest.filter((request) =>
        request.customerUserName.toLowerCase().includes(searchAllQuery.toLowerCase()) ||
        request.customerReturnTrackingNumber.toLowerCase().includes(searchAllQuery.toLowerCase()) ||
        request.customerPhoneNo.toLowerCase().includes(searchAllQuery.toLowerCase()) ||
        request.customerOrderNumber.toLowerCase().includes(searchAllQuery.toLowerCase())
    );

    const filteredSpecialRequests = allSpecialRequest.filter((request) =>
        request.customerUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.customerReturnTrackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.customerPhoneNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.customerOrderNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://grozziie.zjweiting.com:8035/tht/LeaderStatusRequest');
            const data = response.data;

            const response1 = await axios.get('https://grozziie.zjweiting.com:8035/tht/shopDetails');
            const data1 = response1.data;
          

            const filteredLeaderData = data.filter(everyData => {
                const leaderList = data1.filter(everyData1 => {
                    return everyData1.shopName === everyData.shopName && everyData1.CustomerServiceLeader === user.name;
                }); 
                return leaderList.length > 0;
            });    
            const modifiedLeaderData = filteredLeaderData.map(everyData => {
                return everyData;
            });
            
            setAllLeaderRequest(modifiedLeaderData);
            

        
            // const getShop = data1.map(everyData => everyData.shopName)
            // const getShopService = data.map(everyData => everyData.shopName)
            // const getShopLeaderName = data1.map(everyData => everyData.CustomerServiceLeader);
            // console.log(getShopLeaderName, "leader name")
            // // const getLeager = data1.map(everyData=>everyData.shopName.map(everyData=>))
            // console.log(getShopService, "1111")
            // for (var i = 0; i < getShop.length; i++) {
            //     //console.log(getShop[i],i,"getshop")
            //     for (var j = 0; j < getShopService.length; j++) {
            //         //console.log(getShopService[j],j,"getShopService")
            //         if (getShop[i] === getShopService[j]) {
            //             console.log("zubersuccessed", data1, getShop[i])
            //             const getShopLeaderName_Zuber = (data1?.filter(everyData => everyData?.shopName === getShop[i]));
            //             const getLeaderName = getShopLeaderName_Zuber.map(everyData => everyData.CustomerServiceLeader);
            //             console.log(getLeaderName, "check")
            //             for (var n = 0; n < getLeaderName.length; n++) {
            //                 if (getLeaderName[n] === user?.name) {
            //                     setAllLeaderRequest(data?.filter(everyData => everyData?.shopName === getShop[i]))
            //                 }
            //             }

            //             //setAllLeaderRequest()
            //         }
            //     }

            // }
            // console.log(allLeaderRequest, "leadealldskfoiadsujhfri");

            // setAllLeaderRequest()
            // console.log(data1.map(everyData => everyData.shopName))
            // console.log(data?.filter(everyData => everyData?.shopName), "lskjfjdsfsdpodif")

            // if (data?.filter(everyData => everyData?.shopName) === data1?.filter(everyData => everyData?.shopName)) {
            //     console.log(data?.filter(everyData => everyData?.shopName), "ooooooo")
            //     if (data1?.filter(everyData => everyData?.CustomerServiceLeader) === user?.name) {
            //         setAllLeaderRequest(data?.filter(everyData => everyData?.shopName) === data1?.filter(everyData => everyData?.shopName));
            //     }

            // }




            setLoading(false);
        } catch (error) {
            console.error('Error occurred during the request:', error);
            setLoading(false);
        }
    };

    const fetchSpecialData = async () => {

        try {
            setLoading(true);
            const response = await axios.get('https://grozziie.zjweiting.com:8035/tht/LeaderStatusSpecialRequest');
            const data = response.data;
            
            const response1 = await axios.get('https://grozziie.zjweiting.com:8035/tht/shopDetails');
            const data1 = response1.data;
          

            const filteredLeaderData = data.filter(everyData => {
                const leaderList = data1.filter(everyData1 => {
                    return everyData1.shopName === everyData.shopName && everyData1.CustomerServiceLeader === user.name;
                }); 
                return leaderList.length > 0;
            });    
            const modifiedLeaderData = filteredLeaderData.map(everyData => {
                return everyData;
            });
            
            setAllSpecialRequest(modifiedLeaderData);
            setLoading(false);
        } catch (error) {
            console.error('Error occurred during the request:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        fetchSpecialData();
    }, []);


    return (
        <div className="text-gray-800 w-full">
            <div className="flex justify-center">
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <input
                        type="text"
                        placeholder="Name, Tracking Number, Phone, or Order Number"
                        className="border sm:w-[350px] md:w-[420px] border-gray-300 rounded-lg py-1 px-4 mb-2 md:mr-1 md:mb-0 bg-white"
                        value={searchAllQuery}
                        onChange={handleSearchAllChange}
                    />
                    <btn

                        className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-1 px-8 rounded-md"
                        onClick={() => setSearchAllQuery('')}
                    >
                        {selectedLanguage === "en-US" && "Clear"}
                        {selectedLanguage === "zh-CN" && "清除"}
                        {selectedLanguage === "fil-PH" && "Linisin"}
                        {selectedLanguage === "ms-MY" && "Bersihkan"}
                        {selectedLanguage === "th-TH" && "ล้างข้อมูล"}
                        {selectedLanguage === "vi-VN" && "Xóa trắng"}
                        {selectedLanguage === "id-ID" && "Hapus"}
                    </btn>
                </div>
            </div>

            <table className="w-full mb-10">
                <thead className="bg-gradient-to-r from-green-300 to-yellow-300">
                    <tr className="py-2">
                        <th className="text-start pl-2 py-2"> {selectedLanguage === "en-US" && "No"}
                            {selectedLanguage === "fil-PH" && "Numero"}
                            {selectedLanguage === "ms-MY" && "Nombor"}
                            {selectedLanguage === "th-TH" && "หมายเลข"}
                            {selectedLanguage === "vi-VN" && "Số"}
                            {selectedLanguage === "id-ID" && "Nomor"}
                            {selectedLanguage === "zh-CN" && "编号"}</th>
                        <th className="text-start pl-2 py-2">{selectedLanguage === "en-US" && "Order Number"}
                            {selectedLanguage === "fil-PH" && "Numero ng Order"}
                            {selectedLanguage === "ms-MY" && "Nombor Pesanan"}
                            {selectedLanguage === "th-TH" && "หมายเลขคำสั่งซื้อ"}
                            {selectedLanguage === "vi-VN" && "Mã Đơn Hàng"}
                            {selectedLanguage === "id-ID" && "Nomor Pesanan"}
                            {selectedLanguage === "zh-CN" && "订单编号"}</th>
                        <th className="text-start pl-2 py-2"> {selectedLanguage === "en-US" && "Customer Name"}
                            {selectedLanguage === "fil-PH" && "Pangalan ng Customer"}
                            {selectedLanguage === "ms-MY" && "Nama Pelanggan"}
                            {selectedLanguage === "th-TH" && "ชื่อลูกค้า"}
                            {selectedLanguage === "vi-VN" && "Tên Khách Hàng"}
                            {selectedLanguage === "id-ID" && "Nama Pelanggan"}
                            {selectedLanguage === "zh-CN" && "客户名称"}</th>
                        <th className="text-start py-2">{selectedLanguage === "en-US" && "Customer Order Number"}
                            {selectedLanguage === "zh-CN" && "客户订单号"}
                            {selectedLanguage === "fil-PH" && "Numero ng Order ng Customer"}
                            {selectedLanguage === "ms-MY" && "Nombor Pesanan Pelanggan"}
                            {selectedLanguage === "th-TH" && "หมายเลขคำสั่งซื้อของลูกค้า"}
                            {selectedLanguage === "vi-VN" && "Số Đơn đặt hàng của Khách hàng"}
                            {selectedLanguage === "id-ID" && "Nomor Pesanan Pelanggan"}
                        </th>
                        <th className="text-start py-2">{selectedLanguage === "en-US" && "Tracking Number"}
                            {selectedLanguage === "fil-PH" && "Numero ng Pagmamanman"}
                            {selectedLanguage === "ms-MY" && "Nombor Pengesanan"}
                            {selectedLanguage === "th-TH" && "หมายเลขการติดตาม"}
                            {selectedLanguage === "vi-VN" && "Số Đơn Hàng"}
                            {selectedLanguage === "id-ID" && "Nomor Lacak"}
                            {selectedLanguage === "zh-CN" && "追踪编号"}</th>
                        <th className="text-start hidden md:block py-2">{selectedLanguage === "en-US" && "Order Date"}
                            {selectedLanguage === "fil-PH" && "Petsa ng Order"}
                            {selectedLanguage === "ms-MY" && "Tarikh Pesanan"}
                            {selectedLanguage === "th-TH" && "วันที่คำสั่งซื้อ"}
                            {selectedLanguage === "vi-VN" && "Ngày Đặt Hàng"}
                            {selectedLanguage === "id-ID" && "Tanggal Pemesanan"}
                            {selectedLanguage === "zh-CN" && "订单日期"}</th>

                        <th className="text-start py-2">
                            {selectedLanguage === "en-US" && "Details"}
                            {selectedLanguage === "zh-CN" && "详情"}

                            {selectedLanguage === "fil-PH" && "Detalye"}
                            {selectedLanguage === "ms-MY" && "Butiran"}
                            {selectedLanguage === "th-TH" && "รายละเอียด"}
                            {selectedLanguage === "vi-VN" && "Chi tiết"}
                            {selectedLanguage === "id-ID" && "Rincian"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <div>
                            <DisplaySpinner></DisplaySpinner>
                        </div>
                    ) : (
                        filteredAllRequests.length !== 0 &&
                        filteredAllRequests?.map((request, index) => (
                            <tr key={request.orderNumber} className="my-5">
                                <td className="text-start pl-2 py-2 font-semibold">{index + 1}</td>
                                <td className="text-start pl-2 py-2 font-semibold">{request?.orderNumber}</td>
                                <td className="text-start py-2">{request?.customerUserName}</td>
                                <td className="text-start pl-2 py-2 font-semibold">{request?.customerOrderNumber}</td>
                                <td className="text-start py-2">{request?.customerReturnTrackingNumber}</td>
                                <td className="text-start hidden md:block py-2">{request?.orderDate}</td>



                                <td className="text-start py-2 cursor-pointer">
                                    <Link to={`/refund/details/${request?.orderNumber}`}>
                                        <btn className="bg-lime-200 rounded-tl-lg rounded-br-lg px-5 py-1">{selectedLanguage === "en-US" && "Details"}
                                            {selectedLanguage === "zh-CN" && "详情"}
                                            {selectedLanguage === "fil-PH" && "Detalye"}
                                            {selectedLanguage === "ms-MY" && "Butiran"}
                                            {selectedLanguage === "th-TH" && "รายละเอียด"}
                                            {selectedLanguage === "vi-VN" && "Chi tiết"}
                                            {selectedLanguage === "id-ID" && "Rincian"}</btn>
                                    </Link>
                                </td>



                            </tr>
                        ))
                    )}
                </tbody>
            </table>



            <div className="mt-32 mb-5">
                <hr className='border-2 border-gray-800 my-5'></hr>
                <h1>
                    <span className="bg-gradient-to-r from-blue-800 to-red-800 text-transparent bg-clip-text">
                        {selectedLanguage === "en-US" && "Special Requests"}
                        {selectedLanguage === "zh-CN" && "特殊要求"}
                        {selectedLanguage === "fil-PH" && "Mga Special Requests"}
                        {selectedLanguage === "ms-MY" && "Permintaan Khas"}
                        {selectedLanguage === "th-TH" && "คำขอพิเศษ"}
                        {selectedLanguage === "vi-VN" && "Yêu cầu Đặc biệt"}
                        {selectedLanguage === "id-ID" && "Permintaan Khusus"}
                    </span>{" "}
                    {selectedLanguage === "en-US" && "Need To Approved By ~Customer-Service-Leader~"}
                    {selectedLanguage === "zh-CN" && "需要由客户服务主管批准"}
                    {selectedLanguage === "fil-PH" && "Kailangang Aproba ng ~Customer-Service-Leader~"}
                    {selectedLanguage === "ms-MY" && "Perlu Diluluskan Oleh Ketua Perkhidmatan Pelanggan"}
                    {selectedLanguage === "th-TH" && "ต้องได้รับการอนุมัติจากผู้นำการบริการลูกค้า"}
                    {selectedLanguage === "vi-VN" && "Cần phê duyệt bởi Người đứng đầu Dịch vụ Khách hàng"}
                    {selectedLanguage === "id-ID" && "Perlu Disetujui Oleh Pemimpin Layanan Pelanggan"}
                </h1>
                <p className="py-4">
                    {selectedLanguage === "en-US" &&
                        "These are all the list of special refund request at these moment. Here you can check and update the special refund request information.And then please approved their refund request as soon as possible."}
                    {selectedLanguage === "zh-CN" &&
                        "这些是当前所有特殊退款请求的列表。在这里，您可以查看和更新特殊退款请求信息。然后，请尽快批准他们的退款请求。"}

                    {selectedLanguage === "fil-PH" &&
                        "Ito ay ang listahan ng mga espesyal na kahilingan para sa refund sa ngayon. Dito, maaari mong tingnan at i-update ang impormasyon sa kahilingan para sa refund. At pagkatapos, pakipagtibay ang kanilang kahilingan para sa refund sa lalong madaling panahon."}
                    {selectedLanguage === "ms-MY" &&
                        "Ini adalah senarai permintaan pembayaran balik istimewa pada masa ini. Di sini anda boleh menyemak dan mengemas kini maklumat permintaan pembayaran balik istimewa. Dan kemudian sila perlu diluluskan permintaan pembayaran balik mereka dengan secepat mungkin."}
                    {selectedLanguage === "th-TH" &&
                        "นี่คือรายการของคำขอคืนเงินที่พิเศษในขณะนี้ คุณสามารถตรวจสอบและอัปเดตข้อมูลคำขอคืนเงินที่พิเศษที่นี่ และจากนั้นกรุณาอนุมัติคำขอคืนเงินของพวกเขาโดยเร็วที่สุด"}
                    {selectedLanguage === "vi-VN" &&
                        "Đây là danh sách các yêu cầu hoàn tiền đặc biệt hiện tại. Ở đây, bạn có thể kiểm tra và cập nhật thông tin yêu cầu hoàn tiền đặc biệt. Và sau đó, hãy phê duyệt yêu cầu hoàn tiền của họ càng sớm càng tốt."}
                    {selectedLanguage === "id-ID" &&
                        "Berikut adalah daftar permintaan pengembalian dana khusus pada saat ini. Di sini Anda dapat memeriksa dan memperbarui informasi permintaan pengembalian dana khusus. Dan kemudian, tolong setujui permintaan pengembalian dana mereka sesegera mungkin."}
                </p>

            </div>

            <div className="flex justify-center">
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <input
                        type="text"
                        placeholder="Name, Tracking Number, Phone, or Order Number"
                        className="border sm:w-[350px] md:w-[420px] border-gray-300 rounded-lg py-1 px-4 mb-2 md:mr-1 md:mb-0 bg-white"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <btn

                        className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-1 px-8 rounded-md"
                        onClick={() => setSearchQuery('')}
                    >
                        {selectedLanguage === "en-US" && "Clear"}
                        {selectedLanguage === "zh-CN" && "清除"}
                        {selectedLanguage === "fil-PH" && "Linisin"}
                        {selectedLanguage === "ms-MY" && "Bersihkan"}
                        {selectedLanguage === "th-TH" && "ล้างข้อมูล"}
                        {selectedLanguage === "vi-VN" && "Xóa trắng"}
                        {selectedLanguage === "id-ID" && "Hapus"}
                    </btn>
                </div>
            </div>


            <table className="w-full mb-10">
                <thead className="bg-gradient-to-r from-green-300 to-yellow-300">
                    <tr className="py-2">
                        <th className="text-start pl-2 py-2">{selectedLanguage === "en-US" && "No"}
                            {selectedLanguage === "fil-PH" && "Numero"}
                            {selectedLanguage === "ms-MY" && "Tiada"}
                            {selectedLanguage === "th-TH" && "ไม่มี"}
                            {selectedLanguage === "vi-VN" && "Không có"}
                            {selectedLanguage === "id-ID" && "Tidak ada"}
                            {selectedLanguage === "zh-CN" && "编号"}</th>
                        <th className="text-start pl-2 py-2">{selectedLanguage === "en-US" && "Order Number"}
                            {selectedLanguage === "fil-PH" && "Numero ng Order"}
                            {selectedLanguage === "ms-MY" && "Nombor Pesanan"}
                            {selectedLanguage === "th-TH" && "หมายเลขคำสั่งซื้อ"}
                            {selectedLanguage === "vi-VN" && "Số đơn hàng"}
                            {selectedLanguage === "id-ID" && "Nomor Pesanan"}
                            {selectedLanguage === "zh-CN" && "订单编号"}</th>
                        <th className="text-start pl-2 py-2">{selectedLanguage === "en-US" && "Customer Name"}
                            {selectedLanguage === "fil-PH" && "Pangalan ng Customer"}
                            {selectedLanguage === "ms-MY" && "Nama Pelanggan"}
                            {selectedLanguage === "th-TH" && "ชื่อลูกค้า"}
                            {selectedLanguage === "vi-VN" && "Tên khách hàng"}
                            {selectedLanguage === "id-ID" && "Nama Pelanggan"}
                            {selectedLanguage === "zh-CN" && "客户名称"}</th>
                        <th className="text-start py-2"> {selectedLanguage === "en-US" && "Tracking Number"}
                            {selectedLanguage === "fil-PH" && "Numero ng Paggamit"}
                            {selectedLanguage === "ms-MY" && "Nombor Penjejakkan"}
                            {selectedLanguage === "th-TH" && "หมายเลขการติดตาม"}
                            {selectedLanguage === "vi-VN" && "Số lượng theo dõi"}
                            {selectedLanguage === "id-ID" && "Nomor Pelacakan"}
                            {selectedLanguage === "zh-CN" && "追踪号码"}</th>
                        <th className="text-start py-2"> {selectedLanguage === "en-US" && "Customer Order Number"}
                            {selectedLanguage === "zh-CN" && "客户订单号"}
                            {selectedLanguage === "fil-PH" && "Numero ng Order ng Customer"}
                            {selectedLanguage === "ms-MY" && "Nombor Pesanan Pelanggan"}
                            {selectedLanguage === "th-TH" && "หมายเลขคำสั่งซื้อของลูกค้า"}
                            {selectedLanguage === "vi-VN" && "Số Đơn đặt hàng của Khách hàng"}
                            {selectedLanguage === "id-ID" && "Nomor Pesanan Pelanggan"}</th>
                        <th className="text-start hidden md:block py-2">{selectedLanguage === "en-US" && "Order Date"}
                            {selectedLanguage === "fil-PH" && "Petsa ng Order"}
                            {selectedLanguage === "ms-MY" && "Tarikh Pesanan"}
                            {selectedLanguage === "th-TH" && "วันที่สั่งซื้อ"}
                            {selectedLanguage === "vi-VN" && "Ngày đặt hàng"}
                            {selectedLanguage === "id-ID" && "Tanggal Pesanan"}
                            {selectedLanguage === "zh-CN" && "订单日期"}</th>

                        <th className="text-start py-2">
                            {selectedLanguage === "en-US" && "Details"}
                            {selectedLanguage === "zh-CN" && "详情"}

                            {selectedLanguage === "fil-PH" && "Detalye"}
                            {selectedLanguage === "ms-MY" && "Butiran"}
                            {selectedLanguage === "th-TH" && "รายละเอียด"}
                            {selectedLanguage === "vi-VN" && "Chi tiết"}
                            {selectedLanguage === "id-ID" && "Rincian"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <div>
                            <DisplaySpinner></DisplaySpinner>
                        </div>
                    ) : (
                        filteredSpecialRequests.length !== 0 &&
                        filteredSpecialRequests?.map((request, index) => (
                            <tr key={request.orderNumber} className="my-5">
                                <td className="text-start pl-2 py-2 font-semibold">{index + 1}</td>
                                <td className="text-start pl-2 py-2 font-semibold">{request?.orderNumber}</td>
                                <td className="text-start py-2">{request?.customerUserName}</td>
                                <td className="text-start pl-2 py-2 font-semibold">{request?.customerOrderNumber}</td>
                                <td className="text-start py-2">{request?.customerReturnTrackingNumber}</td>
                                <td className="text-start hidden md:block py-2">{request?.orderDate}</td>
                                <td className="text-start py-2 cursor-pointer">
                                    <Link to={`/refund/details/${request?.orderNumber}`}>
                                        <btn className="bg-lime-200 rounded-tl-lg rounded-br-lg px-5 py-1">{selectedLanguage === "en-US" && "Details"}
                                            {selectedLanguage === "zh-CN" && "详情"}
                                            {selectedLanguage === "fil-PH" && "Detalye"}
                                            {selectedLanguage === "ms-MY" && "Butiran"}
                                            {selectedLanguage === "th-TH" && "รายละเอียด"}
                                            {selectedLanguage === "vi-VN" && "Chi tiết"}
                                            {selectedLanguage === "id-ID" && "Rincian"}</btn>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>


        </div>
    );
};

export default LeaderStatus;

