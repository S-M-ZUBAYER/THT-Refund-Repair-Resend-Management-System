import React, { useContext, useState } from 'react';
import RefundRequestForm from '../RefundPage/RefundRequestForm';
import RefundRequestList from '../RefundPage/RefundRequestList';
import Hero from '../../SharePage/Hero';
import Warehouse from '../RefundPage/Warehouse';
import { AuthContext } from '../../../context/UserContext';
import LeaderStatus from '../RefundPage/LeaderStatus';
import WarehouseManager from '../RefundPage/WarehouseManager';
import Finance from '../RefundPage/Finance';
import StatusBar from '../RefundPage/StatusBar';
import ResendForm from './ResendForm';

const Resend = () => {

    const { user } = useContext(AuthContext)


    return (

        <div className='max-w-[1240px] mx-auto py-16 px-4 text-center'>
            {user?.role === "Customer Service" && <>
                <div>
                    <h1>Please Complete the Resend/Shipped Again Form</h1>
                    <p className='py-4'>Please fill all of the information carefully and submit to start the next step to get the approval from Customer Service Leader. </p>
                </div>
                <ResendForm></ResendForm>


                <div className="mt-16 mb-5">
                    <h1>Show The List Available Refund Request</h1>
                    <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information. </p>
                </div>
                <RefundRequestList></RefundRequestList>
            </>}

            {
                user?.role === "Warehouse" && <> <div className="mt-16 mb-5">
                    <h1>Requests Need To Approved By Warehouse Man</h1>
                    <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information.And then please approved their refund request.  </p>
                </div>

                    <Warehouse></Warehouse></>
            }

            {
                user?.role === "Customer Service Leader" && <> <div className="mt-16 mb-5">
                    <h1>Requests Need To Approved By Customer Service Leader</h1>
                    <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information.And then please approved their refund request.  </p>
                </div>

                    <LeaderStatus></LeaderStatus> </>
            }

            {
                user?.role === "Warehouse Manager" && <> <div className="mt-16 mb-5">
                    <h1>Requests Need To Approved By Warehouse Manager</h1>
                    <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information.And then please approved their refund request.  </p>
                </div>

                    <WarehouseManager></WarehouseManager> </>
            }

            {
                user?.role === "Finance" && <> <div className="mt-16 mb-5">
                    <h1>Requests Need To Approved By Finance</h1>
                    <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information.And then please approved their refund request.  </p>
                </div>

                    <Finance></Finance> </>
            }

            <div className="mt-32 mb-5">
                <hr className='border-2 border-gray-800 my-5'></hr>
                <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">Refund Request Status Bar</span></h1>
                <p className='py-4'>These are all the list of special refund request at these moment. Here you can see the current condition of any request. And also you can check all the information about the refund request.  </p>
            </div>

            <StatusBar></StatusBar>

        </div>
    );
};

export default Resend;