import React, { useContext, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';

const MalaysiaNavbar = () => {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false)
  const [loading, setLoading] = useState(false);



  const { user, setUser, selectedLanguage, setSelectedLanguage } = useContext(AuthContext);
  console.log(user?.admin)

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

  console.log(selectedLanguage)

  return (
    <div className='flex w-full justify-between items-center h-20 px-4 absolute z-10 text-white'>
      <div className="hover:cursor-pointer">
        <h1 onClick={handleNav} className={logo ? 'hidden' : 'block'}>Grozziie</h1>
        {/* <img className="w-32 h-8" src={GrozzieeLogo}></img> */}
      </div>
      <ul className='hidden md:flex'>
        <li><Link to='home' className="hover:cursor-pointer">Laman utama</Link> </li>
        <li><Link to='refund' className="hover:cursor-pointer">Pengembalian</Link> </li>
        <li><Link to='resend' className="hover:cursor-pointer">Hantar semula</Link> </li>
        <li><Link to='supply' className="hover:cursor-pointer">Bekalan</Link> </li>
        <li><Link to='repair' className="hover:cursor-pointer">Baiki</Link> </li>
        {
          user?.admin === "true" ? <li><Link to='admin' className="hover:cursor-pointer">Pentadbir</Link> </li> : ""
        }

        <li><Link to='about' className="hover:cursor-pointer">Hubungi kam</Link> </li>
      </ul>


      <div className='flex justify-between items-center my-2'>
        <select className="text-black px-2" value={selectedLanguage} onChange={handleLanguageChange}>
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
          <div className='hidden md:flex'>
            <p onClick={handleToLogOut} className="hover:cursor-pointer">Log Keluar</p>
          </div> :
          <Link to="login"><div className='hidden md:flex'>
            <p className="hover:cursor-pointer">Log Masuk</p>
          </div></Link>
      }


      {/* Hamburger */}
      <div onClick={handleNav} className='md:hidden z-10'>
        {nav ? <AiOutlineClose className='text-black' size={20} /> : <HiOutlineMenuAlt4 size={20} />}
      </div>

      {/* Mobile menu dropdown */}
      <div onClick={handleNav} className={nav ? 'absolute text-black left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col' : 'absolute left-[-100%]'}>
        <ul>
          <h1 className="hover:cursor-pointer">Grozziie Malaysia</h1>
          <li><Link to='home' className='border-b hover:cursor-pointer'>Laman utama</Link></li>
          <li><Link to='refund' className='border-b hover:cursor-pointer'>Pengembalian</Link></li>
          <li><Link to='resend' className='border-b hover:cursor-pointer'>Hantar semula</Link></li>
          <li><Link to='repair' className='border-b hover:cursor-pointer'>Baiki</Link></li>
          <li><Link to='supply' className='border-b hover:cursor-pointer'>Bekalan</Link></li>
          <li><Link to='admin' className='border-b hover:cursor-pointer'>Pentadbir</Link></li>
          <li><Link to='about' className='border-b hover:cursor-pointer'>Hubungi kam</Link></li>
          <li onClick={handleToLogOut} className='border-b hover:cursor-pointer'>Log Keluar</li>

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

export default MalaysiaNavbar;
