/* eslint-disable react/jsx-key */
import {useState, useContext, useEffect} from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import {SearchBox} from "../../components/searchBox/SearchBox";
import {PatienCard} from "./PatienCard";
import Pageination from "../../components/pagenation/Pagenation";
import {Link, useNavigate} from "react-router-dom";
import {PatientContext} from "../../context/context.jsx";
import { Button } from "symphony-ui";
import Application from "../../api/Application.js";

export const ScanHistory = () => {
    const {patients2} = useContext(PatientContext);
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    console.log(patients)
     let [partyId] = useLocalStorage("partyid");

    Application.getScanList({
        party_id:partyId
    }).then((res) => {
        console.log
    })
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    let indexOfLastItem = currentPage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
    useEffect(() => {

        const indexOfFirstItem = (currentPage - 1) * itemsPerPage;

        const indexOfLastItem = Math.min(
            indexOfFirstItem + itemsPerPage,
            patients.length
        );

        console.log("indexOfFirstItem", indexOfFirstItem);
        console.log("indexOfLastItem", indexOfLastItem);

        setPatientList(patients.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage]);
    const navigate = useNavigate()
    const [patientList, setPatientList] = useState(
        patients.slice(indexOfFirstItem, indexOfLastItem)
    );
    const totalPages = Math.ceil(patients.length / itemsPerPage);

    const filterPatientsHandler = (e) => {
        const filteredItem = patientList.filter((patient) => {
            return patient.id.includes(e.target.value);
        });
        console.log(patientList)
        if (e.target.value.length <= 0) {
            setPatientList(patients.slice(indexOfFirstItem, indexOfLastItem))
        } else {
            setPatientList(filteredItem);
        }
        // console.log(filteredItem)
    };

    return (
        <>
        <div className="container  mx-auto flex flex-col sm:px-6 md:px-8 lg:px-10  xl:px-12  gap-5">
            <div className="w-full flex flex-col items-center gap-3 ">
                <h1 className="text-4xl font-semibold text-[#1A1919] ">Scan Library</h1>
                {/* <p className="text-lg font-normal text-[#606060] max-w-[900px] text-center">
                    Scan history records past scanned documents, showing details like date, categorization, download options, and patient scan comparisons for easy reference and retrieval.
                </p> */}
            </div>
            <div className="flex w-full justify-between">
                <div className="w-[220px]">
                    {/* <Link className={"cursor-pointer w-auto"} to="PatientInformation"> */}
                        {/* <ButtonPrimary  className={"h-10 text-[15px]"}>
                            <img src="fi_plus.svg" alt=""/>
                            Add a New Patient 
                        </ButtonPrimary> */}
                        <Button onClick={() => {navigate('/PatientInformation')}} theme="iris">
                            <img className="mr-1" src="fi_plus.svg" alt=""/>
                            Add New Client                    
                        </Button>
                    {/* </Link> */}

                </div>
                <SearchBox className="h-10" changeHandler={filterPatientsHandler} placeHolder="Search"/>
                <div className="flex gap-8 items-center">
                    <div  className="flex items-center gap-3 cursor-pointer">
                        <img src="filter.svg" alt=""/>
                        Filter
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img src="sort.svg" alt=""/>
                        Sort By Date
                    </div>
                </div>
            </div>
            {patientList.map((patient, i) => {
                const [results,setResults] = useState([])
                return (
                    <>
                        <PatienCard
                            index={i + 1}
                            key={Number(patient.id)}
                            patient={patient}
                            onaccepted={(e) => {setResults(e)}}
                        />
                        <div className="w-full mt-0">
                            {results.map((el) => {
                                return (
                                    <iframe className="h-[350px] w-full rounded-[12px] p-2" style={{boxShadow:'0px 0px 12px 0px #00000026'}} src={"https://iris.ainexus.com/v1/golden_ratios/"+el}></iframe>                           
                                )
                        })}</div>
                    </>
                );
            })}


            <hr className="h-[1px] bg-gray-300 w-full my-5"/>
            {patientList == 0 ? (
                <p className="text-center text-[#606060] font-medium">
                    No records found.{" "}
                    <Link to="/PatientInformation">
            <span className="underline text-[#544BF0]">
                    Scan your first patient now! {" "}
            </span>
                    </Link>
                </p>
            ) : (
                <div className="w-full flex justify-center">
                    <Pageination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            
            {/* {patients != 0 ? (<h1 className={"text-[16px] font-normal"}>Show <span
                    className={"text-[#544BF0]"}>{itemsPerPage}</span> rows per page.</h1>
            ):""} */}
        </div>
                  
        </>
        
    );
};
