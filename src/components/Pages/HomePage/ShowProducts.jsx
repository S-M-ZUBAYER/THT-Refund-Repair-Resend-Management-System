import React, { useContext } from 'react'


import Thermal from '../../../assets/Thermal.png';
import Thermal1 from '../../../assets/Thermal-1.png';
import dot from '../../../assets/dot.png';
import dot1 from '../../../assets/dot-1.png';
import attendance from '../../../assets/attendance.png';
import { AuthContext } from '../../../context/UserContext';


const ShowProducts = () => {

  const{selectedLanguage}=useContext(AuthContext);

  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 text-center'>


{
  selectedLanguage === "zh-CN" &&
  <>
    <h1>展示我们公司的一些产品</h1>
    <p className='py-4'>这些是我们公司的一些打印机产品。这些是特定打印机型号中的一些模型。</p>
  </>
}
{
  selectedLanguage === "en-US" &&
  <>
    <h1>Show some products of our Company</h1>
    <p className='py-4'>These are some of the printer of our company. These are the some of model in specific printer.</p>
  </>
}
{
  selectedLanguage === "fil-PH" &&
  <>
    <h1>Ipakita ang ilang mga produkto ng aming Kompanya</h1>
    <p className='py-4'>Ito ay ilan sa mga printer ng aming kumpanya. Ito ay ilan sa mga modelo sa partikular na printer.</p>
  </>
}
{
  selectedLanguage === "ms-MY" &&
  <>
    <h1>Tunjukkan beberapa produk syarikat kami</h1>
    <p className='py-4'>Ini adalah beberapa daripada pencetak syarikat kami. Ini adalah beberapa model dalam pencetak khusus.</p>
  </>
}
{
  selectedLanguage === "th-TH" &&
  <>
    <h1>แสดงสินค้าบางอย่างของบริษัทของเรา</h1>
    <p className='py-4'>นี้คือบางส่วนของเครื่องพิมพ์ของบริษัทของเรา นี้คือบางส่วนของรุ่นในเครื่องพิมพ์ที่เฉพาะเจาะจง</p>
  </>
}
{
  selectedLanguage === "vi-VN" &&
  <>
    <h1>Hiển thị một số sản phẩm của Công ty chúng tôi</h1>
    <p className='py-4'>Đây là một số máy in của công ty chúng tôi. Đây là một số mô hình trong máy in cụ thể.</p>
  </>
}
{
  selectedLanguage === "id-ID" &&
  <>
    <h1>Tunjukkan beberapa produk dari Perusahaan kami</h1>
    <p className='py-4'>Ini adalah beberapa printer dari perusahaan kami. Ini adalah beberapa model dalam printer tertentu.</p>
  </>
}



        <div className='grid grid-rows-none md:grid-cols-5 py-4 gap-2 md:gap-4'>
            <img className='w-full h-full object-cover col-span-2 md:col-span-3 row-span-2 transition-transform duration-300 ease-out transform hover:scale-105' src={Thermal} alt="/" />
            <img className='w-full h-full object-cover transition-transform duration-300 ease-out transform hover:scale-105' src={ dot} alt="/" />
            <img className='w-full h-full object-cover transition-transform duration-300 ease-out transform hover:scale-105' src={dot1} alt="/" />
            <img className='w-full h-full object-cover transition-transform duration-300 ease-out transform hover:scale-105' src={Thermal1} alt="/" />
            <img className='w-full h-full object-cover transition-transform duration-300 ease-out transform hover:scale-105' src={attendance} alt="/" />
        </div>
    </div>
  )
} 

export default ShowProducts;