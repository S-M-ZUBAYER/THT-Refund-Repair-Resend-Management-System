import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { BsEyeFill, BsWechat } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
// import { BsEyeFill } from "react-icons/bs";
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';
import axios from 'axios';
// import BtnSpinner from '../../Shared/Loading/BtnSpinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  // const {setLanguage}=useContext(AllProductContext);
  const { user, setUser, selectedLanguage } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);


  const [show, setShow] = useState(false)


  const from = location?.state?.from?.pathname || "/";



  const handleClick = () => {
    const registerElement = document.getElementById('register');
    if (registerElement) {
      registerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    handleClick();
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password || !role) {
      toast.error("please input all the information properly")
      return;
    }
    setLoading(true);
    const form = event.target;
    // handle form submission logic here
    fetch('http://localhost:5000/tht/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, role })
    })
      .then(res => res.json())
      .then(data => {

        if (data?.message === "Wrong email/password combination!") {
          toast.error(data.message);
          setLoading(false);
        }
        else if (data?.message === "User doesn't exist") {
          toast.error(data.message);
          setLoading(false);
        }
        else if (data?.message === "User doesn't have the required role") {
          toast.error(data.message);
          setLoading(false);
        }

        else {
          console.log(data[0]?.warehouseShop)
          setUser({ email: data[0]?.email, name: data[0]?.name, country: data[0]?.country, role: role,warehouseName:data[0]?.warehouseShop, image: data[0]?.image, admin: data[0]?.admin });
          localStorage.setItem('RFuser', JSON.stringify({ email: data[0]?.email, name: data[0]?.name, country: data[0]?.country, role: role,warehouseName:data[0]?.warehouseShop, admin: data[0]?.admin }));
          console.log({ email: data[0]?.email, name: data[0]?.name, country: data[0]?.country, role: role,warehouseName:data[0]?.warehouseShop, admin: data[0]?.admin })
          setLoading(false);
          navigate(from, { replace: true })
          form.reset();
          toast.success('User Login Successfully');
        }

      })





      .catch(err => {
        toast.error("Invalid User Name Or Password")
        console.log(err);
        setLoading(false);
      })
  };


  const handleToShow = (event) => {
    event.preventDefault();
    setShow(!show)
    // handle form submission logic here
  };



  const handleChangePassword = () => {
    // Prepare the request body
    const requestBody = {
      myEmail: myEmail,
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    // Make the PATCH request to change the password
    axios.patch('http://localhost:5000/tht/changePassword', requestBody)
      .then((response) => {
        if ((response?.data)?.message === "Wrong email/old password combination!") {
          toast.error("Wrong email/password combination!");
          return
        }
        setShowModal(false);
        toast.success('Password successfully changed!');
        // Handle any further actions on success, e.g., show success message or redirect
      })
      .catch((error) => {
        console.error('Error changing password:', error.response?.data?.message || error.message);
        toast.error('Error changing password:', error.response?.data?.message || error.message);
        return
        // Handle errors, e.g., show error message to the user
      });
  };


  const [myEmail, setMyEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');



  return (
    <div className="bg-white flex justify-center items-center">
      <div className="shadow-lg lg:w-1/3 my-12 py-10 px-12" >
        <h2 className="text-2xl mb-8 font-semibold my-4 flex justify-center">
          {selectedLanguage === "zh-CN" && "登录"}
          {selectedLanguage === "en-US" && "Sign In"}
          {selectedLanguage === "fil-PH" && "Mag-sign In"}
          {selectedLanguage === "ms-MY" && "Log Masuk"}
          {selectedLanguage === "th-TH" && "เข้าสู่ระบบ"}
          {selectedLanguage === "vi-VN" && "Đăng nhập"}
          {selectedLanguage === "id-ID" && "Masuk"}
        </h2>


        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="email">Email:</label> */}
          <input className=" w-full pl-2 text-gray-800 bg-white" placeholder="username or email" type="email" id="email" value={email} onChange={handleEmailChange} />
          <hr className="  mb-10" ></hr>
          <div className='w-full text-gray-800 bg-white'>
            <select
              className='w-full pl-2'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Select</option>
              <option>~Customer-Service~</option>
              <option>~Customer-Service-Leader~</option>
              <option>~Warehouse~</option>
              <option>~Warehouse-Manager~</option>
              <option>~Finance~</option>
              <option>~Supplier~</option>
            </select>
            <hr className="  mb-10" ></hr>
          </div>

          {/* <label htmlFor="password">Password:</label> */}
          <div className='relative'>
            <div className='flex items-center'>
              <input className=" w-full pl-2 text-gray-800 bg-white" placeholder="password" type={show ? "text" : "password"} typ id="password" value={password} onChange={handlePasswordChange} />
              <btn className="absolute right-0 pr-2 p-10 hover:cursor-pointer " onClick={handleToShow}>
                {show ? (
                  <BsEyeFill className="text-slate-500"></BsEyeFill>
                ) : (
                  <RiEyeCloseLine className="text-slate-500"></RiEyeCloseLine>
                )}
              </btn>
            </div>

            <hr className=" " ></hr>
            {/* <button>digit to start</button>
                        <button>start to digit</button> */}
          </div>
          <div className="text-end text-sm mt-3 mb-8">
            <button type="button" className="text-[#65ABFF] font-semibold" onClick={() => setShowModal(true)}>
              {selectedLanguage === "zh-CN" && "忘记密码？"}
              {selectedLanguage === "en-US" && "Forgot password?"}
              {selectedLanguage === "fil-PH" && "Nakalimutan ang password?"}
              {selectedLanguage === "ms-MY" && "Lupa kata laluan?"}
              {selectedLanguage === "th-TH" && "ลืมรหัสผ่าน?"}
              {selectedLanguage === "vi-VN" && "Quên mật khẩu?"}
              {selectedLanguage === "id-ID" && "Lupa kata sandi?"}
            </button>


          </div>
          <div className="my-2 flex justify-center ">
            <button className="bg-[#004368] text-white rounded-md px-32 py-1 text-xl font-semibold" type="submit">
              {selectedLanguage === "zh-CN" && "登录"}
              {selectedLanguage === "en-US" && "Sign In"}
              {selectedLanguage === "fil-PH" && "Mag-sign In"}
              {selectedLanguage === "ms-MY" && "Log Masuk"}
              {selectedLanguage === "th-TH" && "เข้าสู่ระบบ"}
              {selectedLanguage === "vi-VN" && "Đăng nhập"}
              {selectedLanguage === "id-ID" && "Masuk"}
            </button>

          </div>
        </form>
        {/* <div className="text-sm my-3 flex justify-center">
          {selectedLanguage === "zh-CN" && "没有账号？"}
          {selectedLanguage === "en-US" && "Don't have an account? "}
          {selectedLanguage === "fil-PH" && "Wala pang account? "}
          {selectedLanguage === "ms-MY" && "Tiada akaun? "}
          {selectedLanguage === "th-TH" && "ยังไม่มีบัญชีใช่ไหม? "}
          {selectedLanguage === "vi-VN" && "Bạn chưa có tài khoản? "}
          {selectedLanguage === "id-ID" && "Belum punya akun? "}
          <Link onClick={handleClick} className="font-semibold text-[#65ABFF]" to="/">
            {selectedLanguage === "zh-CN" && "创建一个账号"}
            {selectedLanguage === "en-US" && "Create an account"}
            {selectedLanguage === "fil-PH" && "Gumawa ng account"}
            {selectedLanguage === "ms-MY" && "Buat akaun"}
            {selectedLanguage === "th-TH" && "สร้างบัญชี"}
            {selectedLanguage === "vi-VN" && "Tạo tài khoản"}
            {selectedLanguage === "id-ID" && "Buat akun"}
          </Link>
        </div> */}




        {/* Modal */}
        {showModal && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-black flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <div className="mb-4">
                <label>Email:</label>
                <input type="text" className="border rounded-md p-2 w-full" value={myEmail} onChange={(e) => setMyEmail(e.target.value)} />
              </div>
              <div className="mb-4">
                <label>Old Password:</label>
                <input type="password" className="border rounded-md p-2 w-full" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </div>
              <div className="mb-4">
                <label>New Password:</label>
                <input type="password" className="border rounded-md p-2 w-full" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <btn className="bg-gradient-to-r from-green-300 to-yellow-300 text-black  text-base py-2 px-4 rounded cursor-pointer" onClick={handleChangePassword}>Change Password</btn>
              <btn className="bg-gradient-to-r from-yellow-300 to-red-600 text-black py-2 px-4 rounded ml-2 cursor-pointer" onClick={() => setShowModal(false)}>Cancel</btn>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;