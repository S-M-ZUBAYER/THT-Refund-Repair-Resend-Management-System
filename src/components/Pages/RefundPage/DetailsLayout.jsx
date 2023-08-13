import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { BsSignNoRightTurn } from 'react-icons/bs';
import { FcCheckmark } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/UserContext';

const DetailsLayout = () => {
  const [loading, setLoading] = useState(false);
  const [currentRequest, setCurrentRequest] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [warehouseImages, setWarehouseImages] = useState([]);
  const [financeImages, setFinanceImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  const { user, selectedLanguage, allRefundRequest, setAllRefundRequest } = useContext(AuthContext)


  const currentPath = window.location.pathname;




  // Split the path by '/'
  const segments = currentPath.split('/');

  // Get the last segment
  const lastValue = segments[segments.length - 1];


  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/refund`;
    navigate(path);
  }


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
      routeChange();
      toast.success('User deleted successfully');
      //   setAllRefundRequest(allRefundRequest.filter((request) => request?.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const openEditModal = (refundRequest) => {
    setEditingRequest(refundRequest);
    setIsModalOpen(true);
  };


  const handleImageChange = (e) => {
    setSelectedImages(e.target.files);
  };


  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    // Append selected images to the form data
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append('images', selectedImages[i]);
    }



    try {
      await axios.put(`http://localhost:5000/tht/warehouseImages/${currentRequest?.orderNumber}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(` Warehouse images update successfully!`);
      setLoading(false)
      // Reset form fields







      setSelectedImages([]);

    } catch (error) {
      console.error('Error creating product:', error);
      toast.error("Failed to upload, Please input every data properly")
    }
  };
  const handleFinanceSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    // Append selected images to the form data
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append('images', selectedImages[i]);
    }



    try {
      await axios.put(`http://localhost:5000/tht/financeImages/${currentRequest?.orderNumber}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(` finance images update successfully!`);
      setLoading(false)
      // Reset form fields

      setSelectedImages([]);

    } catch (error) {
      console.error('Error creating product:', error);
      toast.error("Failed to upload, Please input every data properly")
    }
  };



  const fetchWarehoueManagerData = async (lastValue) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/tht/refundRequest/${lastValue}`);
      const data = response.data;
      setCurrentRequest(data);
      if (data?.warehouseManagerStatus === "true") {
        setStatus("Finance")
      }
      else {
        setStatus("warehouseManager")
      }

      setLoading(false);
    } catch (error) {
      console.error('Error occurred during the request:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchSpecialData();
    fetchWarehoueManagerData(lastValue);
  }, []);


  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };





  console.log(allRefundRequest)


  const updateLeaderStatus = async (orderNumber) => {
    const confirmed = window.confirm('Are you sure you want to approve this refund request?');
    if (!confirmed) {
      return; // Cancel the operation if the user clicks Cancel or closes the modal
    }

    const leaderName = { name: user?.name }

    try {
      const response = await axios.put(
        `http://localhost:5000/tht/updateLeaderStatus/${orderNumber}`,
        leaderName
      );

      if (response.status === 200) {
        routeChange();
        toast.success('Service Leader status updated successfully');
      } else {
        toast.error('Failed to update Service Leader status');
      }
    } catch (error) {
      console.error('Error updating service Leader status:', error);
      toast.error('Failed to update service Leader status');
    }
  };



  const handleToUpdateWarehouseManagerStatus = async (orderNumber) => {
    const confirmed = window.confirm('Are you sure you want to approve this refund product?');
    if (!confirmed) {
      return; // Cancel the deletion if the user clicks Cancel or closes the modal
    }
    const WarehouseManagerName = { name: user?.name }
    if (status === "warehouseManager") {
      try {
        const response = await axios.put(
          `http://localhost:5000/tht/updateWarehouseManagerStatus/${orderNumber}`,
          WarehouseManagerName
        );

        if (response.status === 200) {
          routeChange();
          toast.success('~Warehouse-Manager~ status updated successfully');
        } else {
          toast.error('Failed to update ~Warehouse-Manager~ status');
        }
      } catch (error) {
        console.error('Error updating ~Warehouse-Manager~ status:', error);
        toast.error('Failed to update ~Warehouse-Manager~ status');
      }
    }
    else {
      try {
        const financeName = { name: user?.name }
        const response = await axios.put(
          `http://localhost:5000/tht/updateFinanceStatus/${orderNumber}`,
          financeName
        );

        if (response.status === 200) {
          routeChange();
          toast.success('Finance status updated successfully');
        } else {
          toast.error('Failed to update Finance status');
        }
      } catch (error) {
        console.error('Error updating Finance status:', error);
        toast.error('Failed to update Finance status');
      }
    }

  }

  const updateWarehouseStatus = async (orderNumber) => {
    const confirmed = window.confirm('Are you sure you want to approve this refund product?');
    if (!confirmed) {
      return; // Cancel the deletion if the user clicks Cancel or closes the modal
    }
    try {
      // const formData = new FormData();
      // selectedImages.forEach((image) => formData.append('images', image));

      const WarehouseStatus = {
        name: user?.name,
        country: user?.country
      }

      const response = await axios.put(`http://localhost:5000/tht/refundRequest/updateWarehouseStatus/${orderNumber}`, WarehouseStatus);

      if (response.status === 200) {
        routeChange();
        toast.success('Warehouse status updated successfully');
      } else {
        toast.error('Failed to update Warehouse  status');
      }


    } catch (error) {
      console.error('Error updating warehouse status:', error);
      toast.error('Failed to update warehouse status');
    }
  };
  // setWarehouseImages((currentRequest?.warehouseImg).split(","))

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


  const saveUser = (orderNumber, updatedRequest) => {
    updateUser(orderNumber, updatedRequest);
    setAllRefundRequest(allRefundRequest.map((request) => (request.orderNumber === orderNumber ? updatedRequest : request)));
    setEditingRequest(null);
  };

  const updateUser = async (orderNumber, editingRequest) => {
    const confirmed = window.confirm('Are you sure you want to update this product information?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/tht/refundRequest/update/${orderNumber}`, editingRequest);
      routeChange();
      toast.success("Product information updated successfully");
      // Optionally, you can show a success message to the user using a toast or other UI notification.
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
      // Optionally, you can show an error message to the user using a toast or other UI notification.
    }
  };

  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 text-center'>
      <div className=" mb-5">
        <div className="grid grid-cols-12">
          <div className=" col-span-10">

            <h1><span className=" bg-gradient-to-r from-blue-800 to-red-800 text-transparent bg-clip-text">{currentRequest?.customerUserName}</span> {selectedLanguage === "en-US" && "Refund Request Need To Check And Approved By"}
              {selectedLanguage === "zh-CN" && "退款申请需要审核和批准"}
              {selectedLanguage === "fil-PH" && "Ang refund request ay kailangang suriin at aprubahan ng"}
              {selectedLanguage === "ms-MY" && "Permohonan Refund Perlu Diperiksa Dan Diluluskan Oleh"}
              {selectedLanguage === "th-TH" && "ต้องตรวจสอบและอนุมัติคำขอคืนเงินโดย"}
              {selectedLanguage === "vi-VN" && "Yêu cầu hoàn tiền cần được kiểm tra và phê duyệt bởi"}
              {selectedLanguage === "id-ID" && "Permintaan Refund Perlu Diperiksa Dan Disetujui Oleh"} {user?.role}</h1>

          </div>
          <div className=" col-span-2 flex justify-center items-center">
            {user?.role === "~Customer-Service~" && user?.email === currentRequest?.applicantEmail && currentRequest?.customerServiceLeaderStatus === "false" ? (
              <>
                <td>
                  <btn className="text-blue-500 mr-2 flex justify-center hover:cursor-pointer" onClick={() => openEditModal(currentRequest)}>
                    <FiEdit className="w-9 h-9" />
                  </btn>
                </td>
                <td>
                  <btn className="text-red-500 flex justify-center hover:cursor-pointer" onClick={() => deleteUser(currentRequest?.id)}>
                    <RiDeleteBin7Line className="w-9 h-9" />
                  </btn>
                </td>
              </>
            ) : (
              ""
            )}
          </div>


        </div>

        <hr className='border-2 border-gray-800 my-5'></hr> </div>

      <div className="grid grid-cols-2 gap-10 text-left mx-10">

        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Applicant Name:"}
            {selectedLanguage === "fil-PH" && "Pangalan ng Aplikante:"}
            {selectedLanguage === "ms-MY" && "Nama Pemohon:"}
            {selectedLanguage === "th-TH" && "ชื่อผู้สมัคร:"}
            {selectedLanguage === "vi-VN" && "Tên Người Đăng Ký:"}
            {selectedLanguage === "id-ID" && "Nama Pemohon:"}
            {selectedLanguage === "zh-CN" && "申请人姓名："}
          </span>{" "}
          {currentRequest?.applicantName}
        </p>
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Application Date:"}
            {selectedLanguage === "fil-PH" && "Petsa ng Aplikasyon:"}
            {selectedLanguage === "ms-MY" && "Tarikh Permohonan:"}
            {selectedLanguage === "th-TH" && "วันที่สมัคร:"}
            {selectedLanguage === "vi-VN" && "Ngày Đăng Ký:"}
            {selectedLanguage === "id-ID" && "Tanggal Aplikasi:"}
            {selectedLanguage === "zh-CN" && "申请日期："}
          </span>{" "}
          {currentRequest?.applicationDate}
        </p>
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Customer Order Number:"}
            {selectedLanguage === "fil-PH" && "Numero ng Order ng Customer:"}
            {selectedLanguage === "ms-MY" && "Nombor Pesanan Pelanggan:"}
            {selectedLanguage === "th-TH" && "หมายเลขออเดอร์ลูกค้า:"}
            {selectedLanguage === "vi-VN" && "Số Đơn Hàng Của Khách Hàng:"}
            {selectedLanguage === "id-ID" && "Nomor Pesanan Pelanggan:"}
            {selectedLanguage === "zh-CN" && "客户订单号："}
          </span>{" "}
          {currentRequest?.customerOrderNumber}
        </p>
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Customer Return Tracking Number:"}
            {selectedLanguage === "fil-PH" && "Numero ng Pagbabalik na Pagmamatyag ng Customer:"}
            {selectedLanguage === "ms-MY" && "Nombor Pengesanan Pengembalian Pelanggan:"}
            {selectedLanguage === "th-TH" && "หมายเลขการติดตามการคืนของลูกค้า:"}
            {selectedLanguage === "vi-VN" && "Số Theo Dõi Hàng Trả Của Khách Hàng:"}
            {selectedLanguage === "id-ID" && "Nomor Pelacakan Pengembalian Pelanggan:"}
            {selectedLanguage === "zh-CN" && "客户退货追踪号："}
          </span>{" "}
          {currentRequest?.customerReturnTrackingNumber}
        </p>
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Order Time:"}
            {selectedLanguage === "fil-PH" && "Oras ng Order:"}
            {selectedLanguage === "ms-MY" && "Masa Pesanan:"}
            {selectedLanguage === "th-TH" && "เวลาการสั่งซื้อ:"}
            {selectedLanguage === "vi-VN" && "Thời Gian Đặt Hàng:"}
            {selectedLanguage === "id-ID" && "Waktu Pemesanan:"}
            {selectedLanguage === "zh-CN" && "订单时间："}
          </span>{" "}
          {currentRequest?.orderTime}
        </p>
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Shop Name:"}
            {selectedLanguage === "fil-PH" && "Pangalan ng Tindahan:"}
            {selectedLanguage === "ms-MY" && "Nama Kedai:"}
            {selectedLanguage === "th-TH" && "ชื่อร้านค้า:"}
            {selectedLanguage === "vi-VN" && "Tên Cửa Hàng:"}
            {selectedLanguage === "id-ID" && "Nama Toko:"}
            {selectedLanguage === "zh-CN" && "店铺名称："}
          </span>{" "}
          {currentRequest?.shopName}
        </p>

        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Warehouse Name:"}
            {selectedLanguage === "zh-CN" && "仓库名称："}
            {selectedLanguage === "th-TH" && "ชื่อคลังสินค้า:"}
            {selectedLanguage === "vi-VN" && "Tên kho:"}
            {selectedLanguage === "ms-MY" && "Nama Gudang:"}
            {selectedLanguage === "id-ID" && "Nama Gudang:"}
            {selectedLanguage === "fil-PH" && "Pangalan ng Warehouse:"}
          </span>{" "}
          {currentRequest?.warehouseName}
        </p>

        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Finance Name:"}
            {selectedLanguage === "zh-CN" && "财务名称："}
            {selectedLanguage === "th-TH" && "ชื่อทางการเงิน:"}
            {selectedLanguage === "vi-VN" && "Tên tài chính:"}
            {selectedLanguage === "ms-MY" && "Nama Kewangan:"}
            {selectedLanguage === "id-ID" && "Nama Keuangan:"}
            {selectedLanguage === "fil-PH" && "Pangalan ng Pananalapi:"}
          </span>{" "}
          {currentRequest?.finance}
        </p>

        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Customer User Name:"}
            {selectedLanguage === "fil-PH" && "Pangalan ng User ng Customer:"}
            {selectedLanguage === "ms-MY" && "Nama Pengguna Pelanggan:"}
            {selectedLanguage === "th-TH" && "ชื่อผู้ใช้ลูกค้า:"}
            {selectedLanguage === "vi-VN" && "Tên Người Dùng Của Khách Hàng:"}
            {selectedLanguage === "id-ID" && "Nama Pengguna Pelanggan:"}
            {selectedLanguage === "zh-CN" && "客户用户名："}
          </span>{" "}
          {currentRequest?.customerUserName}
        </p>
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Order Number:"}
            {selectedLanguage === "fil-PH" && "Numero ng Order:"}
            {selectedLanguage === "ms-MY" && "Nombor Pesanan:"}
            {selectedLanguage === "th-TH" && "หมายเลขออเดอร์:"}
            {selectedLanguage === "vi-VN" && "Số Đơn Hàng:"}
            {selectedLanguage === "id-ID" && "Nomor Pemesanan:"}
            {selectedLanguage === "zh-CN" && "订单编号："}
          </span>{" "}
          {currentRequest?.orderNumber}
        </p>

        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Order Amount:"}
            {selectedLanguage === "fil-PH" && "Halaga ng Order:"}
            {selectedLanguage === "ms-MY" && "Jumlah Pesanan:"}
            {selectedLanguage === "th-TH" && "จำนวนเงินที่สั่งซื้อ:"}
            {selectedLanguage === "vi-VN" && "Số Tiền Đặt Hàng:"}
            {selectedLanguage === "id-ID" && "Jumlah Pemesanan:"}
            {selectedLanguage === "zh-CN" && "订单金额："}
          </span>{" "}
          {currentRequest?.orderAmount}
        </p>
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Order Date:"}
            {selectedLanguage === "fil-PH" && "Petsa ng Order:"}
            {selectedLanguage === "ms-MY" && "Tarikh Pesanan:"}
            {selectedLanguage === "th-TH" && "วันที่สั่งซื้อ:"}
            {selectedLanguage === "vi-VN" && "Ngày Đặt Hàng:"}
            {selectedLanguage === "id-ID" && "Tanggal Pemesanan:"}
            {selectedLanguage === "zh-CN" && "订单日期："}
          </span>{" "}
          {currentRequest?.orderDate}
        </p>
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Refund Amount:"}
            {selectedLanguage === "fil-PH" && "Halaga ng Refund:"}
            {selectedLanguage === "ms-MY" && "Jumlah Pampasaran:"}
            {selectedLanguage === "th-TH" && "จำนวนเงินที่คืน:"}
            {selectedLanguage === "vi-VN" && "Số Tiền Hoàn Trả:"}
            {selectedLanguage === "id-ID" && "Jumlah Pengembalian:"}
            {selectedLanguage === "zh-CN" && "退款金额："}
          </span>{" "}
          {currentRequest?.refundAmount}
        </p>
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Customer Bank Name:"}
            {selectedLanguage === "fil-PH" && "Pangalan ng Bank ng Customer:"}
            {selectedLanguage === "ms-MY" && "Nama Bank Pelanggan:"}
            {selectedLanguage === "th-TH" && "ชื่อธนาคารของลูกค้า:"}
            {selectedLanguage === "vi-VN" && "Tên Ngân Hàng Của Khách Hàng:"}
            {selectedLanguage === "id-ID" && "Nama Bank Pelanggan:"}
            {selectedLanguage === "zh-CN" && "客户银行名称："}
          </span>{" "}
          {currentRequest?.customerBankName}
        </p>

        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Customer Bank Account Name:"}
            {selectedLanguage === "fil-PH" && "Pangalan ng Account ng Bank ng Customer:"}
            {selectedLanguage === "ms-MY" && "Nama Akaun Bank Pelanggan:"}
            {selectedLanguage === "th-TH" && "ชื่อบัญชีธนาคารของลูกค้า:"}
            {selectedLanguage === "vi-VN" && "Tên Tài Khoản Ngân Hàng Của Khách Hàng:"}
            {selectedLanguage === "id-ID" && "Nama Rekening Bank Pelanggan:"}
            {selectedLanguage === "zh-CN" && "客户银行账户名称："}
          </span>{" "}
          {currentRequest?.customerBankAccountName}
        </p>
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Customer Bank Swift:"}
            {selectedLanguage === "fil-PH" && "Customer Bank Swift:"}
            {selectedLanguage === "ms-MY" && "Kod SWIFT Bank Pelanggan:"}
            {selectedLanguage === "th-TH" && "รหัส SWIFT ของธนาคารของลูกค้า:"}
            {selectedLanguage === "vi-VN" && "Mã SWIFT Ngân Hàng Của Khách Hàng:"}
            {selectedLanguage === "id-ID" && "Kode SWIFT Bank Pelanggan:"}
            {selectedLanguage === "zh-CN" && "客户银行代码："}
          </span>{" "}
          {currentRequest?.customerBankSwift}
        </p>
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Customer Receiving Account:"}
            {selectedLanguage === "fil-PH" && "Customer Receiving Account:"}
            {selectedLanguage === "ms-MY" && "Akaun Penerimaan Pelanggan:"}
            {selectedLanguage === "th-TH" && "บัญชีรับของลูกค้า:"}
            {selectedLanguage === "vi-VN" && "Tài Khoản Nhận Tiền Của Khách Hàng:"}
            {selectedLanguage === "id-ID" && "Akun Penerimaan Pelanggan:"}
            {selectedLanguage === "zh-CN" && "客户收款账户："}
          </span>{" "}
          {currentRequest?.customerReceivingAccount}
        </p>
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Customer Receiving Amount:"}
            {selectedLanguage === "fil-PH" && "Halaga ng Pagsusulit ng Customer:"}
            {selectedLanguage === "ms-MY" && "Jumlah Penerimaan Pelanggan:"}
            {selectedLanguage === "th-TH" && "จำนวนเงินที่ลูกค้าได้รับ:"}
            {selectedLanguage === "vi-VN" && "Số Tiền Nhận Của Khách Hàng:"}
            {selectedLanguage === "id-ID" && "Jumlah Penerimaan Pelanggan:"}
            {selectedLanguage === "zh-CN" && "客户收款金额："}
          </span>{" "}
          {currentRequest?.customerReceivingAmount}
        </p>

        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Refund Reason:"}
            {selectedLanguage === "fil-PH" && "Dahilan ng Pagsusulit:"}
            {selectedLanguage === "ms-MY" && "Sebab Pembayaran Balik:"}
            {selectedLanguage === "th-TH" && "เหตุผลในการขอคืนเงิน:"}
            {selectedLanguage === "vi-VN" && "Lý Do Hoàn Tiền:"}
            {selectedLanguage === "id-ID" && "Alasan Pengembalian Dana:"}
            {selectedLanguage === "zh-CN" && "退款原因："}
          </span>{" "}
          {currentRequest?.refundReason}
        </p>
        {currentRequest?.refundReason === "Others" && (
          <p>
            <span className="font-semibold">
              {selectedLanguage === "en-US" && "Other Reason:"}
              {selectedLanguage === "fil-PH" && "Iba Pang Dahilan:"}
              {selectedLanguage === "ms-MY" && "Sebab Lain:"}
              {selectedLanguage === "th-TH" && "เหตุผลอื่น ๆ:"}
              {selectedLanguage === "vi-VN" && "Lý Do Khác:"}
              {selectedLanguage === "id-ID" && "Alasan Lain:"}
              {selectedLanguage === "zh-CN" && "其他原因："}
            </span>{" "}
            {currentRequest?.otherReason}
          </p>
        )}
        <p>
          <span className="font-semibold">
            {selectedLanguage === "en-US" && "Remarks:"}
            {selectedLanguage === "fil-PH" && "Mga Tala:"}
            {selectedLanguage === "ms-MY" && "Ulasan:"}
            {selectedLanguage === "th-TH" && "หมายเหตุ:"}
            {selectedLanguage === "vi-VN" && "Ghi Chú:"}
            {selectedLanguage === "id-ID" && "Catatan:"}
            {selectedLanguage === "zh-CN" && "备注："}
          </span>{" "}
          {currentRequest?.remarks}
        </p>

        {
          currentRequest?.customerServiceLeaderStatus === "true" && <p>
            <span className="font-semibold">
              {selectedLanguage === "en-US" && "Approved Leader By:"}
              {selectedLanguage === "zh-CN" && "批准领导者："}
              {selectedLanguage === "th-TH" && "ผู้นำที่ได้รับการอนุมัติ："}
              {selectedLanguage === "vi-VN" && "Người Duyệt theo đơn vị chủ quản:"}
              {selectedLanguage === "ms-MY" && "Disahkan Oleh Pemimpin:"}
              {selectedLanguage === "id-ID" && "Disetujui Oleh Pimpinan:"}
              {selectedLanguage === "fil-PH" && "Aprubadong Lider Mula:"}

            </span>{" "}
            {currentRequest?.leaderBy}
          </p>
        }

        {
          currentRequest?.wareHouseStatus === "true" && <p>
            <span className="font-semibold">
              {selectedLanguage === "en-US" && "Approved Warehouse Man By:"}
              {selectedLanguage === "zh-CN" && "仓库管理员审批人："}
              {selectedLanguage === "th-TH" && "ผู้ดูแลคลังสินค้าที่ได้รับการอนุมัติ："}
              {selectedLanguage === "vi-VN" && "Người Quản lý kho đã duyệt bởi:"}
              {selectedLanguage === "ms-MY" && "Disahkan Oleh Pengurus Gudang:"}
              {selectedLanguage === "id-ID" && "Disetujui Oleh Manajer Gudang:"}
              {selectedLanguage === "fil-PH" && "Aprubadong Punong Warehouse Mula:"}

            </span>{" "}
            {currentRequest?.warehouseBy}
          </p>
        }


        {
          currentRequest?.warehouseManagerStatus === "true" && <p>
            <span className="font-semibold">
              {selectedLanguage === "en-US" && "Approved Warehouse Manager By:"}
              {selectedLanguage === "zh-CN" && "仓库经理批准："}
              {selectedLanguage === "th-TH" && "ผู้จัดการคลังสินค้าอนุมัติโดย："}
              {selectedLanguage === "vi-VN" && "Người Quản lý kho đã duyệt bởi:"}
              {selectedLanguage === "ms-MY" && "Diluluskan Oleh Pengurus Gudang:"}
              {selectedLanguage === "id-ID" && "Disetujui Oleh Manajer Gudang:"}
              {selectedLanguage === "fil-PH" && "Aprubadong Manager ng Warehouse Mula:"}

            </span>{" "}
            {currentRequest?.warehouseManagerBy}
          </p>
        }


        {
          currentRequest?.financeStatus === "true" && <p>
            <span className="font-semibold">
              {selectedLanguage === "en-US" && "Approved Finance By:"}
              {selectedLanguage === "zh-CN" && "财务审批人："}
              {selectedLanguage === "th-TH" && "ผู้อนุมัติทางการเงิน："}
              {selectedLanguage === "vi-VN" && "Người Quản lý tài chính đã duyệt bởi:"}
              {selectedLanguage === "ms-MY" && "Diluluskan Oleh Kewangan:"}
              {selectedLanguage === "id-ID" && "Disetujui Oleh Keuangan:"}
              {selectedLanguage === "fil-PH" && "Aprubadong Pinansyal Mula:"}

            </span>{" "}
            {currentRequest?.financeBy}
          </p>
        }


        {
          user?.role === "~Warehouse~" && currentRequest?.wareHouseStatus === "false"
          &&

          <div className=" grid  grid-cols-2 text-start mr-14">

            <input className=' required bg-white' type="file" multiple onChange={handleImageChange} accept="image/*" />
            <btn onClick={handleSubmit} className=" bg-green-400 h-10 px-3 py-1 w-20 rounded hover:cursor-pointer">{selectedLanguage === "en-US" && "Upload"}
              {selectedLanguage === "zh-CN" && "上传"}
              {selectedLanguage === "fil-PH" && "Mag-upload"}
              {selectedLanguage === "ms-MY" && "Muat naik"}
              {selectedLanguage === "th-TH" && "อัปโหลด"}
              {selectedLanguage === "vi-VN" && "Tải lên"}
              {selectedLanguage === "id-ID" && "Unggah"}</btn>
          </div>

        }




        {currentRequest.warehouseImg && currentRequest.warehouseImg.length > 0 && (
          <div className="flex">
            <h3> {selectedLanguage === "en-US" && "Warehouse Images:"}
              {selectedLanguage === "zh-CN" && "仓库图片："}
              {selectedLanguage === "fil-PH" && "Mga Larawan ng Warehouse:"}
              {selectedLanguage === "ms-MY" && "Gambar Gudang:"}
              {selectedLanguage === "th-TH" && "รูปภาพคลังสินค้า:"}
              {selectedLanguage === "vi-VN" && "Hình ảnh Kho hàng:"}
              {selectedLanguage === "id-ID" && "Gambar Gudang:"}</h3>
            {currentRequest.warehouseImg.split(',').map((filename) => (
              <img
                key={filename}
                src={`http://localhost:5000/tht/warehouseImages/${filename}`}
                alt={filename}
                onClick={() => handleImageClick(`http://localhost:5000/tht/warehouseImages/${filename}`)}
                className="w-24 h-24 object-cover cursor-pointer mx-4 my-2 rounded-lg"
              />
            ))}
          </div>
        )}

        {
          user?.role === "~Finance~" && currentRequest?.financeStatus === "false"
          &&
          <div className="grid  grid-cols-2 text-start mr-14">

            <input className='required bg-white' type="file" multiple onChange={handleImageChange} accept="image/*" />
            <button onClick={handleFinanceSubmit} className=" bg-green-400 h-10 px-3 py-1 w-20 rounded hover:cursor-pointer">{selectedLanguage === "en-US" && "Upload"}
              {selectedLanguage === "zh-CN" && "上传"}
              {selectedLanguage === "fil-PH" && "Mag-upload"}
              {selectedLanguage === "ms-MY" && "Muat naik"}
              {selectedLanguage === "th-TH" && "อัปโหลด"}
              {selectedLanguage === "vi-VN" && "Tải lên"}
              {selectedLanguage === "id-ID" && "Unggah"}</button>
          </div>


        }

        {currentRequest.financeImg && currentRequest.financeImg.length > 0 && (
          <div className="flex">
            <h3>Finance Images:</h3>
            {currentRequest.financeImg.split(',').map((filename) => (
              <img
                key={filename}
                src={`http://localhost:5000/tht/financeImages/${filename}`}
                alt={filename}
                onClick={() => handleImageClick(`http://localhost:5000/tht/financeImages/${filename}`)}
                className="w-24 h-24 object-cover cursor-pointer mx-4 my-2 rounded-lg"
              />
            ))}
          </div>
        )}
        {/* <p>Finance Images:</p>
      <div className="image-container">
      {(currentRequest?.financeImg)?.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/tht/financeImages/${image}`}
            alt={`Finance Image ${index + 1}`}
            onClick={() => handleImageClick(image)}
            className="image-thumbnail"
          />
        ))}
      </div> */}



      </div>
      {/* Modal or Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40">
          <div className="max-w-3xl max-h-3xl">
            <img
              src={selectedImage}
              alt="Selected Image"
              className="mx-auto max-w-10/12 max-h-10/12"
            />
            <button
              onClick={handleCloseImage}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}






      {
        user?.role === "~Warehouse~" && currentRequest?.wareHouseStatus === "false"
        &&
        <div className="mt-10 flex justify-end items-center">
          <div className=" flex justify-end ">
            <Link to="/refund">
              <btn className="font-semibold mr-5 hover:cursor-pointer bg-red-300 px-5 py-2 rounded-tl-lg rounded-br-lg">Cancel</btn>
            </Link>
          </div>

          <div className=" flex justify-end ">
            <btn onClick={() => updateWarehouseStatus(currentRequest?.orderNumber)} className="font-semibold hover:cursor-pointer bg-yellow-200 px-5 py-2 rounded-tl-lg rounded-br-lg">Approve</btn>
          </div>
        </div>
      }

      {
        user?.role === "~Customer-Service-Leader~" && currentRequest?.customerServiceLeaderStatus === "false"
        &&
        <div className="mt-10 flex justify-end items-center">
          <div className=" flex justify-end ">
            <Link to="/refund">
              <btn className="font-semibold mr-5 hover:cursor-pointer bg-red-300 px-5 py-2 rounded-tl-lg rounded-br-lg">Cancel</btn>
            </Link>
          </div>

          <div className=" flex justify-end ">
            <btn onClick={() => updateLeaderStatus(currentRequest?.orderNumber)} className="font-semibold hover:cursor-pointer bg-yellow-200 px-5 py-2 rounded-tl-lg rounded-br-lg">Approve</btn>
          </div>
        </div>
      }

      {/* {
                currentRequest?.customerServiceLeaderStatus==="false" && currentRequest?.special===true && currentRequest?.wareHouseStatus==="false" ?
                <div className="mt-10 flex justify-end items-center">
                <div className=" flex justify-end ">
                    <Link to="/refund">
                        <btn className="font-semibold mr-5 hover:cursor-pointer bg-red-300 px-5 py-2 rounded-tl-lg rounded-br-lg">Cancel</btn>
                    </Link>
                </div>

                <div className=" flex justify-end ">
                    <btn onClick={() => updateWarehouseStatus(currentRequest?.orderNumber)} className="font-semibold hover:cursor-pointer bg-yellow-200 px-5 py-2 rounded-tl-lg rounded-br-lg">Approve</btn>
                </div>
            </div> :
            ""
            } */}

      {
        user?.role === "~Warehouse-Manager~" && currentRequest?.warehouseManagerStatus === "false"
        &&
        <div className="mt-10 flex justify-end items-center">
          <div className=" flex justify-end ">
            <Link to="/refund">
              <btn className="font-semibold mr-5 hover:cursor-pointer bg-red-300 px-5 py-2 rounded-tl-lg rounded-br-lg">Cancel</btn>
            </Link>
          </div>

          <div className=" flex justify-end ">
            <btn onClick={() => handleToUpdateWarehouseManagerStatus(currentRequest?.orderNumber)} className="font-semibold hover:cursor-pointer bg-yellow-200 px-5 py-2 rounded-tl-lg rounded-br-lg">Approve</btn>
          </div>
        </div>
      }

      {
        user?.role === "~Finance~" && currentRequest?.financeStatus === "false"
        &&
        <div className="mt-10 flex justify-end items-center">
          <div className=" flex justify-end ">
            <Link to="/refund">
              <btn className="font-semibold mr-5 hover:cursor-pointer bg-red-300 px-5 py-2 rounded-tl-lg rounded-br-lg">{selectedLanguage === "en-US" && "Cancel"}
                {selectedLanguage === "zh-CN" && "取消"}
                {selectedLanguage === "fil-PH" && "Kanselahin"}
                {selectedLanguage === "ms-MY" && "Batal"}
                {selectedLanguage === "th-TH" && "ยกเลิก"}
                {selectedLanguage === "vi-VN" && "Hủy bỏ"}
                {selectedLanguage === "id-ID" && "Batal"}</btn>
            </Link>
          </div>

          <div className=" flex justify-end ">
            <btn onClick={() => handleToUpdateWarehouseManagerStatus(currentRequest?.orderNumber)} className="font-semibold hover:cursor-pointer bg-yellow-200 px-5 py-2 rounded-tl-lg rounded-br-lg">{selectedLanguage === "en-US" && "Approve"}
              {selectedLanguage === "zh-CN" && "批准"}
              {selectedLanguage === "fil-PH" && "Aprubahan"}
              {selectedLanguage === "ms-MY" && "Lulus"}
              {selectedLanguage === "th-TH" && "อนุมัติ"}
              {selectedLanguage === "vi-VN" && "Phê duyệt"}
              {selectedLanguage === "id-ID" && "Setuju"}</btn>
          </div>
        </div>
      }


      {/* modal part start from here to update a user information */}
      {editingRequest && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 w-7/12 max-h-screen overflow-scroll mx-auto">
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
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                /> </div>

              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                /> </div>


              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                />
              </div>


              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                /> </div>

              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                />
              </div>


              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                /> </div>

              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                />
              </div>

              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                /> </div>
              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                /> </div>


              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                />
              </div>


              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                /> </div>


              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                /> </div>

              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                /> </div>


              <div className="mb-1 flex justify-between items-center">
                <label className="text-left" htmlFor="customerOrderNumber">
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
                  className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                /> </div>

              {/* Add other input fields for the remaining form data */}
              {
                editingRequest.otherReason &&
                <>
                  <div className="flex justify-between items-center mb-5">
                    <label className="text-left" htmlFor="customerOrderNumber">
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
                      className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                    /> </div>
                </>
              }

              <div className="mb-1 flex justify-between items-center">
                <div>
                  <label className="text-left" htmlFor="Applicant Name">
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
                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                  />
                </div>
                <div>
                  <label className="text-left" htmlFor="orderDate">
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
                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
                  />
                </div>
                <div>


                  <label className="text-left" htmlFor="orderTime">
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
                    className="mb-2 px-4 py-2 border border-gray-300 bg-white rounded-md w-8/12"
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

export default DetailsLayout;

