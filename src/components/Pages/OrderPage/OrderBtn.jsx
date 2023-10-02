import React, { useContext, useState } from 'react';
import Order from './Order';
import { AuthContext } from '../../../context/UserContext';
import toast from 'react-hot-toast';

const OrderBtn = () => {
  const [showCurrentOrder, setShowCurrentOrder] = useState(true);
  const { user } = useContext(AuthContext);


  const handleToggleCurrentOrder = () => {
    setShowCurrentOrder(true);
  };

  const handleToggleFinishProcess = () => {
    setShowCurrentOrder(false);
  };
  
  const handleToShowToast = () => {
    toast.error("Only Admin have the access to enter this route")
  };

  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 text-center'>

{
  user ? 
  <>

      <btn
        className="text-xl font-semibold border-2 px-3 py-1 rounded-l-full cursor-pointer"
        onClick={handleToggleCurrentOrder}
        style={{
          backgroundColor: showCurrentOrder ? 'green' : 'white',
        }}

      >
        Current Order
      </btn>
      <btn
        className={`text-xl dis font-semibold border-2 px-3 py-1 rounded-r-full cursor-pointer`}

        onClick={user?.admin==="true" ? handleToggleFinishProcess : handleToShowToast}
        style={{
          backgroundColor: !showCurrentOrder ? 'green' : 'white',
        }}
      >
        Finish Process
      </btn>
      {showCurrentOrder ? <CurrentOrderComponent /> : <FinishProcessComponent />}
      </>  :
<div className="text-red-400 font-bold mt-10 text-2xl">
  You don't have the permission to see this information....
</div>
}



    </div>

  );
};

const CurrentOrderComponent = () => {
  return (
    <Order></Order>
  );
};

const FinishProcessComponent = () => {
  return (
    <div>
      {/* Content for the Finish Process component */}
      <h2 className="mt-10">Finish Order process list show in here</h2>
      <p>This is the finish process component.</p>
    </div>
  );
};

export default OrderBtn;