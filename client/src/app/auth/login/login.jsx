'use client';

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from 'axios';
import { BASE_URL } from '../../helper/config';


export default function LoginPage() {


  const navigate = useNavigate();

  const [user, setUser] = useState({
    mail_id: '',
    password: '',
  });

  const [errors, setErrors] = React.useState('');
  
  
  const [loading, setLoading] = React.useState(false);


  useEffect(()=> {
    sessionStorage.clear();
  }, []);

  
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors();
  };
  const onLogin = async (event) => {
    event.preventDefault();
    setErrors();

    if (user.mail_id === '' || user.password === '') {
      setErrors('Mail and Password are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await Axios.post(`${BASE_URL}/login`, user);

      if (res.data.success === true) {
        sessionStorage.setItem("hmms_user",JSON.stringify(res.data.user));
        sessionStorage.setItem("hmms_super_admin", res.data.user.role === "super_admin" ? true : false);
        if(res.data.user.isVerified === true){
          toast.success('Login success.');
          switch (res.data.user.role) {
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
        } else {
          toast.success('Please verify email.');
          navigate('/verifyemail');
        }
      } else {
        toast.error('SIGNUP FIRST (User not found)');
      }
    } catch (error) {
      console.log(error);
      toast.error('Login failed.');
      setErrors(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="font-bold text-gray-700 text-2xl text-center mb-4">
          {loading ? 'Processing' : 'LOGIN'}
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
              value={user.mail_id}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-black"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          {errors && <p className="error-message text-red-500">{errors}</p>}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">
              Click here to{' '}
              <Link to="/signup" className="text-blue-500 font-semibold">
                SIGNUP
              </Link>
            </span>
            <span className="text-gray-700">
              Forgot your password?{' '}
              <Link to="/forgot-password" className="text-blue-500 font-semibold">
                Click here
              </Link>
            </span>
            <button
              type="submit"
              className="px-3 py-2 text-white bg-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={onLogin}
            >
              Login
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
