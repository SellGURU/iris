import {useState , useContext, useEffect} from 'react'
import ButtonPrimary from '../../components/button/buttonPrimery'
import { SearchBox } from '../../components/searchBox/SearchBox'
import { PatienCard } from './PatienCard'
import Pageination from '../../components/pagenation/Pagenation'
import { Link } from 'react-router-dom'
import { PatientContext } from '../../context/context'

export const Scan = () => {
  const { patients } = useContext(PatientContext);
  console.log(patients)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    indexOfLastItem =Math.min( currentPage * itemsPerPage,patients.length);
    indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setPatientList(patients.slice(indexOfFirstItem, indexOfLastItem))
  },[currentPage])

  const [patientList,setPatientList] = useState(patients.slice(indexOfFirstItem, indexOfLastItem));
  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const filterPatientsHandler =(e)=>{
    const filteredItem=patientList.filter((patient)=>{
      if (patient.sex.includes(e.target.value)){
        return patient
      }
    })
    // TODO: connected to ui
    // console.log(filteredItem)
    // setPatientList(filteredItem)
  }


  return (
    <div className="container  mx-auto flex flex-col sm:px-6 md:px-8 lg:px-10  xl:px-12  gap-5">
      <div className="w-full flex flex-col items-center gap-3 ">
        <h1 className="text-4xl font-semibold text-[#1A1919] ">Scan History</h1>
        <p className="text-lg font-normal text-[#606060] max-w-xl text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been t
        </p>
      </div>
      <div className="flex w-full justify-between">
        <Link to="PatientInformation">
          <ButtonPrimary>
          <img src="fi_plus.svg" alt="" />
            Add a new record
          </ButtonPrimary>
        </Link>
        <SearchBox changeHandler={filterPatientsHandler} placeHolder="Search" />
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-3">
            <img src="filter.svg" alt="" />
            Filter
          </div>
          <div className="flex items-center gap-3">
            <img src="sort.svg" alt="" />
            Sort By Date
          </div>
        </div>
      </div>
      {patientList.map((patient , i) => (
        <PatienCard index={i+1} key={patient.id} patient={patient} />
        ))}

      <hr className="h-[1px] bg-gray-700 w-full my-5" />
      {patients == 0 ?(
       <p className="text-center text-[#606060] font-medium">No records found. <Link to="facecamera"><span className="underline text-[#544BF0]">Go to face scanner page. </span></Link> </p>
      )
      :
      (
<div className="w-full flex justify-center">
        <Pageination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      )
    }
      
    </div>
  );
};
