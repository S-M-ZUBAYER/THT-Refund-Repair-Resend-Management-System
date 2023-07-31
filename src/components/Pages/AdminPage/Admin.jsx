// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DisplaySpinner from '../../Loading/DisplaySpinner';

// const Admin = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://grozziie.zjweiting.com:8035/tht/allRFusers');
//         const data = response.data;
//         setUsers(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error occurred during the request:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <DisplaySpinner></DisplaySpinner>
//   }
//     return (
//         <div className='max-w-[1240px] mx-auto py-16 px-4 text-center'>

// <div>
//       <h1>Available Users In Our Site</h1>
//       <p className='py-4'>These all are users in our site. Different users has the different responsibilities to complete these full process. Here you can make anyone role as admin. </p>

//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.name} - {user.email}
//           </li>
//         ))}
//       </ul>
//     </div>




//      </div>
//     );
// };

// export default Admin;

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import DisplaySpinner from '../../Loading/DisplaySpinner';


const Admin = () => {

    //create useState for the user and update 
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);


    //start the part to get all the users from database

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://grozziie.zjweiting.com:8035/tht/allRFusers');
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
        try {
            await axios.delete(`https://grozziie.zjweiting.com:8033/tht/users/delete/${userId}`);
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



    //create a function to update a user from the frontend and database both side 
    const updateUser = async (userId, editingUser) => {
        try {
            const response = await axios.put(`https://grozziie.zjweiting.com:8035/tht/RFusers/update/admin/${userId}`, editingUser);
            console.log(response)
            toast.success("user information updated successfully");
            // Optionally, you can show a success message to the user using a toast or other UI notification.
        } catch (error) {
            toast.error('Error updating user:', error);
            // Optionally, you can show an error message to the user using a toast or other UI notification.
        }
    };
    const saveUser = (userId, updatedUser) => {
        updateUser(userId, updatedUser);
        setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setEditingUser(null);
    };

    //create a function to update a user from the frontend and database both side 
    const updateUserToAdmin = async (userId) => {
        // setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        const isAdmin = true;

        try {
            const response = await axios.put(`https://grozziie.zjweiting.com:8035/tht/RFusers/update/admin/${userId}`, isAdmin);
            console.log(users)
            console.log(response)
            setUsers(users.map((user) => {
                console.log(users)
                if (user?.id === userId) {
                    user.admin = "true";
                }
                return user;
            }))

            console.log(users)


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
            <h1>Available Users In Our Site</h1>
            <p className='py-4 mb-5'>These all are users in our site. Different users has the different responsibilities to complete these full process. Here you can make anyone role as admin. </p>
            <table className="w-full mb-10">
                <thead className="bg-gradient-to-r from-green-300 to-yellow-300">
                    <tr className="py-2">
                        <th className="text-start pl-2 py-2">No</th>
                        <th className="text-start pl-2 py-2">Name</th>
                        <th className="text-start hidden md:block py-2">Email</th>
                        <th className="text-start">Role</th>
                        <th className="text-start">Language</th>
                        <th className="text-start">Country</th>
                        <th className="text-start">Admin</th>
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
                        users.map((user,index) => (
                            <tr key={user.id} className="my-5">
                                <td className="text-center pl-2 py-2 font-semibold" >{index+1}</td>
                                <td className="text-center pl-2 py-2 font-semibold" >{user?.name}</td>
                                <td className="text-center hidden md:block py-2">{user?.email}</td>
                                <td className="text-center">{user?.role}</td>
                                <td className="text-center">{user?.language}</td>
                                <td className="text-center">{user?.country}</td>
                                <td>
                                    {
                                        user?.admin === "true" ?
                                            <btn className=" bg-green-300 rounded-tl-lg rounded-br-lg py-1 px-2 text-center">Admin</btn>
                                            :
                                            <btn onClick={() => updateUserToAdmin(user?.id)} className=" bg-red-400 rounded-tl-lg rounded-br-lg py-1 px-2 text-center hover:cursor-pointer">Make Admin</btn>

                                    }
                                </td>
                                <td>
                                    <btn className="text-blue-500 text-center" onClick={() => openEditModal(user)}>
                                        <FiEdit></FiEdit>
                                    </btn>
                                </td>
                                <td>
                                    <btn className="text-red-500 text-center" onClick={() => deleteUser(user.id)}>
                                        <RiDeleteBin7Line></RiDeleteBin7Line>
                                    </btn>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>



            {/* modal part start from here to update a user information */}
            {editingUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8">
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
                            value={editingUser.designation}
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
                            className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => saveUser(editingUser.id, editingUser)}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;