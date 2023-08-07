import React, { useContext, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import GrozzieeLogo from "../../assets/Grozziie_logo.png"
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false)
  const [loading, setLoading] = useState(false);

  const { user, setUser, selectedLanguage, setSelectedLanguage } = useContext(AuthContext);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOutsideClick = (e) => {
    if (isModalOpen && !e.target.closest('.modal-container') && !e.target.closest('.user-image')) {
      setIsModalOpen(false);
    }
  };

  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo)
  };

  const handleToLogOut = () => {
    try {
      setLoading(true);
      setUser(null);
      localStorage.removeItem('RFuser');
      toast.success("Logout successfully");
      setLoading(false);
      // Navigate('/login')
    }
    catch (err) {
      toast.error(err)
    }


  }

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };



  return (
    <div className='flex w-full justify-between items-center h-15 sticky top-0 px-4  z-10 text-black bg-gradient-to-t from-red-200 via-amber-200  to-lime-200'>
      <div className="hover:cursor-pointer">
        {/* <h1 onClick={handleNav} className={logo ? 'hidden' : 'block'}>Grozziie</h1> */}
        <img className="w-32 h-8" src={GrozzieeLogo}></img>
        {/* <img className="w-32 h-8" src={GrozzieeLogo}></img> */}
      </div>
      <ul className='hidden  lg:flex'>
        <li><Link to='home' className="md:text-small hover:cursor-pointer">Home</Link> </li>
        <li><Link to='refund' className="md:text-small hover:cursor-pointer">Refund</Link> </li>
        <li><Link to='resend' className="md:text-small hover:cursor-pointer">Resend</Link> </li>
        <li><Link to='supply' className="md:text-small hover:cursor-pointer">Supply</Link> </li>
        <li><Link to='repair' className="md:text-small hover:cursor-pointer">Repair</Link> </li>
        {
          user?.admin === "true" ? <li><Link to='admin' className="hover:cursor-pointer">Admin</Link> </li> : ""
        }

        <li><Link to='about' className="hover:cursor-pointer">Contact</Link> </li>
      </ul>


      <div className="flex justify-around items-center">

        <div className='flex justify-between items-center my-2 mr-5'>
          <select className="text-black px-2 " value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="zh-CN">中文</option>
            <option value="en-US">English</option>
            <option value="th-TH">ไทย</option>
            <option value="fil-PH">Philippines</option>
            <option value="vi-VN">Tiếng Việt</option>
            <option value="ms-MY">Malaysia</option>
            <option value="id-ID">Indonesia</option>
          </select>
        </div>


     


        {
          user ?
            <div className='hidden lg:flex mr-5'>
              <p onClick={handleToLogOut} className="hover:cursor-pointer">LogOut</p>
            </div> :
            <Link to="login"><div className='hidden md:flex'>
              <p className="hover:cursor-pointer">LogIn</p>
            </div></Link>
        }


{user && (
          <div className='hidden md:flex'>
            <div className="user-image" onClick={toggleModal}>
              {user.image ? (
                <img src={user.image} alt="User" className="w-10 h-10 rounded-full mr-4" />
              ) : (
                <FaUserCircle className="text-black text-2xl mr-4" />
              )}
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-start" onClick={handleOutsideClick}>
            <div className="modal-container bg-white p-4 absolute top-14 md:right-1/3 lg:right-10 border border-black rounded-lg">
              {/* Modal content */}
              <div className="text-center flex flex-col items-center">
                {user?.image ? (
                  <img src={user.image} alt="User" className="w-10 h-10 rounded-full mb-2" />
                ) : (
                  <FaUserCircle className="text-black text-2xl mb-2" />
                )}
                <div>
                  <p>{user?.name}</p>
                  <p>{user?.role}</p>
                  <p>{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>




      {/* Hamburger */}
      <div onClick={handleNav} className='lg:hidden z-10'>
        {nav ? <AiOutlineClose className='text-black' size={20} /> : <HiOutlineMenuAlt4 size={20} />}
      </div>

      {/* Mobile menu dropdown */}
      <div onClick={handleNav} className={nav ? 'absolute text-black left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col' : 'absolute left-[-100%]'}>
        <ul>
          <h1 className="hover:cursor-pointer">Grozziie</h1>
          <li><Link to='home' className='border-b hover:cursor-pointer'>Home</Link></li>
          <li><Link to='refund' className='border-b hover:cursor-pointer'>Refund</Link></li>
          <li><Link to='resend' className='border-b hover:cursor-pointer'>Resend</Link></li>
          <li><Link to='repair' className='border-b hover:cursor-pointer'>Supply</Link></li>
          <li><Link to='supply' className='border-b hover:cursor-pointer'>Repair</Link></li>
          {
            user?.admin === "true" ? <li><Link to='admin' className="border-b hover:cursor-pointer">Admin</Link> </li> : ""
          }
          <li><Link to='about' className='border-b hover:cursor-pointer'>Contact</Link></li>




          {
            user ?
              <li onClick={handleToLogOut} className='border-b hover:cursor-pointer'>LogOut</li> :
              <Link to="login"><div className='border-b hover:cursor-pointer'>
                <li className="border-b hover:cursor-pointer">LogIn</li>
              </div></Link>
          }

          <div className='flex justify-between my-6'>
            <FaFacebook className='icon' />
            <FaTwitter className='icon' />
            <FaYoutube className='icon' />
            <FaPinterest className='icon' />
            <FaInstagram className='icon' />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
