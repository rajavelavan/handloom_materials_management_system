'use client';

import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../components/formInputs/textInput.jsx';
import TextareaInput from '../components/formInputs/textareaInput.jsx';
import SelectInput from '../components/formInputs/selectInput.jsx';
import SubmitButton from '../components/formInputs/submitButton.jsx';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BASE_URL } from '../helper/config.js';

export default function NewUser() {
  const status = [
    { label: 'Admin', value: 'admin' },
    { label: 'Customer', value: 'customer' },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  async function onSubmit(data, event) {
    event.preventDefault();
    console.log('User submitted data:', data);
    setLoading(true);
    try {
      data.mail_id = data.mail_id.toLowerCase();
      await Axios.post(`${BASE_URL}/user`, data);
      //   console.log(res);
      setLoading(false);
      navigate('/manageuser');
      toast.success('New User Added.');

      reset();
    } catch (error) {
      setLoading(true);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between bg-slate-100 mt-2 rounded py-3 px-16 sm: flex-1">
          <h2 className="text-xl font-semibold">New User</h2>
          <Link to="/manageuser">
            <X />
          </Link>
        </div>
        {/* form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput
              label="User Name"
              name="userName"
              register={register}
              errors={errors}
              className="w-full"
            />

            <TextInput
              label="Contact Number"
              name="phone_no"
              register={register}
              errors={errors}
              className="w-full"
            />

            <SelectInput
              label="Role"
              name="role"
              options={status}
              register={register}
              errors={errors}
              className="w-full"
            />

            <TextInput
              label="Mail(after save, It becomes read only data)"
              name="mail_id"
              register={register}
              errors={errors}
              className="w-full"
            />

            <TextInput
              label="Password"
              name="password"
              register={register}
              errors={errors}
              className="w-full"
            />

            <div className="sm:col-span-2">
              <TextareaInput
                label="Address"
                name="address"
                register={register}
                errors={errors}
                className="w-full"
              />
            </div>
          </div>
          <SubmitButton isLoading={loading} title="User" />
        </form>
      </div>
    </>
  );
}
