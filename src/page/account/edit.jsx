import MenuBox from "../../components/menuBox"
import { Button, TextField } from "symphony-ui"

const Account = () => {
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
                        <div className="flex w-full justify-between items-start">
                            <img className="w-[180px] ml-[88px] h-[180px] rounded-full"  src="./dr-profile.svg" alt="" />
                            <Button theme="iris">
                                <div className="flex justify-between items-center">
                                    <img className="mr-2" src="./icons/save.svg" alt="" />
                                    <div>Save</div>
                                </div>
                            </Button>
                        </div>
                        <div className="w-full mt-6 flex justify-between">
                            <div className=" flex gap-2 justify-start">
                                <Button theme="iris-secondary-small">Upload Image</Button>
                                <Button theme="iris-tertiary-small">Upload Image</Button>
                            </div>
                            <div className="w-auto">At least 800*800 px recommended. JPG or PNG is allowed.</div>
                        </div>


                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>

                        <div>
                            <div className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Personal information:</h1>
                                <Button theme="iris">
                                    <div className="flex justify-between items-center">
                                        <img className="mr-2" src="./icons/save.svg" alt="" />
                                        <div>Save</div>
                                    </div>
                                </Button>                                
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <TextField theme="iris" label="First Name:" placeholder="Your First name" value="" inValid={false} name="FirstName" onBlur={() => {}} onChange={() => {}} type="text" />
                                <TextField theme="iris" label="Last Name:" placeholder="Your Last name" value="" inValid={false} name="LastName" onBlur={() => {}} onChange={() => {}} type="text" />     
                                <TextField theme="iris" label="Role:" placeholder="Your Role" value="" inValid={false} name="Role:" onBlur={() => {}} onChange={() => {}} type="text" />  
                                <TextField theme="iris" label="Occupation:" placeholder="Your Occupation" value="" inValid={false} name="Occupation" onBlur={() => {}} onChange={() => {}} type="text" />  
                            </div>
                        </div>

                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>     

                        <div>
                            <div className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Account information:</h1>
                                <Button theme="iris">
                                    <div className="flex justify-between items-center">
                                        <img className="mr-2" src="./icons/save.svg" alt="" />
                                        <div>Save</div>
                                    </div>
                                </Button>                                
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <TextField theme="iris" label="Username:" placeholder="Your Username" value="" inValid={false} name="Username" onBlur={() => {}} onChange={() => {}} type="text" />
                                <TextField theme="iris" label="Phone Number:" placeholder="Your Phone Number" value="" inValid={false} name="phoneNumber" onBlur={() => {}} onChange={() => {}} type="text" />     
                                <TextField theme="iris" label="E-mail Address:" placeholder="Your E-mail Address" value="" inValid={false} name="Email" onBlur={() => {}} onChange={() => {}} type="text" />  
                            </div>
                        </div>

                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>

                        <div>
                            <div className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Password:</h1>
                                <Button theme="iris">
                                    <div className="flex justify-between items-center">
                                        <img className="mr-2" src="./icons/save.svg" alt="" />
                                        <div>Save</div>
                                    </div>
                                </Button>                                
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <TextField theme="iris" label="Current Password:" placeholder="Current Password" value="" inValid={false} name="CurrentPassword" onBlur={() => {}} onChange={() => {}} type="text" />
                                <div className="invisible"></div>
                                <TextField theme="iris" label="New Password:" placeholder="New Password" value="" inValid={false} name="password" onBlur={() => {}} onChange={() => {}} type="text" />     
                                <TextField theme="iris" label="Repeat New Password:" placeholder="Repeat New Password" value="" inValid={false} name="confirmPassword" onBlur={() => {}} onChange={() => {}} type="text" />  
                            </div>
                        </div>

                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div> 

                        <div>
                            <div className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Address:</h1>
                                <Button theme="iris">
                                    <div className="flex justify-between items-center">
                                        <img className="mr-2" src="./icons/save.svg" alt="" />
                                        <div>Save</div>
                                    </div>
                                </Button>                                
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <TextField theme="iris" label="Country:" placeholder="Your Country" value="" inValid={false} name="Username" onBlur={() => {}} onChange={() => {}} type="text" />
                                <TextField theme="iris" label="City:" placeholder="Your City" value="" inValid={false} name="phoneNumber" onBlur={() => {}} onChange={() => {}} type="text" />     
                                <TextField theme="iris" label="Postal code:" placeholder="Your Postal code" value="" inValid={false} name="Email" onBlur={() => {}} onChange={() => {}} type="text" />
                                <TextField theme="iris" label="Tax Id:" placeholder="Your Tax Id" value="" inValid={false} name="Email" onBlur={() => {}} onChange={() => {}} type="text" />  
                            </div>
                        </div>

                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div> 
                    </div>
                </div>
           
            </div>
        </>
    )
}

export default Account