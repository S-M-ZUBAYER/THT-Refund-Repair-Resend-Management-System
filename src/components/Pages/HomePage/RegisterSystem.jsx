
import React, { useCallback, useContext, useRef, useState } from 'react';
import { IoMdLogIn } from 'react-icons/io';
import { BiReset } from 'react-icons/bi';
import { BsEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/UserContext';

const RegisterSystem = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [language, setLanguage] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [lengthError, setLengthError] = useState(null);
  const [matchError, setMatchError] = useState(null);

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  const { user, setUser, selectedLanguage } = useContext(AuthContext);


  const registerRef = useRef(null);


  const [selectedRoles, setSelectedRoles] = useState([]);
  const allRoles = [
    "~Customer-Service~",
    "~Customer-Service-Leader~",
    "~Warehouse~",
    "~Warehouse-Manager~",
    "~Finance~",
    "~Supplier~",

  ];
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRoles((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedRoles((prevSelected) => prevSelected.filter((role) => role !== value));
    }
  };

  console.log(selectedRoles)

  //use this function to navigate the route after registration
  const navigate = useNavigate();


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);

  };

  // create this function to upload image
  const handleFileUpload = useCallback(async (acceptedFiles) => {
    const apiKey = process.env.REACT_APP_IMG_BB_API_KEY;
    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      setImage(response.data.data.display_url);
      toast.success('Image prepared for use successfully');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, []);



  const handleRegister = (event) => {
    event.preventDefault();

    if (name === "" || image === "" || phoneNumber === "" || language === "" || country === "" || email === "" || selectedRoles === "") {
      toast.error("Please provide all the information");
      return;
    }
    setLoading(true);
    const user = {
      email,
      name,
      phoneNumber,
      role:selectedRoles,
      country,
      language,
      image
    };
console.log(user?.role)
    const form = event.target;

    fetch('http://localhost:5000/tht/check-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        const userExists = data.exists;
        console.log(userExists);

        if (!userExists) {
          // Validate password length
          if (password.length < 6) {
            setLengthError("Your password must be at least 6 characters long");
            toast.error(lengthError);
            setLoading(false);
            return;
          }

          // Validate password match
          if (password !== confirmPassword) {
            setMatchError("Your passwords do not match");
            toast.error(matchError);
            setLoading(false);
            return;
          }

          fetch('http://localhost:5000/tht/RFusers/add', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              confirmPassword,
              name,
              phoneNumber,
              role:selectedRoles,
              language,
              country,
              image,
              admin: "false"
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
              if (data) {
                // localStorage.setItem('RFuser', JSON.stringify(user));
                // setUser(user);
                setLoading(false);
                toast.success("Registration complete Successfully");

                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setName("");
                setPhoneNumber("");
                setRole("");
                setLanguage("");
                setCountry("");
                setImage(null);


                navigate("/login");
              } else {
                toast.error(data.message);
                setLoading(false);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              toast.error("An error occurred during registration");
              setLoading(false);
            });
        } else {
          toast.error("This email already has an account");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error("An error occurred while checking user existence");
        setLoading(false);
      });
  };
  //create this function to show the password toggle
  const handleToShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword)
  };
  const handleToShowConfirmPassword = (event) => {
    event.preventDefault();
    setShowConfirmPassword(!showConfirmPassword)
  };



  return (
    <div id="register" ref={registerRef} className='max-w-[1240px] mx-auto grid lg:grid-cols-4 gap-4 px-4 pb-16'>
      <div className='lg:col-span-2 flex flex-col justify-evenly'>
        <div className="text-center">

          {
            selectedLanguage === "zh-CN" &&
            <>
              <h2>目的和如何使用本网站</h2>
              <p className='py-4'>
                这是THT-SPACE电气公司有限公司的系统。该网站将帮助THT-SPACE电气公司有限公司所有种类的员工，他们在产品更换、退款和维修部门工作。该网站使工作过程动态化。每个部门的员工都有完成自己特定职责的责任。每个产品的处理将在不同的步骤中完成。每个步骤都依赖于前一个步骤。如果任何人未完成任何步骤，该产品的处理将不会继续进行到下一步。
              </p>
            </>
          }
          {
            selectedLanguage === "en-US" &&
            <>
              <h2>Purpose And How We Can Use This Site</h2>
              <p className='py-4'>
                This is the system for THT-Space Electrical Company Ltd. This site will help all kinds of employees
                of THT-Space Electrical Company Ltd who are working in the sectors of replacement, refund, and repair
                of the products. This site makes the working process dynamic. Each sector's employee has their specific
                responsibilities to complete. Processing for every product will be completed in different steps. Every
                step depends on the previous step. If anyone didn't complete any step, the product process will
                not continue to the next step.
              </p>
            </>
          }
          {
            selectedLanguage === "fil-PH" &&
            <>
              <h2>Layunin At Paano Natin Magagamit Ang Site Na Ito</h2>
              <p className='py-4'>
                Ito ang sistema para sa THT-Space Electrical Company Ltd. Tutulungan ng site na ito ang lahat ng uri ng empleyado
                ng THT-Space Electrical Company Ltd na nagtatrabaho sa mga sektor ng pagpapalit, pag-refund, at pagkumpuni
                ng mga produkto. Ginagawang dynamic ng site na ito ang proseso ng trabaho. May mga espesyal na responsibilidad
                ang bawat empleyado ng bawat sektor na kailangang matapos. Ang proseso para sa bawat produkto ay magiging kumpleto
                sa iba't ibang hakbang. Ang bawat hakbang ay umaasa sa nakaraang hakbang. Kung hindi matapos ng sinuman ang anumang hakbang,
                hindi magsisimula ang proseso ng produkto sa susunod na hakbang.
              </p>
            </>
          }
          {
            selectedLanguage === "ms-MY" &&
            <>
              <h2>Tujuan Dan Cara Penggunaan Laman Ini</h2>
              <p className='py-4'>
                Ini adalah sistem bagi THT-Space Electrical Company Ltd. Laman web ini akan membantu semua jenis pekerja
                THT-Space Electrical Company Ltd yang bekerja dengan sektor penggantian, bayaran balik, dan pembaikan
                produk. Laman web ini menjadikan proses kerja dinamik. Setiap pekerja sektor mempunyai tanggungjawab
                khusus mereka untuk diselesaikan. Pemprosesan untuk setiap produk akan diselesaikan dalam langkah-langkah berbeza.
                Setiap langkah bergantung pada langkah sebelumnya. Jika sesiapa tidak menyelesaikan langkah apa pun, proses produk ini
                tidak akan diteruskan ke langkah seterusnya.
              </p>
            </>
          }
          {
            selectedLanguage === "th-TH" &&
            <>
              <h2>วัตถุประสงค์และวิธีการใช้เว็บไซต์นี้</h2>
              <p className='py-4'>
                นี่คือระบบสำหรับบริษัท THT-Space Electrical Ltd. ไซต์นี้จะช่วยให้พนักงานทุกประเภท
                ของบริษัท THT-Space Electrical Ltd ที่ทำงานในภูมิภาคของการเปลี่ยน คืนเงิน และซ่อมแซม
                ของสินค้า ไซต์นี้ทำให้กระบวนการทำงานเปลี่ยนแปลงได้ พนักงานในแต่ละภูมิภาคมีความรับผิดชอบเฉพาะของพวกเขา
                ที่จะต้องทำให้เสร็จสิ้น การประมวลผลสำหรับทุกผลิตภัณฑ์จะเสร็จสิ้นในขั้นตอนที่แตกต่างกัน ทุกขั้นตอนขึ้นอยู่กับขั้นตอนก่อนหน้านี้
                หากไม่มีใครทำให้เสร็จสิ้นขั้นตอนใด ๆ กระบวนการผลิตสินค้าจะไม่ดำเนินการต่อไปยังขั้นตอนถัดไป
              </p>
            </>
          }
          {
            selectedLanguage === "vi-VN" &&
            <>
              <h2>Mục Đích Và Cách Sử Dụng Trang Web Này</h2>
              <p className='py-4'>
                Đây là hệ thống dành cho Công ty Điện THT-Space Ltd. Trang web này sẽ giúp đỡ tất cả các loại nhân viên
                của Công ty Điện THT-Space Ltd đang làm việc trong các ngành thay thế, hoàn trả và sửa chữa
                của các sản phẩm. Trang web này làm cho quy trình làm việc trở nên linh hoạt. Mỗi nhân viên ngành có
                trách nhiệm cụ thể của họ để hoàn thành. Xử lý cho mỗi sản phẩm sẽ được hoàn thành trong các bước khác nhau.
                Mỗi bước phụ thuộc vào bước trước đó. Nếu ai không hoàn thành bất kỳ bước nào, quy trình sản phẩm sẽ không
                tiếp tục vào bước tiếp theo.
              </p>
            </>
          }
          {
            selectedLanguage === "id-ID" &&
            <>
              <h2>Tujuan Dan Cara Menggunakan Situs Ini</h2>
              <p className='py-4'>
                Ini adalah sistem untuk THT-Space Electrical Company Ltd. Situs ini akan membantu semua jenis karyawan
                dari THT-Space Electrical Company Ltd yang bekerja dengan sektor penggantian, pengembalian, dan perbaikan
                produk. Situs ini membuat proses kerja menjadi dinamis. Setiap karyawan sektor memiliki tanggung jawab
                khusus mereka untuk diselesaikan. Pengolahan untuk setiap produk akan diselesaikan dalam langkah-langkah yang berbeda.
                Setiap langkah bergantung pada langkah sebelumnya. Jika ada yang tidak menyelesaikan langkah apa pun,
                proses produk tidak akan berlanjut ke langkah berikutnya.
              </p>
            </>
          }


        </div>
        {
          selectedLanguage === "zh-CN" &&
          <div className='grid sm:grid-cols-2 gap-8 py-4'>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <Link to="/login">
                <button>
                  <IoMdLogIn className="text-green-300" size={50} />
                </button>
              </Link>

              <div>
                <Link to="/login"> <h3 className='py-2'>登录</h3> </Link>
                <p className='py-1'>如果您已经拥有账户，请登录</p>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <button>
                <BiReset className="text-yellow-400" size={50} />
              </button>
              <div>
                <h3 className='py-2'>重置密码</h3>
                <p className='py-1'>如果您忘记了密码，请重置您的密码</p>
              </div>
            </div>
          </div>
        }
        {
          selectedLanguage === "en-US" &&
          <div className='grid sm:grid-cols-2 gap-8 py-4'>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <Link to="/login">
                <button>
                  <IoMdLogIn className="text-green-300" size={50} />
                </button>
              </Link>

              <div>
                <Link to="/login"> <h3 className='py-2'>Log In</h3> </Link>
                <p className='py-1'>If You Already Have An Account Please Log In</p>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <button>
                <BiReset className="text-yellow-400" size={50} />
              </button>
              <div>
                <h3 className='py-2'>Reset Password</h3>
                <p className='py-1'>If You Forget Your Password Please Reset Your Password</p>
              </div>
            </div>
          </div>
        }
        {
          selectedLanguage === "fil-PH" &&
          <div className='grid sm:grid-cols-2 gap-8 py-4'>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <Link to="/login">
                <button>
                  <IoMdLogIn className="text-green-300" size={50} />
                </button>
              </Link>

              <div>
                <Link to="/login"> <h3 className='py-2'>Mag-log In</h3> </Link>
                <p className='py-1'>Kung Meron Ka Nang Account, Mag-Log In</p>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <button>
                <BiReset className="text-yellow-400" size={50} />
              </button>
              <div>
                <h3 className='py-2'>I-reset ang Password</h3>
                <p className='py-1'>Kung Nakalimutan Mo ang Iyong Password, I-reset ang Password Mo</p>
              </div>
            </div>
          </div>
        }
        {
          selectedLanguage === "ms-MY" &&
          <div className='grid sm:grid-cols-2 gap-8 py-4'>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <Link to="/login">
                <button>
                  <IoMdLogIn className="text-green-300" size={50} />
                </button>
              </Link>

              <div>
                <Link to="/login"> <h3 className='py-2'>Log Masuk</h3> </Link>
                <p className='py-1'>Jika Anda Sudah Memiliki Akaun, Sila Log Masuk</p>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <button>
                <BiReset className="text-yellow-400" size={50} />
              </button>
              <div>
                <h3 className='py-2'>Set Semula Kata Laluan</h3>
                <p className='py-1'>Jika Anda Lupa Kata Laluan Anda, Sila Set Semula Kata Laluan Anda</p>
              </div>
            </div>
          </div>
        }
        {
          selectedLanguage === "th-TH" &&
          <div className='grid sm:grid-cols-2 gap-8 py-4'>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <Link to="/login">
                <button>
                  <IoMdLogIn className="text-green-300" size={50} />
                </button>
              </Link>

              <div>
                <Link to="/login"> <h3 className='py-2'>เข้าสู่ระบบ</h3> </Link>
                <p className='py-1'>หากคุณมีบัญชีอยู่แล้ว โปรดเข้าสู่ระบบ</p>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <button>
                <BiReset className="text-yellow-400" size={50} />
              </button>
              <div>
                <h3 className='py-2'>รีเซ็ตรหัสผ่าน</h3>
                <p className='py-1'>หากคุณลืมรหัสผ่านของคุณ โปรดรีเซ็ตรหัสผ่านของคุณ</p>
              </div>
            </div>
          </div>
        }
        {
          selectedLanguage === "vi-VN" &&
          <div className='grid sm:grid-cols-2 gap-8 py-4'>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <Link to="/login">
                <button>
                  <IoMdLogIn className="text-green-300" size={50} />
                </button>
              </Link>

              <div>
                <Link to="/login"> <h3 className='py-2'>Đăng Nhập</h3> </Link>
                <p className='py-1'>Nếu Bạn Đã Có Tài Khoản, Vui Lòng Đăng Nhập</p>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <button>
                <BiReset className="text-yellow-400" size={50} />
              </button>
              <div>
                <h3 className='py-2'>Đặt Lại Mật Khẩu</h3>
                <p className='py-1'>Nếu Bạn Quên Mật Khẩu Của Mình, Vui Lòng Đặt Lại Mật Khẩu Của Bạn</p>
              </div>
            </div>
          </div>
        }
        {
          selectedLanguage === "id-ID" &&
          <div className='grid sm:grid-cols-2 gap-8 py-4'>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <Link to="/login">
                <button>
                  <IoMdLogIn className="text-green-300" size={50} />
                </button>
              </Link>

              <div>
                <Link to="/login"> <h3 className='py-2'>Masuk</h3> </Link>
                <p className='py-1'>Jika Anda Sudah Memiliki Akun, Silakan Masuk</p>
              </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center text-center'>
              <button>
                <BiReset className="text-yellow-400" size={50} />
              </button>
              <div>
                <h3 className='py-2'>Atur Ulang Kata Sandi</h3>
                <p className='py-1'>Jika Anda Lupa Kata Sandi Anda, Silakan Atur Ulang Kata Sandi Anda</p>
              </div>
            </div>
          </div>
        }

      </div>

      <div className="lg:col-span-2 ml-5 border-2 px-3 pt-3">
        <div className='border text-center bg-amber-200 font-semibold rounded-lg'>
          <p className='pt-2'>
            {selectedLanguage === "zh-CN" && "如果您没有任何帐户"}
            {selectedLanguage === "en-US" && "If You Don't Have Any Account"}
            {selectedLanguage === "fil-PH" && "Kung Wala Kang Anumang Account"}
            {selectedLanguage === "ms-MY" && "Jika Anda Tidak Mempunyai Akaun"}
            {selectedLanguage === "th-TH" && "หากคุณไม่มีบัญชี"}
            {selectedLanguage === "vi-VN" && "Nếu Bạn Không Có Tài Khoản"}
            {selectedLanguage === "id-ID" && "Jika Anda Tidak Memiliki Akun"}
          </p>

          <p className='py-2'>
            {selectedLanguage === "zh-CN" && "请注册"}
            {selectedLanguage === "en-US" && "Please Register"}
            {selectedLanguage === "fil-PH" && "Mangyaring Magparehistro"}
            {selectedLanguage === "ms-MY" && "Sila Daftar"}
            {selectedLanguage === "th-TH" && "กรุณาลงทะเบียน"}
            {selectedLanguage === "vi-VN" && "Vui lòng Đăng ký"}
            {selectedLanguage === "id-ID" && "Silakan Mendaftar"}
          </p>

        </div>
        <form className='w-full'>
          <div className='flex justify-between items-center my-2'>
            <label className='mr-2 text-base'>
              {selectedLanguage === "zh-CN" && "电子邮件"}
              {selectedLanguage === "en-US" && "Email"}
              {selectedLanguage === "fil-PH" && "Email"}
              {selectedLanguage === "ms-MY" && "E-mel"}
              {selectedLanguage === "th-TH" && "อีเมล"}
              {selectedLanguage === "vi-VN" && "Email"}
              {selectedLanguage === "id-ID" && "Email"}
            </label>
            <input
              className='border rounded-md p-1 w-9/12'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex justify-between items-center my-2 relative'>
            <label className='mr-2'>
              {selectedLanguage === "zh-CN" && "密码"}
              {selectedLanguage === "en-US" && "Password"}
              {selectedLanguage === "fil-PH" && "Password"}
              {selectedLanguage === "ms-MY" && "Kata Laluan"}
              {selectedLanguage === "th-TH" && "รหัสผ่าน"}
              {selectedLanguage === "vi-VN" && "Mật khẩu"}
              {selectedLanguage === "id-ID" && "Password"}
            </label>
            <input
              className='border rounded-md p-1 w-9/12'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <button className="absolute right-0 pr-2" type={showConfirmPassword ? "text" : "password"} onClick={handleToShowPassword}>
                                    {
                                        showPassword ? <BsEyeFill className="text-slate-500"></BsEyeFill> : <RiEyeCloseLine className="text-slate-500"></RiEyeCloseLine>
                                    }

                                </button> */}
          </div>
          <div className='flex justify-between items-center my-2 relative'>
            <label className='text-sm'>
              {selectedLanguage === "zh-CN" && "确认密码"}
              {selectedLanguage === "en-US" && "Confirm Password"}
              {selectedLanguage === "fil-PH" && "Kumpirmahin ang Password"}
              {selectedLanguage === "ms-MY" && "Sahkan Kata Laluan"}
              {selectedLanguage === "th-TH" && "ยืนยันรหัสผ่าน"}
              {selectedLanguage === "vi-VN" && "Xác nhận mật khẩu"}
              {selectedLanguage === "id-ID" && "Konfirmasi Password"}
            </label>
            <input
              className='border rounded-md p-1 w-9/12'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* <button className="absolute right-0 pr-2" onClick={handleToShowConfirmPassword}>
                                    {
                                        showConfirmPassword ? <BsEyeFill className="text-slate-500"></BsEyeFill> : <RiEyeCloseLine className="text-slate-500"></RiEyeCloseLine>
                                    }

                                </button> */}
          </div>
          <div className='flex justify-between items-center my-2'>
            <label className='mr-2'>
              {selectedLanguage === "zh-CN" && "名称"}
              {selectedLanguage === "en-US" && "Name"}
              {selectedLanguage === "fil-PH" && "Pangalan"}
              {selectedLanguage === "ms-MY" && "Nama"}
              {selectedLanguage === "th-TH" && "ชื่อ"}
              {selectedLanguage === "vi-VN" && "Tên"}
              {selectedLanguage === "id-ID" && "Nama"}
            </label>
            <input
              className='border rounded-md p-1 w-9/12'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex justify-between items-center my-2'>
            <label className='mr-2'>
              {selectedLanguage === "zh-CN" && "电话号码"}
              {selectedLanguage === "en-US" && "Phone Number"}
              {selectedLanguage === "fil-PH" && "Numero ng Telepono"}
              {selectedLanguage === "ms-MY" && "Nombor Telefon"}
              {selectedLanguage === "th-TH" && "หมายเลขโทรศัพท์"}
              {selectedLanguage === "vi-VN" && "Số điện thoại"}
              {selectedLanguage === "id-ID" && "Nomor Telepon"}
            </label>
            <input
              className='border rounded-md p-1 w-9/12'
              type='tel'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className='flex justify-between items-center my-2'>
            <label className='mr-2 w-1/12'>
              {selectedLanguage === "zh-CN" && "角色"}
              {selectedLanguage === "en-US" && "Role"}
              {selectedLanguage === "fil-PH" && "Papel"}
              {selectedLanguage === "ms-MY" && "Peranan"}
              {selectedLanguage === "th-TH" && "บทบาท"}
              {selectedLanguage === "vi-VN" && "Vai trò"}
              {selectedLanguage === "id-ID" && "Peran"}
            </label>
            <div className="text-start w-9/12 rounded-lg" style={{ maxHeight: '100px', overflowY: 'scroll', border: '1px solid #ccc' }}>
            {allRoles.map((role, index) => (
              <div className="px-3 flex justify-start " key={index}>
                <input
                  className="mr-2 text-start"
                  type="checkbox"
                  value={role}
                  checked={selectedRoles.includes(role)}
                  onChange={handleCheckboxChange}
                />
                {role}
              </div>
            ))}
          </div>
          </div>

          <div className='flex justify-between items-center my-2'>
            <label className='mr-2'>
              {selectedLanguage === "zh-CN" && "语言"}
              {selectedLanguage === "en-US" && "Language"}
              {selectedLanguage === "fil-PH" && "Wika"}
              {selectedLanguage === "ms-MY" && "Bahasa"}
              {selectedLanguage === "th-TH" && "ภาษา"}
              {selectedLanguage === "vi-VN" && "Ngôn ngữ"}
              {selectedLanguage === "id-ID" && "Bahasa"}
            </label>
            <select
              className='border rounded-md p-1 w-9/12'
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option >Select</option>
              <option >Chinese</option>
              <option >Bengali</option>
              <option >Indonesian</option>
              <option >Thai</option>
              <option >English</option>
              <option >Malay</option>
            </select>
          </div>

          <div className='flex justify-between items-center my-2'>
            <label className='mr-2'>
              {selectedLanguage === "zh-CN" && "国家"}
              {selectedLanguage === "en-US" && "Country"}
              {selectedLanguage === "fil-PH" && "Bansa"}
              {selectedLanguage === "ms-MY" && "Negara"}
              {selectedLanguage === "th-TH" && "ประเทศ"}
              {selectedLanguage === "vi-VN" && "Quốc gia"}
              {selectedLanguage === "id-ID" && "Negara"}
            </label>
            <select
              className='border rounded-md p-1 w-9/12'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option>Select</option>
              <option>China</option>
              <option>Bangladesh</option>
              <option>Indonesia</option>
              <option>Thailand</option>
              <option>Singapore</option>
              <option>Malaysia</option>
            </select>
          </div>

         

          <div className='flex justify-between items-center my-2'>
            <label className='mr-2'>
              {selectedLanguage === "zh-CN" && "图像"}
              {selectedLanguage === "en-US" && "Image"}
              {selectedLanguage === "fil-PH" && "Larawan"}
              {selectedLanguage === "ms-MY" && "Imej"}
              {selectedLanguage === "th-TH" && "รูปภาพ"}
              {selectedLanguage === "vi-VN" && "Hình ảnh"}
              {selectedLanguage === "id-ID" && "Gambar"}
            </label>
            <input
              className='border rounded-md p-1 w-9/12'
              type='file'
              accept='image/*'
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </div>
          <button className='w-full my-4' onClick={handleRegister}>
            {selectedLanguage === "zh-CN" && "注册"}
            {selectedLanguage === "en-US" && "Register"}
            {selectedLanguage === "fil-PH" && "Magparehistro"}
            {selectedLanguage === "ms-MY" && "Daftar"}
            {selectedLanguage === "th-TH" && "ลงทะเบียน"}
            {selectedLanguage === "vi-VN" && "Đăng ký"}
            {selectedLanguage === "id-ID" && "Mendaftar"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegisterSystem;