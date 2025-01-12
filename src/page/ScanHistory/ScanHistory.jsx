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
import { useConstructor ,encryptTextResolver} from "../../help.js";
// import {updateLocalPatientIHistoty} from "../../utility/updateLocalPatientIHistoty.js";
import useModalAutoClose from '../../hooks/useModalAutoClose.js'
import PackageApi from "../../api/package.js";
import {PatientContext} from '../../context/context.jsx';
import Package from "../../model/Package.js";
// import { toast } from "react-toastify";
import CompareSection from "../../components/scanHistoryCompare/CompareSection";
import { publish } from "../../utility/event.js";
export const ScanHistory = () => {
    const [patients,setPatinets] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage,setItemPerPage] = useState('5');
    let indexOfLastItem = currentPage * itemsPerPage;
    let indexOfFirstItem =indexOfLastItem - itemsPerPage;    
    // const {patients2,addPatient} = useContext(PatientContext);
    const [isLoading,setIsLoading] = useState(false)
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
    const [searchQ,setSearchQ] = useState("")
    const filterModalRefrence = useRef(null)
    const filterModalButtonRefrence = useRef(null)
    const sortRefrence = useRef(null)
    const [showFilter,setShowFilter] = useState(false)
    const [showMorePage,setShowMorePage] = useState(false)
    const [showSort,setShowSort] = useState(false) 
    useModalAutoClose({
        refrence:filterModalRefrence,
        buttonRefrence:filterModalButtonRefrence,
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
    // useEffect(() => {
    //     // "{\"msg\":\"no_data\",\"status\":\"fail\"}"
    //     let patinetsAll =  localStorage.getItem("patients")
    //     if(patinetsAll){
    //         // console.log(JSON.parse(patinetsAll))
    //         if(JSON.parse(patinetsAll).status == 'fail'){
    //             localStorage.clear()
    //         }
    //     }
    // })
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            
        }, 500);
    },[])    
    const [patientList, setPatientList] = useState(patients.slice(indexOfFirstItem, indexOfLastItem));
    const updateClientComments = (clientCode, newComments) => {
        setPatinets((prevClients) =>
            prevClients.map((client) =>
                client.client_info.clientCode === clientCode
                ? {
                    ...client,
                    comments: newComments // Update the comments array
                    }
                : client // Return other clients as-is
            )
        );
    };    
    
    const getPatients = () => {
        setIsLoading(true)
        setPatinets([])
        setPatientList([])
        setTimeout(() => {
            Application.getScanList({
                orgCode: JSON.parse(orgs).orgCode,
                orgSCode: JSON.parse(orgs).orgSCode,
                scanTypeStr:imageBy.trim(),
                fromDateStr:"",
                toDateStr:"",
                pageNo:"1",
            }).then((res) => {
                setIsLoading(false)
                // console.log(res.data == 'Internal Server Error')
                if(res.data != 'Internal Server Error'){
                    if(res.data){
                        if(res.data.status == 'fail'){
                            console.log(res.data)
                        }else if(!res.data.detail){
                            if(res.data.length>0){
                                setPatinets([...res.data])
                                setPatientList([...res.data])
                                localStorage.setItem("patients", JSON.stringify(res.data));
        
                            }
        
                        }
                    }
                }
                // toast.dismiss()
            }).catch(() =>{
                setIsLoading(false)
            })        
            
        }, 1000);
    }
    useConstructor(() => {
        if(patients.length > 0){
            if(!patients[0].client_info){
                localStorage.clear()
            }
        }
        getPatients()

        PackageApi.getIrisSub({
            email:encryptTextResolver(getEmail +""),
            // password:getpass
        }).then((res) => {
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
                publish("updatePackage",{})
            }else {
                let newPak = new Package({
                    name:'No available package',
                    cycle:'Yearly',
                    cost:0,
                    useage:0,
                    bundle:0,
                    discount:0,
                    options:[]                           
                })
                Appcontext.package.updatePackage(newPak)
                publish("updatePackage",{})                
            }
        })
    }) 
    

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // setlastItemIndex(page * itemsPerPage)
        // setFirstItemIndex(page * itemsPerPage - itemsPerPage)
    };
    useEffect(() => {
        filterPatientsHandler()
    },[searchQ,patients,isLoading])
     const [totalPages,setTotoalPages] =  useState(Math.ceil(patients.length / itemsPerPage));
     useEffect(() => {
        const searchValue = searchQ.toLowerCase();
        let resolvedPationts = []
        if(imageBy!= 'all'){
            resolvedPationts = patients.filter(el =>{
                if(el.scans){
                    if(el.scans.filter((e) =>e.scanType.includes(imageBy)).length>0){
                        return true
                    }else{
                        return false
                    }

                }
                return false
                
            })
            resolvedPationts =resolvedPationts.map(client => {
                // Filter scans for each client
                const filteredScans = client.scans.filter(scan => 
                    scan.scanType.includes(imageBy)
                );
                // Return updated client with filtered scans
                return {
                    ...client,
                    scans: filteredScans
                };
            });            
        }else {
            resolvedPationts = patients
        }
        if(startDate!= null && endDate!= null){
            resolvedPationts  = resolvedPationts.filter(el =>{
                if(el.scans){
                    if(el.scans.filter((e) =>e.timestamp >= startDate && e.timestamp <= endDate  ).length>0){
                        return true
                    }else{
                        return false
                    }

                }
                return false
                
            })
            resolvedPationts =resolvedPationts.map(client => {
                // Filter scans for each client
                const filteredScans = client.scans.filter(scan => 
                    scan.timestamp >= startDate && scan.timestamp <= endDate
                );
                // Return updated client with filtered scans
                return {
                    ...client,
                    scans: filteredScans
                };
            });
        }      
        if(searchValue.length>=0){
           resolvedPationts= resolvedPationts.filter((el) => {
                        const patientData = [
                            el.client_info.firstName.toLowerCase(),
                            el.client_info.lastName.toLowerCase(),
                            el.client_info.email.toLowerCase(),
                            el.client_info.clientCode.toLowerCase(),
                        ].join(" "); // Combine all searchable fields into one string
                
                        // Check if all search words are present in the patient data
                        return patientData.includes(searchValue)
                        // return searchWords.every(word => patientData.includes(word));
            });        
        }  
        setTotoalPages(Math.ceil(resolvedPationts.length / itemsPerPage))
        // console.log(resolvedPationts) 
        const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
        const indexOfLastItem = Math.min(
            Number(indexOfFirstItem) + Number(itemsPerPage),
            resolvedPationts.length
        );
        // console.log(indexOfFirstItem ,indexOfLastItem )
        setPatientList(resolvedPationts.slice(indexOfFirstItem, indexOfLastItem));
        return () =>{}
    }, [currentPage,itemsPerPage,patients,imageBy,startDate,searchQ,endDate]);

    useEffect(() => {
        if(patientList.length == 0) {
            setCurrentPage(1)
        }
    },[patientList])

    const navigate = useNavigate()
   
    // useEffect(() => {
    //     if(imageBy!= 'all'){
    //         setPatientList(patients.filter(el =>{
    //             if(el.scans){
    //                 if(el.scans.filter((e) =>e.scanType.includes(imageBy)).length>0){
    //                     return true
    //                 }else{
    //                     return false
    //                 }

    //             }
    //             return false
                
    //         }))
    //     }else {
    //         setPatientList(patients.slice(indexOfFirstItem, indexOfLastItem))
    //     }
    // },[imageBy])   

    // useEffect(() => {
    //     if(startDate!= null && endDate!= null){
    //         setPatientList(patients.filter(el =>{
    //             if(el.scans){
    //                 if(el.scans.filter((e) =>e.timestamp >= startDate && e.timestamp < endDate  ).length>0){
    //                     return true
    //                 }else{
    //                     return false
    //                 }

    //             }
    //             return false
                
    //         }))
    //     }else {
    //         setPatientList(patients.slice(indexOfFirstItem, indexOfLastItem))
    //     }
    // },[startDate,endDate])   
    // useEffect(() => {
    //     if(filterType == 'Maximum Scan'){

    //     }
    // })
    
   

    const filterPatientsHandler = () => {
        // const searchValue = searchQ.toLowerCase();
        // // const searchWords = searchValue.split(" "); // Split input into words
        // const filteredItem = patients.filter((el) => {
        //     const patientData = [
        //         el.client_info.firstName.toLowerCase(),
        //         el.client_info.lastName.toLowerCase(),
        //         el.client_info.email.toLowerCase(),
        //         el.client_info.clientCode.toLowerCase(),
        //     ].join(" "); // Combine all searchable fields into one string
    
        //     // Check if all search words are present in the patient data
        //     return patientData.includes(searchValue)
        //     // return searchWords.every(word => patientData.includes(word));
        // });
        
        // if (searchValue.length <= 0) {
        //     setPatientList(patients.slice(indexOfFirstItem, indexOfLastItem));
        // } else {
        //     setPatientList([...filteredItem]);
        // }
    };


    return (
        <>

            <div className="w-full flex justify-center">
                <div className="xl:container w-full  flex flex-col px-2 xl:px-[24px]  gap-5">
                    <div className="w-full flex flex-col items-center gap-3 ">
                        <h1 className="text-[26px] font-semibold text-[#1A1919] ">Scan Library</h1>
                        <p className="text-lg font-normal text-[#606060] max-w-[900px] text-center">
                            Scan Library records past scanned documents, showing details like date, categorization,
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
                            <SearchBox value={searchQ} className="h-8" changeHandler={(e) =>setSearchQ(e.target.value.toLowerCase())} placeHolder="Search"/>
                        </div>
                        <div
                            className="flex select-none xl:w-[280px] justify-end relative z-[20] text-[12px] gap-6 items-center">
                            <div onClick={() => {
                                setShowFilter(!showFilter)
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
                            <div ref={filterModalButtonRefrence} onClick={() => {
                                setShowSort(!showSort)
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
                                           sorts={sorts} setShowFilter={setShowSort} setFilterType={setFilterType}/>
                            }
                        </div>
                    </div>
                    {!isLoading ?
                    <>
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
                                            loadPationts={(clientCode,comments) => {
                                                updateClientComments(clientCode,comments)
                                                // getPatients()
                                                setSearchQ("")
                                            }}
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
                    {patientList == 0 ? 
                    (
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
                    </>
                :
                        <>
          <div className="w-full flex justify-center items-center min-h-[350px]">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-16 h-16 text-stone-200 animate-spin  fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>                        
                        </>
                }





                </div>

            </div>
        </>

    );
};
