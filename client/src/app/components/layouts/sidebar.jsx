import { ShoppingCart, ChevronRight, LayoutDashboard, UserCircleIcon, UserCogIcon, BoxIcon, NotebookPenIcon, TruckIcon } from 'lucide-react';
import {Link, useLocation} from 'react-router-dom';
import React from 'react';

export default function Sidebar() {

  const location = useLocation();
  const [sidebarLinks, setSidebarLinks] = React.useState([]);

  React.useEffect(() => {
    // console.log(JSON.parse(sessionStorage.getItem("hmms_user")))
    let userDetails = JSON.parse(sessionStorage.getItem("hmms_user")); 
    if(sessionStorage.getItem("hmms_super_admin") === "true") {
      setSidebarLinks([
          {title:"Inventory", href:'/inventory', icon:<ShoppingCart/>},
          {title: "Purchase", href: '/purchase',  icon:<BoxIcon/>},
          {title: "Sales", href: '/sales', icon: <TruckIcon/>},
          {title: "Invoice", href:'/invoice', icon: <NotebookPenIcon/>},
          {title:"Manage Users", href:'/manageuser', icon:<UserCogIcon/>},
        ]);
    } else if(userDetails.role === 'admin') {
      setSidebarLinks([
        {title:"Inventory", href:'/inventory', icon:<ShoppingCart/>},
        {title: "Purchase", href: '/purchase',  icon:<BoxIcon/>},
        {title: "Sales", href: '/sales', icon: <TruckIcon/>},
        {title: "Invoice", href:'/invoice', icon: <NotebookPenIcon/>},
        ]);
    } else {
      setSidebarLinks([
        {title: "Customer", href: "/customer", icon: <UserCircleIcon/>},
      ])
    }
  }, []);


  return (
    <div className='fixed top-0 left-0 z-40 w-[inherit] h-screen transition-transform translate-x-0 bg-slate-800 text-slate-50'>
      <nav className='h-full p-4 overflow-y-auto pt-8'>
        <div className='flex p-5 space-x-3 text-black bg-white rounded-lg'>
          <LayoutDashboard className='relative' />
          <h1 className='text-bold'>HMMS</h1>
        </div>
        <div className='p-4'></div>
        {sidebarLinks.map((item, i)=> {
          return(
              <Link key={i} to={item.href} 
                className={`flex justify-between gap-4 p-5 hover:bg-slate-300 hover:text-black rounded items-center 
                ${location.pathname.indexOf(item.href) > -1 ? "bg-white text-black": "text-white"}`}>
                {item.icon}
                <span>{item.title}</span>
                <ChevronRight className='space-x-2 gap-4 place-items-end'/>
              </Link>
            )
        })}
      </nav>
    </div>
  )
}
