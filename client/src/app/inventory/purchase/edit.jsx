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

export default function UpdatePurchase({ selectedData }) {
  const item = useSelector((state) => state.purchase.selectedData); // data get from slice success
  // console.log('Selected Data from purchase table:', item);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = [
    { label: 'PARTIALLY PAID', value: 'Balance' },
    { label: 'BILLED', value: 'Paid' },
    { label: 'CLOSED', value: 'Complete' },
    { label: 'OPEN', value: 'Transit' },
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
      navigate('/purchase');
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
        `${BASE_URL}/purchases/${updatedData?._id}`,
        updatedData
      );
      toast.success('Purchase data updated.');
      // dispatch();
      console.log(res.data);
      // reset();
      navigate('/purchase');
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
        <h2 className="text-xl font-semibold">Update Purchase</h2>
        <Link to="/purchase">
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
            label="Vendor Name"
            name="vendorName"
            value={selectedData?.vendorName}
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Order Date"
            name="date"
            placeholder= 'dd/mm/yyyy'
            value={selectedData?.date}
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Delivery date"
            name="expectedDeliveryDate"
            value={selectedData?.expectedDeliveryDate}
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
            label="Item Name"
            name="itemName"
            value={selectedData?.itemName}
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Quantity"
            name="weight"
            value={selectedData?.expectedDeliveryDate}
            register={register}
            errors={errors}
            className="w-full"
          />

          <div className="sm:col-span-2">
            <TextareaInput
              label="Delivery Address"
              name="deliveryAddress"
              value={selectedData?.deliveryAddress}
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextareaInput
              label="Purchase Description"
              name="description"
              value={selectedData?.description}
              register={register}
              errors={errors}
              className="w-full"
            />
          </div>
          <TextInput
            label="Item Required in kgs"
            name="itemRequired"
            value={selectedData?.itemRequired}
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Quantity In Hand in kgs"
            name="quantityInHand"
            value={selectedData?.quntityInHand}
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>
        <UpdateButton isLoading={loading} title="Update Purchase" />
      </form>
    </div>
  );
}
