// import { CircleCheckBigIcon } from 'lucide-react';
import Axios from 'axios';
import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../helper/config';
import toast from 'react-hot-toast';

export default function EmailVerified() {

  const navigate = useNavigate();


  const [otp, setOTP] = useState(null);

  const [errors, setErrors] = React.useState('');
  
  
  const [loading, setLoading] = React.useState(false);
 

  const onSubmitOTP = async () => {
    setErrors('');
    const userData = JSON.parse(sessionStorage.getItem("hmms_user"));
    let requestPayload = {
      mail_id: userData.mail_id,
      otp: otp
    }
    console.log(requestPayload)
    setLoading(true);
    try {
      const apiRes = await Axios.post(`${BASE_URL}/verifyemail`, requestPayload);
      console.log(apiRes)
      if(apiRes.data.success) {
        switch (userData.role) {
          case "super_admin":
          case "admin":
            navigate('/inventory'); //redirects the next page, when the login success.
            break;
          case "customer":
            navigate('/customer'); //redirects the next page, when the login success.
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
      setErrors(error.response.data.message);
    } finally{
      setLoading(false);
    }
  }

  const setOTPData = (event) => {
    setOTP(event.target.value);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="font-bold text-gray-700 text-2xl text-center mb-4">
          {loading ? 'Processing' : 'Email Verification'}
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="otp" className="text-sm text-gray-700">
              One Time Password
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-black"
              // value={user.mail_id}
              onChange={setOTPData}
            />
          </div>
          {errors && <p className="error-message text-red-500">{errors}</p>}
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="px-3 py-2 text-white bg-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={onSubmitOTP}
            >
              Submit
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
