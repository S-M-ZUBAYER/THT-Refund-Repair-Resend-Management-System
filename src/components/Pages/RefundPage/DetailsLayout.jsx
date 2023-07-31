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

    const {user}=useContext(AuthContext)


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
            await axios.put(`https://grozziie.zjweiting.com:8035/tht/warehouseImages/${currentRequest?.orderNumber}`, formData, {
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
            await axios.put(`https://grozziie.zjweiting.com:8035/tht/financeImages/${currentRequest?.orderNumber}`, formData, {
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
    //         const response = await axios.get('https://grozziie.zjweiting.com:8035/tht/LeaderStatusSpecialRequest');
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
            const response = await axios.get(`https://grozziie.zjweiting.com:8035/tht/refundRequest/${lastValue}`);
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
        console.log(status)
        if (status === "warehouseManager") {
            console.log(status, "enter")
            try {
                const response = await axios.put(
                    `https://grozziie.zjweiting.com:8035/tht/updateWarehouseManagerStatus/${orderNumber}`
                );

                if (response.status === 200) {
                    routeChange();
                    toast.success('Warehouse Manager status updated successfully');
                } else {
                    toast.error('Failed to update Warehouse Manager status');
                }
            } catch (error) {
                console.error('Error updating Warehouse Manager status:', error);
                toast.error('Failed to update Warehouse Manager status');
            }
        }
        else {
            try {
                console.log(status, "enter")
                const response = await axios.put(
                    `https://grozziie.zjweiting.com:8035/tht/updateFinanceStatus/${orderNumber}`
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
        try {
          // const formData = new FormData();
          // selectedImages.forEach((image) => formData.append('images', image));
      
          const response = await axios.put(`https://grozziie.zjweiting.com:8035/tht/refundRequest/updateWarehouseStatus/${orderNumber}`);
    
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
                <h1><span className="bg-gradient-to-r from-blue-800 to-red-800 text-transparent bg-clip-text">{currentRequest?.customerUserName}</span> Refund Request Need To Check And Approved By {user?.role}</h1>

                <hr className='border-2 border-gray-800 my-5'></hr> </div>

            <div className="grid grid-cols-2 gap-10 text-left mx-10">

                <p><span className="font-semibold">Applicant Name:</span> {currentRequest?.applicantName}</p>
                <p><span className="font-semibold">Application Date:</span> {currentRequest?.applicationDate}</p>
                <p><span className="font-semibold">Customer Order Number:</span> {currentRequest?.customerOrderNumber}</p>
                <p><span className="font-semibold">Customer Return Tracking Number:</span> {currentRequest?.customerReturnTrackingNumber}</p>
                <p><span className="font-semibold">Order Time:</span> {currentRequest?.orderTime}</p>
                <p><span className="font-semibold">Shop Name:</span> {currentRequest?.shopName}</p>
                <p><span className="font-semibold">Customer User Name:</span> {currentRequest?.customerUserName}</p>
                <p><span className="font-semibold">Order Number:</span> {currentRequest?.orderNumber}</p>
                <p><span className="font-semibold">Order Amount:</span> {currentRequest?.orderAmount}</p>
                <p><span className="font-semibold">Order Date:</span> {currentRequest?.orderDate}</p>
                <p><span className="font-semibold">Refund Amount:</span> {currentRequest?.refundAmount}</p>
                <p><span className="font-semibold">Customer Bank Name:</span> {currentRequest?.customerBankName}</p>
                <p><span className="font-semibold">Customer Bank Account Name:</span> {currentRequest?.customerBankAccountName}</p>
                <p><span className="font-semibold">Customer Bank Swift:</span> {currentRequest?.customerBankSwift}</p>
                <p><span className="font-semibold">Customer Receiving Account:</span> {currentRequest?.customerReceivingAccount}</p>
                <p><span className="font-semibold">Customer Receiving Amount:</span> {currentRequest?.customerReceivingAmount}</p>
                <p><span className="font-semibold">Refund Reason:</span> {currentRequest?.refundReason}</p>
                <p><span className="font-semibold">Other Reason:</span> {currentRequest?.otherReason}</p>
                <p><span className="font-semibold">Remarks:</span> {currentRequest?.remarks}</p>




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
   user?.role === "Warehouse" && currentRequest?.wareHouseStatus==="false" 
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
            src={`https://grozziie.zjweiting.com:8035/tht/warehouseImages/${image[0]}`}
            alt={`Warehouse Image ${index + 1}`}
            onClick={() => handleImageClick(image)}
            className="image-thumbnail"
          />
        ))}
      </div> */}
                {currentRequest.warehouseImg && currentRequest.warehouseImg.length > 0 && (
                    <div className="flex">
                        <h3>Warehouse Images:</h3>
                        {currentRequest.warehouseImg.split(',').map((filename) => (
                            <img
                                key={filename}
                                src={`https://grozziie.zjweiting.com:8035/tht/warehouseImages/${filename}`}
                                alt={filename}
                                onClick={() => handleImageClick(`https://grozziie.zjweiting.com:8035/tht/warehouseImages/${filename}`)}
                                className="w-24 h-24 object-cover cursor-pointer mx-4 my-2 rounded-lg"
                            />
                        ))}
                    </div>
                )}

{
   user?.role === "Finance" && currentRequest?.financeStatus==="false" 
   &&
               <div className="grid  grid-cols-2 text-start mr-14">
                    
                    <input className='required bg-white' type="file" multiple onChange={handleImageChange} accept="image/*" />
                    <button onClick={handleFinanceSubmit} className=" bg-green-400 px-3 py-1 w-20 rounded hover:cursor-pointer">Upload</button>  
                </div>
                
        
    }

                {currentRequest.financeImg && currentRequest.financeImg.length > 0 && (
                    <div className="flex">
                        <h3>Finance Images:</h3>
                        {currentRequest.financeImg.split(',').map((filename) => (
                            <img
                                key={filename}
                                src={`https://grozziie.zjweiting.com:8035/tht/financeImages/${filename}`}
                                alt={filename}
                                onClick={() => handleImageClick(`https://grozziie.zjweiting.com:8035/tht/financeImages/${filename}`)}
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
            src={`https://grozziie.zjweiting.com:8035/tht/financeImages/${image}`}
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
                user?.role === "Warehouse" && currentRequest?.wareHouseStatus==="false" 
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
                user?.role === "Warehouse Manager" &&  currentRequest?.warehouseManagerStatus==="false" 
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
                user?.role === "Finance" && currentRequest?.financeStatus==="false" 
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
           

        </div>

    );
};

export default DetailsLayout;

