'use client';

import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from 'axios';
import { BASE_URL } from '../../helper/config';

export default function SignupPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    role: '',
    userName: '',
    address: '',
    phone_no: '',
    mail_id: '',
    password: '',
  });

  const [errors, setErrors] = useState('');

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors();
  };

  const onSignup = async (event) => {
    event.preventDefault();
    setErrors();

    if (
      user.phone_no === '' ||
      user.mail_id === '' ||
      user.userName === '' ||
      user.password === '' ||
      user.address === ''
    ) {
      setErrors('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      user.role = "customer";
      user.mail_id = user.mail_id.toLowerCase();
      const res = await Axios.post(`${BASE_URL}/signup`, user);
      console.log(res.data);
      
      if (res.data.success === true) {
        navigate('/verifyemail');
        toast.success('Please verify email, check your mail.');
        sessionStorage.setItem("hmms_user",JSON.stringify(res.data.user));
        sessionStorage.setItem("hmms_super_admin", res.data.user.role === "super_admin" ? true : false);
      } else {
        toast.error('Existing User, please Login...');
      }
    } catch (error) {
      console.error(error);
      toast.error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white text-blue-500 p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="font-bold text-gray-700 text-2xl text-center mb-4">
            {loading ? 'Processing' : 'SIGNUP'}
          </div>

          <form
            name="Signup-form"
            className="space-y-4"
            onSubmit={handleChange}
          >

            <div>
              <label htmlFor="userName" className="text-sm text-gray-700">
                User Name
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={user.userName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-black"
              />
            </div>
            <div>
              <label htmlFor="address" className="text-sm text-gray-700">
                Address
              </label>
              <textarea
                typeof="text"
                id="address"
                name="address"
                value={user.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-black"
              />
            </div>
            <div>
              <label htmlFor="phone_no" className="text-sm text-gray-700">
                Phone number
              </label>
              <input
                type="text"
                id="phone_no"
                name="phone_no"
                value={user.phone_no}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-black"
              />
            </div>
            <div>
              <label htmlFor="mail_id" className="text-sm text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="mail_id"
                name="mail_id"
                value={user.mail_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-black"
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
                value={user.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-black"
              />
            </div>
            <div>{errors && <p className="text-red-500">{errors}</p>}</div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">
                Click here to <Link to="/" className="text-blue-500 font-semibold">
                  LOGIN</Link>
              </span>
              <button
                type="submit"
                className="px-3 py-2 text-white bg-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={onSignup}
                // disabled={buttonDisabled}
              >
                Register
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}
