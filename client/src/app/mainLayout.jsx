import React from 'react';
import Header from './components/layouts/header';
import Sidebar from './components/layouts/sidebar';
import { Building2 } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className='flex w-full'>
      <div className='w-[17%]'>
      <Sidebar />
      </div>
      <main className="w-[83%] h-screen">
        <div className='fixed w-[inherit]'>
          <Header />
        </div>
        <div className='p-6 mt-20'>
          {/* <div className='h-30 bg-slate-800 p-5 mt-4 shadow border-b rounded-lg'>
            <div className='flex space-x-3'>
              <div className='flex w-12 h-12 bg-white items-center justify-center rounded-lg'>
                <Building2 />
              </div>
              <div className='flex flex-col text-slate-50'>
                <p className='font-semibold'>Hello, Welcome to My Application</p>
                <span className='text-sm'>Easy to Order, get the valuable Products....</span>
              </div>
            </div>
          </div> */}
        </div>
        <Outlet/>
      </main>
    </div>
  )
}
