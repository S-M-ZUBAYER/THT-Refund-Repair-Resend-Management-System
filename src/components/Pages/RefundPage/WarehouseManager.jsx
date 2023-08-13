
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
// Import the correct DisplaySpinner component based on its actual location
import DisplaySpinner from '../../Loading/DisplaySpinner';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';
import { Link } from 'react-router-dom';

const WarehouseManager = ({ refundProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [allWarehouseManagerRequest, setAllWarehouseManagerRequest] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [searchAllQuery, setSearchAllQuery] = useState('');

  const { selectedLanguage,user } = useContext(AuthContext);


  const handleSearchAllChange = (event) => {
    setSearchAllQuery(event.target.value);
  };


  const filteredAllWarehouseManagerRequests = allWarehouseManagerRequest.filter((request) =>
    request.customerUserName.toLowerCase().includes(searchAllQuery.toLowerCase()) ||
    request.customerReturnTrackingNumber.toLowerCase().includes(searchAllQuery.toLowerCase()) ||
    request.customerPhoneNo.toLowerCase().includes(searchAllQuery.toLowerCase()) ||
    request.customerOrderNumber.toLowerCase().includes(searchAllQuery.toLowerCase())
  );




  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://grozziie.zjweiting.com:8035/tht/warehouseManagerRequest');
      const data = response.data;
      setAllWarehouseManagerRequest(data?.filter(everyData=>everyData?.warehouseCountry===user?.country));
      setLoading(false);
    } catch (error) {
      console.error('Error occurred during the request:', error);
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  const deleteRequest = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product information?');
    if (!confirmed) {
      return; // Cancel the deletion if the user clicks Cancel or closes the modal
    }
    try {
      await axios.delete(`https://grozziie.zjweiting.com:8035/tht/refundRequest/delete/${id}`);
      toast.success('User deleted successfully');
      setAllWarehouseManagerRequest((prevRequests) => prevRequests.filter((request) => request?.id !== id));
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
    const confirmed = window.confirm('Are you sure you want to update these information?');
    if (!confirmed) {
      return; // Cancel the deletion if the user clicks Cancel or closes the modal
    }
    try {
      const response = await axios.put(`https://grozziie.zjweiting.com:8035/tht/refundRequest/update/${orderNumber}`, editingRequest);
      toast.success('User information updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    }
  };




  const handleImageChange = (e) => {
    setSelectedImages(e.target.files);
  };




  const updateWarehouseStatus = async (orderNumber) => {
    try {
      const response = await axios.put(`https://grozziie.zjweiting.com:8035/tht/refundRequest/updateWarehouseStatus/${orderNumber}`);

      if (response.status === 200) {
        // Update the warehouse status locally in the state
        setAllWarehouseManagerRequest((prevRefundRequest) =>
          prevRefundRequest.map((request) => {
            if (request.orderNumber === orderNumber) {
              return { ...request, warehouseStatus: true };
            }
            return request;
          })
        );
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
    setAllWarehouseManagerRequest((prevRequests) =>
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
              {selectedLanguage === "en-US" && "No"}
              {selectedLanguage === "fil-PH" && "Numero"}
              {selectedLanguage === "ms-MY" && "Nombor"}
              {selectedLanguage === "th-TH" && "หมายเลข"}
              {selectedLanguage === "vi-VN" && "Số"}
              {selectedLanguage === "id-ID" && "Nomor"}
              {selectedLanguage === "zh-CN" && "序号"}
            </th>
            <th className="text-start pl-2 py-2">
              {selectedLanguage === "en-US" && "Order Number"}
              {selectedLanguage === "fil-PH" && "Numero ng Order"}
              {selectedLanguage === "ms-MY" && "Nombor Pesanan"}
              {selectedLanguage === "th-TH" && "หมายเลขคำสั่งซื้อ"}
              {selectedLanguage === "vi-VN" && "Số Đơn Hàng"}
              {selectedLanguage === "id-ID" && "Nomor Pesanan"}
              {selectedLanguage === "zh-CN" && "订单编号"}
            </th>
            <th className="text-start pl-2 py-2">
              {selectedLanguage === "en-US" && "Customer Name"}
              {selectedLanguage === "fil-PH" && "Pangalan ng Customer"}
              {selectedLanguage === "ms-MY" && "Nama Pelanggan"}
              {selectedLanguage === "th-TH" && "ชื่อลูกค้า"}
              {selectedLanguage === "vi-VN" && "Tên Khách Hàng"}
              {selectedLanguage === "id-ID" && "Nama Pelanggan"}
              {selectedLanguage === "zh-CN" && "客户名称"}
            </th>
            <th className="text-start py-2">
            {selectedLanguage === "en-US" && "Customer Order Number"}
                            {selectedLanguage === "zh-CN" && "客户订单号"}
                            {selectedLanguage === "fil-PH" && "Numero ng Order ng Customer"}
                            {selectedLanguage === "ms-MY" && "Nombor Pesanan Pelanggan"}
                            {selectedLanguage === "th-TH" && "หมายเลขคำสั่งซื้อของลูกค้า"}
                            {selectedLanguage === "vi-VN" && "Số Đơn đặt hàng của Khách hàng"}
                            {selectedLanguage === "id-ID" && "Nomor Pesanan Pelanggan"}
            </th>
            <th className="text-start py-2">
              {selectedLanguage === "en-US" && "Tracking Number"}
              {selectedLanguage === "fil-PH" && "Numero ng Pagmamanman"}
              {selectedLanguage === "ms-MY" && "Nombor Pengesanan"}
              {selectedLanguage === "th-TH" && "หมายเลขการติดตาม"}
              {selectedLanguage === "vi-VN" && "Số Theo Dõi"}
              {selectedLanguage === "id-ID" && "Nomor Pelacakan"}
              {selectedLanguage === "zh-CN" && "跟踪号码"}
            </th>
            <th className="text-start py-2">
              {selectedLanguage === "en-US" && "Details"}
              {selectedLanguage === "fil-PH" && "Detalye"}
              {selectedLanguage === "ms-MY" && "Maklumat Lanjut"}
              {selectedLanguage === "th-TH" && "รายละเอียด"}
              {selectedLanguage === "vi-VN" && "Chi tiết"}
              {selectedLanguage === "id-ID" && "Rincian"}
              {selectedLanguage === "zh-CN" && "详情"}
            </th>
            <th className="text-start hidden md:block py-2">{selectedLanguage === "en-US" && "Order Date"}
              {selectedLanguage === "fil-PH" && "Petsa ng Order"}
              {selectedLanguage === "ms-MY" && "Tarikh Pesanan"}
              {selectedLanguage === "th-TH" && "วันที่คำสั่งซื้อ"}
              {selectedLanguage === "vi-VN" && "Ngày Đặt Hàng"}
              {selectedLanguage === "id-ID" && "Tanggal Pemesanan"}
              {selectedLanguage === "zh-CN" && "订单日期"}</th>

          </tr>
        </thead>

        <tbody>
          {loading ? (
            <div>
              <DisplaySpinner></DisplaySpinner>
            </div>
          ) : (
            filteredAllWarehouseManagerRequests.length !== 0 &&
            filteredAllWarehouseManagerRequests?.map((request, index) => (
              <tr key={request.orderNumber} className="my-5">
                <td className="text-start pl-2 py-2 font-semibold">{index + 1}</td>
                <td className="text-start pl-2 py-2 font-semibold">{request?.orderNumber}</td>
                <td className="text-start  py-2">{request?.customerUserName}</td>
                <td className="text-start pl-2 py-2 font-semibold">{request?.customerOrderNumber}</td>
                <td className="text-start py-2">{request?.customerReturnTrackingNumber}</td>
                <td className="text-start hidden md:block py-2">{request?.orderDate}</td>
                <td className="text-start py-2 cursor-pointer">
                  <Link to={`/refund/details/${request?.orderNumber}`}>
                    <btn className="bg-lime-200 rounded-tl-lg rounded-br-lg px-5 py-1">{selectedLanguage === "en-US" && "Details"}
                      {selectedLanguage === "fil-PH" && "Detalye"}
                      {selectedLanguage === "ms-MY" && "Butiran"}
                      {selectedLanguage === "th-TH" && "รายละเอียด"}
                      {selectedLanguage === "vi-VN" && "Chi tiết"}
                      {selectedLanguage === "id-ID" && "Rincian"}
                      {selectedLanguage === "zh-CN" && "详情"}
                    </btn>
                  </Link>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>


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

export default WarehouseManager;

