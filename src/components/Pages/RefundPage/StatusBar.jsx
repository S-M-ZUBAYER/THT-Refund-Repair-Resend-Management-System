
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
// Import the correct DisplaySpinner component based on its actual location
import DisplaySpinner from '../../Loading/DisplaySpinner';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/UserContext';

const StatusBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editingRequest, setEditingRequest] = useState(null);
    const [allWarehouseRequest, setAllWarehouseRequest] = useState([]);
    const [allWarehouseSpecialRequest, setAllWarehouseSpecialRequest] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchAllQuery, setSearchAllQuery] = useState('');
    const {selectedLanguage}=useContext(AuthContext)

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleSearchAllChange = (event) => {
        setSearchAllQuery(event.target.value);
    };

    const filteredSpecialRequests = allWarehouseSpecialRequest.filter((request) =>
        request.customerReturnTrackingNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredAllRequests = allWarehouseRequest.filter((request) =>
        request.customerReturnTrackingNumber.toLowerCase().includes(searchAllQuery.toLowerCase())
    );




    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://grozziie.zjweiting.com:8035/tht/allNonSpecialRequest');
            const data = response.data;
            console.log(data); // You can process the data as needed
            setAllWarehouseRequest(data);
            setLoading(false);
        } catch (error) {
            console.error('Error occurred during the request:', error);
            setLoading(false);
        }
    };

    const fetchSpecialData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://grozziie.zjweiting.com:8035/tht/allSpecialRequest');
            const data = response.data;
            console.log(data); // You can process the data as needed
            setAllWarehouseSpecialRequest(data);
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
        try {
            await axios.delete(`https://grozziie.zjweiting.com:8035/tht/refundRequest/delete/${id}`);
            toast.success('User deleted successfully');
            setAllWarehouseRequest((prevRequests) => prevRequests.filter((request) => request?.id !== id));
            setAllWarehouseSpecialRequest((prevRequests) => prevRequests.filter((request) => request?.id !== id));
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
        try {
            const response = await axios.put(`https://grozziie.zjweiting.com:8035/tht/refundRequest/update/${orderNumber}`, editingRequest);
            console.log(editingRequest)
            toast.success('User information updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user');
        }
    };



    const handleImageChange = (e) => {
        setSelectedImages(Array.from(e.target.files));
    };


    // const handleImageChange = (e) => {
    //   setSelectedImages(e.target.files);
    // };

    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            selectedImages.forEach((image) => formData.append('images', image));

            await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle success, display a message or do any other required actions
            console.log('Images uploaded successfully!');
        } catch (error) {
            // Handle error
            console.error('Error uploading images:', error);
        }
    };
    const updateWarehouseStatus = async (orderNumber) => {
        try {
            // const formData = new FormData();
            // selectedImages.forEach((image) => formData.append('images', image));

            const response = await axios.put(`https://grozziie.zjweiting.com:8035/tht/refundRequest/updateWarehouseStatus/${orderNumber}`);

            if (response.status === 200) {
                // Update the warehouse status locally in the state
                setAllWarehouseRequest((prevRefundRequest) =>
                    prevRefundRequest.map((request) => {
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

                toast.success('Warehouse status updated successfully');
            } else {
                toast.error('Failed to update warehouse status');
            }
        } catch (error) {
            console.error('Error updating warehouse status:', error);
            toast.error('Failed to update warehouse status');
        }
    };


    const saveRequest = (orderNumber, updatedRequest) => {
        updateRequest(orderNumber, updatedRequest);
        setAllWarehouseRequest((prevRequests) =>
            prevRequests.map((request) => (request.orderNumber === orderNumber ? updatedRequest : request))
        );

        setAllWarehouseSpecialRequest((prevRequests) =>
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
                        placeholder="Search by Tracking No"
                        className="border border-gray-300 rounded-lg py-1 px-4 mb-2 md:mr-1 md:mb-0 bg-white"
                        value={searchAllQuery}
                        onChange={handleSearchAllChange}
                    />
                    <btn

                        className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-1 px-8 rounded-md"
                        onClick={() => setSearchAllQuery('')}
                    >
                        Clear
                    </btn>
                </div>
            </div>

            <table className="w-full mb-10">
                <thead className="bg-gradient-to-r from-green-300 to-yellow-300">
                    <tr className="py-2">
                        <th className="text-start pl-2 py-2">No</th>
                        <th className="text-start pl-2 py-2">Customer Name</th>
                        <th className="text-start py-2">Tracking Number</th>
                        <th className="text-start pl-2 py-2">CS Leader</th>
                        <th className="text-start pl-2 py-2">warehouse</th>
                        <th className="text-start py-2">WH manager</th>
                        <th className="text-start py-2">Finance</th>
                        <th className="text-start py-2">Details</th>
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
                                <td className="text-start pl-2 py-2 font-semibold">{request?.customerUserName}</td>
                                <td className="text-start bg  py-2">{request?.customerReturnTrackingNumber}</td>
                                <td>
                                   {
                                    request?.customerServiceLeaderStatus==="true"? 
                                    <btn className="bg-gradient-to-tr from-cyan-400 to-green-400 px-2 py-1 rounded-tl-lg rounded-br-lg">Approved</btn> :
                                    <btn className="bg-gradient-to-tr from-yellow-400 to-pink-400 px-2 py-1 rounded-tl-lg rounded-br-lg">processing</btn>
                                }   
                                </td>
                                <td>
                                   {
                                    request?.wareHouseStatus==="true"? 
                                    <btn className="bg-gradient-to-tr from-cyan-400 to-green-400 px-2 py-1 rounded-tl-lg rounded-br-lg">Approved</btn> :
                                    <btn className="bg-gradient-to-tr from-yellow-400 to-pink-400 px-2 py-1 rounded-tl-lg rounded-br-lg">processing</btn>
                                }   
                                </td>
                              
                                <td>
                                   {
                                    request?.warehouseManagerStatus==="true"? 
                                    <btn className="bg-gradient-to-tr from-cyan-400 to-green-400 px-2 py-1 rounded-tl-lg rounded-br-lg">Approved</btn> :
                                    <btn className="bg-gradient-to-tr from-yellow-400 to-pink-400 px-2 py-1 rounded-tl-lg rounded-br-lg">processing</btn>
                                }   
                                </td>
                                <td>
                                   {
                                    request?.financeStatus==="true"? 
                                    <btn className="bg-gradient-to-tr from-cyan-400 to-green-400 px-2 py-1 rounded-tl-lg rounded-br-lg">Approved</btn> :
                                    <btn className="bg-gradient-to-tr from-yellow-400 to-pink-400 px-2 py-1 rounded-tl-lg rounded-br-lg">processing</btn>
                                }   
                                </td>
                                <Link to={`/refund/details/${request?.orderNumber}`}>
                                    <td className="text-start py-2 cursor-pointer">
                                        <btn className="bg-lime-200 rounded-tl-lg rounded-br-lg px-5 py-1">Details</btn>
                                    </td>
                                </Link>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>


            <div>
                <div className="mt-32 mb-5">
                    <hr className='border-2 border-gray-800 my-5'></hr>
                    {
  selectedLanguage === "zh-CN" && (
    <>
      <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">特殊退款请求</span> 状态栏</h1>
      <p className='py-4'>这些是当前所有特殊退款请求的列表。在这里，您可以查看和更新特殊退款请求的信息。然后请尽快批准他们的退款请求。</p>
    </>
  )
}
{
  selectedLanguage === "en-US" && (
    <>
      <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">Special Refund Requests</span> Status Bar</h1>
      <p className='py-4'>These are all the list of special refund request at these moment. Here you can check and update the special refund request information. And then please approve their refund request as soon as possible.</p>
    </>
  )
}
{
  selectedLanguage === "fil-PH" && (
    <>
      <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">Mga Espesyal na Kahilingan ng Refund</span> Estado ng Bar</h1>
      <p className='py-4'>Ito ang lahat ng listahan ng mga espesyal na kahilingan ng refund sa sandaling ito. Dito maaari mong tingnan at i-update ang impormasyon ng mga espesyal na kahilingan ng refund. At pagkatapos ay maaari mong aprubahan ang kanilang kahilingan ng refund sa lalong madaling panahon.</p>
    </>
  )
}
{
  selectedLanguage === "ms-MY" && (
    <>
      <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">Permintaan Refund Khas</span> Status Bar</h1>
      <p className='py-4'>Ini adalah senarai semua permintaan bayaran balik khas pada masa ini. Di sini anda boleh menyemak dan mengemaskini maklumat permintaan bayaran balik khas. Dan kemudian sila sila luluskan permintaan bayaran balik mereka secepat mungkin.</p>
    </>
  )
}
{
  selectedLanguage === "th-TH" && (
    <>
      <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">คำขอคืนเงินพิเศษ</span> แถบสถานะ</h1>
      <p className='py-4'>นี่คือรายการของคำขอคืนเงินพิเศษทั้งหมดในขณะนี้ ที่นี่คุณสามารถตรวจสอบและอัปเดตข้อมูลคำขอคืนเงินพิเศษ และจากนั้นโปรดอนุมัติคำขอคืนเงินของพวกเขาโดยเร็วที่สุด</p>
    </>
  )
}
{
  selectedLanguage === "vi-VN" && (
    <>
      <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">Yêu cầu Hoàn tiền Đặc biệt</span> Thanh trạng thái</h1>
      <p className='py-4'>Dưới đây là tất cả danh sách yêu cầu hoàn tiền đặc biệt tại thời điểm hiện tại. Ở đây bạn có thể kiểm tra và cập nhật thông tin yêu cầu hoàn tiền đặc biệt. Và sau đó, hãy phê duyệt yêu cầu hoàn tiền của họ càng sớm càng tốt.</p>
    </>
  )
}
{
  selectedLanguage === "id-ID" && (
    <>
      <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">Permintaan Pengembalian Dana Khusus</span> Status Bar</h1>
      <p className='py-4'>Ini adalah daftar semua permintaan pengembalian dana khusus pada saat ini. Di sini Anda dapat memeriksa dan memperbarui informasi permintaan pengembalian dana khusus. Dan kemudian silahkan setujui permintaan pengembalian dana mereka sesegera mungkin.</p>
    </>
  )
}

                </div>

                <div className="flex justify-center">
                    <div className="flex flex-col md:flex-row md:items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search by Tracking No"
                            className="border border-gray-300 rounded-lg py-1 px-4 mb-2 md:mr-1 md:mb-0 bg-white"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <btn

                            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-1 px-8 rounded-md"
                            onClick={() => setSearchQuery('')}
                        >
                            Clear
                        </btn>
                    </div>
                </div>


                <table className="w-full mb-10">
                    <thead className="bg-gradient-to-r from-green-300 to-yellow-300">
                        <tr className="py-2">
                            <th className="text-start pl-2 py-2">No</th>
                            <th className="text-start pl-2 py-2">Customer Name</th>
                            <th className="text-start py-2">Tracking Number</th>
                            <th className="text-start pl-2 py-2">CS Leader</th>
                            <th className="text-start pl-2 py-2">warehouse</th>
                            <th className="text-start py-2">Finance</th>
                            <th className="text-start py-2">Details</th>

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
                                <td className="text-start pl-2 py-2 font-semibold">{request?.customerUserName}</td>
                                <td className="text-start  py-2">{request?.customerReturnTrackingNumber}</td>
                                <td>
                                   {
                                    request?.customerServiceLeaderStatus==="true"? 
                                    <btn className="bg-gradient-to-tr from-cyan-400 to-green-400 px-2 py-1 rounded-tl-lg rounded-br-lg">Approved</btn> :
                                    <btn className="bg-gradient-to-tr from-yellow-400 to-pink-400 px-2 py-1 rounded-tl-lg rounded-br-lg">processing</btn>
                                }   
                                </td>
                            
                                <td>
                                   {
                                    request?.wareHouseStatus==="true"? 
                                    <btn className="bg-gradient-to-tr from-cyan-400 to-green-400 px-2 py-1 rounded-tl-lg rounded-br-lg">Approved</btn> :
                                    <btn className="bg-gradient-to-tr from-yellow-400 to-pink-400 px-2 py-1 rounded-tl-lg rounded-br-lg">processing</btn>
                                }   
                                </td>
                                <td>
                                   {
                                    request?.financeStatus==="true"? 
                                    <btn className="bg-gradient-to-tr from-cyan-400 to-green-400 px-2 py-1 rounded-tl-lg rounded-br-lg">Approved</btn> :
                                    <btn className="bg-gradient-to-tr from-yellow-400 to-pink-400 px-2 py-1 rounded-tl-lg rounded-br-lg">processing</btn>
                                }   
                                </td>
                                <Link to={`/refund/details/${request?.orderNumber}`}>
                                    <td className="text-start py-2 cursor-pointer">
                                        <btn className="bg-lime-200 rounded-tl-lg rounded-br-lg px-5 py-1">Details</btn>
                                    </td>
                                </Link>
                            </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default StatusBar;
