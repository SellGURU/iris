import {IoMenu} from "react-icons/io5";
import ButtonPrimary from "../components/button/buttonPrimery";
import {AiOutlineUser} from "react-icons/ai";
import {Outlet, useNavigate} from "react-router-dom";
import { createRef, useState } from "react";
import useModalAutoClose from "../hooks/useModalAutoClose";
import {useLocalStorage} from "@uidotdev/usehooks";
import {toast} from "react-toastify";
import Auth from "../api/Auth.js";
import LogOut from "../api/Auth.js";
import {selectUserName} from "../store/PatientInformationStore.js";
import {useSelector} from "react-redux";

const Header = () => {
    const [token, setToken] = useLocalStorage("token");
    const [showSideBar,setShowSideBar] =useState(false)
    const menuRef = createRef(null)
    const username = useSelector(selectUserName)
    console.log(username)
    useModalAutoClose({
        refrence:menuRef,
        close:() => {
            setShowSideBar(false)
        }
    })
    const navigate = useNavigate()
    const cleanToken=()=>{
        localStorage.clear()
        try {
            Auth.logOut({
                "access_token": token
            }).then((res) => {
                if (res.data.state===200) {
                    console.log(res.data)
                }else {
                    toast.error(res.data)
                }
            })
        } catch (error) {
            console.log("error")
        }

    };

    return (
        <div>
            <div
                className=" sticky top-0 left-0 mb-5 shadow-md h-[10vh] z-50  w-full bg-white flex items-center justify-between px-5">
                <IoMenu onClick={() => {
                    setShowSideBar(true)
                }} className="w-10 h-10 cursor-pointer text-[#544BF0]"/>
                <img className="ml-[120px]" src="/image/login/IRIS.svg" alt="logo"/>
                <div className="flex items-center gap-2">
                    <img src="dr-profile.svg" alt="" />
                    <span className="font-medium text-xl text-[#444444]">DR.Full Name</span>
                </div>
            </div>

            <Outlet/>
            {showSideBar?
                <>
                    <div ref={menuRef} className="fixed w-[300px] h-[100vh] bg-white z-[60] top-0 left-0">
                        
                        <div className="px-8 mt-[24px]">
                            <img onClick={() => {setShowSideBar(false)}} className="mb-[64px] cursor-pointer" src="./arrow-left.svg" alt="" />
                            <div onClick={() => {
                                navigate('/')
                                setShowSideBar(false)
                            }} className="flex justify-start items-center mb-5 py-2 border-b border-[#544BF0] ">
                                <img className="mr-2 w-6 h-6" src={'./home-2.svg'} alt="" />
                            <div className="text-2xl">Home</div>
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

                            <div className="flex justify-start items-center mb-5 py-2 border-b border-[#544BF0] ">
                                <img className="mr-2 w-6 h-6" src={'./info-circle.svg'} alt="" />
                            <div className="text-2xl">Help & Support</div>
                            </div>     
                            <div onClick={() => {
                                cleanToken()
                                setToken("")
                                navigate('/login')
                                setShowSideBar(false)
                            }} className="text-[#544BF0] flex justify-center items-center text-[20px] cursor-pointer text-center mt-[64px]">
                                <img className="mr-2" src="./logout.svg" alt="" />
                                Logout</div>                                                       
                        </div>
                    </div>
                    <div className="w-full h-[300vh] top-0 bg-[#000000CC] absolute z-50"></div>            
                </>
            :
            undefined
            }
        </div>
    );
};

export default Header;
