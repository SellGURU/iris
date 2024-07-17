import {useState, useContext, useEffect} from "react";
import ButtonPrimary from "../../components/button/buttonPrimery";
import {SearchBox} from "../../components/searchBox/SearchBox";
import {PatienCard} from "./PatienCard";
import Pageination from "../../components/pagenation/Pagenation";
import {Link} from "react-router-dom";
import {PatientContext} from "../../context/context.jsx";
export const ScanHistory = () => {
    const {patients2} = useContext(PatientContext);
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    console.log(patients)
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
        <div className="container  mx-auto flex flex-col sm:px-6 md:px-8 lg:px-10  xl:px-12  gap-5">
            <div className="w-full flex flex-col items-center gap-3 ">
                <h1 className="text-4xl font-semibold text-[#1A1919] ">Scan History</h1>
                <p className="text-lg font-normal text-[#606060] max-w-xl text-center">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been t
                </p>
            </div>
            <div className="flex w-full justify-between">
                <Link className={"cursor-pointer"} to="PatientInformation">
                    <ButtonPrimary  className={"h-10 text-[15px]"}>
                        <img src="fi_plus.svg" alt=""/>
                        Add a New Patient 
                    </ButtonPrimary>
                </Link>
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
                return (
                    <PatienCard
                        index={i + 1}
                        key={Number(patient.id)}
                        patient={patient}
                    />
                );
            })}


            <hr className="h-[1px] bg-gray-300 w-full my-5"/>
            {patients == 0 ? (
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
            {patients != 0 ? (<h1 className={"text-[16px] font-normal"}>Show <span
                    className={"text-[#544BF0]"}>{itemsPerPage}</span> rows per page.</h1>
            ):""}
        </div>
    );
};
