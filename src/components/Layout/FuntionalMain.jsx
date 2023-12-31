import React, { useContext } from 'react';
import Navbar from '../SharePage/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../SharePage/Footer';
import Hero from '../SharePage/Hero';
import { AuthContext } from '../../context/UserContext';
import ChineseNavbar from '../SharePage/Navbar/ChineseNavbar';
import MalaysiaNavbar from '../SharePage/Navbar/MalaysiaNavbar';
import ThaiNavbar from '../SharePage/Navbar/ThaiNavbar';
import VietnamNavbar from '../SharePage/Navbar/VietnamNavbar';
import IndonesiaNavbar from '../SharePage/Navbar/IndonesiaNavbar';
import PhilippinesNavbar from '../SharePage/Navbar/PhilippinesNavbar';


const FunctionalMain = () => {

    const { selectedLanguage } = useContext(AuthContext);

    return (
        <div className="text-black mb-5">
            {
                selectedLanguage === "zh-CN" && <ChineseNavbar></ChineseNavbar>

            }
            {
                selectedLanguage === "en-US" && <Navbar></Navbar>
            }
            {
                selectedLanguage === "fil-PH" && <PhilippinesNavbar></PhilippinesNavbar>
            }
            {
                selectedLanguage === "ms-MY" && <MalaysiaNavbar></MalaysiaNavbar>
            }
            {
                selectedLanguage === "th-TH" && <ThaiNavbar></ThaiNavbar>
            }
            {
                selectedLanguage === "vi-VN" && <VietnamNavbar></VietnamNavbar>
            }
            {
                selectedLanguage === "id-ID" && <IndonesiaNavbar></IndonesiaNavbar>
            }
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default FunctionalMain;