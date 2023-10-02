import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/UserContext';




const OrderInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [orderInfo, setOrderInfo] = useState({});
    const [transaction, setTransaction] = useState(orderInfo.remark);
    const { user } = useContext(AuthContext);


    //get id from url
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/');

    const currentId = pathSegments[pathSegments.length - 1];

    const fetchData = async () => {
        try {

            const response = await axios.get(`http://localhost:5000/tht/order/${currentId}`);
            const data = response.data;
            setOrderInfo(data);
            console.log(data, "current data")
        } catch (error) {
            console.error('Error occurred during the request:', error);

        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdate = () => {
        // Handle the update action (e.g., send transaction and images to the server)
        // You can implement the server-side logic here
        // Then, close the modal and update the state as needed
        setIsModalOpen(false);
    };

    const handleImageChange = (e) => {
        // Handle image uploads and update the 'images' state
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
    };

    return (
        <div className="max-w-[1240px] mx-auto py-16 px-4 text-center">


            <div className="w-full border-4 rounded-lg border-gray-800 p-5 pb-10">
                <h2>Order Details</h2>
                <div className="grid grid-cols-2 mb-20">
                    <ul className="text-left ml-8">
                        <li>Order Number: {orderInfo?.orderNumber}</li>
                        <li>Product Name: {orderInfo?.productName}</li>
                        <li>Model No: {orderInfo?.modelNo}</li>
                        <li>Order Date: {orderInfo?.orderDate}</li>
                        <li>Order Time: {orderInfo?.orderTime}</li>
                        <li>Product Color: {orderInfo?.color}</li>
                        <li>Color Image: {
                            orderInfo?.colorImg &&
                            <img
                                src={orderInfo?.colorImg} // Assuming 'request.image' contains the image URL
                                alt="Image"
                                className="rounded-md w-20 h-20 ml-28"
                            />
                        }</li>
                        {/* Include other details here */}
                    </ul>
                    <ul className="text-left ml-12">
                        <li>Customer Name: {orderInfo?.orderNumber}</li>
                        <li>Phone No: {orderInfo?.productName}</li>
                        <li>Warehouse: {orderInfo?.warehouseName}</li>
                        <li>Delivery Charge: {orderInfo?.deliveryCharge}</li>
                        <li>State: {orderInfo?.state}</li>
                        <li>City: {orderInfo?.city}</li>
                        <li>Address: {orderInfo?.address}</li>
                        <li>product Image: {
                            orderInfo?.image &&
                            <img
                                src={orderInfo?.image} // Assuming 'request.image' contains the image URL
                                alt="Image"
                                className="rounded-md w-20 h-20 ml-28"
                            />
                        }</li>

                    </ul>
                </div>

                <btn className=" bg-cyan-400 cursor-pointer  px-5 py-2 rounded-md text-lg font-semibold" onClick={handleOpenModal}>Add Info</btn >
            </div>


            {/* Modal for updating transaction and images */}


            {isModalOpen && (
                <div className="modal mt-10">
                    <div className="modal-content mt-20">
                        <h2 className="mb-10">Update Order</h2>
                        <div className="mt-3">
                            <label className=" text-lg" htmlFor="">Tracking No:</label>
                            <input
                                type="text"
                                className="border py-1 px-1 ml-2"
                                placeholder="Enter Tracking No"
                                value={transaction}
                                onChange={(e) => setTransaction(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center mb-10">
                            <input className="mt-3" type="file" multiple onChange={handleImageChange} />

                        </div>

                        <div className="mt-3">
                            <btn className="bg-green-400 cursor-pointer mr-3 px-5 py-2 rounded-md text-lg font-semibold" onClick={handleUpdate}>Update</btn>
                            <btn className="bg-yellow-400 cursor-pointer  px-5 py-2 rounded-md text-lg font-semibold" onClick={handleCloseModal}>Cancel</btn>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default OrderInfo;
