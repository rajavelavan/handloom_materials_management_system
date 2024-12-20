
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from 'axios';
import { BASE_URL } from '../../helper/config';

export default function ForgotPassword() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');

    const [forgotPasswordData, setForgotPasswordData] = useState({
        mail_id: '',
        newPassword: '',
      });

    const handleChange = (e) => {
        setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
        setErrors();
      };

      const changePassword = async(event)=> {
        event.preventDefault();
        setErrors();
        

        if (forgotPasswordData.mail_id === '' || forgotPasswordData.newPassword === '') {
            setErrors('All fields are required.');
            return;
          }
          setLoading(true);

          try {
            const responseData = await Axios.post(`${BASE_URL}/forgotpassword`, forgotPasswordData);
            if(responseData) {
              toast.success('Paasword Changed.');
              navigate('/');
            }
          } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
          }
      
      }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="font-bold text-gray-700 text-2xl text-center mb-4">
          {loading ? 'Processing' : 'Forgot Password'}
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="mail_id"
              name="mail_id"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-black"
              value={forgotPasswordData.mail_id}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="nwePassword" className="text-sm text-gray-700">
              New Password
            </label>
            <input
              type="text"
              id="newPassword"
              name="newPassword"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-black"
              value={forgotPasswordData.newPassword}
              onChange={handleChange}
            />
          </div>
          {errors && <p className="error-message text-red-500">{errors}</p>}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">
              Click here to{' '}
              <Link to="/" className="text-blue-500 font-semibold">
                SIGNUP
              </Link>
            </span>
            {/* <span className="text-gray-700">
              Forgot your password?{' '}
              <Link to="/forgot-password" className="text-blue-500 font-semibold">
                Click here
              </Link>
            </span> */}
            <button
              type="submit"
              className="px-3 py-2 text-white bg-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={changePassword}
            >
              Change Password
            </button>
          </div>
        </form>
        
      </div>
    </div>
  )
}
