import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import DisplaySpinner from '../../Loading/DisplaySpinner';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';

const RefundProductList = ({ refundProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  const handleOptionChange = (special) => {
    console.log(special)
    setEditingRequest({ ...editingRequest, special: !special })
  };

  const { allRefundRequest, setAllRefundRequest } = useContext(AuthContext);

  useEffect(() => {
    fetch('https://grozziie.zjweiting.com:8035/tht/refundRequest')
      .then((response) => response.json())
      .then((data) => {
        setAllRefundRequest(data);
        console.log(data)
      })
      .catch((error) => {
        console.error('Error occurred during the request:', error);
      });
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://grozziie.zjweiting.com:8035/tht/refundRequest/delete/${id}`);
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
    try {
      const response = await axios.put(`https://grozziie.zjweiting.com:8035/tht/refundRequest/update/${orderNumber}`, editingRequest);
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
            <th className="text-start pl-2 py-2">No</th>
            <th className="text-start pl-2 py-2">Order Number</th>
            <th className="text-start pl-2 py-2">Customer Name</th>
            <th className="text-start py-2">Tracking Number</th>
            <th className="text-start hidden md:block py-2">Order Date</th>
            <th>Edit</th>
            <th>Delete</th>
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

                <td>
                  <btn className="text-blue-500 flex justify-center hover:cursor-pointer " onClick={() => openEditModal(request)}>
                    <FiEdit ></FiEdit>
                  </btn>
                </td>
                <td>
                  <btn className="text-red-500 flex justify-center hover:cursor-pointer" onClick={() => deleteUser(request?.id)}>
                    <RiDeleteBin7Line></RiDeleteBin7Line>
                  </btn>
                </td>
              </tr>
            ))
          }

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
