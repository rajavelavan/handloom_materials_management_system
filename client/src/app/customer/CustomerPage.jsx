
import React, {useState, useEffect} from 'react';
import UserDetails from '../components/customer/userDetails';
import RecentPurchases from '../components/customer/recentPurchases';
import Axios from 'axios';
import { BASE_URL } from '../helper/config';

export default function CustomerPage() {

 

  const [salesData, setSalesData] = useState(null);

  console.log(salesData);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let user = JSON.parse(sessionStorage.getItem("hmms_user"));
        console.log(user);
        const res = await Axios.get(`${BASE_URL}/order/${user.mail_id}`);   
        console.log(res.data);  
        
        setSalesData(res.data);   
      } catch (error) {
        console.log(error)
      }
    } 
    fetchdata();
  }, []);

  useEffect(()=>{
    setUserData(JSON.parse(sessionStorage.getItem("hmms_user")));
    // console.log("RRR", userData)
  },[])

  return (
    <div>
      <div className="flex flex-row-reverse">
        <UserDetails />
        <div className="w-1/2">
          <div className="bg-slate-800 text-white m-4 p-4 rounded-lg shadow-sm">
            <p>
              <span className="font-semibold">Welcome back, {userData?.userName}</span>
              <br />
              This is your central hub for everything related to your account,
              <br />
              Here, you can see your profile details like username, email
              address, and phone number,
              <br />
              You can also track your past purchases in a convenient table
              format, including product names, quantities, received dates, and
              total amounts,
              <br />
              Feeling ready to shop again? This page also allows you to
              seamlessly place new orders,
              <br />
              We're thrilled to have you here and always happy to help with any
              questions you may have!
            </p>
          </div>
        </div>
      </div>
      <div>
      {salesData ? <RecentPurchases salesData = {salesData} /> : <></>}
      </div>
    </div>
  );
}
