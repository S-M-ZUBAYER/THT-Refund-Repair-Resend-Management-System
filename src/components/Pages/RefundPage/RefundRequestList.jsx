import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { BsSignNoRightTurn } from 'react-icons/bs';
import { FcCheckmark } from 'react-icons/fc';
import DisplaySpinner from '../../Loading/DisplaySpinner';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';

const RefundProductList = ({ refundProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');





  const handleOptionChange = (special) => {
    console.log(special)
    setEditingRequest({ ...editingRequest, special: !special })
  };

  const handleToToast = () => {
    const getErrorMessage = () => {
      switch (selectedLanguage) {
        case "zh-CN":
          return "无法编辑或删除此退款请求信息";
        case "en-US":
          return "Now You Can Not Edit or Delete This Refund Request Information";
        case "fil-PH":
          return "Hindi mo na maaaring i-edit o tanggalin ang Impormasyon ng Refund Request na ito";
        case "ms-MY":
          return "Anda tidak dapat mengedit atau menghapus Maklumat Permintaan Pulangan ini";
        case "th-TH":
          return "ตอนนี้คุณไม่สามารถแก้ไขหรือลบข้อมูลคำขอคืนเงินนี้ได้";
        case "vi-VN":
          return "Bây giờ bạn không thể chỉnh sửa hoặc xóa Thông tin Yêu cầu Hoàn tiền này";
        case "id-ID":
          return "Sekarang Anda Tidak Dapat Mengedit atau Menghapus Informasi Permintaan Pengembalian Dana Ini";
        default:
          return "Now You Can Not Edit or Delete This Refund Request Information";
      }
    };
    toast.error(getErrorMessage());

  }

  const { allRefundRequest, setAllRefundRequest, selectedLanguage, user } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:5000/tht/refundRequest')
      .then((response) => response.json())
      .then((data) => {
        setAllRefundRequest(data);
        console.log(data)
      })
      .catch((error) => {
        console.error('Error occurred during the request:', error);
      });
  }, []);


  const filteredRequests = allRefundRequest.filter((request) =>
    request.customerUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.customerReturnTrackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.customerPhoneNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.customerOrderNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const deleteUser = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this Product information?');
    if (!confirmed) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/tht/refundRequest/delete/${id}`);
      toast.success('User deleted successfully');
      setAllRefundRequest(allRefundRequest.filter((request) => request?.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const openEditModal = (refundRequest) => {
    setEditingRequest(refundRequest);
    setIsModalOpen(true);
  };

  const updateUser = async (orderNumber, editingRequest) => {
    const confirmed = window.confirm('Are you sure you want to update this product information?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/tht/refundRequest/update/${orderNumber}`, editingRequest);
      toast.success("User information updated successfully");
      // Optionally, you can show a success message to the user using a toast or other UI notification.
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
      // Optionally, you can show an error message to the user using a toast or other UI notification.
    }
  };

  const saveUser = (orderNumber, updatedRequest) => {
    updateUser(orderNumber, updatedRequest);
    setAllRefundRequest(allRefundRequest.map((request) => (request.orderNumber === orderNumber ? updatedRequest : request)));
    setEditingRequest(null);
  };

  const closeEditModal = () => {
    setEditingRequest(null);
    setIsModalOpen(false);
  };


  return (
    <div className="text-gray-800 w-full">

      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row md:items-center mb-4">
          <input
            type="text"
            placeholder="Search by Customer Name, Tracking Number, Phone Number, or Order Number"
            className="border border-gray-300 rounded-lg py-1 px-4 mb-2 md:mr-1 md:mb-0 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <btn

            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-1 px-8 rounded-md"
            onChange={(e) => setSearchQuery("")}
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
            <th className="text-start pl-2 py-2">
              {selectedLanguage === "zh-CN" ? "编号" : ""}
              {selectedLanguage === "en-US" ? "No" : ""}
              {selectedLanguage === "fil-PH" ? "Walang" : ""}
              {selectedLanguage === "ms-MY" ? "Tidak" : ""}
              {selectedLanguage === "th-TH" ? "ไม่" : ""}
              {selectedLanguage === "vi-VN" ? "Không" : ""}
              {selectedLanguage === "id-ID" ? "Tidak" : ""}
            </th>
            <th className="text-start pl-2 py-2">
              {selectedLanguage === "zh-CN" ? "订单号码" : ""}
              {selectedLanguage === "en-US" ? "Order Number" : ""}
              {selectedLanguage === "fil-PH" ? "Numero ng Order" : ""}
              {selectedLanguage === "ms-MY" ? "Nombor Pesanan" : ""}
              {selectedLanguage === "th-TH" ? "หมายเลขคำสั่งซื้อ" : ""}
              {selectedLanguage === "vi-VN" ? "Số Đơn Hàng" : ""}
              {selectedLanguage === "id-ID" ? "Nomor Pesanan" : ""}
            </th>
            <th className="text-start pl-2 py-2">
              {selectedLanguage === "zh-CN" ? "顾客名称" : ""}
              {selectedLanguage === "en-US" ? "Customer Name" : ""}
              {selectedLanguage === "fil-PH" ? "Pangalan ng Customer" : ""}
              {selectedLanguage === "ms-MY" ? "Nama Pelanggan" : ""}
              {selectedLanguage === "th-TH" ? "ชื่อลูกค้า" : ""}
              {selectedLanguage === "vi-VN" ? "Tên Khách Hàng" : ""}
              {selectedLanguage === "id-ID" ? "Nama Pelanggan" : ""}
            </th>
            <th className="text-start py-2">
              {selectedLanguage === "zh-CN" ? "追踪号码" : ""}
              {selectedLanguage === "en-US" ? "Tracking Number" : ""}
              {selectedLanguage === "fil-PH" ? "Numero ng Pagganap" : ""}
              {selectedLanguage === "ms-MY" ? "Nombor Pengesanan" : ""}
              {selectedLanguage === "th-TH" ? "หมายเลขการติดตาม" : ""}
              {selectedLanguage === "vi-VN" ? "Số Theo dõi" : ""}
              {selectedLanguage === "id-ID" ? "Nomor Pelacakan" : ""}
            </th>
            <th className="text-start hidden md:block py-2">
              {selectedLanguage === "zh-CN" ? "订单日期" : ""}
              {selectedLanguage === "en-US" ? "Order Date" : ""}
              {selectedLanguage === "fil-PH" ? "Petsa ng Order" : ""}
              {selectedLanguage === "ms-MY" ? "Tarikh Pesanan" : ""}
              {selectedLanguage === "th-TH" ? "วันที่สั่งซื้อ" : ""}
              {selectedLanguage === "vi-VN" ? "Ngày Đặt Hàng" : ""}
              {selectedLanguage === "id-ID" ? "Tanggal Pesanan" : ""}
            </th>
            <th className="text-start py-2">
              {selectedLanguage === "zh-CN" ? "编辑" : ""}
              {selectedLanguage === "en-US" ? "Edit" : ""}
              {selectedLanguage === "fil-PH" ? "I-edit" : ""}
              {selectedLanguage === "ms-MY" ? "Edit" : ""}
              {selectedLanguage === "th-TH" ? "แก้ไข" : ""}
              {selectedLanguage === "vi-VN" ? "Chỉnh sửa" : ""}
              {selectedLanguage === "id-ID" ? "Edit" : ""}
            </th>
            <th className="text-start py-2">
              {selectedLanguage === "zh-CN" ? "删除" : ""}
              {selectedLanguage === "en-US" ? "Delete" : ""}
              {selectedLanguage === "fil-PH" ? "Tanggalin" : ""}
              {selectedLanguage === "ms-MY" ? "Padam" : ""}
              {selectedLanguage === "th-TH" ? "ลบ" : ""}
              {selectedLanguage === "vi-VN" ? "Xóa" : ""}
              {selectedLanguage === "id-ID" ? "Hapus" : ""}
            </th>

          </tr>

        </thead>
        <tbody>
          {loading ?
            <div >
              <DisplaySpinner></DisplaySpinner>
            </div>
            :
            filteredRequests.map((request, index) => (
              <tr key={request.orderNumber} className="my-5">
                <td className="text-start pl-2 py-2 font-semibold" >{index + 1}</td>
                <td className="text-start pl-2 py-2 font-semibold" >{request?.orderNumber}</td>
                <td className="text-start">{request?.customerUserName}</td>
                <td className="text-start">{request?.customerReturnTrackingNumber}</td>
                <td className="text-start hidden md:block">{request?.orderDate}</td>

                {user?.role === "~Customer-Service~" && request?.customerServiceLeaderStatus === "false" ? (
                  <>
                    <td>
                      <btn className="text-blue-500 flex justify-center hover:cursor-pointer" onClick={() => openEditModal(request)}>
                        <FiEdit />
                      </btn>
                    </td>
                    <td>
                      <btn className="text-red-500 flex justify-center hover:cursor-pointer" onClick={() => deleteUser(request?.id)}>
                        <RiDeleteBin7Line />
                      </btn>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <btn className="text-blue-500 flex justify-center hover:cursor-pointer" onClick={handleToToast}>
                        <FcCheckmark />
                      </btn>
                    </td>
                    <td>
                      <btn className="text-red-500 flex justify-center hover:cursor-pointer" onClick={handleToToast}>
                        <FcCheckmark />
                      </btn>
                    </td>
                  </>
                )}



              </tr>
            ))
          }

        </tbody>
      </table>



      {/* modal part start from here to update a user information */}
      {editingRequest && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 w-7/12 h-11/12 mx-auto">
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
                <label htmlFor="customerOrderNumber">Customer Phone No:</label> <input
                  type="text"
                  placeholder="customer Phone No"
                  value={editingRequest.customerPhoneNo}
                  onChange={(e) => setEditingRequest({ ...editingRequest, customerPhoneNo: e.target.value })}
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
              {
                editingRequest.otherReason &&
                <>
                  <div className="flex justify-between items-center mb-5">
                    <label htmlFor="customerOrderNumber">Other Reason:</label> <input
                      type="text"
                      placeholder="Other Reason"
                      value={editingRequest.otherReason}
                      onChange={(e) => setEditingRequest({ ...editingRequest, otherReason: e.target.value })}
                      className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                    /> </div>
                </>
              }

              <div className="mb-1 flex justify-between items-center">
                <div>
                  <label htmlFor="Applicant Name">Name:</label> <input
                    type="text"
                    placeholder="applicantName"
                    value={editingRequest.applicantName}
                    onChange={(e) => setEditingRequest({ ...editingRequest, applicantName: e.target.value })}
                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                  />
                </div>
                <div>
                  <label htmlFor="orderDate">Date:</label> <input
                    type="text"
                    placeholder="Order Date"
                    value={editingRequest.orderDate}
                    onChange={(e) => setEditingRequest({ ...editingRequest, orderDate: e.target.value })}
                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                  />
                </div>
                <div>


                  <label htmlFor="orderTime">Time:</label> <input
                    type="text"
                    placeholder="order Time"
                    value={editingRequest.orderTime}
                    onChange={(e) => setEditingRequest({ ...editingRequest, orderTime: e.target.value })}
                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                  />
                </div>
              </div>


              {/* Add other input fields for the remaining form data */}
              {/* <input ... /> */}

              <btn
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:cursor-pointer"
                onClick={() => saveUser(editingRequest.orderNumber, editingRequest)}
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

export default RefundProductList;
