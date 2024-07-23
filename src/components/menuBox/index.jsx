import { useState } from "react";
import {useNavigate,NavLink} from "react-router-dom";
const MenuBox = () => {
    const navigate = useNavigate()
    const [menu,setMenu] = useState('profile')
    return (
        <>
            <div className="w-full p-8 rounded-[8px] bg-[white]" style={{
                boxShadow:' 0px 0px 12px 0px #00000026'
            }}>
                <div>
                    <img className="w-10 h-10" src="./arrow-left.svg" alt="" />
                        <div className=" mt-[24px]">

                            <div onClick={() => {
                                setMenu('profile')
                            }}
                                 className={`flex cursor-pointer justify-start items-center mb-5 py-3 ${menu == 'profile'?'border-[#544BF0] border-b-2':'border-[#2E2E2E] border-b'}  text-black`}>
                                {/* <img className="mr-2 w-6 h-6" src={'./home-2.svg'} alt=""/> */}
                                <div className={`profile-icon ${menu == 'profile'?' activeIcon':''}`}></div>
                                <div className={`text-2xl text-[#2E2E2E] font-normal ${menu == 'profile' ? 'activeText':''}`}>My profile</div>
                            </div>

                            <div onClick={() => {
                                setMenu('Notifications')
                            }}
                                 className={`flex cursor-pointer justify-start items-center mb-5 py-3 ${menu == 'Notifications'?'border-[#544BF0] border-b-2':'border-[#2E2E2E] border-b'}  text-black`}>
                                {/* <img className="mr-2 w-6 h-6" src={'./home-2.svg'} alt=""/> */}
                                <div className={`notification-icon ${menu == 'Notifications'?' activeIcon':''}`}></div>
                                <div className={`text-2xl font-normal text-[#2E2E2E] ${menu == 'Notifications' ? 'activeText':''}`}>Notifications</div>
                            </div>

                            <div onClick={() => {
                                setMenu('Billing')
                            }}
                                 className={`flex cursor-pointer justify-start items-center mb-5 py-3 ${menu == 'Billing'?'border-[#544BF0] border-b-2':'border-[#2E2E2E] border-b'}  text-black`}>
                                {/* <img className="mr-2 w-6 h-6" src={'./home-2.svg'} alt=""/> */}
                                <div className={`Bill-icon ${menu == 'Billing'?' activeIcon':''}`}></div>
                                <div className={`text-2xl text-[#2E2E2E] font-normal ${menu == 'Billing' ? 'activeText':''}`}>Billing</div>
                            </div>

                            <div onClick={() => {
                                setMenu('Delete account')
                            }}
                                 className={`flex cursor-pointer justify-start items-center mb-5 py-3 ${menu == 'Delete account'?'border-[#544BF0] border-b-2':'border-[#2E2E2E] border-b'}  text-black`}>
                                {/* <img className="mr-2 w-6 h-6" src={'./home-2.svg'} alt=""/> */}
                                <div className={`trash-icon  ${menu == 'Delete account'?' activeIcon':''}`}></div>
                                <div className={`text-2xl text-[#2E2E2E] font-normal ${menu == 'Delete account' ? 'activeText':''}`}>Delete account</div>
                            </div>

                            <div
                                className="text-[#544BF0] flex justify-center items-center text-[20px] cursor-pointer text-center mt-[64px]">
                                <img onClick={() => {
                                    navigate('/login')
                                }} className="mr-2" src="./logout.svg" alt=""/>
                                <h1 onClick={() => {
                                    navigate('/login')
                                }}>Logout</h1>
                            </div>
                        </div>                    
                </div>
            </div>
        </>
    )
}

export default MenuBox