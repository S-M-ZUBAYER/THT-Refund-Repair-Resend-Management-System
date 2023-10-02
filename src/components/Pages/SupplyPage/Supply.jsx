import React, { useEffect, useState } from 'react';
import Hero from '../../SharePage/Hero';
import axios from 'axios';

const Supply = () => {
const [labelData,setLabelData]=useState([]);
const [chooseLabel,setChooseLabel]=useState([]);
useEffect(() => {
    fetchData();
}, []);

useEffect(() => {
    // Filter labelData and update chooseLabel when labelData changes
    setChooseLabel(labelData.filter(label => label?.subCategoryName === "S M ZUBAYER"));
}, [labelData]);

console.log(chooseLabel.forEach(label=>{
    console.log(label.LabelDataView)
}))
const fetchData = async () => {
    try {
        const response = await axios.get('https://grozziie.zjweiting.com:8033/tht/allLabelData');
        setLabelData(response.data); // Assuming the response is an array
       
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

    return (
        <div>
            This is the supply page
        </div>
    );
};

export default Supply;