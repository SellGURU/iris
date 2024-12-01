/* eslint-disable react/jsx-key */
import {useState, useContext, useEffect, useRef} from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import {SearchBox} from "../../components/searchBox/SearchBox";
import {PatienCard} from "./PatienCard";
import Pageination from "../../components/pagenation/Pagenation";
import {Link, useNavigate} from "react-router-dom";
import SortModal from '../modal/Sort.jsx';
import FilterModal from '../modal/Filter.jsx';
import { Button } from "symphony-ui";
import Application from "../../api/Application.js";
import { Tooltip } from 'react-tooltip'
import { useConstructor } from "../../help.js";
// import {updateLocalPatientIHistoty} from "../../utility/updateLocalPatientIHistoty.js";
import useModalAutoClose from '../../hooks/useModalAutoClose.js'
import PackageApi from "../../api/package.js";
import {PatientContext} from '../../context/context.jsx';
import Package from "../../model/Package.js";
import { toast } from "react-toastify";
import CompareSection from "../../components/scanHistoryCompare/CompareSection";
export const ScanHistory = () => {
    // const {patients2,addPatient} = useContext(PatientContext);
    const closeCamera= () => {
        const videoElement  = document.getElementById("video-cam")
        if(videoElement){
            const stream = videoElement.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => {
                track.stop(); // Stop each track (video/audio)
            });         
            videoElement.srcObject = null; // Clear the video element's source
        }         
    }
    const Appcontext = useContext(PatientContext)
    useEffect(() => {
        closeCamera()
    })
    // addPatient(patient)
    // updateLocalPatientIHistoty(patient);    
    // const patients = JSON.parse(localStorage.getItem("patients")) || [
    //     // {
    //     //     "id": "1429",
    //     //     "sex": "masculine",
    //     //     "errorThreshold": 10,
    //     //     "firstName": "amir",
    //     //     "lastName": "dehghani",
    //     //     "email": "amirdehghaniofficial@yahoo.com",
    //     //     "phone": 123,
    //     //     "comment": [],
    //     //     "result": [
    //     //         {
    //     //             "date": "2024-08-10",
    //     //             "photo": "data:image/jpeg;base64,/9j/
    //     //             "htmlId": 30,
    //     //             "imageMode": "Uploaded image"
    //     //         }                           
    //     //     ]
    //     // },            
    // ];
    const [patients,setPatinets] = useState(JSON.parse(localStorage.getItem("patients"))||[])
    const [orgs,] = useLocalStorage("orgData")
    const [results,setResults] = useState([])
    const [activeResult,setActiveResult] = useState(null)
    const [lastUpdate,setLastUpdate] = useState(0)
    const [filterType,setFilterType] = useState('Any')
    const sorts =[
        "Any","Newest Scan","Oldest Scan","Maximum Scan","Minimum Scan"
    ]
    const [imageBy,setImageBy] = useState('all')
    // console.log(patients)
    // let [partyId] = useLocalStorage("partyid");
    const [startDate,setStartDate] = useState(null)
    const [endDate,setendDate] = useState(null)
    const filterModalRefrence = useRef(null)
    const sortRefrence = useRef(null)
    const [showFilter,setShowFilter] = useState(false)
    const [showMorePage,setShowMorePage] = useState(false)
    const [showSort,setShowSort] = useState(false) 
    useModalAutoClose({
        refrence:filterModalRefrence,
        close:() =>{
            setShowSort(false)
        }
    })
    // useModalAutoClose({
    //     refrence:sortRefrence,
    //     close:() =>{
    //         setShowFilter(false)
    //     }
    // })   
    let [getpass,] = useLocalStorage("password")
     let [getEmail,] = useLocalStorage("email")
    useEffect(() => {
        // "{\"msg\":\"no_data\",\"status\":\"fail\"}"
        let patinetsAll =  localStorage.getItem("patients")
        if(patinetsAll){
            console.log(JSON.parse(patinetsAll))
            if(JSON.parse(patinetsAll).status == 'fail'){
                localStorage.clear()
            }
        }
    })
    const getPatients = () => {
        Application.getScanList({
            orgCode: JSON.parse(orgs).orgCode,
            orgSCode: JSON.parse(orgs).orgSCode,
            scanTypeStr:imageBy.trim(),
            fromDateStr:"",
            toDateStr:"",
            pageNo:"1",
        }).then((res) => {
            // console.log(res.data == 'Internal Server Error')
            if(res.data != 'Internal Server Error'){
                if(res.data){
                    if(res.data.status == 'fail'){
                        console.log(res.data)
                    }else if(!res.data.detail){
                        if(res.data.length>0){
                            setPatinets(res.data)
                            setPatientList(res.data)
                            localStorage.setItem("patients", JSON.stringify(res.data));
    
                        }
    
                    }
                }

            }
            toast.dismiss()
        })        
    }
    useConstructor(() => {
        if(patients.length > 0){
            if(!patients[0].client_info){
                localStorage.clear()
            }
        }
        getPatients()

        PackageApi.getIrisSub({
            email:getEmail,
            password:getpass
        }).then((res) => {
            console.log(res)
            if(res.data?.data?.subs_data?.length> 0){
                let newPak = new Package({
                    name:'No available package',
                    cycle:'Yearly',
                    cost:0,
                    useage:res.data.data.subs_data[0].iscan_used,
                    bundle:res.data.data.subs_data[0].iscan_brought,
                    discount:0,
                    options:[]                           
                })
                Appcontext.package.updatePackage(newPak)
            }
        })
    }) 
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage,setItemPerPage] = useState('5');
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
        return () =>{}
    }, [currentPage]);


    const navigate = useNavigate()
    const [patientList, setPatientList] = useState(patients.slice(indexOfFirstItem, indexOfLastItem));
    useEffect(() => {
        if(imageBy!= 'all'){
            setPatientList(patients.filter(el =>{
                if(el.scans){
                    if(el.scans.filter((e) =>e.scanType.includes(imageBy)).length>0){
                        return true
                    }else{
                        return false
                    }

                }
                return false
                
            }))
        }else {
            setPatientList(patients)
        }
    },[imageBy])   

    useEffect(() => {
        if(startDate!= null && endDate!= null){
            setPatientList(patients.filter(el =>{
                if(el.scans){
                    if(el.scans.filter((e) =>e.timestamp >= startDate && e.timestamp < endDate  ).length>0){
                        return true
                    }else{
                        return false
                    }

                }
                return false
                
            }))
        }else {
            setPatientList(patients)
        }
    },[startDate,endDate])   
    // useEffect(() => {
    //     if(filterType == 'Maximum Scan'){

    //     }
    // })
    
    const totalPages = Math.ceil(patients.length / itemsPerPage);

    const filterPatientsHandler = (e) => {
        // console.log(patientList)
        const filteredItem = patients.filter((el) => {
            return el.client_info.clientCode.includes(e.target.value)
            || el.client_info.lastName.includes(e.target.value)
            || el.client_info.firstName.includes(e.target.value)
            || (el.client_info.firstName +' '+el.client_info.lastName).includes(e.target.value)
            || el.client_info.email.includes(e.target.value)
        });
        // console.log(patientList)
        if (e.target.value.length <= 0) {
            setPatientList(patients.slice(indexOfFirstItem, indexOfLastItem))
        } else {
            setPatientList([...filteredItem]);
        }
        // console.log(filteredItem)
    };

    return (
        <>

            <div className="w-full flex justify-center">
                <div className="xl:container w-full  flex flex-col px-2 xl:px-[24px]  gap-5">
                    <div className="w-full flex flex-col items-center gap-3 ">
                        <h1 className="text-[26px] font-semibold text-[#1A1919] ">Scan Library</h1>
                        <p className="text-lg font-normal text-[#606060] max-w-[900px] text-center">
                            Scan history records past scanned documents, showing details like date, categorization,
                            download options, and patient scan comparisons for easy reference and retrieval.
                        </p>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="md:220px relative z-20 xl:w-[280px]">
                            {/* <Link className={"cursor-pointer w-auto"} to="PatientInformation"> */}
                            {/* <ButtonPrimary  className={"h-10 text-[15px]"}>
                                <img src="fi_plus.svg" alt=""/>
                                Add a New Patient
                            </ButtonPrimary> */}
                            <Button onClick={() => {
                                navigate('/PatientInformation')
                            }} theme="iris-small">
                                <img className="mr-1" src="fi_plus.svg" alt=""/>
                                Add New Client
                            </Button>
                            {/* </Link> */}

                        </div>
                        <div className="absolute z-[10] w-full h-8 left-0 flex justify-center items-center">
                            <SearchBox className="h-8" changeHandler={filterPatientsHandler} placeHolder="Search"/>
                        </div>
                        <div
                            className="flex  xl:w-[280px] justify-end relative z-[20] text-[12px] gap-6 items-center">
                            <div onClick={() => {
                                setShowFilter(true)
                            }} data-tooltip-id="my-tooltip"
                                 data-tooltip-content="Filter your scan history by specific criteria."
                                 className="flex items-center gap-2 cursor-pointer">
                                <img className="w-[14px]" src="filter.svg" alt=""/>
                                Filter by
                            </div>
                            <Tooltip className="max-w-[240px] bg-white" id="my-tooltip"/>
                            {
                                showFilter &&
                                <FilterModal endDate={endDate} startDate={startDate} setEndDate={setendDate} setStartDate={setStartDate} imageBy={imageBy} setImageBy={setImageBy} setShowFilter={setShowFilter}
                                             refrence={sortRefrence}/>
                                // <FilterModal filterType={filterType}  filterModalRefrence={filterModalRefrence} sorts={sorts} setShowFilter={setShowFilter} setFilterType={setFilterType} />
                            }
                            <div onClick={() => {
                                setShowSort(true)
                                setShowFilter(false)
                            }} data-tooltip-id="my-tooltip"
                                 data-tooltip-content="Sort your scan history by date, from newest to oldest or vice versa, or by the number of scans, from most to least or vice vesra."
                                 className="flex text-[12px]   items-center gap-2 cursor-pointer">
                                <img className="w-[14px]" src="sort.svg" alt=""/>
                                Sort by
                            </div>
                            {
                                showSort &&
                                <SortModal filterType={filterType} filterModalRefrence={filterModalRefrence}
                                           sorts={sorts} setShowFilter={setShowFilter} setFilterType={setFilterType}/>
                            }
                        </div>
                    </div>
                    {patientList?.sort((a, b) => {
                        if (filterType == 'Maximum Scan') {
                            if (a.scans.length >= b.scans.length) {
                                return -1
                            } else {
                                return 1
                            }
                        }
                        if (filterType == 'Minimum Scan') {
                            if (a.scans.length >= b.scans.length) {
                                return 1
                            } else {
                                return -1
                            }
                        }
                        if (filterType == 'Oldest Scan') {
                            let ADate = a.scans.map(e => e.timestamp)
                            let BDate = b.scans.map(e => e.timestamp)
                            var maxDate1 = Math.min.apply(null, ADate);
                            var maxDate2 = Math.min.apply(null, BDate);

                            if (maxDate1 > maxDate2) {
                                return 1
                            } else {
                                return -1
                            }
                        }
                        if (filterType == 'Newest Scan') {
                            let ADate = a.scans.map(e => e.timestamp)
                            let BDate = b.scans.map(e => e.timestamp)

                            let maxDate1 = Math.max.apply(null, ADate);
                            let maxDate2 = Math.max.apply(null, BDate);
                            if (maxDate1 < maxDate2) {
                                return 1
                            } else {
                                return -1
                            }

                        }
                    }).map((patient, i) => {

                        return (
                            <>
                                <PatienCard
                                    index={i + 1}
                                    key={Number(patient.client_info.clientCode)}
                                    patient={patient}
                                    activeResult={activeResult}
                                    result={results}
                                    onaccepted={(e) => {
                                        setResults(e)
                                        console.log(e)
                                        setLastUpdate(
                                            Math.max(...patient.scans.map((e =>e.timestamp)))
                                        )
                                        setActiveResult(patient.client_info.clientCode)
                                    }}
                                />
                                {activeResult == patient.client_info.clientCode && results.length ==2 &&
                                    <div>
                                        <CompareSection clientId={activeResult} lastScan={lastUpdate} results={results}></CompareSection>
                                    </div>
                                    // <div className="w-full mt-0">
                                    //     {results.map((el) => {
                                    //         return (
                                    //             <iframe className="h-[350px] w-full rounded-[12px] p-2"
                                    //                     style={{boxShadow: '0px 0px 12px 0px #00000026'}}
                                    //                     src={`/#/showReportScan/?scanId=${el}&clientId=${patient.client_info.clientCode}`}></iframe>
                                    //         )
                                    //     })}</div>
                                }
                            </>
                        );
                    })}


                    <hr className="h-[1px] bg-gray-300 w-full my-5"/>
                    {patientList == 0 ? (
                        <p className="text-center text-[12px] text-[#606060] font-medium">
                            No records found.{" "}
                            {patients.length == 0 &&
                                <Link to="/PatientInformation">
                                    <span className="underline text-[#544BF0]">
                                            Scan your first client now! {" "}
                                    </span>
                                </Link>
                            }
                        </p>
                    ) : (
                        <div className="w-full flex justify-between">
                            {patients != 0 ? (<h1 onClick={() => {
                                    setShowMorePage(!showMorePage)
                                    // alert("clicked")
                                }}
                                                  className={"text-[16px] w-[180px] cursor-pointer text-[#7E7E7E] relative z-20   font-normal"}>Show <span
                                    className={"text-[#544BF0]"}>{itemsPerPage}</span> rows per page.
                                    {showMorePage ?
                                        <div
                                            className="absolute py-4 rounded-[8px] top-[-150px] left-3 bg-white w-[73px]"
                                            style={{
                                                boxShadow: '0px 0px 12px #00000026'
                                            }}>
                                            <div onClick={() => {
                                                setItemPerPage('5')
                                            }}
                                                 className="flex cursor-pointer justify-center  text-[#2E2E2E] items-center ">5
                                            </div>
                                            <div onClick={() => {
                                                setItemPerPage('10')
                                            }}
                                                 className="flex cursor-pointer justify-center mt-4 text-[#2E2E2E] items-center ">10
                                            </div>
                                            <div onClick={() => {
                                                setItemPerPage('15')
                                            }}
                                                 className="flex cursor-pointer justify-center mt-4 text-[#2E2E2E] items-center ">15
                                            </div>
                                            {/* <div onClick={() => {
                                    setItemPerPage()
                                }} className="flex cursor-pointer justify-center mt-4 text-[#2E2E2E] items-center ">All</div>                                                                                                       */}
                                        </div>
                                        : undefined
                                    }
                                </h1>
                            ) : ""}
                            <Pageination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                            <div className="w-[180px]"></div>
                        </div>
                    )}


                </div>

            </div>
        </>

    );
};
