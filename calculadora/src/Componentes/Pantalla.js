import React from 'react'

const Pantalla = ({input}) => {
    return ( 
       <div className='h-[75px] mt-1 rounded-full flex justify-end items-center font-bold text-3xl text-white p-11 pr-[30px] border-2 shadow-sm shadow-white bg-green-500'>
        {input}
       </div> 
     );
}
 
export default Pantalla;