import React from 'react';
import Header from './components/layouts/header';
import Sidebar from './components/layouts/sidebar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <main className="flex w-full">
      <div className="w-[17%]">
        <Sidebar />
      </div>
      <div className="w-[83%] h-screen">
        <div className="fixed w-[inherit]">
          <Header />
        </div>
        <div className="p-2 mt-20" />
        <Outlet />
      </div>
    </main>
  );
}
