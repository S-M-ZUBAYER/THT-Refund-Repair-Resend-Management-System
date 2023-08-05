
import React, { useContext, useState } from 'react';
import RefundRequestForm from './RefundRequestForm';
import RefundRequestList from './RefundRequestList';
import Hero from '../../SharePage/Hero';
import Warehouse from './Warehouse';
import { AuthContext } from '../../../context/UserContext';
import LeaderStatus from './LeaderStatus';
import WarehouseManager from './WarehouseManager';
import Finance from './Finance';
import StatusBar from './StatusBar';

const Refund = () => {
    const { user, selectedLanguage } = useContext(AuthContext)



  


    return (

        <div className='max-w-[1240px] mx-auto py-16 px-4 text-center'>
            {user?.role === "~Customer-Service~" && <>
                <div>
                    {selectedLanguage === "zh-CN" &&
                        <>
                            <h1>请填写退款申请表</h1>
                            <p className='py-4'>请仔细填写所有信息并提交，以开始下一步获取客户服务领导批准的流程。</p>
                        </>
                    }

                    {selectedLanguage === "en-US" &&
                        <>
                            <h1>Please Complete the Refund Request Form</h1>
                            <p className='py-4'>Please fill all of the information carefully and submit to start the next step to get the approval from ~Customer-Service-Leader~.</p>
                        </>
                    }

                    {selectedLanguage === "fil-PH" &&
                        <>
                            <h1>Pakiusap na Punuin ang Form ng Kahilingan sa Refund</h1>
                            <p className='py-4'>Mangyaring punuin nang maingat ang lahat ng impormasyon at isumite upang simulan ang susunod na hakbang upang makuha ang pahintulot mula sa Lider ng Serbisyo sa Customer.</p>
                        </>
                    }

                    {selectedLanguage === "ms-MY" &&
                        <>
                            <h1>Sila Lengkapkan Borang Permohonan Pembayaran Balik</h1>
                            <p className='py-4'>Sila isikan semua maklumat dengan teliti dan hantar untuk memulakan langkah seterusnya untuk mendapatkan kelulusan dari Pemimpin Perkhidmatan Pelanggan.</p>
                        </>
                    }

                    {selectedLanguage === "th-TH" &&
                        <>
                            <h1>กรุณากรอกแบบฟอร์มขอคืนเงิน</h1>
                            <p className='py-4'>กรุณากรอกข้อมูลทั้งหมดด้วยความระมัดระวังและส่งใบคำขอเพื่อเริ่มขั้นตอนถัดไปในการขออนุมัติจากผู้นำบริการลูกค้า</p>
                        </>
                    }

                    {selectedLanguage === "vi-VN" &&
                        <>
                            <h1>Vui lòng Hoàn thành Biểu mẫu Yêu cầu Hoàn tiền</h1>
                            <p className='py-4'>Vui lòng điền đầy đủ thông tin và gửi để bắt đầu bước tiếp theo để nhận được sự chấp thuận từ Lãnh đạo Dịch vụ Khách hàng.</p>
                        </>
                    }

                    {selectedLanguage === "id-ID" &&
                        <>
                            <h1>Harap Lengkapi Formulir Permohonan Pengembalian Dana</h1>
                            <p className='py-4'>Harap isi semua informasi dengan hati-hati dan kirim untuk memulai langkah selanjutnya untuk mendapatkan persetujuan dari Pemimpin Layanan Pelanggan.</p>
                        </>
                    }

                </div>
                <RefundRequestForm></RefundRequestForm>


                <div className="mt-16 mb-5">
                    {selectedLanguage === "zh-CN" &&
                        <>
                            <h1>显示可用的退款请求列表</h1>
                            <p className='py-4'>这是当前所有的退款请求列表。您可以在此处检查并更新退款请求信息。</p>
                        </>
                    }

                    {selectedLanguage === "en-US" &&
                        <>
                            <h1>Show The List Available Refund Request</h1>
                            <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information.</p>
                        </>
                    }

                    {selectedLanguage === "fil-PH" &&
                        <>
                            <h1>Ipakita ang Listahan ng Magagamit na Kahilingan sa Pagbabalik</h1>
                            <p className='py-4'>Ito ay lahat ng listahan ng kahilingan sa pagbabalik sa sandaling ito. Dito maaari mong suriin at i-update ang impormasyon ng kahilingan sa pagbabalik.</p>
                        </>
                    }

                    {selectedLanguage === "ms-MY" &&
                        <>
                            <h1>Paparkan Senarai Permintaan Pembayaran Balik yang Tersedia</h1>
                            <p className='py-4'>Ini adalah senarai semua permintaan pembayaran balik pada masa ini. Di sini anda boleh menyemak dan mengemas kini maklumat permintaan pembayaran balik.</p>
                        </>
                    }

                    {selectedLanguage === "th-TH" &&
                        <>
                            <h1>แสดงรายการคำขอคืนเงินที่มีให้</h1>
                            <p className='py-4'>นี้คือรายการคำขอคืนเงินทั้งหมดในขณะนี้ ที่นี่คุณสามารถตรวจสอบและอัปเดตข้อมูลคำขอคืนเงินได้</p>
                        </>
                    }

                    {selectedLanguage === "vi-VN" &&
                        <>
                            <h1>Hiển thị Danh sách Yêu cầu Hoàn tiền Hiện có</h1>
                            <p className='py-4'>Dưới đây là tất cả danh sách yêu cầu hoàn tiền hiện có. Ở đây bạn có thể kiểm tra và cập nhật thông tin yêu cầu hoàn tiền.</p>
                        </>
                    }

                    {selectedLanguage === "id-ID" &&
                        <>
                            <h1>Tampilkan Daftar Permintaan Pengembalian Dana yang Tersedia</h1>
                            <p className='py-4'>Ini adalah semua daftar permintaan pengembalian dana pada saat ini. Di sini Anda dapat memeriksa dan memperbarui informasi permintaan pengembalian dana.</p>
                        </>
                    }

                </div>
                

                <RefundRequestList></RefundRequestList>
            </>}

            {
                user?.role === "~Warehouse~" && <> <div className="mt-5 mb-5">
                    {selectedLanguage === "zh-CN" &&
                        <>
                            <h1>需要仓库管理员批准的请求</h1>
                            <p className='py-4'>这些是当前所有的退款请求列表。在这里，您可以检查并更新退款请求信息。然后请批准他们的退款请求。</p>
                        </>
                    }

                    {selectedLanguage === "en-US" &&
                        <>
                            <h1>Requests Need To Approved By Warehouse Man</h1>
                            <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information. And then please approved their refund request.</p>
                        </>
                    }

                    {selectedLanguage === "fil-PH" &&
                        <>
                            <h1>Mga Hiling na Kailangan ng Pag-apruba ng Warehouse Man</h1>
                            <p className='py-4'>Ito ay lahat ng listahan ng kahilingan sa pagbabalik sa sandaling ito. Dito maaari mong suriin at i-update ang impormasyon ng kahilingan sa pagbabalik. At pagkatapos ay pakisang-ayunan ang kanilang kahilingan sa pagbabalik.</p>
                        </>
                    }

                    {selectedLanguage === "ms-MY" &&
                        <>
                            <h1>Permintaan Perlu Diluluskan Oleh Warehouse Man</h1>
                            <p className='py-4'>Ini adalah senarai semua permintaan pembayaran balik pada masa ini. Di sini anda boleh menyemak dan mengemas kini maklumat permintaan pembayaran balik. Dan kemudian sila disahkan permintaan pembayaran balik mereka.</p>
                        </>
                    }

                    {selectedLanguage === "th-TH" &&
                        <>
                            <h1>คำขอที่ต้องได้รับการอนุมัติจาก Warehouse Man</h1>
                            <p className='py-4'>นี้คือรายการคำขอคืนเงินทั้งหมดในขณะนี้ ที่นี่คุณสามารถตรวจสอบและอัปเดตข้อมูลคำขอคืนเงิน และหลังจากนั้นโปรดอนุมัติคำขอคืนเงินของพวกเขา</p>
                        </>
                    }

                    {selectedLanguage === "vi-VN" &&
                        <>
                            <h1>Yêu cầu Cần Phê duyệt bởi Người Quản lý Kho</h1>
                            <p className='py-4'>Dưới đây là tất cả danh sách yêu cầu hoàn tiền hiện có. Ở đây bạn có thể kiểm tra và cập nhật thông tin yêu cầu hoàn tiền. Sau đó, hãy phê duyệt yêu cầu hoàn tiền của họ.</p>
                        </>
                    }

                    {selectedLanguage === "id-ID" &&
                        <>
                            <h1>Permintaan Perlu Disetujui oleh Warehouse Man</h1>
                            <p className='py-4'>Ini adalah semua daftar permintaan pengembalian dana pada saat ini. Di sini Anda dapat memeriksa dan memperbarui informasi permintaan pengembalian dana. Dan kemudian, harap disetujui permintaan pengembalian dana mereka.</p>
                        </>
                    }

                </div>

                    <Warehouse></Warehouse></>
            }

            {
                user?.role === "~Customer-Service-Leader~" && <> <div className="mt-5 mb-5">
                    {
                        selectedLanguage === "zh-CN" && (
                            <>
                                <h1>需要客服主管批准的请求</h1>
                                <p className='py-4'>这些是当前所有退款请求的列表。在这里，您可以查看和更新退款请求信息。然后，请批准他们的退款请求。</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "en-US" && (
                            <>
                                <h1>Requests Need To Approved By ~Customer-Service-Leader~</h1>
                                <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information. And then please approve their refund request.</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "fil-PH" && (
                            <>
                                <h1>Mga Kailangang Aprobahan ng Lider ng Serbisyo sa Customer</h1>
                                <p className='py-4'>Ito ang lahat ng listahan ng kahilingan ng refund sa sandaling ito. Dito maaari mong tingnan at i-update ang impormasyon ng kahilingan ng refund. At pagkatapos ay aprubahan ang kanilang kahilingan ng refund.</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "ms-MY" && (
                            <>
                                <h1>Permintaan yang Perlu Diluluskan oleh Pemimpin Perkhidmatan Pelanggan</h1>
                                <p className='py-4'>Ini adalah senarai semua permintaan bayaran balik pada masa ini. Di sini anda boleh menyemak dan mengemaskini maklumat permintaan bayaran balik. Dan kemudian sila luluskan permintaan bayaran balik mereka.</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "th-TH" && (
                            <>
                                <h1>คำขอต้องได้รับการอนุมัติโดยผู้นำการบริการลูกค้า</h1>
                                <p className='py-4'>นี่คือรายการของคำขอคืนเงินทั้งหมดในขณะนี้ ที่นี่คุณสามารถตรวจสอบและอัปเดตข้อมูลคำขอคืนเงิน และจากนั้นโปรดอนุมัติคำขอคืนเงินของพวกเขา</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "vi-VN" && (
                            <>
                                <h1>Yêu cầu cần được phê duyệt bởi nhà lãnh đạo dịch vụ khách hàng</h1>
                                <p className='py-4'>Dưới đây là tất cả danh sách yêu cầu hoàn tiền tại thời điểm hiện tại. Ở đây bạn có thể kiểm tra và cập nhật thông tin yêu cầu hoàn tiền. Và sau đó, hãy phê duyệt yêu cầu hoàn tiền của họ.</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "id-ID" && (
                            <>
                                <h1>Permintaan yang Perlu Disetujui oleh Pemimpin Layanan Pelanggan</h1>
                                <p className='py-4'>Ini adalah daftar semua permintaan pengembalian dana pada saat ini. Di sini Anda dapat memeriksa dan memperbarui informasi permintaan pengembalian dana. Dan kemudian silahkan setujui permintaan pengembalian dana mereka.</p>
                            </>
                        )
                    }

                </div>

                    <LeaderStatus></LeaderStatus> </>
            }

            {
                user?.role === "~Warehouse-Manager~" && <> <div className="mt-5 mb-5">
                    {
                        selectedLanguage === "zh-CN" && (
                            <>
                                <h1>需要仓库经理批准的请求</h1>
                                <p className='py-4'>这些是当前所有退款请求的列表。在这里，您可以查看和更新退款请求信息。然后请批准他们的退款请求。</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "en-US" && (
                            <>
                                <h1>Requests Need To Approved By ~Warehouse-Manager~</h1>
                                <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information. And then please approved their refund request.</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "fil-PH" && (
                            <>
                                <h1>Ang mga Kailangang Aprubahan ng Manager ng Warehouse</h1>
                                <p className='py-4'>Ito ang lahat ng listahan ng kahilingan ng refund sa sandaling ito. Dito maaari mong suriin at i-update ang impormasyon ng kahilingan ng refund. At pagkatapos ay pakipagtibay ang kanilang kahilingan ng refund.</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "ms-MY" && (
                            <>
                                <h1>Permintaan Perlu Disahkan Oleh Pengurus Gudang</h1>
                                <p className='py-4'>Ini adalah senarai semua permintaan bayaran balik pada masa ini. Di sini anda boleh menyemak dan mengemaskini maklumat permintaan bayaran balik. Dan kemudian sila sahkan permintaan bayaran balik mereka.</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "th-TH" && (
                            <>
                                <h1>คำขอต้องได้รับการอนุมัติจากผู้จัดการคลังสินค้า</h1>
                                <p className='py-4'>นี่คือรายการคำขอคืนเงินทั้งหมดในขณะนี้ ที่นี่คุณสามารถตรวจสอบและอัปเดตข้อมูลคำขอคืนเงิน และแล้วโปรดอนุมัติคำขอคืนเงินของพวกเขา</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "vi-VN" && (
                            <>
                                <h1>Yêu cầu Cần Phê duyệt bởi Quản lý Kho</h1>
                                <p className='py-4'>Dưới đây là tất cả danh sách yêu cầu hoàn tiền hiện có. Ở đây bạn có thể kiểm tra và cập nhật thông tin yêu cầu hoàn tiền. Sau đó, hãy phê duyệt yêu cầu hoàn tiền của họ.</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "id-ID" && (
                            <>
                                <h1>Permintaan Perlu Disetujui oleh Manajer Gudang</h1>
                                <p className='py-4'>Ini adalah daftar semua permintaan pengembalian dana pada saat ini. Di sini Anda dapat memeriksa dan memperbarui informasi permintaan pengembalian dana. Dan kemudian harap setujui permintaan pengembalian dana mereka.</p>
                            </>
                        )
                    }

                </div>

                    <WarehouseManager></WarehouseManager> </>
            }

            {
                user?.role === "~Finance~" && <> <div className="mt-16 mb-5">
                    {
                        selectedLanguage === "zh-CN" && (
                            <>
                                <h1>需要财务批准的请求</h1>
                                <p className='py-4'>这些是当前所有退款请求的列表。在这里，您可以查看和更新退款请求信息。然后请批准他们的退款请求。</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "en-US" && (
                            <>
                                <h1>Requests Need To Approved By Finance</h1>
                                <p className='py-4'>These are all the list of refund request at these moment. Here you can check and update the refund request information. And then please approved their refund request.</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "fil-PH" && (
                            <>
                                <h1>Ang mga Kailangang Aprubahan ng Finance</h1>
                                <p className='py-4'>Ito ang lahat ng listahan ng kahilingan ng refund sa sandaling ito. Dito maaari mong suriin at i-update ang impormasyon ng kahilingan ng refund. At pagkatapos ay pakipagtibay ang kanilang kahilingan ng refund.</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "ms-MY" && (
                            <>
                                <h1>Permintaan Perlu Disahkan Oleh Kewangan</h1>
                                <p className='py-4'>Ini adalah senarai semua permintaan bayaran balik pada masa ini. Di sini anda boleh menyemak dan mengemaskini maklumat permintaan bayaran balik. Dan kemudian sila sahkan permintaan bayaran balik mereka.</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "th-TH" && (
                            <>
                                <h1>คำขอต้องได้รับการอนุมัติจากฝ่ายการเงิน</h1>
                                <p className='py-4'>นี่คือรายการคำขอคืนเงินทั้งหมดในขณะนี้ ที่นี่คุณสามารถตรวจสอบและอัปเดตข้อมูลคำขอคืนเงิน และแล้วโปรดอนุมัติคำขอคืนเงินของพวกเขา</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "vi-VN" && (
                            <>
                                <h1>Yêu cầu Cần Phê duyệt bởi Bộ phận Tài chính</h1>
                                <p className='py-4'>Dưới đây là tất cả danh sách yêu cầu hoàn tiền hiện có. Ở đây bạn có thể kiểm tra và cập nhật thông tin yêu cầu hoàn tiền. Sau đó, hãy phê duyệt yêu cầu hoàn tiền của họ.</p>
                            </>
                        )
                    }
                    {
                        selectedLanguage === "id-ID" && (
                            <>
                                <h1>Permintaan Perlu Disetujui oleh Bagian Keuangan</h1>
                                <p className='py-4'>Ini adalah daftar semua permintaan pengembalian dana pada saat ini. Di sini Anda dapat memeriksa dan memperbarui informasi permintaan pengembalian dana. Dan kemudian harap setujui permintaan pengembalian dana mereka.</p>
                            </>
                        )
                    }

                </div>

                    <Finance></Finance> </>
            }

            <div className="mt-32 mb-5">
                <hr className='border-2 border-gray-800 my-5'></hr>
                {
                    selectedLanguage === "zh-CN" && (
                        <>
                            <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">退款请求状态栏</span></h1>
                            <p className='py-4'>这些是当前所有特殊退款请求的列表。在这里，您可以查看任何请求的当前状态。您还可以查看有关退款请求的所有信息。</p>
                        </>
                    )
                }
                {
                    selectedLanguage === "en-US" && (
                        <>
                            <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">Refund Request Status Bar</span></h1>
                            <p className='py-4'>These are all the list of special refund request at these moment. Here you can see the current condition of any request. And also you can check all the information about the refund request.</p>
                        </>
                    )
                }
                {
                    selectedLanguage === "fil-PH" && (
                        <>
                            <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">Bar ng Katayuan ng Kahilingan ng Refund</span></h1>
                            <p className='py-4'>Ito ang lahat ng listahan ng espesyal na kahilingan ng refund sa sandaling ito. Dito maaari mong makita ang kasalukuyang kalagayan ng anumang kahilingan. At maaari ka ring tingnan ang lahat ng impormasyon tungkol sa kahilingan ng refund.</p>
                        </>
                    )
                }
                {
                    selectedLanguage === "ms-MY" && (
                        <>
                            <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">Bar Status Permintaan Bayaran Balik</span></h1>
                            <p className='py-4'>Ini adalah senarai semua permintaan bayaran balik khas pada masa ini. Di sini anda boleh melihat keadaan semasa sebarang permintaan. Dan anda juga boleh menyemak semua maklumat tentang permintaan bayaran balik.</p>
                        </>
                    )
                }
                {
                    selectedLanguage === "th-TH" && (
                        <>
                            <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">แถบสถานะคำขอคืนเงิน</span></h1>
                            <p className='py-4'>นี่คือรายการของคำขอคืนเงินพิเศษทั้งหมดในขณะนี้ ที่นี่คุณสามารถดูสภาพปัจจุบันของคำขอใด และคุณยังสามารถตรวจสอบข้อมูลทั้งหมดเกี่ยวกับคำขอคืนเงินได้</p>
                        </>
                    )
                }
                {
                    selectedLanguage === "vi-VN" && (
                        <>
                            <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">Thanh trạng thái yêu cầu hoàn tiền</span></h1>
                            <p className='py-4'>Dưới đây là tất cả danh sách yêu cầu hoàn tiền đặc biệt tại thời điểm này. Ở đây bạn có thể xem tình trạng hiện tại của bất kỳ yêu cầu nào. Và bạn cũng có thể kiểm tra tất cả thông tin về yêu cầu hoàn tiền.</p>
                        </>
                    )
                }
                {
                    selectedLanguage === "id-ID" && (
                        <>
                            <h1><span className="bg-gradient-to-r from-green-800 to-blue-800 text-transparent bg-clip-text">Status Bar Permintaan Pengembalian Dana</span></h1>
                            <p className='py-4'>Ini adalah daftar semua permintaan pengembalian dana khusus pada saat ini. Di sini Anda dapat melihat kondisi terkini dari setiap permintaan. Dan Anda juga dapat memeriksa semua informasi tentang permintaan pengembalian dana.</p>
                        </>
                    )
                }

            </div>

            <StatusBar></StatusBar>

        </div>
    );
};

export default Refund;