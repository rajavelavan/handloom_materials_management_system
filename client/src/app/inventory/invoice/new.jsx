'use client';

import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/formInputs/textInput.jsx';
import TextareaInput from '../../components/formInputs/textareaInput.jsx';
import SubmitButton from '../../components/formInputs/submitButton.jsx';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../helper/config.js';

export default function NewInvoice() {
  
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
      await Axios.post(`${BASE_URL}/sales`, data);
      //   console.log(res);
      setLoading(false);
      navigate('/invoice');
      toast.success('New Invoice Added.');

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
          <h2 className="text-xl font-semibold">New Invoice</h2>
          <Link to="/invoice">
            <X />
          </Link>
        </div>
        {/* form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
        >
          <div className="gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <h1 className="font-semibold ">Invoice Details</h1>

              <TextInput
                label="Invoice Number"
                name="invoiceNumber"
                register={register}
                errors={errors}
                className="w-full"
              />

              <TextInput
                label="Invoice Date"
                name="date"
                placeholder='dd/mm/yyyy'
                register={register}
                errors={errors}
                className="w-full"
              />
              </div>
              <div className='mt-4 gap-2'>

              <h1 className="font-semibold">Customer Details</h1>

              <TextInput
                label="Name"
                name="Name"
                register={register}
                errors={errors}
                className="w-full"
              />

              <TextareaInput
                label="Address"
                name="address"
                register={register}
                errors={errors}
                className="w-full"
              />

              <TextInput
                label="Email Address"
                name="email"
                register={register}
                errors={errors}
                className="w-full"
              />

              <TextInput
                label="Contact Number"
                name="phone"
                register={register}
                errors={errors}
                className="w-full"
              />
            </div>
            <div className='mt-4'>
              <h1 className="font-semibold">Product Details</h1>

              <div className="sm:col-span-2">
                <TextareaInput
                  label="Products Name"
                  name="description"
                  register={register}
                  errors={errors}
                  className="w-full"
                />
              </div>

              <TextInput
                label="Product Quantity"
                name="quantity"
                register={register}
                errors={errors}
                className="w-full"
              />

              <TextInput
                label="Price(Single piece)"
                name="price"
                register={register}
                errors={errors}
                className="w-full"
              />

              <TextInput
                label="Total"
                name="total"
                register={register}
                errors={errors}
                className="w-full"
              />

              <TextInput
                label="Total Amount"
                name="totalAmount"
                register={register}
                errors={errors}
                className="w-full"
              />
            </div>
          </div>
          <SubmitButton isLoading={loading} title="Invoice" />
        </form>
      </div>
    </>
  );
}
