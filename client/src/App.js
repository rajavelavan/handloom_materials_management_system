import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './app/auth/login/login';
import SignupPage from './app/auth/signup/signup';
import CustomerPage from './app/customer/CustomerPage';
import Dashboard from './app/inventory/dashboard/page';
import MainLayout from './app/mainLayout';
import AuthLayout from './app/auth/authLayout';
import PurchaseOrders from './app/inventory/purchase/page';
import NewPurchase from './app/inventory/purchase/new';
import UpdatePurchase from './app/inventory/purchase/edit';
import NewOrder from './app/customer/newOrder';
import EmailVerified from './app/auth/emailVerify/emailVerified';
import SalesDetails from './app/inventory/sales/page';
import NewSales from './app/inventory/sales/new';
import UpdateSales from './app/inventory/sales/edit';
import Invoice from './app/inventory/invoice/page';
import NewInvoice from './app/inventory/invoice/new';
import UpdateInvoice from './app/inventory/invoice/edit';
import ManageUser from './app/userManagement/page';
import NewUser from './app/userManagement/new';
import UpdateUser from './app/userManagement/edit';
import ForgotPassword from './app/auth/forgotPassword/forgotPassword';


function App() {
  return (
    <Router>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path ="customer" element={<CustomerPage/>}/>
            <Route path ='customer/newOrder' element={<NewOrder/>}/>
            <Route path ="inventory" element= {<Dashboard/>}/>
            <Route path="/purchase" element={<PurchaseOrders/>} />
            <Route path="/purchase/new" element={<NewPurchase/>}/>
            <Route path="/purchase/edit/" element={<UpdatePurchase/>}/>
            <Route path="/sales" element={<SalesDetails/>}/>
            <Route path="/sales/new" element={<NewSales/>}/>
            <Route path="/sales/edit/" element= {<UpdateSales/>}/>
            <Route path="/invoice" element={<Invoice/>}/>
            <Route path="/invoice/new" element={<NewInvoice/>}/>
            <Route path="/invoice/edit/" element={<UpdateInvoice/>}/>
            <Route path="/manageuser" element={<ManageUser/>}/>
            <Route path="/manageuser/new" element={<NewUser/>}/>
            <Route path ='/manageuser/edit/' element={<UpdateUser/>}/>
          </Route>

          <Route element={<AuthLayout/>}>
            <Route path="/" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />}/>
            <Route path='/verifyemail' element={<EmailVerified/>}/>
            <Route path ="/forgot-password" element={<ForgotPassword/>}/>
          </Route>  
        </Routes>
    </Router>
  );
}

export default App;
