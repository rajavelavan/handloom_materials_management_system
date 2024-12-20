'use client';

import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/formInputs/textInput.jsx';
import TextareaInput from '../../components/formInputs/textareaInput.jsx';
import SelectInput from '../../components/formInputs/selectInput.jsx';
import UpdateButton from '../../components/formInputs/updateButton.jsx';
import Axios from 'axios';
import toast from 'react-hot-toast';
// import { updateData } from '../../redux/features/purchaseSlice.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../helper/config.js';

export default function UpdateSales({ selectedData }) {
  const item = useSelector((state) => state.sales.selectedData); // data get from slice success
  // console.log('Selected Data from purchase table:', item);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = [
    { label: 'To Be Packed', value: 'Packed' },
    { label: 'To Be Shipped', value: 'Shipped' },
    { label: 'To Be Delivered', value: 'Delivered' },
    { label: 'To be Invoiced', value: 'Invoiced' },
  ];
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
      navigate('/sales');
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
      toast.success('sales data updated.');
      console.log(res.data);
      navigate('/sales');
    } catch (error) {
      // toast.error('failed to update purchase data.');
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-100 mt-2 rounded py-3 px-16 sm: flex-1">
        <h2 className="text-xl font-semibold">Update sales</h2>
        <Link to="/sales">
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
            label="Company Name"
            name="companyName"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Contact Number"
            name="contactNumber"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Campany Mail Address"
            name="mailAddress"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Delivery date"
            name="date"
            placeholder="dd/mm/yyyy"
            value={selectedData?.date}
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Product Name"
            name="productName"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="product quantity"
            name="weight"
            value={selectedData?.weight}
            register={register}
            errors={errors}
            className="w-full"
          />

          <SelectInput
            label="Status"
            name="status"
            value={selectedData?.status}
            options={status}
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Rate Per Unit"
            name="price"
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

          <div className="sm:col-span-2">
            <TextareaInput
              label="Company Address"
              name="companyAddress"
              register={register}
              errors={errors}
              className="w-full"
            />

            <TextareaInput
              label="Delivery Address"
              name="deliveryAddress"
              value={selectedData?.deliveryAddress}
              register={register}
              errors={errors}
              className="w-full"
            />
          </div>
        </div>
        <UpdateButton isLoading={loading} title="Update Sales" />
      </form>
    </div>
  );
}
