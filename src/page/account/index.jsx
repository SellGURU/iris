import { useNavigate } from "react-router-dom"
import MenuBox from "../../components/menuBox"
import { Button, TextField } from "symphony-ui"

const AccountInfo = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className={"flex gap-5 items-center justify-center px-16  flex-col"}>
                 <h1 className={"text-3xl font-medium"}>My Account</h1>
                 <div className="text-[#606060] text-[18px] max-w-[860px] text-center">Welcome to your account page! Here, you can access and edit your user information. Keep your details up-to-date to ensure the best experience with our services.</div>

                <div className="w-full flex gap-6 justify-between">
                    {/* <div className="max-w-[330px] w-[330px]">
                        <MenuBox></MenuBox>

                    </div> */}
                    <div className="w-full">
                        <div className="flex w-full justify-start items-center gap-4">
                            <img className="w-[180px] ml-[88px] h-[180px] rounded-full"  src="./dr-profile.svg" alt="" />
                            <div>
                                <div className="text-[24px] font-bold mb-4">Sahar Rajabi</div>
                                <div className="text-[#444444]">Dermatologist</div>
                                <div className="text-[#444444]">Tehran, Iran</div>
                            </div>
                            {/* <Button theme="iris">
                                <div className="flex justify-between items-center">
                                    <img className="mr-2" src="./icons/save.svg" alt="" />
                                    <div>Save</div>
                                </div>
                            </Button> */}
                        </div>
                        {/* <div className="w-full mt-6 flex justify-between">
                            <div className=" flex gap-2 justify-start">
                                <Button theme="iris-secondary-small">Upload Image</Button>
                                <Button theme="iris-tertiary-small">Upload Image</Button>
                            </div>
                            <div className="w-auto">At least 800*800 px recommended. JPG or PNG is allowed.</div>
                        </div> */}


                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>

                        <div>
                            <div className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Personal information:</h1>
                                <Button onClick={() => navigate('/edit')} theme="iris-tertiary-small">
                                    <div className="flex cursor-pointer justify-between items-center">
                                        <img className="mr-2" src="./icons/Icon-left.svg" alt="" />
                                        <div>Edit</div>
                                    </div>
                                </Button>                                
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <div>
                                    <div className="text-[20px] font-medium text-[#2E2E2E]">First Name:</div>
                                    <div className="text-[20px]  mt-1 text-[#2E2E2E]">Sahar Rajabi</div>
                                </div>

                                <div>
                                    <div className="text-[20px] font-medium text-[#2E2E2E]">Last Name:</div>
                                    <div className="text-[20px]  mt-1 text-[#2E2E2E]">Sahar Rajabi</div>
                                </div>

                                <div>
                                    <div className="text-[20px] font-medium text-[#2E2E2E]">Role:</div>
                                    <div className="text-[20px]  mt-1 text-[#2E2E2E]">User / Admin</div>
                                </div>

                                <div>
                                    <div className="text-[20px] font-medium text-[#2E2E2E]">Occupation:</div>
                                    <div className="text-[20px]  mt-1 text-[#2E2E2E]">Dermatologist</div>
                                </div>                                
                            </div>
                        </div>

                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>     

                        <div>
                            <div className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Login Information:</h1>
                                <Button onClick={() => navigate('/edit')} theme="iris-tertiary-small">
                                    <div className="flex cursor-pointer justify-between items-center">
                                        <img className="mr-2" src="./icons/Icon-left.svg" alt="" />
                                        <div>Edit</div>
                                    </div>
                                </Button>                               
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <div>
                                    <div className="text-[20px] font-medium text-[#2E2E2E]">E-mail Address:</div>
                                    <div className="text-[20px]  mt-1 text-[#2E2E2E]">sahar.rajabi@gmail.com</div>
                                </div>

                                <div>
                                    <div className="text-[20px] font-medium text-[#2E2E2E]">Phone:</div>
                                    <div className="text-[20px]  mt-1 text-[#2E2E2E]">0919-11223344</div>
                                </div>

                            </div>
                        </div>

                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>

                        <div>
                            <div className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Password:</h1>
                                <Button onClick={() => navigate('/edit')} theme="iris-tertiary-small">
                                    <div className="flex cursor-pointer justify-between items-center">
                                        <img className="mr-2" src="./icons/Icon-left.svg" alt="" />
                                        <div>Edit</div>
                                    </div>
                                </Button>                              
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <div>
                                    <div className="text-[20px] font-medium text-[#2E2E2E]">Password:</div>
                                    <div className="text-[20px]  mt-1 text-[#2E2E2E]">********</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div> 

                        <div>
                            <div className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Address:</h1>
                                 <Button onClick={() => navigate('/edit')} theme="iris-tertiary-small">
                                    <div className="flex cursor-pointer justify-between items-center">
                                        <img className="mr-2" src="./icons/Icon-left.svg" alt="" />
                                        <div>Edit</div>
                                    </div>
                                </Button>                            
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <div>
                                    <div className="text-[20px] font-medium text-[#2E2E2E]">Country:</div>
                                    <div className="text-[20px]  mt-1 text-[#2E2E2E]">Iran</div>
                                </div>
                                <div>
                                    <div className="text-[20px] font-medium text-[#2E2E2E]">City:</div>
                                    <div className="text-[20px]  mt-1 text-[#2E2E2E]">Tehran</div>
                                </div>
                                <div>
                                    <div className="text-[20px] font-medium text-[#2E2E2E]">Postal Code:</div>
                                    <div className="text-[20px]  mt-1 text-[#2E2E2E]">1122334455</div>
                                </div>
                                <div>
                                    <div className="text-[20px] font-medium text-[#2E2E2E]">Tax ID:</div>
                                    <div className="text-[20px]  mt-1 text-[#2E2E2E]">AS123456789</div>
                                </div>                                                                                                
                            </div>
                        </div>

                        {/* <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>  */}
                    </div>
                </div>
           
            </div>
        </>
    )
}

export default AccountInfo