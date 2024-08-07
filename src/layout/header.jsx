import {IoMenu} from "react-icons/io5";
import ButtonPrimary from "../components/button/buttonPrimery";
import {AiOutlineUser} from "react-icons/ai";
import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import {createRef, useContext, useRef, useState} from "react";
import useModalAutoClose from "../hooks/useModalAutoClose";
import {useLocalStorage} from "@uidotdev/usehooks";
import {toast} from "react-toastify";
import Auth from "../api/Auth.js";
import LogOut from "../api/Auth.js";
import {selectUserName} from "../store/PatientInformationStore.js";
import {useSelector} from "react-redux";
import { subscribe } from "../utility/event.js";
import { Button } from "symphony-ui";
import {PatientContext} from '../context/context.jsx'
const Header = () => {
    const [token, setToken] = useLocalStorage("token");
    const [showSideBar, setShowSideBar] = useState(false)
    const menuRef = createRef(null)
    const Appcontext = useContext(PatientContext)
    const username = useSelector(selectUserName)
    const [showModal,setSHowModal] = useState(false)
    const [menu,setMenu] = useState('')
    const [showModalBox,setSowModalBox] = useState(false)
    useModalAutoClose({
        refrence: menuRef,
        close: () => {
            setShowSideBar(false)
        }
    })
    const navigate = useNavigate()
    const cleanToken = () => {
        localStorage.clear()
        try {
            Auth.logOut({
                "access_token": token
            }).then((res) => {
                if (res.data.state === 200) {
                    console.log(res.data)
                } else {
                    toast.error(res.data)
                }
            })
        } catch (error) {
            console.log("error")
        }

    };
    const isActiveRoute = (props) => {
        console.log(props)
    }
    subscribe("openModal",() => {
        setSHowModal(true)
        document.getElementById('root').style.overflow = 'hidden'
        document.getElementById('root').style.height = '100vh'
    })
    subscribe("closeModal",() => {
        setSHowModal(false)
        document.getElementById('root').style.overflow = 'visible'
        document.getElementById('root').style.height = 'auto'
    })    
    const userModalRef = useRef(null)
    useModalAutoClose({
        refrence:userModalRef,
        close:() =>{
            setSowModalBox(false)
        }
    })
    return (
        <div className="">
            <div
                className=" sticky top-0 left-0 mb-5 shadow-md h-[10vh] z-50  w-full bg-white flex items-center justify-between px-5">
                <IoMenu onClick={() => {
                    setShowSideBar(true)
                }} className="w-10 h-10 cursor-pointer text-[#544BF0]"/>
                <img className="ml-[300px]" src="/image/login/IRIS.svg" alt="logo"/>
                <div className="flex gap-6 justify-end">
                    {
                        Appcontext.package.getPackage().isExist()?
                            <Button disabled theme="iris-tertiary-large">{Appcontext.package.getPackage().getInformation().useage} Scans Used</Button>
                        :
                            <Button onClick={() => {
                                navigate('/payment')
                            }} theme="iris-large">Top Up Now</Button>
                    }

                    <div onClick={() => {
                        setSowModalBox(!showModalBox)
                    }} className="flex cursor-pointer items-center gap-2">
                        <img className="w-14 h-14 rounded-full object-cover" src={Appcontext.user.information.Personal.photo} alt=""/>
                        <span className="font-medium text-xl text-[#444444]">{Appcontext.user.information.Personal.FirstName} {Appcontext.user.information.Personal.LastName}</span>
                    </div>
                </div>
            </div>

            <Outlet/>
            {showSideBar ?
                <>
                    <div ref={menuRef} className="fixed w-[300px] h-[100vh] bg-white z-[60] top-0 left-0">

                        <div className="px-8 mt-[24px]">
                            <img onClick={() => {
                                setShowSideBar(false)
                            }} className="mb-[64px] cursor-pointer" src="./arrow-left.svg" alt=""/>
                            <div onClick={() => {
                                navigate('/')
                                setShowSideBar(false)
                            }}
                                 className="flex cursor-pointer justify-start items-center mb-5 py-2 border-b border-[#544BF0] text-black">
                                <img className="mr-2 cursor-pointer w-6 h-6" src={'./home-2.svg'} alt=""/>
                                <div className="text-2xl cursor-pointer font-normal ">Home</div>
                            </div>

                            {/* <div className="flex justify-start items-center mb-5 py-2 border-b border-[#544BF0] ">
                                <img className="mr-2 w-6 h-6" src={'./setting-2.svg'} alt="" />
                            <div className="text-2xl">Balance</div>
                            </div> */}

                            {/* <div onClick={() => {
                                // navigate('/PatientInformation')
                                setShowSideBar(false)
                            }} className="flex justify-start items-center mb-5 py-2 border-b border-[#544BF0] ">
                                <img className="mr-2 w-6 h-6" src={'./setting-2.svg'} alt="" />
                            <div className="text-2xl">Setting</div>
                            </div> */}
                            <NavLink to={"/payment"}>
                                <div onClick={() => setShowSideBar(false)}
                                     className={`flex  cursor-pointer justify-start items-center mb-5 py-2 border-b border-[#544BF0] text-black`}>
                                    <img className="mr-2 cursor-pointer w-6 h-6" src={'./balance.png'} alt=""/>
                                    <div className="text-2xl cursor-pointer font-normal">Balance</div>
                                </div>
                            </NavLink>

                            <div
                                className="flex cursor-pointer justify-start items-center mb-5 py-2 border-b border-[#544BF0] ">
                                <img className="mr-2 cursor-pointer w-6 h-6" src={'./info-circle.svg'} alt=""/>
                                <div className="text-2xl cursor-pointer">Help & Support</div>
                            </div>
                            {/* <div
                                className="text-[#544BF0] flex justify-center items-center text-[20px] cursor-pointer text-center mt-[64px]">
                                <img onClick={() => {
                                    cleanToken()
                                    setToken("")
                                    navigate('/login')
                                    setShowSideBar(false)
                                }} className="mr-2" src="./logout.svg" alt=""/>
                                <h1 onClick={() => {
                                    cleanToken()
                                    setToken("")
                                    navigate('/login')
                                    setShowSideBar(false)
                                }}>Logout</h1>
                            </div> */}
                        </div>
                    </div>
                    <div className="w-full h-[300vh] top-0 bg-[#000000CC] absolute z-50"></div>
                </>
                :
                ""
            }
            {showModal &&
                <div className="w-full top-0 absolute left-0 h-screen opacity-60 z-[50] bg-black"></div>             
            }
            {showModalBox?
                <div ref={userModalRef} className="w-[266px] fixed rounded-[8px] py-5 px-6 top-20 right-5 z-50 bg-white h-[243px] " style={{boxShadow:'0px 0px 12px 0px #00000026'}}>
                    <div onClick={() => {
                        // setMenu('profile')
                        setSowModalBox(false)
                        navigate('/account')
                    }}
                        className={`flex cursor-pointer justify-start items-center mb-5 py-3 ${menu == 'profile'?'border-[#544BF0] border-b-2':'border-[#2E2E2E] border-b'}  text-black`}>
                        {/* <img className="mr-2 w-6 h-6" src={'./home-2.svg'} alt=""/> */}
                        <div className={`profile-icon ${menu == 'profile'?' activeIcon':''}`}></div>
                        <div className={`text-[20px] cursor-pointer text-[#2E2E2E] font-normal ${menu == 'profile' ? 'activeText':''}`}>My profile</div>
                    </div>

                    <div onClick={() => {
                        // setMenu('Change Paassword')
                        navigate('changePassword')
                        setSowModalBox(false)
                    }}
                        className={`flex cursor-pointer justify-start items-center mb-5 py-3 ${menu == 'Notifications'?'border-[#544BF0] border-b-2':'border-[#2E2E2E] border-b'}  text-black`}>
                        {/* <img className="mr-2 w-6 h-6" src={'./home-2.svg'} alt=""/> */}
                        <img src="./icons/look.svg" className="mr-2" alt="" />
                        {/* <div className={`notification-icon ${menu == 'Change Paassword'?' activeIcon':''}`}></div> */}
                        <div className={`text-[20px] cursor-pointer font-normal text-[#2E2E2E] ${menu == 'Change Paassword' ? 'activeText':''}`}>Change Password</div>
                    </div>

                    <div
                            className="text-[#2E2E2E]  flex justify-start items-center text-[20px] cursor-pointer text-center mt-[24px]">
                        {/* <img onClick={() => {
                            navigate('/login')
                        }} className="mr-2" src="./logout.svg" alt=""/> */}
                        <div className="logoutIcon"></div>
                        <h1 className="cursor-pointer" onClick={() => {
                            navigate('/login')
                        }}>Logout</h1>
                    </div>                   
                </div>
            :
                undefined
            }
        </div>
    );
};

export default Header;
