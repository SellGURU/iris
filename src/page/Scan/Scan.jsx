import {useState} from 'react'
import ButtonPrimary from '../../components/button/buttonPrimery'
import { SearchBox } from '../../components/searchBox/SearchBox'
import { PatienCard } from './PatienCard'
import Pageination from '../../components/pagenation/Pagenation'
const patients = [
  // Array of patient data
  { id: 11223342,  date: '24 April 2024', comment : 0 },
  { id: 11223343,  date: '11 April 2024', comment : 2 },
  { id: 11223344,  date: '17 April 2024', comment : 2 },
  { id: 11223345,  date: '30 April 2024', comment : 2},
  { id: 11223346,  date: '9 April 2024', comment : 2},
  { id: 11223347,  date: '1 April 2024' , comment : 2},
  // Add more patient data as needed
];
export const Scan = () => {
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = patients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(patients.length / itemsPerPage);


  return (
    <div className='container  mx-auto flex flex-col sm:px-6 md:px-8 lg:px-10  xl:px-12  gap-5'>
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
      {currentItems.map((patient , i) => (
        <PatienCard index={i+1} key={patient.id} patient={patient} />
      ))}
      <hr className='h-[1px] bg-gray-700 w-full my-5' />
      <div className='w-full flex justify-center'> 
      <Pageination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}
