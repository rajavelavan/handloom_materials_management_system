import React from 'react'

export default function deletePopup({onConfirm}) {
  return (
    <div className="relative inline-block">
            <div className="fixed inset-0 z-50 items-center justify-center bg-gray-500 bg-opacity-50 px-4 md:px-8">
              <div className="flex flex-col w-full max-w-md mx-auto shadow-lg rounded-md bg-white overflow-hidden">
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
                    onClick={() => onConfirm(true)}
                  >
                    Yes
                  </button>
                  <button
                    className="inline-flex justify-center px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                    onClick={() => onConfirm(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}
