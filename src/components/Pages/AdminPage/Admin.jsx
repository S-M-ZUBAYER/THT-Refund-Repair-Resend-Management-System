

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import DisplaySpinner from '../../Loading/DisplaySpinner';
import { AuthContext } from '../../../context/UserContext';
import RegisterSystem from '../HomePage/RegisterSystem';
import RefundProductList from '../RefundPage/RefundRequestList';
import RefundRequestListAdmin from '../RefundPage/RefundRequestListAdmin';


const Admin = () => {

    //create useState for the user and update 
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shopName, setShopName] = useState('');
    const [shopNames, setShopNames] = useState('');
    const [reasons, setReasons] = useState('');

    const [reason, setReason] = useState([]);

    const { user, selectedLanguage } = useContext(AuthContext);

    useEffect(() => {
        const fetchShopNamesReasons = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tht/shopNamesReasons');
                const data = response.data[0]; // Assuming the response data is an array with one object containing shop names and reasons
                setShopNames((data.shopNames).split(","));
                setReasons((data.reasons).split(","));
            } catch (error) {
                console.error('Error fetching shop names:', error);
            }
        };

        fetchShopNamesReasons();
    }, []);


    const handleShopNamesChange = (e) => {
        setShopName(e.target.value);
    };

    const handleAddShopNames = () => {
        if (shopName.trim() !== '') {
            const newShopNames = [...shopNames, shopName]
            setShopNames(newShopNames);
            //load current user data from database
            fetch('http://localhost:5000/tht/shopNames', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newShopNames)
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.changedRows) {
                        toast.success('New ShopName stored Successfully');

                    }
                    else {
                        toast.error(data.message);
                    }

                })
            setShopName('');
        }

    };


    const handleReasonsChange = (e) => {
        setReason(e.target.value);
    };

    const handleAddReasons = () => {
        if (reason.trim() !== '') {
            const newReasons = [...reasons, reason]
            setReasons(newReasons);
            //load current user data from database
            fetch('http://localhost:5000/tht/reasons', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newReasons)
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.changedRows) {
                        toast.success('New reasons stored Successfully');

                    }
                    else {
                        toast.error(data.message);
                    }

                })
            setReason('');
        }

    };

    //start the part to get all the users from database

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tht/allRFusers');
                const data = response.data;
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Error occurred during the request:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //create a function to delete a user from the frontend and database both side 
    const deleteUser = async (userId) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (!confirmed) {
            return; // Cancel the deletion if the user clicks Cancel or closes the modal
        }
        try {
            await axios.delete(`http://localhost:5000/tht/RFusers/delete/${userId}`);
            toast.success('User deleted successfully');
            setUsers(users.filter((user) => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user');
        }
    };
    const openEditModal = (user) => {
        setEditingUser(user);
    };

    const handleToCancel = () => {
        openEditModal();
    }


    //create a function to update a user from the frontend and database both side 
    const updateUser = async (userId, editingUser) => {
        const confirmed = window.confirm('Are you sure you want to update this user information?');
        if (!confirmed) {
            return; // Cancel the deletion if the user clicks Cancel or closes the modal
        }
        try {
            const response = await axios.put(`http://localhost:5000/tht/RFusers/update/${userId}`, editingUser);
            toast.success("user information updated successfully");
            // Optionally, you can show a success message to the user using a toast or other UI notification.
        } catch (error) {
            toast.error('Error updating user:', error);
            // Optionally, you can show an error message to the user using a toast or other UI notification.
        }
    };
    const saveUser = (userId, updatedUser) => {
        updateUser(userId, updatedUser);
        setUsers(users?.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setEditingUser(null);
    };

    //create a function to update a user from the frontend and database both side 
    const updateUserToAdmin = async (userId) => {
        // setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        const isAdmin = true;
        const confirmed = window.confirm('Are you sure you want to Admin this user?');
        if (!confirmed) {
            return; // Cancel the deletion if the user clicks Cancel or closes the modal
        }

        try {
            const response = await axios.put(`http://localhost:5000/tht/RFusers/update/admin/${userId}`, isAdmin);

            setUsers(users?.map((user) => {
                if (user?.id === userId) {
                    user.admin = "true";
                }
                return user;
            }))


            response?.statusText && toast.success("Make admin successfully");
            // Optionally, you can show a success message to the user using a toast or other UI notification.
        } catch (error) {
            toast.error('Error updating user To admin:', error);
            // Optionally, you can show an error message to the user using a toast or other UI notification.
        }
    };
    // const saveUser = (userId,updatedUser) => {
    //   updateUser(userId, updatedUser);
    //   setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    //   setEditingUser(null);
    // };



    return (
        <div className='max-w-[1240px] mx-auto py-16 px-4 text-center'>
            <>
                <h1>Registration field to register for new user</h1>
                <p className='py-4 mb-5'>This section to input the user information and choose specific role to work on specific field. Any one can work in multiple role. </p>
            </>
            <RegisterSystem></RegisterSystem>

            <div className="pt-32">
                {selectedLanguage === "en-US" && (
                    <>
                        <h1>Available Users In Our Site</h1>
                        <p className='py-4 mb-5'>These all are users in our site. Different users have different responsibilities to complete this full process. Here you can make anyone a role as an admin.</p>
                    </>
                )}

                {selectedLanguage === "zh-CN" && (
                    <>
                        <h1>我们网站上的可用用户</h1>
                        <p className='py-4 mb-5'>这些都是我们网站上的用户。不同的用户有不同的责任来完成这个整个过程。在这里，您可以将任何人设置为管理员角色。</p>
                    </>
                )}

                {selectedLanguage === "th-TH" && (
                    <>
                        <h1>ผู้ใช้ที่มีให้ในเว็บไซต์ของเรา</h1>
                        <p className='py-4 mb-5'>นี่คือผู้ใช้ทั้งหมดในเว็บไซต์ของเรา ผู้ใช้ที่แตกต่างกันมีความรับผิดชอบที่แตกต่างกันในการดำเนินการเสร็จสิ้นกระบวนการทั้งหมดนี้ ที่นี่คุณสามารถกำหนดบทบาทให้ใครก็ได้เป็นแอดมิน</p>
                    </>
                )}

                {selectedLanguage === "fil-PH" && (
                    <>
                        <h1>Magagamit na mga User sa Aming Site</h1>
                        <p className='py-4 mb-5'>Ito ay lahat ng mga user sa aming site. Magkaiba ang mga tungkulin ng mga user upang makumpleto ang buong proseso. Dito maaari mong gawin ang sinumang papel bilang admin.</p>
                    </>
                )}

                {selectedLanguage === "vi-VN" && (
                    <>
                        <h1>Người dùng có sẵn trên trang web của chúng tôi</h1>
                        <p className='py-4 mb-5'>Đây là tất cả người dùng trên trang web của chúng tôi. Các người dùng khác nhau có các trách nhiệm khác nhau để hoàn thành quy trình đầy đủ này. Ở đây, bạn có thể chọn bất kỳ ai làm vai trò quản trị viên.</p>
                    </>
                )}

                {selectedLanguage === "ms-MY" && (
                    <>
                        <h1>Pengguna yang Tersedia di Laman Web Kami</h1>
                        <p className='py-4 mb-5'>Ini adalah semua pengguna di laman web kami. Pengguna yang berbeza mempunyai tanggungjawab yang berbeza untuk menyelesaikan proses ini. Di sini anda boleh menjadikan sesiapa sahaja sebagai admin.</p>
                    </>
                )}

                {selectedLanguage === "id-ID" && (
                    <>
                        <h1>Pengguna yang Tersedia di Situs Kami</h1>
                        <p className='py-4 mb-5'>Ini adalah semua pengguna di situs kami. Pengguna yang berbeda memiliki tanggung jawab yang berbeda untuk menyelesaikan proses ini. Di sini Anda dapat membuat peran siapa pun sebagai admin.</p>
                    </>
                )}
                <table className="w-full mb-10">
                    <thead className="bg-gradient-to-r from-green-300 to-yellow-300">
                        <tr className="py-2">
                            <th className="text-start pl-2 py-2">
                                {selectedLanguage === "en-US" && "No"}
                                {selectedLanguage === "zh-CN" && "编号"}
                                {selectedLanguage === "th-TH" && "หมายเลข"}
                                {selectedLanguage === "fil-PH" && "Numero"}
                                {selectedLanguage === "vi-VN" && "Số thứ tự"}
                                {selectedLanguage === "ms-MY" && "Nombor"}
                                {selectedLanguage === "id-ID" && "Nomor"}
                            </th>

                            <th className="text-start pl-2 py-2">
                                {selectedLanguage === "en-US" && "Name"}
                                {selectedLanguage === "zh-CN" && "名称"}
                                {selectedLanguage === "th-TH" && "ชื่อ"}
                                {selectedLanguage === "fil-PH" && "Pangalan"}
                                {selectedLanguage === "vi-VN" && "Tên"}
                                {selectedLanguage === "ms-MY" && "Nama"}
                                {selectedLanguage === "id-ID" && "Nama"}
                            </th>

                            <th className="text-start hidden md:block py-2">
                                {selectedLanguage === "en-US" && "Email"}
                                {selectedLanguage === "zh-CN" && "电邮"}
                                {selectedLanguage === "th-TH" && "อีเมล"}
                                {selectedLanguage === "fil-PH" && "Email"}
                                {selectedLanguage === "vi-VN" && "Email"}
                                {selectedLanguage === "ms-MY" && "Emel"}
                                {selectedLanguage === "id-ID" && "Surel"}
                            </th>

                            <th className="text-start">
                                {selectedLanguage === "en-US" && "Role"}
                                {selectedLanguage === "zh-CN" && "角色"}
                                {selectedLanguage === "th-TH" && "บทบาท"}
                                {selectedLanguage === "fil-PH" && "Papel"}
                                {selectedLanguage === "vi-VN" && "Vai trò"}
                                {selectedLanguage === "ms-MY" && "Peranan"}
                                {selectedLanguage === "id-ID" && "Peran"}
                            </th>

                            <th className="text-start">
                                {selectedLanguage === "en-US" && "Admin"}
                                {selectedLanguage === "zh-CN" && "管理员"}
                                {selectedLanguage === "th-TH" && "ผู้ดูแลระบบ"}
                                {selectedLanguage === "fil-PH" && "Admin"}
                                {selectedLanguage === "vi-VN" && "Quản trị viên"}
                                {selectedLanguage === "ms-MY" && "Admin"}
                                {selectedLanguage === "id-ID" && "Admin"}
                            </th>

                            <th>
                                {selectedLanguage === "en-US" && "Edit"}
                                {selectedLanguage === "zh-CN" && "编辑"}
                                {selectedLanguage === "th-TH" && "แก้ไข"}
                                {selectedLanguage === "fil-PH" && "I-edit"}
                                {selectedLanguage === "vi-VN" && "Chỉnh sửa"}
                                {selectedLanguage === "ms-MY" && "Edit"}
                                {selectedLanguage === "id-ID" && "Edit"}
                            </th>

                            <th>
                                {selectedLanguage === "en-US" && "Delete"}
                                {selectedLanguage === "zh-CN" && "删除"}
                                {selectedLanguage === "th-TH" && "ลบ"}
                                {selectedLanguage === "fil-PH" && "Burahin"}
                                {selectedLanguage === "vi-VN" && "Xóa"}
                                {selectedLanguage === "ms-MY" && "Padam"}
                                {selectedLanguage === "id-ID" && "Hapus"}
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {loading ?
                            <div >
                                <DisplaySpinner></DisplaySpinner>
                            </div>
                            :
                            users?.map((user, index) => (
                                <tr key={user.id} className="my-5 border-b-2 py-1 ">
                                    <td className="text-center pl-2 py-2 font-semibold my-auto" >{index + 1}</td>
                                    <td className="text-center pl-2 py-2 font-semibold" >{user?.name}</td>
                                    <td className="text-center py-2 ">{user?.email}</td>
                                    <td className="text-center w-3/12">{user?.role}</td>
                                    <td>
                                        {
                                            user?.admin === "true" ?
                                                <btn className=" bg-gradient-to-r from-green-300 to-yellow-300 rounded-tl-lg rounded-br-lg py-1 px-2 text-center">
                                                    {selectedLanguage === "zh-CN" && "管理员"}
                                                    {selectedLanguage === "en-US" && "Admin"}
                                                    {selectedLanguage === "fil-PH" && "Admin"}
                                                    {selectedLanguage === "ms-MY" && "Pentadbir"}
                                                    {selectedLanguage === "th-TH" && "ผู้ดูแลระบบ"}
                                                    {selectedLanguage === "vi-VN" && "Quản trị viên"}
                                                    {selectedLanguage === "id-ID" && "Admin"}
                                                </btn>
                                                :
                                                <btn onClick={() => updateUserToAdmin(user?.id)} className=" bg-gradient-to-r from-yellow-300 to-red-500 rounded-tl-lg rounded-br-lg py-1 px-2 text-center hover:cursor-pointer">
                                                    {selectedLanguage === "zh-CN" && "设为管理员"}
                                                    {selectedLanguage === "en-US" && "Make Admin"}
                                                    {selectedLanguage === "fil-PH" && "Gawing Admin"}
                                                    {selectedLanguage === "ms-MY" && "Jadikan Admin"}
                                                    {selectedLanguage === "th-TH" && "ทำให้เป็นผู้ดูแลระบบ"}
                                                    {selectedLanguage === "vi-VN" && "Đổi vai trò"}
                                                    {selectedLanguage === "id-ID" && "Jadikan Admin"}
                                                </btn>

                                        }
                                    </td>
                                    <td>
                                        <btn className="text-blue-500 flex justify-center cursor-pointer" onClick={() => openEditModal(user)}>
                                            <FiEdit></FiEdit>
                                        </btn>
                                    </td>
                                    <td>
                                        <btn className="text-red-500 text-center cursor-pointer flex justify-center" onClick={() => deleteUser(user.id)}>
                                            <RiDeleteBin7Line></RiDeleteBin7Line>
                                        </btn>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                <div className="my-64">


                    {selectedLanguage === "en-US" && (
                        <>
                            <h1>Add New Shop Name and Product Refund Reason</h1>
                            <p className='py-4'>These are two input fields to add the new shop name and add product refund reason.</p>
                        </>
                    )}

                    {selectedLanguage === "zh-CN" && (
                        <>
                            <h1>添加新店名和产品退款原因</h1>
                            <p className='py-4'>这是两个输入字段，用于添加新的店名和添加产品退款原因。</p>
                        </>
                    )}

                    {selectedLanguage === "th-TH" && (
                        <>
                            <h1>เพิ่มชื่อร้านค้าและเหตุผลการคืนสินค้าใหม่</h1>
                            <p className='py-4'>นี่คือสองช่องกรอกข้อมูลที่ใช้ในการเพิ่มชื่อร้านค้าใหม่และเพิ่มเหตุผลในการคืนสินค้า</p>
                        </>
                    )}

                    {selectedLanguage === "fil-PH" && (
                        <>
                            <h1>Magdagdag ng Bagong Pangalan ng Tindahan at Rason sa Pagbabalik ng Produkto</h1>
                            <p className='py-4'>Ito ay dalawang patlang ng input upang magdagdag ng bagong pangalan ng tindahan at magdagdag ng rason sa pagbabalik ng produkto.</p>
                        </>
                    )}

                    {selectedLanguage === "vi-VN" && (
                        <>
                            <h1>Thêm Tên Cửa Hàng Mới và Lý Do Hoàn Tiền Sản Phẩm</h1>
                            <p className='py-4'>Đây là hai trường nhập liệu để thêm tên cửa hàng mới và thêm lý do hoàn tiền sản phẩm.</p>
                        </>
                    )}

                    {selectedLanguage === "ms-MY" && (
                        <>
                            <h1>Tambah Nama Kedai Baru dan Sebab Pembayaran Balik Produk</h1>
                            <p className='py-4'>Ini adalah dua medan input untuk menambahkan nama kedai baru dan menambahkan sebab pembayaran balik produk.</p>
                        </>
                    )}

                    {selectedLanguage === "id-ID" && (
                        <>
                            <h1>Tambahkan Nama Toko Baru dan Alasan Pengembalian Produk</h1>
                            <p className='py-4'>Ini adalah dua kolom input untuk menambahkan nama toko baru dan menambahkan alasan pengembalian produk.</p>
                        </>
                    )}



                    <div className="md:grid grid-cols-3 gap-4">
                        <div className=" w-full">
                            <h1 className="text-2xl font-bold text-yellow-900 my-5">
                                {selectedLanguage === "en-US" && "Add ShopNames:"}
                                {selectedLanguage === "fil-PH" && "Magdagdag ng Mga ShopNames:"}
                                {selectedLanguage === "ms-MY" && "Tambah ShopNames:"}
                                {selectedLanguage === "th-TH" && "เพิ่ม ShopNames:"}
                                {selectedLanguage === "vi-VN" && "Thêm ShopNames:"}
                                {selectedLanguage === "id-ID" && "Tambah ShopNames:"}
                                {selectedLanguage === "zh-CN" && "添加商店名称："}</h1>
                            <input type="text" value={shopName} onChange={(e) => handleShopNamesChange(e)} placeholder="Enter ShopName name" className="border-2 rounded-lg py-1 pl-2 text-center bg-white text-gray-800" />
                            <div className="mt-8">

                                <btn className="px-4 py-1 mt-5 bg-lime-200 text-gray-800 font-semibold rounded-lg cursor-pointer" onClick={handleAddShopNames}>
                                    {selectedLanguage === "en-US" && "Add ShopName:"}
                                    {selectedLanguage === "fil-PH" && "Magdagdag ng ShopName:"}
                                    {selectedLanguage === "ms-MY" && "Tambah ShopName:"}
                                    {selectedLanguage === "th-TH" && "เพิ่ม ShopName:"}
                                    {selectedLanguage === "vi-VN" && "Thêm ShopName:"}
                                    {selectedLanguage === "id-ID" && "Tambah ShopName:"}
                                    {selectedLanguage === "zh-CN" && "添加商店名称："}
                                </btn>
                            </div>
                        </div>

                        <div className=" col-span-2 text-center">
                            <h1 className="text-2xl font-bold text-yellow-900 my-5">  {selectedLanguage === "en-US" && "Add Reasons:"}
                                {selectedLanguage === "fil-PH" && "Magdagdag ng Mga Dahilan:"}
                                {selectedLanguage === "ms-MY" && "Tambah Sebab:"}
                                {selectedLanguage === "th-TH" && "เพิ่มเหตุผล:"}
                                {selectedLanguage === "vi-VN" && "Thêm Lý Do:"}
                                {selectedLanguage === "id-ID" && "Tambah Alasan:"}
                                {selectedLanguage === "zh-CN" && "添加原因："}</h1>
                            <input type="text" value={reason} onChange={(e) => handleReasonsChange(e)} placeholder="Enter Reasons" className="border-2 rounded-lg py-1 pl-2 text-center bg-white text-gray-800 w-full" />
                            <div className="mt-8">

                                <btn className="px-4 py-1 mt-5 bg-lime-200 text-gray-800 font-semibold rounded-lg cursor-pointer" onClick={handleAddReasons}>  {selectedLanguage === "en-US" && "Add Reasons:"}
                                    {selectedLanguage === "fil-PH" && "Magdagdag ng Mga Dahilan:"}
                                    {selectedLanguage === "ms-MY" && "Tambah Sebab:"}
                                    {selectedLanguage === "th-TH" && "เพิ่มเหตุผล:"}
                                    {selectedLanguage === "vi-VN" && "Thêm Lý Do:"}
                                    {selectedLanguage === "id-ID" && "Tambah Alasan:"}
                                    {selectedLanguage === "zh-CN" && "添加原因："}</btn>
                            </div>
                        </div>
                    </div>


                </div>

                {/* modal part start from here to update a user information */}
                {editingUser && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white  w-7/12 p-8">
                            <h2 className="text-lg font-bold mb-4">Edit User</h2>
                            <input
                                type="text"
                                placeholder="Name"
                                value={editingUser.name}
                                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                readOnly
                                value={editingUser.email}
                                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                value={editingUser.phone}
                                onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                                className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                            />

                            <input
                                type="text"
                                placeholder="Designation"
                                value={editingUser.role}
                                onChange={(e) => setEditingUser({ ...editingUser, designation: e.target.value })}
                                className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                            />
                            <input
                                type="text"
                                placeholder="Language"
                                value={editingUser.language}
                                onChange={(e) => setEditingUser({ ...editingUser, language: e.target.value })}
                                className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                            />
                            <input
                                type="text"
                                placeholder="Country"
                                value={editingUser.country}
                                onChange={(e) => setEditingUser({ ...editingUser, country: e.target.value })}
                                className="mb-8 px-4 py-2 border border-gray-300 rounded-md w-full"
                            />
                            <btn
                                className="bg-green-500 cursor-pointer text-white px-4 py-2 mr-3 rounded-md"
                                onClick={() => saveUser(editingUser.id, editingUser)}
                            >
                                Save
                            </btn>
                            <btn
                                className="bg-yellow-500 cursor-pointer text-white px-4 py-2 rounded-md"
                                onClick={handleToCancel}
                            >
                                cancel
                            </btn>

                        </div>
                    </div>
                )}
            </div>


            {user?.admin === "true" && <>

                <div className="mt-16 mb-5">
                    {selectedLanguage === "zh-CN" &&
                        <>
                            <h1>显示可用的退款请求列表</h1>
                            <p className='py-4'>这是当前所有的退款请求列表。您可以在此处检查并更新退款请求信息。</p>
                        </>
                    }

                    {selectedLanguage === "en-US" &&
                        <>
                            <h1>Show The List Available Refund Request</h1>
                            <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information.</p>
                        </>
                    }

                    {selectedLanguage === "fil-PH" &&
                        <>
                            <h1>Ipakita ang Listahan ng Magagamit na Kahilingan sa Pagbabalik</h1>
                            <p className='py-4'>Ito ay lahat ng listahan ng kahilingan sa pagbabalik sa sandaling ito. Dito maaari mong suriin at i-update ang impormasyon ng kahilingan sa pagbabalik.</p>
                        </>
                    }

                    {selectedLanguage === "ms-MY" &&
                        <>
                            <h1>Paparkan Senarai Permintaan Pembayaran Balik yang Tersedia</h1>
                            <p className='py-4'>Ini adalah senarai semua permintaan pembayaran balik pada masa ini. Di sini anda boleh menyemak dan mengemas kini maklumat permintaan pembayaran balik.</p>
                        </>
                    }

                    {selectedLanguage === "th-TH" &&
                        <>
                            <h1>แสดงรายการคำขอคืนเงินที่มีให้</h1>
                            <p className='py-4'>นี้คือรายการคำขอคืนเงินทั้งหมดในขณะนี้ ที่นี่คุณสามารถตรวจสอบและอัปเดตข้อมูลคำขอคืนเงินได้</p>
                        </>
                    }

                    {selectedLanguage === "vi-VN" &&
                        <>
                            <h1>Hiển thị Danh sách Yêu cầu Hoàn tiền Hiện có</h1>
                            <p className='py-4'>Dưới đây là tất cả danh sách yêu cầu hoàn tiền hiện có. Ở đây bạn có thể kiểm tra và cập nhật thông tin yêu cầu hoàn tiền.</p>
                        </>
                    }

                    {selectedLanguage === "id-ID" &&
                        <>
                            <h1>Tampilkan Daftar Permintaan Pengembalian Dana yang Tersedia</h1>
                            <p className='py-4'>Ini adalah semua daftar permintaan pengembalian dana pada saat ini. Di sini Anda dapat memeriksa dan memperbarui informasi permintaan pengembalian dana.</p>
                        </>
                    }

                </div>
                <RefundRequestListAdmin></RefundRequestListAdmin>
            </>}

        </div>
    );
};

export default Admin;