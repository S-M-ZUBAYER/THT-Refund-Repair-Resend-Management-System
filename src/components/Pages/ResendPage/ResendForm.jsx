import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';

const ResendForm = () => {
  const { allRefundRequest, setAllRefundRequest, user } = useContext(AuthContext);


  const [orderNumber, setOrderNumber] = useState('');
  const [orderTime, setOrderTime] = useState(new Date().toLocaleTimeString());
  const [shopName, setShopName] = useState('');
  const [customerUserName, setCustomerUserName] = useState('');
  const [customerOrderNumber, setCustomerOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [customerReturnTrackingNumber, setCustomerReturnTrackingNumber] = useState('');
  const [resendReason, setResendReason] = useState('');
  const [resendItem, setResendItem] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [otherItem, setOtherItem] = useState('');
  const [resendAmount, setRefundAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [remarks, setRemarks] = useState('');
  const [applicantName, setApplicantName] = useState(user?.customerUserName);
  const [applicationDate, setApplicationDate] = useState(new Date().toLocaleDateString());
  const [countryCode, setCountryCode] = useState("");
  const [timeNumber, setTimeNumber] = useState("");
  const [dataNumber, setDateNumber] = useState("");
  const [special, setSpecial] = useState(false);

  const handleOptionChange = () => {
    setSpecial((prevState) => !prevState);
  };


  const handleToGenerateOrderNumber = () => {
    setCountryCode(user?.country === "Bangladesh" && "101" || user?.country === "China" && "102" || user?.country === "Indonesia" && "103" || user?.country === "Thailand" && "104" || user?.country === "Singapore" && "105" || user?.country === "Malaysia" && "105");
    const randomNumber = generateRandomNumber();
    setTimeNumber((((new Date().toLocaleTimeString()).split(" ")[0]).split(":")));
    setDateNumber((new Date().toLocaleDateString()).split("/"))
    setOrderNumber(`${timeNumber[0]}${timeNumber[1]}${timeNumber[2]}${dataNumber[0]}${dataNumber[1]}${dataNumber[2]}${countryCode}${randomNumber} `);
  }


  const handleToSetDateTime = () => {
    setApplicationDate(new Date().toLocaleDateString());
    setOrderTime(new Date().toLocaleTimeString());


  }

  function generateRandomNumber() {
    const min = 1000; // Minimum four-digit number (inclusive)
    const max = 9999; // Maximum four-digit number (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Form data object
    const formData = {
      orderNumber,
      orderTime: orderTime,
      shopName,
      customerUserName,
      customerOrderNumber,
      orderDate,
      itemQuantity,
      customerReturnTrackingNumber,
      resendReason,
      otherReason,
      resendAmount,
      phoneNumber,
      address,
      remarks,
      warehouseImg: "",
      financeImg: "",
      applicantName: user?.name,
      applicationDate: applicationDate,
      customerServiceStatus: "true",
      customerServiceLeaderStatus: "false",
      warehouseReceivedStatus: "false",
      warehouseResendStatus: "false",
      special

    };

    fetch('http://localhost:5000/tht/resendRequest/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Data stored successfully");
        setAllRefundRequest([...allRefundRequest, formData]);


        // setOrderTime("");
        setOrderNumber("");
        setShopName("");
        setCustomerUserName("");
        setCustomerOrderNumber("");
        setOrderDate("");
        setItemQuantity("");
        setCustomerReturnTrackingNumber("");
        setResendReason("");
        setResendItem("");
        setOtherReason("");
        setOtherItem("");
        setRefundAmount("");
        setRecipientName("");
        setPhoneNumber("");
        setAddress("");
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
      <h2 className="text-xl font-semibold mb-8 py-2 bg-lime-200">Resend Form</h2>

      <div className="grid grid-cols-1">

        <div onClick={handleToGenerateOrderNumber} className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="orderNumber">Order Number:</label>
          <input
            type="text"
            id="orderNumber"
            className="border rounded-md p-2 w-8/12"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="applicantName">Work Order Time:</label>
          <input
            type="text"
            id="applicationTime"
            className="border rounded-md p-2 w-8/12"
            value={orderTime}
            onChange={(e) => setOrderTime(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="shopName">Shop Name:</label>
          <select
            id="shopName"
            className="border rounded-md p-2 w-8/12"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          >
            <option value="">Select Shop Name</option>
            <option value="Shop 1">Shop 1</option>
            <option value="Shop 2">Shop 2</option>
            <option value="Shop 3">Shop 3</option>
            {/* Add more options as needed */}
          </select>
        </div>


        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="customerOrderNumber">Customer User Name:</label>
          <input
            type="text"
            id="customerUserName"
            className="border rounded-md p-2 w-8/12"
            value={customerUserName}
            onChange={(e) => setCustomerUserName(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="customerOrderNumber">Customer Order Number:</label>
          <input
            type="text"
            id="customerOrderNumber"
            className="border rounded-md p-2 w-8/12"
            value={customerOrderNumber}
            onChange={(e) => setCustomerOrderNumber(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="orderDate">Order Date:</label>
          <input
            type="date"
            id="orderDate"
            className="border rounded-md p-2 w-8/12"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="refundReason">Resend/Shipped Again Item:</label>
          <select
            id="refundReason"
            className="border rounded-md p-2 w-8/12"
            value={resendItem}
            onChange={(e) => setResendItem(e.target.value)}
          >
            <option value="">Select Resend Item</option>
            <option value="Reason 1">Item 1</option>
            <option value="Reason 2">Item 1</option>
            <option value="Reason 3">Item 1</option>
            <option value="Others">Other Item</option>
          </select>
          {resendItem === 'Others' && (
            <div className="mt-2 flex justify-between items-center">
              <label className="text-start"  htmlFor="otherReason">Other Item:</label>
              <textarea
                type="text"
                id="otherReason"
                className="border rounded-md p-2 w-8/12"
                value={otherItem}
                onChange={(e) => setOtherItem(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="orderAmount">Resend Item Quantity:</label>
          <input
            type="text"
            id="orderAmount"
            className="border rounded-md p-2 w-8/12"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          />
        </div>



        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="refundAmount">Recipient Name:</label>
          <input
            type="text"
            id="refundAmount"
            className="border rounded-md p-2 w-8/12"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="customerReceivingAmount">Recipient Phone Number:</label>
          <input
            type="text"
            id="customerReceivingAmount"
            className="border rounded-md p-2 w-8/12"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="remarks">Recipient Address:</label>
          <textarea
            id="remarks"
            className="border rounded-md p-2 w-8/12"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="refundReason">Resend/Shipped Again Reason:</label>
          <select
            id="refundReason"
            className="border rounded-md p-2 w-8/12"
            value={resendReason}
            onChange={(e) => setResendReason(e.target.value)}
          >
            <option value="">Select a Reason</option>
            <option value="Reason 1">Missing Item</option>
            <option value="Reason 2">Exchange</option>
            <option value="Reason 3">Gift</option>
            <option value="Others">Other Reason</option>
          </select>
          {resendReason === 'Others' && (
            <div className="mt-2 flex justify-between items-center">
              <label className="text-start"  htmlFor="otherReason">Other Reason:</label>
              <textarea
                type="text"
                id="otherReason"
                className="border rounded-md p-2 w-8/12"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="customerReturnTrackingNumber">Shipping Tracking Number:</label>
          <input
            type="text"
            id="customerReturnTrackingNumber"
            className="border rounded-md p-2 w-8/12"
            value={customerReturnTrackingNumber}
            onChange={(e) => setCustomerReturnTrackingNumber(e.target.value)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            className="border rounded-md p-2 w-8/12"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="applicantName">Applicant Name:</label>
          <input
            type="text"
            id="applicantName"
            className="border rounded-md p-2 w-8/12"
            value={user?.name}
            onChange={(e) => setApplicantName(user?.name)}
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-start"  htmlFor="applicantName">Application Date:</label>
          <input
            type="text"
            id="applicationTime"
            className="border rounded-md p-2 w-8/12"
            value={applicationDate}
            onChange={(e) => setApplicationDate(e.target.value)}
          />
        </div>



        {/* <div className="flex items-center justify-end space-x-2 my-3 hover:cursor-pointer">
          <input
            type="radio"
            id="specialOption"
            checked={special}
            onClick={handleOptionChange}
            className={`appearance-none hover:cursor-pointer h-4 w-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${special ? 'bg-black' : ''
              }`}
          />
          <label
            htmlFor="specialOption"
            className={`px-2 py-1 rounded-md hover:cursor-pointer `}
          >
            Special
          </label>
        </div> */}

        <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ResendForm;
