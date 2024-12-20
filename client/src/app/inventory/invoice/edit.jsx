'use client';

import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/formInputs/textInput.jsx';
import TextareaInput from '../../components/formInputs/textareaInput.jsx';
// import SelectInput from '../../components/formInputs/selectInput.jsx';
import UpdateButton from '../../components/formInputs/updateButton.jsx';
import Axios from 'axios';
import toast from 'react-hot-toast';
// import { updateData } from '../../redux/features/purchaseSlice.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../helper/config.js';

export default function UpdateInvoice({ selectedData }) {
  const item = useSelector((state) => state.sales.selectedData); // data get from slice success
  //   console.log(useSelector((state) => state.sales.selectedData));

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (item) {
      reset(item);
      console.log('Data selected by user:', item);
    } else {
      navigate('/invoice');
    }
    // console.log('Selected item for edit: ', data);
  }, [item, reset, navigate]);

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (updatedData, event) => {
    event.preventDefault();
    console.log(updatedData);
    setLoading(true);
    try {
      const res = await Axios.put(
        `${BASE_URL}/sales/${updatedData?._id}`,
        updatedData
      );
      toast.success('Invoice data updated.');
      console.log(res.data);
      navigate('/invoice');
    } catch (error) {
      toast.error('failed to update Invoice data.');
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-100 mt-2 rounded py-3 px-16 sm: flex-1">
        <h2 className="text-xl font-semibold">Update Invoice</h2>
        <Link to="/invoice">
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
            label="Customer Name"
            name="companyName"
            value={selectedData?.companyName}
            register={register}
            errors={errors}
            className="w-full"
          />

          <div className="sm:col-span-2">
            <TextareaInput
              label="Customer Address"
              name="companyAddress"
              value={selectedData?.companyAddress}
              register={register}
              errors={errors}
              className="w-full"
            />
          </div>

          <TextareaInput
            label="Product Details"
            name="productName"
            value={selectedData?.productName}
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Total Amount"
            name="totalAmount"
            value={selectedData?.totalAmount}
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>
        <UpdateButton isLoading={loading} title="Update Invoice" />
      </form>
    </div>
  );
}
