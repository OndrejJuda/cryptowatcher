import React from 'react';

interface IError {
  message: string
}

const Error: React.FC<IError> = ({ message }) => {
  return (
    <div className='h-screen col-span-4 text-3xl'>
      <p className='p-2 bg-red-500 w-max rounded-xl'>{message}</p>
    </div>
  );
};

export default Error;