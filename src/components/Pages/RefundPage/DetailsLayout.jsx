import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/UserContext';

const DetailsLayout = () => {
    const [loading, setLoading] = useState(false);
    const [currentRequest, setCurrentRequest] = useState([]);
    const [status, setStatus] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [warehouseImages, setWarehouseImages] = useState([]);
    const [financeImages, setFinanceImages] = useState([]);

    const { user, selectedLanguage } = useContext(AuthContext)


    const currentPath = window.location.pathname;


    console.log(currentRequest)

    // Split the path by '/'
    const segments = currentPath.split('/');

    // Get the last segment
    const lastValue = segments[segments.length - 1];


    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/refund`;
        navigate(path);
    }


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


    // const fetchSpecialData = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await axios.get('http://localhost:5000/tht/LeaderStatusSpecialRequest');
    //         const data = response.data;
    //         console.log(data); // You can process the data as needed
    //         setCurrentRequest(data[0])
    //         setLoading(false);
    //     } catch (error) {
    //         console.error('Error occurred during the request:', error);
    //         setLoading(false);
    //     }
    // };

    const fetchWarehoueManagerData = async (lastValue) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/tht/refundRequest/${lastValue}`);
            const data = response.data;
            console.log(data); // You can process the data as needed
            setCurrentRequest(data);
            console.log(currentRequest)
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
    console.log(currentRequest)

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleToUpdateWarehouseManagerStatus = async (orderNumber) => {
        const confirmed = window.confirm('Are you sure you want to approve this refund product?');
        if (!confirmed) {
            return; // Cancel the deletion if the user clicks Cancel or closes the modal
        }
        console.log(status)
        if (status === "warehouseManager") {
            console.log(status, "enter")
            try {
                const response = await axios.put(
                    `http://localhost:5000/tht/updateWarehouseManagerStatus/${orderNumber}`
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
                console.log(status, "enter")
                const response = await axios.put(
                    `http://localhost:5000/tht/updateFinanceStatus/${orderNumber}`
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

            const response = await axios.put(`http://localhost:5000/tht/refundRequest/updateWarehouseStatus/${orderNumber}`);

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
    console.log([currentRequest?.warehouseImg], "warehouse")

    return (
        <div className='max-w-[1240px] mx-auto py-16 px-4 text-center'>
            <div className=" mb-5">
                <h1><span className="bg-gradient-to-r from-blue-800 to-red-800 text-transparent bg-clip-text">{currentRequest?.customerUserName}</span> {selectedLanguage === "en-US" && "Refund Request Need To Check And Approved By"}
                    {selectedLanguage === "zh-CN" && "退款申请需要审核和批准"}
                    {selectedLanguage === "fil-PH" && "Ang refund request ay kailangang suriin at aprubahan ng"}
                    {selectedLanguage === "ms-MY" && "Permohonan Refund Perlu Diperiksa Dan Diluluskan Oleh"}
                    {selectedLanguage === "th-TH" && "ต้องตรวจสอบและอนุมัติคำขอคืนเงินโดย"}
                    {selectedLanguage === "vi-VN" && "Yêu cầu hoàn tiền cần được kiểm tra và phê duyệt bởi"}
                    {selectedLanguage === "id-ID" && "Permintaan Refund Perlu Diperiksa Dan Disetujui Oleh"} {user?.role}</h1>

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





                {/* {
   currentRequest?.customerServiceLeaderStatus==="true" && currentRequest?.wareHouseStatus==="false"
   ?

            <>   <div className=" grid  grid-cols-2 text-start mr-14">
                    
                    <input className=' required bg-white' type="file" multiple onChange={handleImageChange} accept="image/*" />
                <btn onClick={handleSubmit} className=" bg-green-400 px-3 py-1 w-20 rounded">Upload</btn>
                </div></> 
            :
            ""
} */}



                {/* {
   currentRequest?.customerServiceLeaderStatus==="false" && currentRequest?.special && currentRequest?.wareHouseStatus==="false"
   ?

            <>   <div className=" grid  grid-cols-2 text-start mr-14">
                    
                    <input className=' required bg-white' type="file" multiple onChange={handleImageChange} accept="image/*" />
                <btn onClick={handleSubmit} className=" bg-green-400 px-3 py-1 w-20 rounded">Upload</btn>
                </div></> 
            :
            ""
} */}



                {
                    user?.role === "Warehouse" && currentRequest?.wareHouseStatus === "false"
                    &&

                    <div className=" grid  grid-cols-2 text-start mr-14">

                        <input className=' required bg-white' type="file" multiple onChange={handleImageChange} accept="image/*" />
                        <btn onClick={handleSubmit} className=" bg-green-400 px-3 py-1 w-20 rounded hover:cursor-pointer">Upload</btn>
                    </div>

                }




                {/* <div className="image-container">
        {[currentRequest?.warehouseImg].map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/tht/warehouseImages/${image[0]}`}
            alt={`Warehouse Image ${index + 1}`}
            onClick={() => handleImageClick(image)}
            className="image-thumbnail"
          />
        ))}
      </div> */}
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
                    user?.role === "Finance" && currentRequest?.financeStatus === "false"
                    &&
                    <div className="grid  grid-cols-2 text-start mr-14">

                        <input className='required bg-white' type="file" multiple onChange={handleImageChange} accept="image/*" />
                        <button onClick={handleFinanceSubmit} className=" bg-green-400 px-3 py-1 w-20 rounded hover:cursor-pointer">{selectedLanguage === "en-US" && "Upload"}
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
                user?.role === "Warehouse" && currentRequest?.wareHouseStatus === "false"
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
                user?.role === "Finance" && currentRequest?.financeStatus === "false"
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


        </div>

    );
};

export default DetailsLayout;

