import React from 'react';

export default function TextInput({label, name, register, errors, placeholder=false , isRequired=true, type= "text", readonly = false, className="sm:col-span-2"}) {
  return (
    <div className={className}>
          <label
            htmlFor={name}
            className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
          >
            {label}
          </label>
          <div className="mt-2">
            <input
              {...register(`${name}`, { required: isRequired })}
              type="text"
              name={name}
              id={name}
              placeholder={placeholder}
              autoComplete={name}
              readOnly={readonly}
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              
            />
            {errors.title && (
              <span className="text-sm text-red-600 ">
                {label} is Required
              </span>
            )}
          </div>
        </div>
  )
}
