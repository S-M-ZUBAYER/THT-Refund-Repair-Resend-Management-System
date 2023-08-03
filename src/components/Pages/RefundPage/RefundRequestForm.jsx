import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';
import axios from 'axios';

const RefundRequestForm = () => {
  const { allRefundRequest, setAllRefundRequest, user, selectedLanguage } = useContext(AuthContext);


  const [orderNumber, setOrderNumber] = useState('');
  const [orderTime, setOrderTime] = useState(new Date().toLocaleTimeString());
  const [shopName, setShopName] = useState('');
  const [customerUserName, setCustomerUserName] = useState('');
  const [customerPhoneNo, setCustomerPhoneNo] = useState('');
  const [customerOrderNumber, setCustomerOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderAmount, setOrderAmount] = useState('');
  const [customerReturnTrackingNumber, setCustomerReturnTrackingNumber] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [customerReceivingAmount, setCustomerReceivingAmount] = useState('');
  const [customerReceivingAccount, setCustomerReceivingAccount] = useState('');
  const [customerBankName, setCustomerBankName] = useState('');
  const [customerBankAccountName, setCustomerBankAccountName] = useState('');
  const [customerBankSwift, setCustomerBankSwift] = useState('');
  const [remarks, setRemarks] = useState('');
  const [applicantName, setApplicantName] = useState(user?.customerUserName);
  const [applicationDate, setApplicationDate] = useState(new Date().toLocaleDateString());
  const [countryCode, setCountryCode] = useState("");
  const [shopNames, setShopNames] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [timeNumber, setTimeNumber] = useState("");
  const [dataNumber, setDateNumber] = useState("");
  const [special, setSpecial] = useState(false);




  useEffect(() => {
    const fetchShopNamesReasons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tht/shopNamesReasons');
        const data = response.data[0]; // Assuming the response data is an array with one object containing shop names and reasons
        setShopNames((data.shopNames).split(","));
        setReasons((data.reasons).split(","));
        console.log(shopNames, reasons);
      } catch (error) {
        console.error('Error fetching shop names:', error);
      }
    };

    fetchShopNamesReasons();
  }, []);


  const handleOptionChange = () => {
    console.log(special)
    setSpecial((prevState) => !prevState);
  };


  const generateRandomNumber = () => {
    // Your function to generate a random number
    return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  };

  const handleToGenerateOrderNumber = () => {
    if (!user || !user.country) {
      // Return null or an error message if user is undefined, null, or country is not available
      return null;
    }

    let countryCode = '';
    if (user.country === 'Bangladesh') {
      countryCode = '101';
    } else if (user.country === 'China') {
      countryCode = '102';
    } else if (user.country === 'Indonesia') {
      countryCode = '103';
    } else if (user.country === 'Thailand') {
      countryCode = '104';
    } else if (user.country === 'Singapore' || user.country === 'Malaysia') {
      countryCode = '105';
    } else {
      // Handle other countries or invalid cases here
      return null;
    }

    const randomNumber = generateRandomNumber();
    const timeNumber = new Date().toLocaleTimeString().split(' ')[0].split(':');
    const dateNumber = new Date().toLocaleDateString().split('/');
    const orderNumber = `${timeNumber[0]}${timeNumber[1]}${timeNumber[2]}${dateNumber[1]}${dateNumber[0]}${dateNumber[2]}${countryCode}${randomNumber}`;

    setOrderNumber(orderNumber);
  };



  // orderNumber=handleToGenerateOrderNumber(user);
  console.log(orderNumber); // Output: "HHMMSSDDMMYY1011234" (generated order number based on user's country)



  // const handleToGenerateOrderNumber = () => {
  //   setCountryCode(user?.country === "Bangladesh" && "101" || user?.country === "China" && "102" || user?.country === "Indonesia" && "103" || user?.country === "Thailand" && "104" || user?.country === "Singapore" && "105" || user?.country === "Malaysia" && "105");
  //   const randomNumber = generateRandomNumber();
  //   setTimeNumber((((new Date().toLocaleTimeString()).split(" ")[0]).split(":")));
  //   setDateNumber((new Date().toLocaleDateString()).split("/"))
  //   setOrderNumber(`${timeNumber[0]}${timeNumber[1]}${timeNumber[2]}${dataNumber[0]}${dataNumber[1]}${dataNumber[2]}${countryCode}${randomNumber} `);
  // }


  const handleToSetDateTime = () => {
    setApplicationDate(new Date().toLocaleDateString());
    setOrderTime(new Date().toLocaleTimeString());


  }

  // function generateRandomNumber() {
  //   const min = 1000; // Minimum four-digit number (inclusive)
  //   const max = 9999; // Maximum four-digit number (inclusive)
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }




  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (orderNumber === "" || shopName === "" || customerUserName === "" || customerPhoneNo === "" || customerOrderNumber === "" || orderDate === "" || orderAmount === "" || customerReturnTrackingNumber === "" || refundReason === "" || refundAmount === "" || customerReceivingAccount === "" || customerBankName === "" || customerReceivingAmount === "" || refundReason === "" || customerBankAccountName === "" || customerBankSwift === "") {
      toast.error(
        selectedLanguage === "en-US"
          ? "Please input all information properly"
          : selectedLanguage === "zh-CN"
            ? "请输入正确的所有信息"
            : selectedLanguage === "th-TH"
              ? "โปรดป้อนข้อมูลทั้งหมดให้ถูกต้อง"
              : selectedLanguage === "fil-PH"
                ? "Mangyaring maglagay ng lahat ng impormasyon nang maayos"
                : selectedLanguage === "vi-VN"
                  ? "Vui lòng nhập đầy đủ thông tin một cách đúng đắn"
                  : selectedLanguage === "ms-MY"
                    ? "Sila masukkan semua maklumat dengan betul"
                    : selectedLanguage === "id-ID"
                      ? "Harap masukkan semua informasi dengan benar"
                      : "Please input all information properly" // Default fallback language
      );

      return
    }

    // Form data object
    const formData = {
      orderNumber,
      orderTime: orderTime,
      shopName,
      customerUserName,
      customerPhoneNo,
      customerOrderNumber,
      orderDate,
      orderAmount,
      customerReturnTrackingNumber,
      refundReason,
      otherReason,
      refundAmount,
      customerReceivingAmount,
      customerReceivingAccount,
      customerBankName,
      customerBankAccountName,
      customerBankSwift,
      remarks,
      warehouseImg: "",
      financeImg: "",
      applicantName: user?.name,
      applicationDate: applicationDate,
      customerServiceStatus: "true",
      customerServiceLeaderStatus: "false",
      warehouseStatus: "false",
      warehouseManagerStatus: "false",
      financeStatus: "false",
      supplierStatus: "false",
      special

    };

    console.log(formData);
    fetch('http://localhost:5000/tht/refundRequest/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data stored successfully:', data);
        toast.success("Data stored successfully");
        setAllRefundRequest([...allRefundRequest, formData]);


        // setOrderTime("");
        setOrderNumber("");
        setShopName("");
        setCustomerUserName("");
        setCustomerPhoneNo("");
        setCustomerOrderNumber("");
        setOrderDate("");
        setOrderAmount("");
        setCustomerReturnTrackingNumber("");
        setRefundReason("");
        setOtherReason("");
        setRefundAmount("");
        setCustomerReceivingAmount("");
        setCustomerReceivingAccount("");
        setCustomerBankName("");
        setCustomerBankAccountName("");
        setCustomerBankSwift("");
        setRemarks("");
        setApplicantName("");
        setSpecial(false);
        // setApplicationDate("");



      })
      .catch((error) => {
        toast.error("Error occurred during the request")
        console.error('Error occurred during the request:', error);
      });
  };

  return (
    <form onSubmit={handleFormSubmit} onClick={handleToSetDateTime} className="w-full px-5 py-5 border-2">
      <h2 className="text-xl font-semibold mb-8 py-2 bg-cyan-200">{
        selectedLanguage === "zh-CN" && "退款申请表格"
      }
        {
          selectedLanguage === "en-US" && "Refund Request Form"
        }
        {
          selectedLanguage === "fil-PH" && "Form ng Request for Refund"
        }
        {
          selectedLanguage === "ms-MY" && "Borang Permohonan Refund"
        }
        {
          selectedLanguage === "th-TH" && "แบบฟอร์มคำขอคืนเงิน"
        }
        {
          selectedLanguage === "vi-VN" && "Biểu mẫu Yêu cầu Hoàn tiền"
        }
        {
          selectedLanguage === "id-ID" && "Formulir Permohonan Pengembalian Dana"
        }
      </h2>

      <div className="grid grid-cols-1">

        <div onClick={handleToGenerateOrderNumber} className="mb-4 flex justify-between items-center">
          <label htmlFor="orderNumber">{
            selectedLanguage === "zh-CN" && "订单号码："
          }{
              selectedLanguage === "en-US" && "Order Number:"
            }{
              selectedLanguage === "fil-PH" && "Numero ng Order:"
            }{
              selectedLanguage === "ms-MY" && "Nombor Pesanan:"
            }{
              selectedLanguage === "th-TH" && "หมายเลขใบสั่งซื้อ:"
            }{
              selectedLanguage === "vi-VN" && "Mã số đơn hàng:"
            }{
              selectedLanguage === "id-ID" && "Nomor Pesanan:"
            }</label>
          <input
            type="text"
            id="orderNumber"
            className="border rounded-md p-2 w-9/12"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="shopName">{
            selectedLanguage === "zh-CN" && "店铺名称："
          }{
              selectedLanguage === "en-US" && "Shop Name:"
            }{
              selectedLanguage === "fil-PH" && "Pangalan ng Tindahan:"
            }{
              selectedLanguage === "ms-MY" && "Nama Kedai:"
            }{
              selectedLanguage === "th-TH" && "ชื่อร้านค้า:"
            }{
              selectedLanguage === "vi-VN" && "Tên Cửa hàng:"
            }{
              selectedLanguage === "id-ID" && "Nama Toko:"
            }</label>
          <select
            id="shopName"
            className="border rounded-md p-2 w-9/12"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          >
            <option value="">{
              selectedLanguage === "zh-CN" && "选择店铺名称"
            }{
                selectedLanguage === "en-US" && "Select Shop Name"
              }{
                selectedLanguage === "fil-PH" && "Pumili ng Pangalan ng Tindahan"
              }{
                selectedLanguage === "ms-MY" && "Pilih Nama Kedai"
              }{
                selectedLanguage === "th-TH" && "เลือกชื่อร้านค้า"
              }{
                selectedLanguage === "vi-VN" && "Chọn Tên Cửa hàng"
              }{
                selectedLanguage === "id-ID" && "Pilih Nama Toko"
              }</option>
            {
              shopNames.map((shop, index) => {
                return <option key={index} value={`${shop}`}>{shop}</option>
              })
            }


            {/* Add more options as needed */}
          </select>
        </div>



        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="customerUsername">{
            selectedLanguage === "zh-CN" && "客户用户名："
          }{
              selectedLanguage === "en-US" && "Customer User Name:"
            }{
              selectedLanguage === "fil-PH" && "Pangalan ng Customer ng User:"
            }{
              selectedLanguage === "ms-MY" && "Nama Pengguna Pelanggan:"
            }{
              selectedLanguage === "th-TH" && "ชื่อผู้ใช้ลูกค้า:"
            }{
              selectedLanguage === "vi-VN" && "Tên Người dùng Khách hàng:"
            }{
              selectedLanguage === "id-ID" && "Nama Pengguna Pelanggan:"
            }</label>
          <input
            type="text"
            id="customerUsername"
            className="border rounded-md p-2 w-9/12"
            value={customerUserName}
            onChange={(e) => setCustomerUserName(e.target.value)}
          />
        </div>


        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="customerPhoneNo">
            {selectedLanguage === "zh-CN" && "客户手机号码"}
            {selectedLanguage === "en-US" && "Customer Phone No"}
            {selectedLanguage === "fil-PH" && "Numero ng Telepono ng Customer"}
            {selectedLanguage === "ms-MY" && "Nombor Telefon Pelanggan"}
            {selectedLanguage === "th-TH" && "หมายเลขโทรศัพท์ลูกค้า"}
            {selectedLanguage === "vi-VN" && "Số Điện thoại Khách hàng"}
            {selectedLanguage === "id-ID" && "Nomor Telepon Pelanggan"}
          </label>
          <input
            type="text"
            id="customerPhoneNo"
            className="border rounded-md p-2 w-9/12"
            value={customerPhoneNo}
            onChange={(e) => setCustomerPhoneNo(e.target.value)}
          />
        </div>



        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="customerOrderNumber">{
            selectedLanguage === "zh-CN" && "客户订单编号："
          }{
              selectedLanguage === "en-US" && "Customer Order Number:"
            }{
              selectedLanguage === "fil-PH" && "Numero ng Order ng Customer:"
            }{
              selectedLanguage === "ms-MY" && "Nombor Pesanan Pelanggan:"
            }{
              selectedLanguage === "th-TH" && "หมายเลขคำสั่งซื้อของลูกค้า:"
            }{
              selectedLanguage === "vi-VN" && "Số Đơn đặt hàng của Khách hàng:"
            }{
              selectedLanguage === "id-ID" && "Nomor Pesanan Pelanggan:"
            }</label>
          <input
            type="text"
            id="customerOrderNumber"
            className="border rounded-md p-2 w-9/12"
            value={customerOrderNumber}
            onChange={(e) => setCustomerOrderNumber(e.target.value)}
          />
        </div>


        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="orderDate">{
            selectedLanguage === "zh-CN" && "订单日期："
          }{
              selectedLanguage === "en-US" && "Order Date:"
            }{
              selectedLanguage === "fil-PH" && "Petsa ng Order:"
            }{
              selectedLanguage === "ms-MY" && "Tarikh Pesanan:"
            }{
              selectedLanguage === "th-TH" && "วันที่สั่งซื้อ:"
            }{
              selectedLanguage === "vi-VN" && "Ngày Đặt hàng:"
            }{
              selectedLanguage === "id-ID" && "Tanggal Pemesanan:"
            }</label>
          <input
            type="date"
            id="orderDate"
            className="border rounded-md p-2 w-9/12"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="orderAmount">{
            selectedLanguage === "zh-CN" && "订单金额："
          }{
              selectedLanguage === "en-US" && "Order Amount:"
            }{
              selectedLanguage === "fil-PH" && "Halaga ng Order:"
            }{
              selectedLanguage === "ms-MY" && "Jumlah Pesanan:"
            }{
              selectedLanguage === "th-TH" && "จำนวนเงินที่สั่งซื้อ:"
            }{
              selectedLanguage === "vi-VN" && "Số tiền Đặt hàng:"
            }{
              selectedLanguage === "id-ID" && "Jumlah Pemesanan:"
            }</label>
          <input
            type="text"
            id="orderAmount"
            className="border rounded-md p-2 w-9/12"
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
          />
        </div>


        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="customerReturnTrackingNumber">{
            selectedLanguage === "zh-CN" && "运输追踪号码："
          }{
              selectedLanguage === "en-US" && "Shipping Tracking Number:"
            }{
              selectedLanguage === "fil-PH" && "Numero ng Pagmamanman sa Pagpapadala:"
            }{
              selectedLanguage === "ms-MY" && "Nombor Jejak Penghantaran:"
            }{
              selectedLanguage === "th-TH" && "หมายเลขติดตามการส่งสินค้า:"
            }{
              selectedLanguage === "vi-VN" && "Số theo dõi Vận chuyển:"
            }{
              selectedLanguage === "id-ID" && "Nomor Pelacakan Pengiriman:"
            }</label>
          <input
            type="text"
            id="customerReturnTrackingNumber"
            className="border rounded-md p-2 w-9/12"
            value={customerReturnTrackingNumber}
            onChange={(e) => setCustomerReturnTrackingNumber(e.target.value)}
          />
        </div>


        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="refundReason">{
            selectedLanguage === "zh-CN" && "退款原因："
          }{
              selectedLanguage === "en-US" && "Refund Reason:"
            }{
              selectedLanguage === "fil-PH" && "Dahilan ng Pabalik:"
            }{
              selectedLanguage === "ms-MY" && "Sebab Bayaran Balik:"
            }{
              selectedLanguage === "th-TH" && "เหตุผลการคืนเงิน:"
            }{
              selectedLanguage === "vi-VN" && "Lý do hoàn tiền:"
            }{
              selectedLanguage === "id-ID" && "Alasan Pengembalian Dana:"
            }</label>
          <select
            id="refundReason"
            className="border rounded-md p-2 w-9/12"
            value={refundReason}
            onChange={(e) => setRefundReason(e.target.value)}
          >
            <option value="">{
              selectedLanguage === "zh-CN" && "选择一个原因"
            }{
                selectedLanguage === "en-US" && "Select a reason"
              }{
                selectedLanguage === "fil-PH" && "Pumili ng isang dahilan"
              }{
                selectedLanguage === "ms-MY" && "Pilih satu sebab"
              }{
                selectedLanguage === "th-TH" && "เลือกเหตุผล"
              }{
                selectedLanguage === "vi-VN" && "Chọn một lý do"
              }{
                selectedLanguage === "id-ID" && "Pilih alasan"
              }</option>
            {
              reasons?.map((reason, index) => {
                return <option key={index} value={`${reason}`}>{reason}</option>
              })
            }
            <option value="Others">{
              selectedLanguage === "zh-CN" && "其他"
            }{
                selectedLanguage === "en-US" && "Others"
              }{
                selectedLanguage === "fil-PH" && "Iba pa"
              }{
                selectedLanguage === "ms-MY" && "Lain-lain"
              }{
                selectedLanguage === "th-TH" && "อื่น ๆ"
              }{
                selectedLanguage === "vi-VN" && "Khác"
              }{
                selectedLanguage === "id-ID" && "Lainnya"
              }</option>
          </select>
          {refundReason === 'Others' && (
            <div className="mt-2 flex justify-between items-center">
              <label htmlFor="otherReason">{
                selectedLanguage === "zh-CN" && "其他原因："
              }{
                  selectedLanguage === "en-US" && "Other Reason:"
                }{
                  selectedLanguage === "fil-PH" && "Iba pang Rason:"
                }{
                  selectedLanguage === "ms-MY" && "Sebab Lain-lain:"
                }{
                  selectedLanguage === "th-TH" && "เหตุผลอื่น ๆ:"
                }{
                  selectedLanguage === "vi-VN" && "Lý do khác:"
                }{
                  selectedLanguage === "id-ID" && "Alasan Lainnya:"
                }</label>
              <textarea
                type="text"
                id="otherReason"
                className="border rounded-md p-2 w-9/12"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            </div>
          )}
        </div>



        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="refundAmount">{
            selectedLanguage === "zh-CN" && "退款金额："
          }{
              selectedLanguage === "en-US" && "Refund Amount:"
            }{
              selectedLanguage === "fil-PH" && "Halaga ng Pabalik:"
            }{
              selectedLanguage === "ms-MY" && "Jumlah Bayaran Balik:"
            }{
              selectedLanguage === "th-TH" && "จำนวนเงินที่ต้องคืน:"
            }{
              selectedLanguage === "vi-VN" && "Số tiền hoàn tiền:"
            }{
              selectedLanguage === "id-ID" && "Jumlah Pengembalian Dana:"
            }</label>
          <input
            type="text"
            id="refundAmount"
            className="border rounded-md p-2 w-9/12"
            value={refundAmount}
            onChange={(e) => setRefundAmount(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="customerReceivingAmount">{
            selectedLanguage === "zh-CN" && "客户收款金额："
          }{
              selectedLanguage === "en-US" && "Customer Receiving Amount:"
            }{
              selectedLanguage === "fil-PH" && "Halaga ng Natanggap ng Customer:"
            }{
              selectedLanguage === "ms-MY" && "Jumlah Penerimaan Pelanggan:"
            }{
              selectedLanguage === "th-TH" && "จำนวนเงินที่ลูกค้าได้รับ:"
            }{
              selectedLanguage === "vi-VN" && "Số tiền nhận của khách hàng:"
            }{
              selectedLanguage === "id-ID" && "Jumlah Penerimaan Pelanggan:"
            }</label>
          <input
            type="text"
            id="customerReceivingAmount"
            className="border rounded-md p-2 w-9/12"
            value={customerReceivingAmount}
            onChange={(e) => setCustomerReceivingAmount(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="customerReceivingAccount">{
            selectedLanguage === "zh-CN" && "客户收款账户："
          }{
              selectedLanguage === "en-US" && "Customer Receiving Account:"
            }{
              selectedLanguage === "fil-PH" && "Account na Natanggap ng Customer:"
            }{
              selectedLanguage === "ms-MY" && "Akaun Penerimaan Pelanggan:"
            }{
              selectedLanguage === "th-TH" && "บัญชีที่ลูกค้าได้รับเงิน:"
            }{
              selectedLanguage === "vi-VN" && "Tài khoản nhận của khách hàng:"
            }{
              selectedLanguage === "id-ID" && "Akun Penerimaan Pelanggan:"
            }</label>
          <input
            type="text"
            id="customerReceivingAccount"
            className="border rounded-md p-2 w-9/12"
            value={customerReceivingAccount}
            onChange={(e) => setCustomerReceivingAccount(e.target.value)}
          />
        </div>


        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="customerBankName">{
            selectedLanguage === "zh-CN" && "客户银行名称："
          }{
              selectedLanguage === "en-US" && "Customer Bank Name:"
            }{
              selectedLanguage === "fil-PH" && "Pangalan ng Bangko ng Customer:"
            }{
              selectedLanguage === "ms-MY" && "Nama Bank Pelanggan:"
            }{
              selectedLanguage === "th-TH" && "ชื่อธนาคารของลูกค้า:"
            }{
              selectedLanguage === "vi-VN" && "Tên ngân hàng của khách hàng:"
            }{
              selectedLanguage === "id-ID" && "Nama Bank Pelanggan:"
            }</label>
          <input
            type="text"
            id="customerBankName"
            className="border rounded-md p-2 w-9/12"
            value={customerBankName}
            onChange={(e) => setCustomerBankName(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="customerBankAccountName">{
            selectedLanguage === "zh-CN" && "客户银行账户名："
          }{
              selectedLanguage === "en-US" && "Customer Bank Account Name:"
            }{
              selectedLanguage === "fil-PH" && "Pangalan ng Account ng Bangko ng Customer:"
            }{
              selectedLanguage === "ms-MY" && "Nama Akaun Bank Pelanggan:"
            }{
              selectedLanguage === "th-TH" && "ชื่อบัญชีธนาคารของลูกค้า:"
            }{
              selectedLanguage === "vi-VN" && "Tên tài khoản ngân hàng của khách hàng:"
            }{
              selectedLanguage === "id-ID" && "Nama Akun Bank Pelanggan:"
            }</label>
          <input
            type="text"
            id="customerBankAccountName"
            className="border rounded-md p-2 w-9/12"
            value={customerBankAccountName}
            onChange={(e) => setCustomerBankAccountName(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="customerBankSwift">{
            selectedLanguage === "zh-CN" && "客户银行 Swift 号码："
          }{
              selectedLanguage === "en-US" && "Customer Bank Swift:"
            }{
              selectedLanguage === "fil-PH" && "Mabilis na Bank ng Customer:"
            }{
              selectedLanguage === "ms-MY" && "Swift Bank Pelanggan:"
            }{
              selectedLanguage === "th-TH" && "รหัส Swift ของธนาคารของลูกค้า:"
            }{
              selectedLanguage === "vi-VN" && "Mã Swift của ngân hàng khách hàng:"
            }{
              selectedLanguage === "id-ID" && "Swift Bank Pelanggan:"
            }</label>
          <input
            type="text"
            id="customerBankSwift"
            className="border rounded-md p-2 w-9/12"
            value={customerBankSwift}
            onChange={(e) => setCustomerBankSwift(e.target.value)}
          />
        </div>


        <div className="flex items-center justify-end space-x-2 my-3 hover:cursor-pointer">
          <input
            type="radio"
            id="specialOption"
            checked={special}
            onClick={handleOptionChange}
            className={`appearance-none hover:cursor-pointer h-4 w-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${special ? 'bg-black' : ''}`}
          />
          <label
            htmlFor="specialOption"
            className={`px-2 py-1 rounded-md hover:cursor-pointer ${selectedLanguage === "zh-CN" && "text-black"
              } ${selectedLanguage === "en-US" && "text-black"
              } ${selectedLanguage === "fil-PH" && "text-black"
              } ${selectedLanguage === "ms-MY" && "text-black"
              } ${selectedLanguage === "th-TH" && "text-black"
              } ${selectedLanguage === "vi-VN" && "text-black"
              } ${selectedLanguage === "id-ID" && "text-black"
              }`}
          >
            {
              selectedLanguage === "zh-CN" && "特殊"
            }
            {
              selectedLanguage === "en-US" && "Special"
            }
            {
              selectedLanguage === "fil-PH" && "Espesyal"
            }
            {
              selectedLanguage === "ms-MY" && "Khas"
            }
            {
              selectedLanguage === "th-TH" && "พิเศษ"
            }
            {
              selectedLanguage === "vi-VN" && "Đặc biệt"
            }
            {
              selectedLanguage === "id-ID" && "Spesial"
            }
          </label>
        </div>


        <button type="submit" className="bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded">
          {
            selectedLanguage === "zh-CN" && "提交"
          }{
            selectedLanguage === "en-US" && "Submit"
          }{
            selectedLanguage === "fil-PH" && "Ipasa"
          }{
            selectedLanguage === "ms-MY" && "Hantar"
          }{
            selectedLanguage === "th-TH" && "ส่งคำขอ"
          }{
            selectedLanguage === "vi-VN" && "Gửi"
          }{
            selectedLanguage === "id-ID" && "Kirim"
          }
        </button>
      </div>
    </form>
  );
};

export default RefundRequestForm;
