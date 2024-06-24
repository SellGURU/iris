import React from 'react'

export const SearchBox = ({placeHolder}) => {
  return (
    <div className='min-w-[432px] rounded-lg px-6 py-3 shadow-lg outline-none border flex gap-2 items-center '>
        <img src="/public/search-normal.svg" alt="" />
        <input placeholder={placeHolder} type="text" className="text-[#444444] w-full ring-0 focus:ring-0 focus:outline-none bg-transparent outline-none border-none" />
    </div>
  )
}
