import React from 'react'


const ConfirmationModal = ({text,cancel,action}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-400 bg-opacity-50 z-50'>
    <div className='bg-white p-4'>
        <p>
            {
                text
            }
        </p>
        <div className='flex justify-between mt-4'>
            <button onClick={cancel} className='px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md'>NO</button>
            <button className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md' onClick={action}>YES</button>
        </div>
    </div>
</div>
  )
}

export default ConfirmationModal
