import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { GrFacebook, GrGoogle } from "react-icons/gr";
import { BsEyeFill, BsWechat } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
// import { BsEyeFill } from "react-icons/bs";
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';
// import BtnSpinner from '../../Shared/Loading/BtnSpinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const {setLanguage}=useContext(AllProductContext);
  const { user, setUser,selectedLanguage } = useContext(AuthContext);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);


  const [show, setShow] = useState(false)


  const from = location?.state?.from?.pathname || "/";



  const handleClick = () => {
    const registerElement = document.getElementById('register');
    console.log(registerElement)
    if (registerElement) {
      // Access the element here
      console.log(registerElement);
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
    if (email === "" || password === "") {
      toast.error("please input all the information properly")
      return;
    }
    setLoading(true);
    const form = event.target;
    // handle form submission logic here
    fetch('https://grozziie.zjweiting.com:8035/tht/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(res => res.json())
      .then(data => {
        //     if (data?.message!=="Wrong email/password combination!"|| data?.message!=="User doesn't exist") {
        //       console.log(data)
        //     setUser(data[0])
        //     localStorage.setItem('user', JSON.stringify(data[0]));
        // setLoading(false);
        // navigate(from,{replace:true})
        // form.reset();
        //         toast.success('User Login Successfully');

        //     }
        if (data?.message === "Wrong email/password combination!") {
          toast.error(data.message);
          setLoading(false);
        }
        else if (data?.message === "User doesn't exist") {
          toast.error(data.message);
          setLoading(false);
        }
        else {
          console.log(data)
          setUser(data[0])
          localStorage.setItem('RFuser', JSON.stringify(data[0]));
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



  const handleToResetPassword = () => {
    if (password !== confirmPassword) {
      setErrorMessage('Password and confirm password do not match');
      return;
    }

    // Call the API endpoint to reset password with the email
    fetch('https://grozziie.zjweiting.com:8035/tht/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => { 
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const openModal = () => {
    console.log("click")
    setModalOpen(true);
    console.log(modalOpen)
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const handleToResetPassword = () => {
  //     resetPassword(email)
  //         .then(() => {
  //             console.log(email)
  //             toast.success('Please check your email to reset')
  //             // setLoading(false);
  //         })
  //         .catch(err => {
  //             toast.error(err.message);
  //             console.log(err);
  //             // setLoading(false);
  //         })
  // }

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
          <div className="text-end text-sm mb-8">
          <button type="button" className="text-[#65ABFF] font-semibold" onClick={openModal}>
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
        <div className="text-sm my-3 flex justify-center">
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
</div>


        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>

              <h2>Reset Password</h2>

              <form>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button type="button" onClick={handleToResetPassword}>
                  Save
                </button>
              </form>

              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;