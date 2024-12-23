import React from 'react'

export const SearchBox = ({placeHolder,changeHandler,value}) => {
  return (
    <div className='min-w-[300px] relative z-20 xl:min-w-[432px] rounded-lg h-8 px-6 py-1 shadow-lg outline-none border flex gap-2 items-center '>
        <img className='w-[14px]' src="search-normal.svg" alt="" />
        <input onChange={changeHandler} value={value} placeholder={placeHolder} type="text" className="text-[#444444]  w-full ring-0 focus:ring-0 focus:outline-none text-[12px] bg-transparent outline-none border-none" />
    </div>
  )
}
