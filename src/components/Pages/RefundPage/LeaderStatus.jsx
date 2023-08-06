
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
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editingRequest, setEditingRequest] = useState(null);
    const [allLeaderRequest, setAllLeaderRequest] = useState([]);
    const [allSpecialRequest, setAllSpecialRequest] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchAllQuery, setSearchAllQuery] = useState('');

    const { selectedLanguage } = useContext(AuthContext)

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
            const response = await axios.get('http://localhost:5000/tht/LeaderStatusRequest');
            const data = response.data;
            setAllLeaderRequest(data);
            setLoading(false);
        } catch (error) {
            console.error('Error occurred during the request:', error);
            setLoading(false);
        }
    };

    const fetchSpecialData = async () => {

        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/tht/LeaderStatusSpecialRequest');
            const data = response.data;
            setAllSpecialRequest(data)
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

    const deleteRequest = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this product information?');
        if (!confirmed) {
            return; // Cancel the deletion if the user clicks Cancel or closes the modal
        }
        try {
            await axios.delete(`http://localhost:5000/tht/refundRequest/delete/${id}`);
            toast.success('Refund Product deleted successfully');
            setAllLeaderRequest((prevRequests) => prevRequests.filter((request) => request?.id !== id));
            setAllSpecialRequest((prevRequests) => prevRequests.filter((request) => request?.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user');
        }
    };

    const openEditModal = (refundRequest) => {
        setEditingRequest(refundRequest);
        setIsModalOpen(true);
    };

    const updateRequest = async (orderNumber, editingRequest) => {
        const confirmed = window.confirm('Are you sure you want to update this product?');
        if (!confirmed) {
            return; // Cancel the deletion if the user clicks Cancel or closes the modal
        }
        try {
            const response = await axios.put(`http://localhost:5000/tht/refundRequest/update/${orderNumber}`, editingRequest);
            toast.success('User information updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user');
        }
    };

    const updateLeaderStatus = async (orderNumber) => {
        const confirmed = window.confirm('Are you sure you want to approved this refund request?');
        if (!confirmed) {
            return; // Cancel the deletion if the user clicks Cancel or closes the modal
        }
        try {
            const response = await axios.put(
                `http://localhost:5000/tht/updateLeaderStatus/${orderNumber}`
            );

            if (response.status === 200) {
                setAllLeaderRequest((prevRequests) =>
                    prevRequests.map((request) => {
                        if (request.orderNumber === orderNumber) {
                            return { ...request, warehouseStatus: true };
                        }
                        return request;
                    })
                );
                // Update the button's className and innerText
                const warehouseStatusBtn = document.getElementById(`warehouseStatusBtn${orderNumber}`);
                if (warehouseStatusBtn) {
                    warehouseStatusBtn.className = "bg-lime-200 px-5 rounded-tl-lg rounded-br-lg py-1";
                    warehouseStatusBtn.innerText = "Done";
                }
                toast.success('Customer service Leader status updated successfully');
            } else {
                toast.error('Failed to update warehouse status');
            }
        } catch (error) {
            console.error('Error updating service Leader status:', error);
            toast.error('Failed to update service Leader status');
        }
    };


    const saveRequest = (orderNumber, updatedRequest) => {
        updateRequest(orderNumber, updatedRequest);
        setAllLeaderRequest((prevRequests) =>
            prevRequests.map((request) => (request.orderNumber === orderNumber ? updatedRequest : request))
        );
        setAllSpecialRequest((prevRequests) =>
            prevRequests.map((request) => (request.orderNumber === orderNumber ? updatedRequest : request))
        );

        setEditingRequest(null);
    };



    return (
        <div className="text-gray-800 w-full">
            <div className="flex justify-center">
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search by Customer Name, Tracking Number, Phone Number, or Order Number"
                        className="border border-gray-300 rounded-lg py-1 px-4 mb-2 md:mr-1 md:mb-0 bg-white"
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
                        <th className="text-start py-2">{selectedLanguage === "en-US" && "Status"}
                            {selectedLanguage === "fil-PH" && "Katayuan"}
                            {selectedLanguage === "ms-MY" && "Status"}
                            {selectedLanguage === "th-TH" && "สถานะ"}
                            {selectedLanguage === "vi-VN" && "Trạng Thái"}
                            {selectedLanguage === "id-ID" && "Status"}
                            {selectedLanguage === "zh-CN" && "状态"}</th>
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
                                <td className="text-start py-2">{request?.customerReturnTrackingNumber}</td>
                                <td className="text-start hidden md:block py-2">{request?.orderDate}</td>
                                <td className="text-start py-2">
                                    {request?.customerServiceLeaderStatus === true ? (
                                        <btn className="bg-lime-200 rounded-tl-lg rounded-br-lg px-5 py-1">{selectedLanguage === "en-US" && "Done"}
                                            {selectedLanguage === "fil-PH" && "Tapos na"}
                                            {selectedLanguage === "ms-MY" && "Selesai"}
                                            {selectedLanguage === "th-TH" && "เสร็จสิ้น"}
                                            {selectedLanguage === "vi-VN" && "Hoàn tất"}
                                            {selectedLanguage === "id-ID" && "Selesai"}
                                            {selectedLanguage === "zh-CN" && "完成"}</btn>
                                    ) : (
                                        <btn
                                            onClick={() => updateLeaderStatus(request?.orderNumber)}
                                            id={`warehouseStatusBtn${request?.orderNumber}`}
                                            className="bg-red-300 rounded-tl-lg rounded-br-lg px-2 py-1 hover:cursor-pointer"
                                        >
                                            {selectedLanguage === "en-US" && "Approve"}
                                            {selectedLanguage === "fil-PH" && "Aprobado"}
                                            {selectedLanguage === "ms-MY" && "Lulus"}
                                            {selectedLanguage === "th-TH" && "อนุมัติ"}
                                            {selectedLanguage === "vi-VN" && "Phê Duyệt"}
                                            {selectedLanguage === "id-ID" && "Setuju"}
                                            {selectedLanguage === "zh-CN" && "批准"}
                                        </btn>
                                    )}
                                </td>


                                <Link to={`/refund/details/${request?.orderNumber}`}>
                                    <td className="text-start py-2 cursor-pointer">
                                        <btn className="bg-lime-200 rounded-tl-lg rounded-br-lg px-5 py-1">{selectedLanguage === "en-US" && "Details"}
                                            {selectedLanguage === "zh-CN" && "详情"}
                                            {selectedLanguage === "fil-PH" && "Detalye"}
                                            {selectedLanguage === "ms-MY" && "Butiran"}
                                            {selectedLanguage === "th-TH" && "รายละเอียด"}
                                            {selectedLanguage === "vi-VN" && "Chi tiết"}
                                            {selectedLanguage === "id-ID" && "Rincian"}</btn>
                                    </td>
                                </Link>



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
                        placeholder="Search by Customer Name, Tracking Number, Phone Number, or Order Number"
                        className="border border-gray-300 rounded-lg py-1 px-4 mb-2 md:mr-1 md:mb-0 bg-white"
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
                        <th className="text-start hidden md:block py-2">{selectedLanguage === "en-US" && "Order Date"}
                            {selectedLanguage === "fil-PH" && "Petsa ng Order"}
                            {selectedLanguage === "ms-MY" && "Tarikh Pesanan"}
                            {selectedLanguage === "th-TH" && "วันที่สั่งซื้อ"}
                            {selectedLanguage === "vi-VN" && "Ngày đặt hàng"}
                            {selectedLanguage === "id-ID" && "Tanggal Pesanan"}
                            {selectedLanguage === "zh-CN" && "订单日期"}</th>
                        <th className="text-start py-2">{selectedLanguage === "en-US" && "Status"}
                            {selectedLanguage === "fil-PH" && "Katayuan"}
                            {selectedLanguage === "ms-MY" && "Status"}
                            {selectedLanguage === "th-TH" && "สถานะ"}
                            {selectedLanguage === "vi-VN" && "Trạng thái"}
                            {selectedLanguage === "id-ID" && "Status"}
                            {selectedLanguage === "zh-CN" && "状态"}</th>
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
                                <td className="text-start py-2">{request?.customerReturnTrackingNumber}</td>
                                <td className="text-start hidden md:block py-2">{request?.orderDate}</td>
                                <td className="text-start py-2">
                                    {request?.customerServiceLeaderStatus === true ? (
                                        <btn className="bg-lime-200 rounded-tl-lg rounded-br-lg px-5 py-1">Done</btn>
                                    ) : (
                                        <btn
                                            onClick={() => updateLeaderStatus(request?.orderNumber)}
                                            id={`warehouseStatusBtn${request?.orderNumber}`}
                                            className="bg-red-300 rounded-tl-lg rounded-br-lg px-2 py-1 hover:cursor-pointer"
                                        >
                                            Approve
                                        </btn>
                                    )}
                                </td>
                                <Link to={`/refund/details/${request?.orderNumber}`}>
                                    <td className="text-start py-2 cursor-pointer">
                                        <btn className="bg-lime-200 rounded-tl-lg rounded-br-lg px-5 py-1">{selectedLanguage === "en-US" && "Details"}
                                            {selectedLanguage === "zh-CN" && "详情"}
                                            {selectedLanguage === "fil-PH" && "Detalye"}
                                            {selectedLanguage === "ms-MY" && "Butiran"}
                                            {selectedLanguage === "th-TH" && "รายละเอียด"}
                                            {selectedLanguage === "vi-VN" && "Chi tiết"}
                                            {selectedLanguage === "id-ID" && "Rincian"}</btn>
                                    </td>
                                </Link>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* modal part start from here to update a user information */}
            {editingRequest && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 w-7/12 mx-auto">
                        <h2 className="text-lg font-bold mb-1bg-gradient-to-r from-green-300 to-yellow-300">Edit Refund Request Information</h2>


                        <div className="border-2 p-5  border-cyan-400">

                            <div className="mb-1 flex justify-between items-center">
                                <label htmlFor="customerOrderNumber">Customer User Name:</label> <input
                                    type="text"
                                    placeholder="customer User Name"
                                    value={editingRequest.customerUserName}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, customerUserName: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                /> </div>


                            <div className="mb-1 flex justify-between items-center">
                                <label htmlFor="customerOrderNumber">Shope Name:</label> <input
                                    type="text"
                                    placeholder="Shop Name"
                                    value={editingRequest.shopName}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, shopName: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                />
                            </div>


                            <div className="mb-1 flex justify-between items-center">
                                <label htmlFor="customerOrderNumber">Customer Bank Name:</label> <input
                                    type="text"
                                    placeholder="customer Bank Name"
                                    value={editingRequest.customerBankName}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, customerBankName: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                /> </div>

                            <div className="mb-1 flex justify-between items-center">
                                <label htmlFor="customerOrderNumber">Bank Account Name:</label>
                                <input
                                    type="text"
                                    placeholder="Customer Bank Account Name"
                                    value={editingRequest.customerBankAccountName}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, customerBankAccountName: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                />
                            </div>


                            <div className="mb-1 flex justify-between items-center">
                                <label htmlFor="customerOrderNumber">Customer Bank Swift:</label> <input
                                    type="text"
                                    placeholder="customer Bank Swift"
                                    value={editingRequest.customerBankSwift}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, customerBankSwift: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                /> </div>

                            <div className="mb-1 flex justify-between items-center">
                                <label htmlFor="customerOrderNumber">Customer Order Number:</label>
                                <input
                                    type="text"
                                    placeholder="Customer Order Number"
                                    value={editingRequest.customerOrderNumber}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, customerOrderNumber: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                />
                            </div>

                            <div className="mb-1 flex justify-between items-center">
                                <label htmlFor="customerOrderNumber">Customer Receiving Account:</label> <input
                                    type="text"
                                    placeholder="customer Receiving Account"
                                    value={editingRequest.customerReceivingAccount}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, customerReceivingAccount: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                /> </div>
                            <div className="mb-1 flex justify-between items-center">
                                <label htmlFor="customerOrderNumber">Customer Receiving Amount:</label>
                                <input
                                    type="text"
                                    placeholder="customer Receiving Amount"
                                    value={editingRequest.customerReceivingAmount}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, customerReceivingAmount: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                /> </div>


                            <div className="mb-1 flex justify-between items-center">
                                <label htmlFor="customerOrderNumber">Return Tracking Number:</label>
                                <input
                                    type="text"
                                    placeholder="Customer Return Tracking Number"
                                    value={editingRequest.customerReturnTrackingNumber}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, customerReturnTrackingNumber: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                />
                            </div>


                            <div className="mb-1 flex justify-between items-center">
                                <label htmlFor="customerOrderNumber">Order Amount:</label> <input
                                    type="text"
                                    placeholder="Order Amount"
                                    value={editingRequest.orderAmount}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, orderAmount: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                /> </div>


                            <div className="mb-1 flex justify-between items-center">
                                <label htmlFor="customerOrderNumber">Refund Amount:</label> <input
                                    type="text"
                                    placeholder="Refund Amount"
                                    value={editingRequest.refundAmount}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, refundAmount: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                /> </div>


                            <div className="mb-1 flex justify-between items-center">
                                <label htmlFor="customerOrderNumber">Refund Reason:</label> <input
                                    type="text"
                                    placeholder="Refund Reason"
                                    value={editingRequest.refundReason}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, refundReason: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                /> </div>

                            {/* Add other input fields for the remaining form data */}
                            <div className="flex justify-between items-center mb-5">
                                <label htmlFor="customerOrderNumber">Other Reason:</label> <input
                                    type="text"
                                    placeholder="Other Reason"
                                    value={editingRequest.otherReason}
                                    onChange={(e) => setEditingRequest({ ...editingRequest, otherReason: e.target.value })}
                                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                                /> </div>

                            {/* <div className="flex items-center justify-end space-x-2 my-3 hover:cursor-pointer">
                                <input
                                    type="radio"
                                    id="specialOption"
                                    checked={editingRequest?.special}
                                    onClick={() => handleOptionChange(editingRequest?.special)}
                                    className={`appearance-none hover:cursor-pointer h-4 w-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${editingRequest?.special==="1" ? 'bg-black' : ''
                                        }`}
                                />
                                <label
                                    htmlFor="specialOption"
                                    className={`px-2 py-1 rounded-md hover:cursor-pointer `}
                                >
                                    Special
                                </label>
                            </div> */}

                            {/* Add other input fields for the remaining form data */}
                            {/* <input ... /> */}

                            <btn
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:cursor-pointer"
                                onClick={() => saveRequest(editingRequest.orderNumber, editingRequest)}
                            >
                                Update
                            </btn>
                            <btn
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-2 hover:cursor-pointer"
                                onClick={() => setEditingRequest(null)}
                            >
                                Cancel
                            </btn>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaderStatus;

