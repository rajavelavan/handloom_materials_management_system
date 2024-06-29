'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const logout = async () => {

    sessionStorage.clear();
    navigate('/');
  
  };

  return (
    <div className="w-full z-50 bg-white flex h-20 border-b-4 items-center justify-between px-8 text-white size-8 text-xl hover:text-white">
      <div className="flex items-center justify-between text-slate-800 rounded  p-3">
          Handloom Material Management System
      </div>
      <div className="flex items-center justify-between gap-5 text-black">
        <li className="flex items-center">
          {/* logout button*/}
          <div className="flex text-md hover:bg-slate-200 rounded p-2 hover:text-black">
            <button onClick={logout}>Logout</button>
          </div>
        </li>
      </div>
    </div>
  );
}
