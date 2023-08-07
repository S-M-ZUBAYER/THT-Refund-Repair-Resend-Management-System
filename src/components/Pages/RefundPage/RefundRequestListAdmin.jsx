import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { BsSignNoRightTurn } from 'react-icons/bs';
import { FcCheckmark } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';
import DisplaySpinner from '../../Loading/DisplaySpinner';

const RefundRequestListAdmin = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  const handleOptionChange = (special) => {
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
      })
      .catch((error) => {
        console.error('Error occurred during the request:', error);
      });
  }, []);

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
            allRefundRequest.map((request, index) => (
              <tr key={request.orderNumber} className="my-5">
                <td className="text-start pl-2 py-2 font-semibold" >{index + 1}</td>
                <td className="text-start pl-2 py-2 font-semibold" >{request?.orderNumber}</td>
                <td className="text-start">{request?.customerUserName}</td>
                <td className="text-start">{request?.customerReturnTrackingNumber}</td>
                <td className="text-start hidden md:block">{request?.orderDate}</td>

                {user?.admin === "true" && request?.financeStatus === "true" ? (
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

                ) : (
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
                )}



              </tr>
            ))
          }

        </tbody>
      </table>



      {/* modal part start from here to update a user information */}
      {editingRequest && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 w-7/12 max-h-fit mx-auto">
            <h2 className="text-lg font-bold mb-1bg-gradient-to-r from-green-300 to-yellow-300">
              {selectedLanguage === "zh-CN" && "编辑退款请求信息"}
              {selectedLanguage === "en-US" && "Edit Refund Request Information"}
              {selectedLanguage === "fil-PH" && "I-edit ang Impormasyon ng Refund Request"}
              {selectedLanguage === "ms-MY" && "Kemaskini Maklumat Permintaan Pembayaran Balik"}
              {selectedLanguage === "th-TH" && "แก้ไขข้อมูลคำขอคืนเงิน"}
              {selectedLanguage === "vi-VN" && "Chỉnh Sửa Thông Tin Yêu Cầu Hoàn Tiền"}
              {selectedLanguage === "id-ID" && "Edit Informasi Permintaan Pengembalian Dana"}
            </h2>


            <div className="border-2 p-5  border-cyan-400">

              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "客户用户名："}
                  {selectedLanguage === "en-US" && "Customer User Name:"}
                  {selectedLanguage === "fil-PH" && "Pangalan ng Customer User:"}
                  {selectedLanguage === "ms-MY" && "Nama Pengguna Pelanggan:"}
                  {selectedLanguage === "th-TH" && "ชื่อผู้ใช้ลูกค้า:"}
                  {selectedLanguage === "vi-VN" && "Tên Người dùng Khách hàng:"}
                  {selectedLanguage === "id-ID" && "Nama Pengguna Pelanggan:"}
                </label> <input
                  type="text"
                  placeholder="customer User Name"
                  value={editingRequest.customerUserName}
                  onChange={(e) => setEditingRequest({ ...editingRequest, customerUserName: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                /> </div>

              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "客户电话号码："}
                  {selectedLanguage === "en-US" && "Customer Phone No:"}
                  {selectedLanguage === "fil-PH" && "Numero ng Telepono ng Customer:"}
                  {selectedLanguage === "ms-MY" && "Nombor Telefon Pelanggan:"}
                  {selectedLanguage === "th-TH" && "หมายเลขโทรศัพท์ลูกค้า:"}
                  {selectedLanguage === "vi-VN" && "Số Điện thoại Khách hàng:"}
                  {selectedLanguage === "id-ID" && "Nomor Telepon Pelanggan:"}
                </label> <input
                  type="text"
                  placeholder="customer Phone No"
                  value={editingRequest.customerPhoneNo}
                  onChange={(e) => setEditingRequest({ ...editingRequest, customerPhoneNo: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                /> </div>


              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "店铺名称："}
                  {selectedLanguage === "en-US" && "Shop Name:"}
                  {selectedLanguage === "fil-PH" && "Pangalan ng Tindahan:"}
                  {selectedLanguage === "ms-MY" && "Nama Kedai:"}
                  {selectedLanguage === "th-TH" && "ชื่อร้านค้า:"}
                  {selectedLanguage === "vi-VN" && "Tên Cửa hàng:"}
                  {selectedLanguage === "id-ID" && "Nama Toko:"}
                </label> <input
                  type="text"
                  placeholder="Shop Name"
                  value={editingRequest.shopName}
                  onChange={(e) => setEditingRequest({ ...editingRequest, shopName: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                />
              </div>


              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "客户银行名称："}
                  {selectedLanguage === "en-US" && "Customer Bank Name:"}
                  {selectedLanguage === "fil-PH" && "Pangalan ng Bangko ng Customer:"}
                  {selectedLanguage === "ms-MY" && "Nama Bank Pelanggan:"}
                  {selectedLanguage === "th-TH" && "ชื่อธนาคารของลูกค้า:"}
                  {selectedLanguage === "vi-VN" && "Tên Ngân hàng Khách hàng:"}
                  {selectedLanguage === "id-ID" && "Nama Bank Pelanggan:"}
                </label> <input
                  type="text"
                  placeholder="customer Bank Name"
                  value={editingRequest.customerBankName}
                  onChange={(e) => setEditingRequest({ ...editingRequest, customerBankName: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                /> </div>

              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "银行账户名称："}
                  {selectedLanguage === "en-US" && "Bank Account Name:"}
                  {selectedLanguage === "fil-PH" && "Pangalan ng Bank Account:"}
                  {selectedLanguage === "ms-MY" && "Nama Akaun Bank:"}
                  {selectedLanguage === "th-TH" && "ชื่อบัญชีธนาคาร:"}
                  {selectedLanguage === "vi-VN" && "Tên Tài khoản Ngân hàng:"}
                  {selectedLanguage === "id-ID" && "Nama Rekening Bank:"}
                </label>
                <input
                  type="text"
                  placeholder="Customer Bank Account Name"
                  value={editingRequest.customerBankAccountName}
                  onChange={(e) => setEditingRequest({ ...editingRequest, customerBankAccountName: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                />
              </div>


              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "客户银行 Swift 号码："}
                  {selectedLanguage === "en-US" && "Customer Bank Swift:"}
                  {selectedLanguage === "fil-PH" && "Swift ng Bank ng Customer:"}
                  {selectedLanguage === "ms-MY" && "Kod SWIFT Bank Pelanggan:"}
                  {selectedLanguage === "th-TH" && "รหัส Swift ของธนาคารของลูกค้า:"}
                  {selectedLanguage === "vi-VN" && "Mã Swift của ngân hàng khách hàng:"}
                  {selectedLanguage === "id-ID" && "Kode SWIFT Bank Pelanggan:"}
                </label> <input
                  type="text"
                  placeholder="customer Bank Swift"
                  value={editingRequest.customerBankSwift}
                  onChange={(e) => setEditingRequest({ ...editingRequest, customerBankSwift: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                /> </div>

              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "客户订单号码："}
                  {selectedLanguage === "en-US" && "Customer Order Number:"}
                  {selectedLanguage === "fil-PH" && "Numero ng Order ng Customer:"}
                  {selectedLanguage === "ms-MY" && "Nombor Pesanan Pelanggan:"}
                  {selectedLanguage === "th-TH" && "หมายเลขคำสั่งซื้อของลูกค้า:"}
                  {selectedLanguage === "vi-VN" && "Số Đơn đặt hàng của khách hàng:"}
                  {selectedLanguage === "id-ID" && "Nomor Pesanan Bank Pelanggan:"}
                </label>
                <input
                  type="text"
                  placeholder="Customer Order Number"
                  value={editingRequest.customerOrderNumber}
                  onChange={(e) => setEditingRequest({ ...editingRequest, customerOrderNumber: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                />
              </div>

              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "客户收款账户："}
                  {selectedLanguage === "en-US" && "Customer Receiving Account:"}
                  {selectedLanguage === "fil-PH" && "Account ng Pagtanggap ng Customer:"}
                  {selectedLanguage === "ms-MY" && "Akaun Penerimaan Pelanggan:"}
                  {selectedLanguage === "th-TH" && "บัญชีรับเงินของลูกค้า:"}
                  {selectedLanguage === "vi-VN" && "Tài khoản nhận tiền của khách hàng:"}
                  {selectedLanguage === "id-ID" && "Akun Penerimaan Bank Pelanggan:"}
                </label> <input
                  type="text"
                  placeholder="customer Receiving Account"
                  value={editingRequest.customerReceivingAccount}
                  onChange={(e) => setEditingRequest({ ...editingRequest, customerReceivingAccount: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                /> </div>
              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "客户收款金额："}
                  {selectedLanguage === "en-US" && "Customer Receiving Amount:"}
                  {selectedLanguage === "fil-PH" && "Halaga ng Pagtanggap ng Customer:"}
                  {selectedLanguage === "ms-MY" && "Jumlah Penerimaan Pelanggan:"}
                  {selectedLanguage === "th-TH" && "จำนวนเงินที่ลูกค้าได้รับ:"}
                  {selectedLanguage === "vi-VN" && "Số tiền khách hàng nhận được:"}
                  {selectedLanguage === "id-ID" && "Jumlah Penerimaan Bank Pelanggan:"}
                </label>
                <input
                  type="text"
                  placeholder="customer Receiving Amount"
                  value={editingRequest.customerReceivingAmount}
                  onChange={(e) => setEditingRequest({ ...editingRequest, customerReceivingAmount: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                /> </div>


              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "退货跟踪号："}
                  {selectedLanguage === "en-US" && "Return Tracking Number:"}
                  {selectedLanguage === "fil-PH" && "Numero ng Pagsubaybay sa Pagbalik:"}
                  {selectedLanguage === "ms-MY" && "Nombor Jejak Kembali:"}
                  {selectedLanguage === "th-TH" && "หมายเลขการติดตามการคืนสินค้า:"}
                  {selectedLanguage === "vi-VN" && "Số theo dõi hoàn trả:"}
                  {selectedLanguage === "id-ID" && "Nomor Lacak Pengembalian:"}
                </label>
                <input
                  type="text"
                  placeholder="Customer Return Tracking Number"
                  value={editingRequest.customerReturnTrackingNumber}
                  onChange={(e) => setEditingRequest({ ...editingRequest, customerReturnTrackingNumber: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                />
              </div>


              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "订单金额："}
                  {selectedLanguage === "en-US" && "Order Amount:"}
                  {selectedLanguage === "fil-PH" && "Halaga ng Order:"}
                  {selectedLanguage === "ms-MY" && "Jumlah Pesanan:"}
                  {selectedLanguage === "th-TH" && "จำนวนเงินในคำสั่งซื้อ:"}
                  {selectedLanguage === "vi-VN" && "Số tiền đặt hàng:"}
                  {selectedLanguage === "id-ID" && "Jumlah Pesanan:"}
                </label> <input
                  type="text"
                  placeholder="Order Amount"
                  value={editingRequest.orderAmount}
                  onChange={(e) => setEditingRequest({ ...editingRequest, orderAmount: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                /> </div>


              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "退款金额："}
                  {selectedLanguage === "en-US" && "Refund Amount:"}
                  {selectedLanguage === "fil-PH" && "Halaga ng Refund:"}
                  {selectedLanguage === "ms-MY" && "Jumlah Bayaran Balik:"}
                  {selectedLanguage === "th-TH" && "จำนวนเงินที่คืน:"}
                  {selectedLanguage === "vi-VN" && "Số tiền hoàn tiền:"}
                  {selectedLanguage === "id-ID" && "Jumlah Pengembalian:"}
                </label> <input
                  type="text"
                  placeholder="Refund Amount"
                  value={editingRequest.refundAmount}
                  onChange={(e) => setEditingRequest({ ...editingRequest, refundAmount: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                /> </div>

              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "退款金额："}
                  {selectedLanguage === "en-US" && "Remarks:"}
                  {selectedLanguage === "fil-PH" && "Halaga ng Refund:"}
                  {selectedLanguage === "ms-MY" && "Jumlah Bayaran Balik:"}
                  {selectedLanguage === "th-TH" && "จำนวนเงินที่คืน:"}
                  {selectedLanguage === "vi-VN" && "Số tiền hoàn tiền:"}
                  {selectedLanguage === "id-ID" && "Jumlah Pengembalian:"}
                </label> <input
                  type="text"
                  placeholder="remarks"
                  value={editingRequest.remarks}
                  onChange={(e) => setEditingRequest({ ...editingRequest, remarks: e.target.value })}
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                /> </div>


              <div className="mb-1 flex justify-between items-center">
                <label htmlFor="customerOrderNumber">
                  {selectedLanguage === "zh-CN" && "退款原因："}
                  {selectedLanguage === "en-US" && "Refund Reason:"}
                  {selectedLanguage === "fil-PH" && "Dahilan ng Pagbabalik ng Halaga:"}
                  {selectedLanguage === "ms-MY" && "Sebab Pampasan:"}
                  {selectedLanguage === "th-TH" && "เหตุผลในการขอคืนเงิน:"}
                  {selectedLanguage === "vi-VN" && "Lý do hoàn tiền:"}
                  {selectedLanguage === "id-ID" && "Alasan Pengembalian:"}
                </label> <input
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
                    <label htmlFor="customerOrderNumber">
                      {selectedLanguage === "zh-CN" && "其他原因："}
                      {selectedLanguage === "en-US" && "Other Reason:"}
                      {selectedLanguage === "fil-PH" && "Iba pang Dahilan:"}
                      {selectedLanguage === "ms-MY" && "Sebab Lain:"}
                      {selectedLanguage === "th-TH" && "เหตุผลอื่นๆ:"}
                      {selectedLanguage === "vi-VN" && "Lý do khác:"}
                      {selectedLanguage === "id-ID" && "Alasan Lain:"}
                    </label> <input
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
                  <label htmlFor="Applicant Name">
                    {selectedLanguage === "zh-CN" && "姓名："}
                    {selectedLanguage === "en-US" && "Name:"}
                    {selectedLanguage === "fil-PH" && "Pangalan:"}
                    {selectedLanguage === "ms-MY" && "Nama:"}
                    {selectedLanguage === "th-TH" && "ชื่อ:"}
                    {selectedLanguage === "vi-VN" && "Tên:"}
                    {selectedLanguage === "id-ID" && "Nama:"}
                  </label> <input
                    type="text"
                    placeholder="applicantName"
                    readOnly
                    value={editingRequest.applicantName}
                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                  />
                </div>
                <div>
                  <label htmlFor="orderDate">
                    {selectedLanguage === "zh-CN" && "日期："}
                    {selectedLanguage === "en-US" && "Date:"}
                    {selectedLanguage === "fil-PH" && "Petsa:"}
                    {selectedLanguage === "ms-MY" && "Tarikh:"}
                    {selectedLanguage === "th-TH" && "วันที่:"}
                    {selectedLanguage === "vi-VN" && "Ngày:"}
                    {selectedLanguage === "id-ID" && "Tanggal:"}
                  </label> <input
                    type="text"
                    placeholder="Order Date"
                    readOnly
                    value={editingRequest.orderDate}
                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-9/12"
                  />
                </div>
                <div>


                  <label htmlFor="orderTime">
                    {selectedLanguage === "zh-CN" && "时间："}
                    {selectedLanguage === "en-US" && "Time:"}
                    {selectedLanguage === "fil-PH" && "Oras:"}
                    {selectedLanguage === "ms-MY" && "Masa:"}
                    {selectedLanguage === "th-TH" && "เวลา:"}
                    {selectedLanguage === "vi-VN" && "Thời gian:"}
                    {selectedLanguage === "id-ID" && "Waktu:"}
                  </label> <input
                    type="text"
                    placeholder="order Time"
                    readOnly
                    value={editingRequest.orderTime}
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
                {selectedLanguage === "zh-CN" && "更新"}
                {selectedLanguage === "en-US" && "Update"}
                {selectedLanguage === "fil-PH" && "I-update"}
                {selectedLanguage === "ms-MY" && "Kemas kini"}
                {selectedLanguage === "th-TH" && "อัปเดต"}
                {selectedLanguage === "vi-VN" && "Cập nhật"}
                {selectedLanguage === "id-ID" && "Perbarui"}
              </btn>
              <btn
                className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-2 hover:cursor-pointer"
                onClick={() => setEditingRequest(null)}
              >
                {selectedLanguage === "zh-CN" && "取消"}
                {selectedLanguage === "en-US" && "Cancel"}
                {selectedLanguage === "fil-PH" && "Kanselahin"}
                {selectedLanguage === "ms-MY" && "Batal"}
                {selectedLanguage === "th-TH" && "ยกเลิก"}
                {selectedLanguage === "vi-VN" && "Hủy bỏ"}
                {selectedLanguage === "id-ID" && "Batal"}
              </btn>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RefundRequestListAdmin;
