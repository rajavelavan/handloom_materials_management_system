'use client';

import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../components/formInputs/textInput.jsx';
import TextareaInput from '../components/formInputs/textareaInput.jsx';
import SubmitButton from '../components/formInputs/submitButton.jsx';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BASE_URL } from '../helper/config.js';

export default function NewOrder() {
  
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(data, event) {
    event.preventDefault();
    // console.log('User submitted data:',data);
    setLoading(true);
    let userDetails = JSON.parse(sessionStorage.getItem("hmms_user"));
    try {
      data.createdBy = userDetails.mail_id;
      data.invoiceNumber = "";
      await Axios.post(`${BASE_URL}/order`, data);
      //   console.log(res);
      setLoading(false);
      toast.success('New Product Added.');
      navigate('/customer');
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
          <h2 className="text-xl font-semibold">New Order</h2>
          <Link to="/customer">
            <X />
          </Link>
        </div>
        {/* form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput label= "Company/Individual Name" name ="companyName" register={register} errors={errors} className='w-full'/>
          
          <TextInput label= "Contact Number" name ="contactNumber" register={register} errors={errors} className='w-full'/>
          
          <TextInput label= "Company Address" name ="companyAddress" register={register} errors={errors} className='w-full'/>

          <TextInput label= "Campany Mail Address" name ="mailAddress" register={register} errors={errors} className='w-full'/>

          <TextInput label= "Expected Delivery Date" name ="date" placeholder='dd/mm/yyyy' register={register} errors={errors} className='w-full'/>

          <TextInput label= "Product Name" name ="productName" register={register} errors={errors} className='w-full'/>

          <TextInput label= "Product Quantity" name ="weight" register={register} errors={errors} className='w-full'/>


          <div className='sm:col-span-2'>

            <TextareaInput label= "Delivery Address" name ="deliveryAddress" register={register} errors={errors} className='w-full'/>
          
          </div>
          </div>
          <SubmitButton isLoading={loading} title=" and Send the order" />
        </form>
      </div>
    </>
  );
}
