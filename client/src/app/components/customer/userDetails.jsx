import React from 'react';

function UserDetails() {

  const [userData, setUserData] =React.useState(null);

  React.useEffect(()=> {
    setUserData(JSON.parse(sessionStorage.getItem("hmms_user")))  
  }, []);
  return (
    <div className="w-1/2">
      <div className="bg-slate-800 text-white m-4 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-medium mb-2">User Details</h2>
        <ul className="list-none space-y-2">
          <li className="flex items-center">
            <span className="mr-2 font-medium">Name:</span>
            <span>{userData?.userName}</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 font-medium">Mail:</span>
            <span>{userData?.mail_id}</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 font-medium">Phone:</span>
             <span>{userData?.phone_no}</span> 
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserDetails;
