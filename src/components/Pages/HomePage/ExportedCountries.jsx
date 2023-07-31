import React, { useContext } from 'react'

import China from '../../../assets/China.jpg';
import Malaysia from '../../../assets/malaysia.jpg';
import Thailand from '../../../assets/thailand.jpg';
import Vietnam from '../../../assets/vietnam.jpeg';
import Indonesia from '../../../assets/indonesia.jpg';
import Philippines from '../../../assets/philippines.jpg';

import SelectsCard from './SelectsCard';
import { AuthContext } from '../../../context/UserContext';


const ExportedCountries = () => {

  const { selectedLanguage } = useContext(AuthContext);

  return (
    <div className="mt-20">
      <div className="w-full text-center">

        {
          selectedLanguage === "zh-CN" &&
          <>
            <h1 className="">展示我们出口产品的国家列表</h1>
            <p className='py-4'>这些是我们出口产品的国家列表，并展示了其中一些历史地点。</p>
          </>

        }
        {
          selectedLanguage === "en-US" &&
          <>
            <h1 className="">Show the List of Countries where we exported our Products </h1>
            <p className='py-4'>These are the list and show some historical place of these Countries where we export our product. </p>
          </>
        }
        {
          selectedLanguage === "fil-PH" &&
          <>
            <h1 className="">Ipakita ang Listahan ng Mga Bansa kung Saan Namin Iniluluwas ang Aming mga Produkto</h1>
            <p className='py-4'>Ito ang listahan ng mga bansa kung saan namin iniluluwas ang aming mga produkto at ipinapakita ang ilang mga makasaysayang lugar sa mga bansang ito.</p>
          </>

        }
        {
          selectedLanguage === "ms-MY" &&
          <>
            <h1 className="">Tunjukkan Senarai Negara di Mana Kami Eksport Produk Kami</h1>
            <p className='py-4'>Berikut adalah senarai negara di mana kami mengeksport produk kami dan menunjukkan beberapa tempat bersejarah di negara-negara ini.</p>
          </>

        }
        {
          selectedLanguage === "th-TH" &&
          <>
            <h1 className="">แสดงรายการประเทศที่เราส่งออกผลิตภัณฑ์</h1>
            <p className='py-4'>นี่คือรายการประเทศที่เราส่งออกผลิตภัณฑ์และแสดงสถานที่ทางประวัติศาสตร์บางส่วนของประเทศเหล่านี้</p>
          </>

        }
        {
          selectedLanguage === "vi-VN" &&
          <>
            <h1 className="">Hiển thị Danh sách Các Nước mà Chúng tôi Xuất khẩu Sản phẩm của mình</h1>
            <p className='py-4'>Đây là danh sách các nước mà chúng tôi xuất khẩu sản phẩm của mình và hiển thị một số địa điểm lịch sử của các nước này.</p>
          </>

        }
        {
          selectedLanguage === "id-ID" &&
          <>
            <h1 className="">Tampilkan Daftar Negara Tempat Kami Mengekspor Produk Kami</h1>
            <p className='py-4'>Berikut adalah daftar negara di mana kami mengekspor produk kami dan menampilkan beberapa tempat bersejarah di negara-negara ini.</p>
          </>

        }

      </div>
      <div className='max-w-[1240px] mx-auto px-4 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>



        {
          selectedLanguage === "zh-CN" &&
          <>
            <SelectsCard bg={China} text='中国' />
            <SelectsCard bg={Malaysia} text='马来西亚' />
            <SelectsCard bg={Thailand} text='泰国' />
            <SelectsCard bg={Vietnam} text='越南' />
            <SelectsCard bg={Indonesia} text='印度尼西亚' />
            <SelectsCard bg={Philippines} text='菲律宾' />

          </>

        }
        {
          selectedLanguage === "en-US" &&
          <>
            <SelectsCard bg={China} text='China' />
            <SelectsCard bg={Malaysia} text='Malaysia' />
            <SelectsCard bg={Thailand} text='Thailand' />
            <SelectsCard bg={Vietnam} text='Vietnam' />
            <SelectsCard bg={Indonesia} text='Indonesia' />
            <SelectsCard bg={Philippines} text='Philippines' />
          </>
        }
        {
          selectedLanguage === "fil-PH" &&
          <>
            <SelectsCard bg={China} text='China' />
            <SelectsCard bg={Malaysia} text='Malaysia' />
            <SelectsCard bg={Thailand} text='Thailand' />
            <SelectsCard bg={Vietnam} text='Vietnam' />
            <SelectsCard bg={Indonesia} text='Indonesia' />
            <SelectsCard bg={Philippines} text='Pilipinas' />

          </>

        }
        {
          selectedLanguage === "ms-MY" &&
          <>
            <SelectsCard bg={China} text='Cina' />
            <SelectsCard bg={Malaysia} text='Malaysia' />
            <SelectsCard bg={Thailand} text='Thailand' />
            <SelectsCard bg={Vietnam} text='Vietnam' />
            <SelectsCard bg={Indonesia} text='Indonesia' />
            <SelectsCard bg={Philippines} text='Filipina' />

          </>

        }
        {
          selectedLanguage === "th-TH" &&
          <>
            <SelectsCard bg={China} text='จีน' />
            <SelectsCard bg={Malaysia} text='มาเลเซีย' />
            <SelectsCard bg={Thailand} text='ประเทศไทย' />
            <SelectsCard bg={Vietnam} text='เวียดนาม' />
            <SelectsCard bg={Indonesia} text='อินโดนีเซีย' />
            <SelectsCard bg={Philippines} text='ฟิลิปปินส์' />

          </>

        }
        {
          selectedLanguage === "vi-VN" &&
          <>
            <SelectsCard bg={China} text='Trung Quốc' />
            <SelectsCard bg={Malaysia} text='Malaysia' />
            <SelectsCard bg={Thailand} text='Thái Lan' />
            <SelectsCard bg={Vietnam} text='Việt Nam' />
            <SelectsCard bg={Indonesia} text='Indonesia' />
            <SelectsCard bg={Philippines} text='Philippines' />

          </>

        }
        {
          selectedLanguage === "id-ID" &&
          <>
            <SelectsCard bg={China} text='China' />
            <SelectsCard bg={Malaysia} text='Malaysia' />
            <SelectsCard bg={Thailand} text='Thailand' />
            <SelectsCard bg={Vietnam} text='Vietnam' />
            <SelectsCard bg={Indonesia} text='Indonesia' />
            <SelectsCard bg={Philippines} text='Filipina' />

          </>

        }


      </div>
    </div>

  )
}

export default ExportedCountries;