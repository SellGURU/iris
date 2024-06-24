import {useState} from 'react'
import ButtonPrimary from '../../components/button/buttonPrimery'
import { SearchBox } from '../../components/searchBox/SearchBox'
import { PatienCard } from './PatienCard'
import Pageination from '../../components/pagenation/Pagenation'
export const Scan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className='container mx-auto flex flex-col  gap-5'>
      <div className='w-full flex flex-col items-center gap-3 '>
        <h1 className='text-4xl font-semibold text-[#1A1919] '>Scan History</h1>
        <p className='text-lg font-normal text-[#606060] max-w-xl text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been t</p>
      </div>
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
      <div className='w-full flex justify-center'> 
      <Pageination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}
