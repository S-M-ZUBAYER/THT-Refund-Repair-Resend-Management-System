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

    //Declare the variable with useState to manage the state of any variable 
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shopName, setShopName] = useState('');
    const [warehouseName, setWarehouseName] = useState();
    const [warehouseNames, setWarehouseNames] = useState([]);
    const [reasons, setReasons] = useState('');
    const [reason, setReason] = useState([]);
    const [allFinance, setAllFinance] = useState([]);
    const [allShopDetails, setAllShopDetails] = useState([]);
    const [selectedFinance, setSelectedFinance] = useState('');
    const [selectedWarehouses, setSelectedWarehouses] = useState([]);
    const [selectedUserWarehouses, setSelectedUserWarehouses] = useState([]);

    //import teh necessary value from user context to use in this component
    const { user, selectedLanguage } = useContext(AuthContext);






    //use useEffect to get the Reasons, warehouse name,  shopDetails and finance 
    useEffect(() => {

        //create this function to  get the Reasons, warehouse venue
        const fetchShopNamesReasons = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tht/shopNamesReasons');
                const data = response.data[0]; // Assuming the response data is an array with one object containing shop names and reasons
                setReasons((data.reasons).split(","));
                setWarehouseNames((data.warehouseNames).split(","));
            } catch (error) {
                console.error('Error fetching shop names:', error);
            }
        };



        //use useEffect to get the Reasons, warehouse name and all shop details 
        const fetchAllShopDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tht/shopDetails');
                const data = response.data; // Assuming the response data is an array with one object containing shop names and reasons
                setAllShopDetails(data);

            } catch (error) {
                console.error('Error fetching shop names:', error);
            }
        };


        //create this function to get the specific finance name according to the shop name
        const fetchAllFinance = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tht/finance');
                const data = response.data; // Assuming the response data is an array with one object containing shop names and reasons
                setAllFinance(data);

            } catch (error) {
                console.error('Error fetching shop names:', error);
            }
        };


        fetchAllFinance();
        fetchShopNamesReasons();
        fetchAllShopDetails();
    }, []);


    //create function to get the checkbox value to get all the warehouses for specific shop name
    const handleCheckboxChange = (event) => {
        const warehouseName = event.target.value;
        if (event.target.checked) {
            setSelectedWarehouses((prevSelected) => [...prevSelected, warehouseName]);
        } else {
            setSelectedWarehouses((prevSelected) => prevSelected.filter((name) => name !== warehouseName));
        }

    };
    const handleUserCheckboxChange = (event) => {
        const userWarehouseName = event.target.value;
        console.log(userWarehouseName)
        if (event.target.checked) {
            setSelectedUserWarehouses((prevSelected) => [...prevSelected, userWarehouseName]);
        } else {
            setSelectedUserWarehouses((prevSelected) => prevSelected.filter((name) => name !== userWarehouseName));
        }
        setEditingUser({ ...editingUser, warehouseShop: selectedUserWarehouses })
    };
    console.log(editingUser)

    //create onChange function to get input filed of shopName
    const handleShopNamesChange = (e) => {
        setShopName(e.target.value);
    };


    //create onChange function to get input filed of warehouse venue name
    const handleWarehouseNamesChange = (e) => {
        setWarehouseName(e.target.value);
    };

    //create onChange function to get input filed of finance for specific shop name
    const handleFinanceChange = (e) => {
        setSelectedFinance(e.target.value);
    };


    //create onChange function to get input filed of reason for refund request
    const handleReasonsChange = (e) => {
        setReason(e.target.value);
    };


    //create this function to add the information for all warehouse name and finance information for a specific shop name
    const handleAddShopDetails = () => {
        const shopDetails = {
            shopeName: shopName,
            finance: selectedFinance,
            warehouses: selectedWarehouses
        };

        if (shopName.trim() !== '') {
            fetch('http://localhost:5000/tht/shopDetails', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(shopDetails)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Response data:', data);
                    if (data?.insertId) {
                        // Only store necessary data in the array
                        setAllShopDetails([...allShopDetails, { ...shopDetails, id: data.insertId }]);
                        toast.success('New Shop details stored Successfully');
                        setShopName("");
                    } else {
                        toast.error(data.message);
                        console.error(data);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    toast.error('An error occurred while making the request.');
                });
        }
    };


    //create function to add all warehouse venue to show the list and add the warehouse name for specific shop name
    const handleAddWarehouseNames = () => {
        if (warehouseName.trim() !== '') {
            const newWarehouseNames = [...warehouseNames, warehouseName]
            setWarehouseNames(newWarehouseNames);
            //load current user data from database
            fetch('http://localhost:5000/tht/warehouseNames', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newWarehouseNames)
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.changedRows) {
                        toast.success('New Warehouse stored Successfully');

                    }
                    else {
                        toast.error(data.message);
                    }

                })
            setShopName('');
        }

    };


    //create function to add all refund request reason

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



    //start the part to get all the users information from database

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


    //crate these 2 function to open modal and close modal to edit user information
    const openEditModal = (user) => {
        setEditingUser(user);
    };

    const handleToCancel = () => {
        openEditModal();
    }


    //create a function to update a user from the frontend and database both side 
    const updateUser = async (userId, editingUser) => {
        console.log(editingUser)
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


    //create a function to update a user to convert into admin from the frontend and database both side 
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




    return (
        //this is the register section
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
                            <h1>Add New Warehouse Name, Shop Name and Product Refund Reason</h1>
                            <p className='py-4'>These are three input fields to add the new warehouse name, new shop name, warehouse name, and add product refund reason.</p>
                        </>
                    )}

                    {selectedLanguage === "zh-CN" && (
                        <>
                            <h1>添加新仓库名称、店铺名称和产品退款原因</h1>
                            <p className='py-4'>这是三个输入字段，用于添加新仓库名称、新店铺名称、仓库名称和添加产品退款原因。</p>
                        </>
                    )}

                    {selectedLanguage === "th-TH" && (
                        <>
                            <h1>เพิ่มชื่อคลังสินค้าใหม่ ชื่อร้านค้า และเหตุผลการคืนสินค้า</h1>
                            <p className='py-4'>นี่คือสามฟิลด์ป้อนข้อมูลเพื่อเพิ่มชื่อคลังสินค้าใหม่ ชื่อร้านค้าใหม่ ชื่อคลังสินค้าและเพิ่มเหตุผลในการคืนสินค้า</p>
                        </>
                    )}

                    {selectedLanguage === "fil-PH" && (
                        <>
                            <h1>Magdagdag ng Bagong Pangalan ng Warehouse, Pangalan ng Tindahan at Rason para sa Pagsasauli ng Produkto</h1>
                            <p className='py-4'>Ito ay tatlong input fields upang magdagdag ng bagong pangalan ng warehouse, bagong pangalan ng tindahan, pangalan ng warehouse, at magdagdag ng rason para sa pagsasauli ng produkto.</p>
                        </>
                    )}

                    {selectedLanguage === "vi-VN" && (
                        <>
                            <h1>"Thêm Tên Kho Mới, Tên Cửa Hàng và Lý Do Hoàn Trả Sản Phẩm</h1>
                            <p className='py-4'>Đây là ba trường nhập liệu để thêm tên kho mới, tên cửa hàng mới, tên kho và thêm lý do hoàn trả sản phẩm.</p>
                        </>
                    )}

                    {selectedLanguage === "ms-MY" && (
                        <>
                            <h1>Tambah Nama Gudang Baru, Nama Kedai dan Sebab Pulangan Produk</h1>
                            <p className='py-4'>Ini adalah tiga medan input untuk menambah nama gudang baru, nama kedai baru, nama gudang, dan tambah sebab pulangan produk.</p>
                        </>
                    )}

                    {selectedLanguage === "id-ID" && (
                        <>
                            <h1>Tambahkan Nama Gudang Baru, Nama Toko dan Alasan Pengembalian Produk</h1>
                            <p className='py-4'>"Ini adalah tiga kolom input untuk menambahkan nama gudang baru, nama toko baru, nama gudang, dan menambahkan alasan pengembalian produk.</p>
                        </>
                    )}



                    <div className=" grid grid-cols-2 gap-4">

                        <div className=" w-full">
                            <h1 className="text-2xl font-bold text-yellow-900 my-5">
                                {selectedLanguage === "en-US" && "Add Warehouse Name:"}
                                {selectedLanguage === "fil-PH" && "Magdagdag ng Pangalan ng Warehouse:"}
                                {selectedLanguage === "ms-MY" && "Tambah Nama Gudang:"}
                                {selectedLanguage === "th-TH" && "เพิ่มชื่อคลังสินค้า:"}
                                {selectedLanguage === "vi-VN" && "Thêm Tên Kho:"}
                                {selectedLanguage === "id-ID" && "Tambah Nama Gudang:"}
                                {selectedLanguage === "zh-CN" && "添加仓库名称:"}</h1>
                            <input type="text" value={warehouseName} onChange={(e) => handleWarehouseNamesChange(e)} placeholder="Enter New Warehouse name" className="border-2 w-full rounded-lg py-1 pl-2 text-center bg-white text-gray-800" />
                            <div className="mt-8">

                                <btn className="px-4 py-1 mt-5 bg-lime-200 text-gray-800 font-semibold rounded-lg cursor-pointer" onClick={handleAddWarehouseNames}>
                                    {selectedLanguage === "en-US" && "Add Warehouse Name"}
                                    {selectedLanguage === "fil-PH" && "Magdagdag ng Pangalan ng Warehouse"}
                                    {selectedLanguage === "ms-MY" && "Tambah Nama Gudang"}
                                    {selectedLanguage === "th-TH" && "เพิ่มชื่อคลังสินค้า"}
                                    {selectedLanguage === "vi-VN" && "Thêm Tên Kho"}
                                    {selectedLanguage === "id-ID" && "Tambah Nama Gudang"}
                                    {selectedLanguage === "zh-CN" && "添加仓库名称"}
                                </btn>
                            </div>
                        </div>

                        <div className=" w-full text-center">
                            <h1 className="text-2xl font-bold text-yellow-900 my-5">  {selectedLanguage === "en-US" && "Add Reasons:"}
                                {selectedLanguage === "fil-PH" && "Magdagdag ng Mga Dahilan:"}
                                {selectedLanguage === "ms-MY" && "Tambah Sebab:"}
                                {selectedLanguage === "th-TH" && "เพิ่มเหตุผล:"}
                                {selectedLanguage === "vi-VN" && "Thêm Lý Do:"}
                                {selectedLanguage === "id-ID" && "Tambah Alasan:"}
                                {selectedLanguage === "zh-CN" && "添加原因："}</h1>
                            <input type="text" value={reason} onChange={(e) => handleReasonsChange(e)} placeholder="Enter New Reasons To Add" className="border-2 rounded-lg py-1 pl-2 text-center bg-white text-gray-800 w-full" />
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

                    <>

                        <h1 className="text-2xl font-bold text-yellow-900 mt-20 mb-5">
                            {selectedLanguage === "en-US" && "Add Shop Name:"}
                            {selectedLanguage === "fil-PH" && "Magdagdag ng Pangalan ng Tindahan:"}
                            {selectedLanguage === "ms-MY" && "Tambah Nama Kedai:"}
                            {selectedLanguage === "th-TH" && "เพิ่มชื่อร้านค้า:"}
                            {selectedLanguage === "vi-VN" && "Thêm Tên Cửa Hàng:"}
                            {selectedLanguage === "id-ID" && "Tambah Nama Toko:"}
                            {selectedLanguage === "zh-CN" && "添加商店名称："}</h1>

                    </>


                    <div className=" w-full mt-8 grid grid-cols-3 gap-4">
                        <div className="col-span-2">

                            <input type="text" value={shopName} onChange={(e) => handleShopNamesChange(e)} placeholder="Enter New ShopName Name" className="border-2 w-full rounded-lg py-1 pl-2 text-center bg-white text-gray-800" />
                            <select
                                value={selectedFinance}
                                onChange={handleFinanceChange}
                                className="border-2 w-full rounded-lg py-1 pl-2 mt-5 text-center bg-white text-gray-800"
                            >
                                <option value="">Select Finance</option>
                                {allFinance?.map((finance, index) => (
                                    <option key={index} value={finance?.name}>
                                        {finance?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <div>
                                <div className="border-2 py-5 text-left pl-8">
                                    {warehouseNames.map((warehouseName, index) => (
                                        <div key={index}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="mr-3"
                                                    value={warehouseName}
                                                    checked={selectedWarehouses.includes(warehouseName)}
                                                    onChange={handleCheckboxChange}
                                                />
                                                {warehouseName}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>


                    </div>


                    <div className="mt-8">

                        <btn className="px-4 py-1 mt-5 bg-lime-200 text-gray-800 font-semibold rounded-lg cursor-pointer" onClick={handleAddShopDetails}>
                            {selectedLanguage === "en-US" && "Add Shop Name"}
                            {selectedLanguage === "fil-PH" && "Magdagdag ng Pangalan ng Tindahan"}
                            {selectedLanguage === "ms-MY" && "Tambah Nama Kedai"}
                            {selectedLanguage === "th-TH" && "เพิ่มชื่อร้านค้า"}
                            {selectedLanguage === "vi-VN" && "Thêm Tên Cửa Hàng"}
                            {selectedLanguage === "id-ID" && "Tambah Nama Toko"}
                            {selectedLanguage === "zh-CN" && "添加商店名称"}
                        </btn>
                    </div>


                    <div>
                        {allShopDetails.map((shopDetails, index) => (
                            <div key={index} className="border p-4 mb-4">
                                <p>Shop Name: {shopDetails.shopeName}</p>
                                <p>Finance: {shopDetails.finance}</p>
                                <p>Warehouses:</p>
                                <ul>
                                    {Array.isArray(shopDetails.warehouses)
                                        ? shopDetails.warehouses.map((warehouse, warehouseIndex) => (
                                            <li key={warehouseIndex}>{warehouse}</li>
                                        ))
                                        : JSON.parse(shopDetails.warehouses).map((warehouse, warehouseIndex) => (
                                            <li key={warehouseIndex}>{warehouse}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))}
                    </div>











                </div>

                {/* modal part start from here to update a user information */}
                {editingUser && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white  w-7/12 p-8">
                            <h2 className="text-lg font-bold mb-4">Edit User</h2>

                            <div className="flex gap-4">
                         
                            <div>
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
                            {
                                (editingUser?.role).includes("~Warehouse~") &&
                                <div className="text-start w-9/12 rounded-lg" style={{ maxHeight: '200px', overflowY: 'scroll', border: '1px solid #ccc' }}>
                                {warehouseNames.map((warehouseName, index) => (
                                    <div key={index}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="mr-3"
                                                value={warehouseName}
                                                checked={selectedUserWarehouses.includes(warehouseName)}
                                                onChange={handleUserCheckboxChange}
                                            />
                                            {warehouseName}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            }

                          

                                   
                            </div>

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