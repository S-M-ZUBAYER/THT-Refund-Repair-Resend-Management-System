import React, { useContext } from 'react';
import GrozzieeLogo from "../.../../../assets/Grozziie_logo.jpg"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';

const Footer = () => {

  const { selectedLanguage } = useContext(AuthContext)

  return (
    <footer aria-label="Site Footer" className="bg-gray-100 text-black ">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">


        <div
          className="grid grid-cols-1 gap-8  md:grid-cols-3"
        >
          <div>
            <Link className="block text-black" to="/home">
              <span className="sr-only">Home</span>
              <img className="w-32 h-8" src={GrozzieeLogo}></img>
            </Link>


            <p
              className="mt-6 max-w-md text-center leading-relaxed text-black  sm:max-w-xs sm:text-left"
            >
              {
                selectedLanguage === "zh-CN" &&
                "中国北京市朝阳区朝外大街123号，邮编100020"
              }
              {
                selectedLanguage === "en-US" &&
                "123 Chaowai St, Chaoyang District, Beijing, China, 100020"
              }
              {
                selectedLanguage === "fil-PH" &&
                "123 Chaowai St, Chaoyang District, Beijing, China, 100020"
              }
              {
                selectedLanguage === "ms-MY" &&
                "123 Chaowai St, Daerah Chaoyang, Beijing, China, 100020"
              }
              {
                selectedLanguage === "th-TH" &&
                "123 Chaowai St, แขวง Chaoyang, เมือง Beijing, ประเทศจีน, 100020"
              }
              {
                selectedLanguage === "vi-VN" &&
                "123 Chaowai St, Quận Chaoyang, Bắc Kinh, Trung Quốc, 100020"
              }
              {
                selectedLanguage === "id-ID" &&
                "123 Chaowai St, Distrik Chaoyang, Beijing, Tiongkok, 100020"
              }
            </p>






          </div>
          <div className="text-center sm:text-left">
            {/* <p className="text-lg font-medium text-gray-900 dark:text-black">
            About Us
          </p> */}

            <nav aria-label="Footer About Nav" className="mt-8">
              <ul className=" text-xs md:text-sm flex justify-center">
                <li>
                  <a
                    className="text-black transition "
                    href="/"
                  >
                    {selectedLanguage === "zh-CN" && "主页"}
                    {selectedLanguage === "en-US" && "Home"}
                    {selectedLanguage === "fil-PH" && "Home"}
                    {selectedLanguage === "ms-MY" && "Home"}
                    {selectedLanguage === "th-TH" && "หน้าหลัก"}
                    {selectedLanguage === "vi-VN" && "Trang chủ"}
                    {selectedLanguage === "id-ID" && "Beranda"}
                  </a>
                </li>
              </ul>

              <ul className=" text-xs md:text-sm text-center flex justify-center">
                <li>
                  <a
                    className="text-black transition"
                    href="/"
                  >
                    {selectedLanguage === "zh-CN" && "退款"}
                    {selectedLanguage === "en-US" && "Refund"}
                    {selectedLanguage === "fil-PH" && "Refund"}
                    {selectedLanguage === "ms-MY" && "Refund"}
                    {selectedLanguage === "th-TH" && "คืนเงิน"}
                    {selectedLanguage === "vi-VN" && "Hoàn tiền"}
                    {selectedLanguage === "id-ID" && "Pengembalian"}
                  </a>
                </li>

                <li>
                  <a
                    className="text-black transition"
                    href="/"
                  >
                    {selectedLanguage === "zh-CN" && "重新发送"}
                    {selectedLanguage === "en-US" && "Resend"}
                    {selectedLanguage === "fil-PH" && "Resend"}
                    {selectedLanguage === "ms-MY" && "Resend"}
                    {selectedLanguage === "th-TH" && "ส่งใหม่"}
                    {selectedLanguage === "vi-VN" && "Gửi lại"}
                    {selectedLanguage === "id-ID" && "Kirim Ulang"}
                  </a>
                </li>
              </ul>

              <ul className=" text-xs md:text-sm text-center flex justify-center">
                <li>
                  <a
                    className="text-black transition/75"
                    href="/"
                  >
                    {selectedLanguage === "zh-CN" && "供应"}
                    {selectedLanguage === "en-US" && "Supply"}
                    {selectedLanguage === "fil-PH" && "Supply"}
                    {selectedLanguage === "ms-MY" && "Supply"}
                    {selectedLanguage === "th-TH" && "สินค้าที่นำเข้า"}
                    {selectedLanguage === "vi-VN" && "Cung cấp"}
                    {selectedLanguage === "id-ID" && "Pemasok"}
                  </a>
                </li>

                <li>
                  <a
                    className="text-black transition/75"
                    href="/"
                  >
                    {selectedLanguage === "zh-CN" && "修理"}
                    {selectedLanguage === "en-US" && "Repair"}
                    {selectedLanguage === "fil-PH" && "Repair"}
                    {selectedLanguage === "ms-MY" && "Repair"}
                    {selectedLanguage === "th-TH" && "ซ่อม"}
                    {selectedLanguage === "vi-VN" && "Sửa chữa"}
                    {selectedLanguage === "id-ID" && "Perbaikan"}
                  </a>
                </li>

                <li>
                  <a
                    className="text-black transition/75"
                    href="/"
                  >
                    {selectedLanguage === "zh-CN" && "关于"}
                    {selectedLanguage === "en-US" && "About"}
                    {selectedLanguage === "fil-PH" && "About"}
                    {selectedLanguage === "ms-MY" && "About"}
                    {selectedLanguage === "th-TH" && "เกี่ยวกับ"}
                    {selectedLanguage === "vi-VN" && "Giới thiệu"}
                    {selectedLanguage === "id-ID" && "Tentang"}
                  </a>
                </li>
              </ul>

            </nav>
          </div>
          <div className="text-center sm:text-left">
            {/* <p className="text-lg font-medium text-gray-900 dark:text-black">
            About Us
          </p> */}

            <nav aria-label="Footer About Nav" className="mt-8">
              <ul className=" text-sm">
                <li className="flex justify-center">
                  <a
                    className="flex  text-sm items-center justify-center gap-1.5 sm:justify-start"
                    href="/"
                  >


                    <span className="text-black ">
                      {selectedLanguage === "zh-CN" && "联系我们"}
                      {selectedLanguage === "en-US" && "Contact"}
                      {selectedLanguage === "fil-PH" && "Contact"}
                      {selectedLanguage === "ms-MY" && "Hubungi Kami"}
                      {selectedLanguage === "th-TH" && "ติดต่อ : "}
                      {selectedLanguage === "vi-VN" && "Liên hệ"}
                      {selectedLanguage === "id-ID" && "Hubungi Kami"}
                    </span>
                  </a>
                </li>
                <li className="flex justify-center">
                  <a
                    className="flex items-center justify-center gap-1.5 sm:justify-start"
                    href="/"
                  >
                    {selectedLanguage === "zh-CN" && "电话 : "}
                    {selectedLanguage === "en-US" && "Phone : "}
                    {selectedLanguage === "fil-PH" && "Phone : "}
                    {selectedLanguage === "ms-MY" && "Telefon : "}
                    {selectedLanguage === "th-TH" && "โทรศัพท์ : "}
                    {selectedLanguage === "vi-VN" && "Điện thoại : "}
                    {selectedLanguage === "id-ID" && "Telepon : "}
                    <span className="text-black ">
                      (555) 555-1234
                    </span>
                  </a>
                </li>

                <li className="flex justify-center">
                  <a
                    className="flex items-center justify-center gap-1.5 sm:justify-start"
                    href="/"
                  >
                    {selectedLanguage === "zh-CN" && "电子邮件 : "}
                    {selectedLanguage === "en-US" && "Email : "}
                    {selectedLanguage === "fil-PH" && "Email : "}
                    {selectedLanguage === "ms-MY" && "E-mel : "}
                    {selectedLanguage === "th-TH" && "อีเมล : "}
                    {selectedLanguage === "vi-VN" && "Email : "}
                    {selectedLanguage === "id-ID" && "Email : "}
                    <span className="text-black ">info@companyname.com</span>
                  </a>
                </li>


              </ul>
            </nav>
          </div>






        </div>

        <div className="mt-12 border-t border-gray-100 pt-6 dark:border-gray-800">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-black dark:text-gray-400">
              <span className="block sm:inline">All rights reserved.</span>

              <a
                className="inline-block text-teal-600 underline transition hover:text-teal-600/75 dark:text-teal-500 dark:hover:text-teal-500/75"
                href="/"
              >
                Terms & Conditions
              </a>

              <span>&middot;</span>

              <a
                className="inline-block text-teal-600 underline transition hover:text-teal-600/75 dark:text-teal-500 dark:hover:text-teal-500/75"
                href="/"
              >
                Privacy Policy
              </a>
            </p>

            <p
              className="mt-4 text-xs text-gray-600  sm:order-first sm:mt-0"
            >
              &copy; 2023 Noble Paragon Pte. Ltd A11 Rights Reserve
            </p>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;