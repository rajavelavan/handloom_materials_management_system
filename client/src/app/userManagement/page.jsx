'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { FilePenLineIcon, Trash2Icon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../redux/features/userSlice';
import { setSelectedData } from '../redux/features/userSlice';
import toast from 'react-hot-toast';
import Axios from 'axios';
import { BASE_URL } from '../helper/config';

export default function ManageUser() {
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state)=> state.user.userData);
  const data = useSelector((state) => state.user.userData);   // data getting success
//   console.log(data);
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [itemId, setItemId] = React.useState(null);

  const handleDeleteClick = (i) => {
    setItemId(i._id);
    setShowConfirmDialog(true);
  };

  async function handleDeleteConfirmation(confirmed) {
    if (confirmed) {
      const res = await Axios.delete(`${BASE_URL}/user/${itemId}`);
      toast.success('data deleted Success.');
      console.log("Removed Data:", res.data);
    }
    setShowConfirmDialog(false);
  }
  
  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await Axios.get(`${BASE_URL}/user`) ;
        // console.log(res.data);    
        dispatch(getData(res.data));  
      } catch (error) {
        console.log(error.message);
      }
    } 
    fetchdata();
  }, [dispatch]);


  const handleEditClick = (data) => {
    dispatch(setSelectedData(data));  //selected data correctly passed
    // console.log('Selected Data:',data);
  };


  return (
    <>
      <div className="flex items-center justify-between bg-slate-100 border m-3 rounded py-3 px-8 sm: flex-1">
        <h2 className="text-xl font-semibold">User Management</h2>
        {/* <p className='text-xl font-semibold'>Details</p> */}
        <button className="flex hover:text-white hover:bg-slate-800 p-2 rounded-lg gap-2 text-center">
          <Link to="/manageuser/new">
            Create User
          </Link>
        </button>
      </div>
      {/* header */}
      <div className="relative overflow-x-auto shadow-md m-3 sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                Role
              </th>
            <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
              Address
              </th>
            <th scope="col" className="px-6 py-3">
                Contact Number
              </th>
              <th scope="col" className="px-6 py-3">
                Mail Address
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" className="text-green-950">
                  {loading}, Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="7" className="text-red-600">
                  Unable to retrive Data fom server, {error}{' '}
                </td>
              </tr>
            )}
            {data.map(i => {
              return (
                <tr
                  key={i._id}
                  className="bg-white text-gray-500 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                    <td className="px-6 py-4">{i.role}</td>
                  <td className="px-6 py-4">{i.userName}</td>
                  <td className="px-6 py-4">{i.address}</td>
                  <td className="px-6 py-4">{i.phone_no}</td>
                  <td className="px-6 py-4">{i.mail_id}</td>
                  <td className="space-x-3 font-normal">
                    <button onClick={() => handleEditClick(i) }>
                      <Link to="/manageuser/edit/">
                        <FilePenLineIcon className='text-blue-400' />
                      </Link>
                    </button>
                    <button onClick={() => handleDeleteClick(i)}>
                      <Trash2Icon className='text-red-400' />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showConfirmDialog && (
          <div className="relative inline-block">
            <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 h-screen px-4 md:px-8">
              <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto shadow-lg rounded-md bg-white overflow-hidden">
                <div className="p-6 text-center">
                  <h1 className="text-xl font-bold text-gray-800">
                    Confirm Delete
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    Are you sure you want to delete this item?
                  </p>
                </div>
                <div className="flex justify-center items-center p-3 space-x-4">
                  <button
                    className="inline-flex justify-center px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                    onClick={() => handleDeleteConfirmation(true)}
                  >
                    Yes
                  </button>
                  <button
                    className="inline-flex justify-center px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                    onClick={() => handleDeleteConfirmation(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
