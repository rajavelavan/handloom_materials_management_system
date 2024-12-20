import React from 'react';
import { Link } from 'react-router-dom';

function RecentPurchases({salesData}) {
  
  return (
    <div className="bg-slate-800 m-4 text-white p-4 rounded-md shadow-sm">
      <div className="flex flex-row-reverse justify-between">
        <button className="bg-white text-slate-800 rounded-lg p-2 font-bold">
          <Link to="/customer/newOrder">New Order</Link>
        </button>
        <h2 className="text-xl font-medium mb-2">Recent Purchases</h2>
      </div>

      <table className="table-auto w-full text-sm mt-2 text-center rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
        <thead className="justify-items-center text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center border-b border-gray-200 ">
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Received Date
            </th>
            <th scope="col" className="px-6 py-3">
              Total Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {salesData?.map(p => (
            <tr
              key={p._id}
              className="bg-white text-gray-500 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{p.productName}</td>
              <td className="px-6 py-4">{p.weight}</td>
              <td className='px-6 py-4 text-orange-600'>{p.status}</td>
              <td className="px-6 py-4">{p.date}</td>
              <td className="px-6 py-4">{p.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentPurchases;
