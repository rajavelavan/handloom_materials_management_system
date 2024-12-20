'use client';
import axios from 'axios';
import { CheckCircle2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../helper/config';

export default function Dashboard() {
  const hasFetchedRef = React.useRef(false);

  const [purchaseData, setPurchaseData] = useState('');
  const [salesData, setsalesData] = useState('');

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
  });

  useEffect(() => {
    fetchAllPurchaseData();
    fetchAllSalesData();
  }, []);

  const fetchAllPurchaseData = async () => {
    try {
      const purchase = await axios.get(`${BASE_URL}/purchases`);
      setPurchaseData(purchase.data);
      // console.log(purchase.data)
      // getSum(purchase.data, 'itemRequired');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllSalesData = async () => {
    try {
      const sales = await axios.get(`${BASE_URL}/sales`);
      setsalesData(sales.data);
      // console.log(sales.data);
      // getSum(salesData.data, 'status');
    } catch (error) {
      console.log(error);
    }
  };

  const getSum = (arr, property) => {
    let total = 0;
    if (arr && arr.length) {
      arr.forEach((element) => {
        let temp = +element[property];
        if (element[property] && temp > 0) {
          total += temp;
        }
      });
    }
    return total;
  };

  // const getStatus = (arr, property) => {
  //   const statusValues = ['Packed', 'Delivered', 'Shipped', 'Invioced']
  //   let count = 0;
  //   for (const item in arr) {
  //     if (statusValues.includes(item[property])) {
  //       count++;
  //       console.log(count);
        
  //     }
  //   }
  //   return count;
  // }

  // 1. create a variable total and assign 0 value in initial.
  // 2. In a function, pass the obj and property as parameter.
  // 3. Inside the function, create a foreach loop, pass the item as parameter to iterate in array.
  // do the sum function to add all the value's of single obj's property
  // 4. get the property and ensure the type of property from the obj.
  // 5. if property is string, then add the plus symbol to variable, to convert the property's value into number.
  // 6. return the to total variable.

  const routeLinks = [
    { title: 'Purchase', href: '/purchase' },
    { title: 'Sales', href: '/sales' },
    { title: 'Invoice', href: '/invoice' },
  ];

  // const salesActivity = [
  //   { title: 'To be Packed', number: 150, unit: 'Qty', href: '#' },
  //   { title: 'To be Shipped', number: 86, unit: 'Pkgs', href: '#' },
  //   { title: 'To be Delivered', number: 100, unit: 'Pkgs', href: '#' },
  //   { title: 'To be Invoiced', number: 50, unit: 'Qty', href: '#' },
  // ];
  // const inventorySummary = [
  //   { title: 'Quantity in Hand', number: 25 },
  //   { title: 'Quantity to be received', number: 10 },
  // ];
  return (
    <>
      {/* buttons */}
      <div className="font-semibold text-right">
        {routeLinks.map((item, i) => {
          return (
            <Link key={i} to={item.href}>
              <button className="mr-7 bg-slate-800 text-white rounded-lg p-2">
                {item.title}
              </button>
            </Link>
          );
        })}
      </div>
      {/* sales activity */}
      <div className="bg-blue-100 m-6 border border-slate-300 p-8 grid grid-cols-12 gap-4 rounded-lg">
        <div className="col-span-8 border-r border-slate-300">
          <h2 className="mb-6 text-xl">Sales Activity</h2>
          <div className="pr-8 grid grid-cols-2 gap-4">
            <Link className="shadow rounded-lg border border-slate-200 hover:border-blue-400 bg-white py-4 cursor-pointer flex items-center flex-col gap-3 transition-all duration-300">
              <h4 className="font-semibold text-3xl">
                {salesData && salesData.length ? salesData.filter(obj => obj?.status?.toLowerCase() === "packed").length : 0} 
              </h4>
              <small className="text-slate-500">Qty</small>
              <div className="flex items-center space-x-2 text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="uppercase text-xs">To be Packed</span>
              </div>
            </Link>
            <Link className="shadow rounded-lg border border-slate-200 hover:border-blue-400 bg-white py-4 cursor-pointer flex items-center flex-col gap-3 transition-all duration-300">
               
                <h4 className="font-semibold text-3xl">   {salesData && salesData.length ? salesData.filter(obj => obj?.status?.toLowerCase() === "shipped").length : 0}  </h4>
              <small className="text-slate-500">Qty</small>
              <div className="flex items-center space-x-2 text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="uppercase text-xs">To be Shipped</span>
              </div>
            </Link>
            <Link className="shadow rounded-lg border border-slate-200 hover:border-blue-400 bg-white py-4 cursor-pointer flex items-center flex-col gap-3 transition-all duration-300">
              <h4 className="font-semibold text-3xl"> {salesData && salesData.length ? salesData.filter(obj => obj?.status?.toLowerCase() === "delivered").length : 0} </h4>
              <small className="text-slate-500">Qty</small>
              <div className="flex items-center space-x-2 text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="uppercase text-xs">To be Delivered</span>
              </div>
            </Link>
            <Link className="shadow rounded-lg border border-slate-200 hover:border-blue-400 bg-white py-4 cursor-pointer flex items-center flex-col gap-3 transition-all duration-300">
              <h4 className="font-semibold text-3xl"> {salesData && salesData.length ? salesData.filter(obj => obj?.status?.toLowerCase() === "invoiced").length : 0} </h4>
              <small className="text-slate-500">Qty</small>
              <div className="flex items-center space-x-2 text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="uppercase text-xs">To be Invoiced</span>
              </div>
            </Link>
          </div>
        </div>
        {/* Inventory Summary */}
        <div className="col-span-4 p-8">
          <h2 className="mb-6 text-xl">Inventory Summary</h2>
          <div>
            <div className="shadow rounded-lg border border-slate-200 hover:border-blue-400 bg-white px-4 py-2 mb-4 cursor-pointer flex items-center justify-between gap-3 transition-all duration-300">
              <h2 className="text-slate-500 uppercase text-sm">
                Quantity in Hand
              </h2>
              <h2 className="text-2xl">
                {getSum(purchaseData, 'itemRequired')}
              </h2>
            </div>
            <div className="shadow rounded-lg border border-slate-200 hover:border-blue-400 bg-white px-4 py-2 mb-4 cursor-pointer flex items-center justify-between gap-3 transition-all duration-300">
              <h2 className="text-slate-500 uppercase text-sm">
                Quantity to be received
              </h2>
              <h2 className="text-2xl">
                {getSum(purchaseData, 'quantityInHand')}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
