
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../helper/axiosInstance';

export default function ForgotPassword() {

    const [step, setStep] = useState('request'); // 'request' -> 'reset'
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');

    const [forgotPasswordData, setForgotPasswordData] = useState({
        mail_id: '',
        otp: '',
        newPassword: '',
      });

    const handleChange = (e) => {
        setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
        setErrors();
      };

      const requestOtp = async (event) => {
        event.preventDefault();
        setErrors();

        if (forgotPasswordData.mail_id === '') {
          setErrors('Email is required.');
          return;
        }
        setLoading(true);
        try {
          await api.post(`/forgotpassword/request`, { mail_id: forgotPasswordData.mail_id });
          toast.success('OTP sent to your email.');
          setStep('reset');
        } catch (error) {
          console.log(error);
          setErrors(error.response?.data?.message ?? 'Could not send OTP.');
        } finally {
          setLoading(false);
        }
      }

      const resetPassword = async (event) => {
        event.preventDefault();
        setErrors();

        if (forgotPasswordData.otp === '' || forgotPasswordData.newPassword === '') {
          setErrors('OTP and new password are required.');
          return;
        }
        setLoading(true);
        try {
          await api.post(`/forgotpassword/reset`, forgotPasswordData);
          toast.success('Password changed.');
          navigate('/');
        } catch (error) {
          console.log(error);
          setErrors(error.response?.data?.message ?? 'Could not reset password.');
        } finally {
          setLoading(false);
        }
      }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="font-bold text-gray-700 text-2xl text-center mb-4">
          {loading ? 'Processing' : 'Forgot Password'}
        </div>

        {step === 'request' ? (
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
            {errors && <p className="error-message text-red-500">{errors}</p>}
            <div className="flex items-center justify-between">
              <span className="text-gray-700">
                Remembered it?{' '}
                <Link to="/" className="text-blue-500 font-semibold">
                  LOGIN
                </Link>
              </span>
              <button
                type="submit"
                className="px-3 py-2 text-white bg-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={requestOtp}
              >
                Send OTP
              </button>
            </div>
          </form>
        ) : (
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
                value={forgotPasswordData.otp}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="text-sm text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 text-black"
                value={forgotPasswordData.newPassword}
                onChange={handleChange}
              />
            </div>
            {errors && <p className="error-message text-red-500">{errors}</p>}
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-gray-700 text-sm underline"
                onClick={() => setStep('request')}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-3 py-2 text-white bg-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={resetPassword}
              >
                Change Password
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  )
}
