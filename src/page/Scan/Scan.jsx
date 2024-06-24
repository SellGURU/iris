import React from 'react'
import ButtonPrimary from '../../components/button/buttonPrimery'
import { SearchBox } from '../../components/searchBox/SearchBox'
import { PatienCard } from './PatienCard'
export const Scan = () => {
  return (
    <div className='container mx-auto flex flex-col  gap-5'>
      <div className='flex w-full justify-between'>
        <ButtonPrimary>
          <img src="/public/fi_plus.svg" alt="" />
          Add a new record
        </ButtonPrimary>
        <SearchBox placeHolder="Search"/>
        <div className='flex gap-8 items-center'>
          <div className='flex items-center gap-3'>
            <img src="/public/filter.svg" alt="" />
            Filter
          </div>
          <div className='flex items-center gap-3'>
            <img src="/public/sort.svg" alt="" />
            Sort By Date
          </div>
        </div>
      </div>
      <PatienCard/>
      <PatienCard/>
      <PatienCard/>
      <hr className='h-[1px] bg-gray-700 w-full my-5' />
    </div>
  )
}
