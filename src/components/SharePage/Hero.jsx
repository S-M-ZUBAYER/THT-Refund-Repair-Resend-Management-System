import React, { useContext } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import beachVid from '../../assets/beachVid.mp4';
import thtVideo from '../../assets/THT_Video.mp4';
import { AuthContext } from '../../context/UserContext';

const Hero = () => {

  const {selectedLanguage}=useContext(AuthContext)

  return (
    <div className='w-full h-screen relative'>
      <video
        className='w-full h-full object-cover'
        src={thtVideo}
        autoPlay
        loop
        muted
      />
      <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
      <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4'>

       {
  selectedLanguage === "zh-CN" &&
  <>
    <h1 className="text-amber-200">THT-SPACE ELECTRICAL COMPANY LTD.</h1>
    <h2 className='py-4 md:px-32 font-semibold text-lg md:text-2xl'>欢迎来到我们的更换和维修网站。这是一个网站，用于满足在特定时间内购买的任何产品的更换、维修或退货的所有步骤和流程。</h2>
  </>
}
{
  selectedLanguage === "en-US" &&
  <>
    <h1 className="text-amber-200">THT-SPACE ELECTRICAL COMPANY LTD.</h1>
    <h2 className='py-4 md:px-32 font-semibold text-lg md:text-2xl'>Welcome to our replacement and repair site. This is the site to fulfill all the steps and process to replace, repair, or return any products bought within the specific duration.</h2>
  </>
}
{
  selectedLanguage === "fil-PH" &&
  <>
    <h1 className="text-amber-200">THT-SPACE ELECTRICAL COMPANY LTD.</h1>
    <h2 className='py-4 md:px-32 font-semibold text-lg md:text-2xl'>Maligayang pagdating sa aming site para sa pagpapalit at pagkumpuni. Ito ay ang site na magpupuno ng lahat ng hakbang at proseso upang palitan, kumpunihin, o ibalik ang anumang produkto na binili sa loob ng tiyak na panahon.</h2>
  </>
}
{
  selectedLanguage === "ms-MY" &&
  <>
    <h1 className="text-amber-200">THT-SPACE ELECTRICAL COMPANY LTD.</h1>
    <h2 className='py-4 md:px-32 font-semibold text-lg md:text-2xl'>Selamat datang ke laman web pembaikan dan penggantian kami. Ini adalah laman web untuk memenuhi semua langkah dan proses untuk menggantikan, membaiki, atau mengembalikan produk yang dibeli dalam tempoh yang ditentukan.</h2>
  </>
}
{
  selectedLanguage === "th-TH" &&
  <>
    <h1 className="text-amber-200">THT-SPACE ELECTRICAL COMPANY LTD.</h1>
    <h2 className='py-4 md:px-32 font-semibold text-lg md:text-2xl'>ยินดีต้อนรับสู่เว็บไซต์ของเราในการเปลี่ยนและซ่อมแซม นี่คือเว็บไซต์ที่เต็มที่สำหรับการเปลี่ยน ซ่อม หรือคืนสินค้าใด ๆ ที่ซื้อภายในระยะเวลาที่กำหนด</h2>
  </>
}
{
  selectedLanguage === "vi-VN" &&
  <>
    <h1 className="text-amber-200">THT-SPACE ELECTRICAL COMPANY LTD.</h1>
    <h2 className='py-4 md:px-32 font-semibold text-lg md:text-2xl'>Chào mừng đến với trang web thay thế và sửa chữa của chúng tôi. Đây là trang web để thực hiện tất cả các bước và quy trình để thay thế, sửa chữa hoặc trả lại bất kỳ sản phẩm nào đã mua trong khoảng thời gian cụ thể.</h2>
  </>
}
{
  selectedLanguage === "id-ID" &&
  <>
    <h1 className="text-amber-200">THT-SPACE ELECTRICAL COMPANY LTD.</h1>
    <h2 className='py-4 md:px-32 font-semibold text-lg md:text-2xl'>Selamat datang di situs penggantian dan perbaikan kami. Ini adalah situs untuk memenuhi semua langkah dan proses untuk mengganti, memperbaiki, atau mengembalikan produk yang dibeli dalam jangka waktu tertentu.</h2>
  </>
}

      
      </div>
    </div>
  );
};

export default Hero;
