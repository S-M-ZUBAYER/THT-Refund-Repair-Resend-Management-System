import React, { useEffect, useState } from 'react';
import Hero from '../../SharePage/Hero';

const Repair = () => {
  const [peopleList, setPeopleList] = useState([
    'Person 1',
    'Person 2',
    'Person 3',
    'Person 4',
    'Person 5',
    'Person 6',
    'Person 7',
    'Person 8',
    'Person 9',
    'Person 10',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      shuffleList();
    },  5 * 1000); // 5 minutes (in milliseconds)

    return () => clearInterval(interval);
  }, []);

  const shuffleList = () => {
    setPeopleList(prevList => {
      const shuffledList = [...prevList];
      for (let i = shuffledList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
      }
      return shuffledList;
    });
  };

  return (
  
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Show the list of all users</h1>
      <ul className="list-disc pl-4">
        {peopleList.map((person, index) => (
          <li key={index} className="mb-2">
            {person}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repair;

