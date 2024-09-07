import { useContext, useState } from "react"
import { PatientContext } from "../../context/context"
import Select from "../../components/select";
import { Button } from "symphony-ui"
import StaffActionModal from "../../page/modal/StaffAction.jsx";
import { publish } from "../../utility/event.js";

const Staffs = ({onRemove,onChangeRole}) => {
    const appcontext = useContext(PatientContext)
    const [stafs,setStafs] = useState([
        {
            fullName:"Sample name 2",
            email:"Samplemail2@gmail.com",
            id:"1",
            role:'Admin',
        },
        {
            fullName:"Sample name 3",
            email:"Samplemail3@gmail.com",
            id:"2",
            role:'User',
        },
        {
            fullName:"Sample name 4",
            email:"Samplemail4@gmail.com",
            id:"3",
            role:'User',
        }                
    ])    
    const [changeRolewithID,setChangeRoleWithId]= useState(null)
    const handleRoleChange = (userId, newRole) => {
        // Update the user role in state
        const updatedUsers = stafs.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
        );
        setStafs(updatedUsers);
    };     
    const [changeRoleTO,setChangeRoleTO] = useState('Admin')
    return (
        <>
            <div className="mt-10">
            <div  className="bg-white rounded-[8px] p-4 flex justify-between items-center shadow-card w-full">
                <div className="flex justify-start w-[230px] items-center">
                    <img src={appcontext.user.information.Personal.photo} alt="" />
                    <div className="ml-4">
                        <div className="text-[20px] flex justify-start items-center font-medium text-[#2E2E2E]">
                            {appcontext.user.information.Personal.FirstName + " "+ appcontext.user.information.Personal.LastName}
                            <span className="bg-[#48BB784D] text-[10px] flex justify-center items-center rounded-[4px] ml-1 w-[30px] h-[22px] text-[#48BB78]">
                                <div>You</div>
                            </span>
                        </div>
                        <div className="text-[#444444] text-[20px]">
                            {appcontext.user.information.Account.EmailAddress}
                        </div>
                    </div>
                </div>
                <div>
                    <Select disabled onchange={() => {
                        // AccountFormik.setFieldValue("PracticeName",value)
                    }} placeHolder={''} value={'Admin'} options={['Admin','User']}></Select>
                    {/* <div className="text-[14px] text-[#7E7E7E]">Admin</div> */}
                </div>
                <div className="invisible">
                    <Button theme="iris">
                        <img className="mr-1" src="./icons/user-minus.svg" alt="" />
                        Remove                                
                    </Button>
                </div>
            </div>
            {stafs.map((el) => {
                return (
                    <>
                        <div  className="bg-white mt-4 rounded-[8px] p-4 flex justify-between items-center shadow-card w-full">
                            <div className="flex justify-start w-[230px] items-center">
                                <img className="rounded-full w-[56px] h-[56px]" src={`https://ui-avatars.com/api/?name=${el.fullName}`} alt="" />
                                <div className="ml-4">
                                    <div className="text-[20px] flex justify-start items-center font-medium text-[#2E2E2E]">
                                        {el.fullName}
                                    </div>
                                    <div className="text-[#444444] text-[20px]">
                                        {el.email}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Select noteditAble onchange={(value) => {
                                    // onChangeRole()
                                    publish("openModal")
                                    setChangeRoleTO(value)
                                    setChangeRoleWithId(el.id)
                                    // handleRoleChange(el.id,value)
                                }} placeHolder={''} value={el.role} options={['Admin','User']}></Select>
                                {/* <div className="text-[14px] text-[#7E7E7E]">Admin</div> */}
                            </div>
                            <div className="">
                                <Button onClick={() => {
                                    onRemove(el.id)
                                }} theme="iris">
                                    <img className="mr-1" src="./icons/user-minus.svg" alt="" />
                                    Remove
                                    </Button>
                            </div>
                        </div>      
                        {changeRolewithID == el.id ?
                            <div className="w-full top-0 fixed z-[60] left-0 flex justify-center items-center h-full">
                                <StaffActionModal role={changeRoleTO} changeEmail={el.email} type={"changeRole"} onClose={() => {
                                    setChangeRoleWithId(null)
                                    publish("closeModal")
                                }} onSubmit={() => {
                                    handleRoleChange(el.id,changeRoleTO)
                                    setChangeRoleWithId(null)
                                    publish("closeModal")                         
                                }} title={'Invite member'}></StaffActionModal>
                            </div> 
                            :undefined                                                  
                        }
                    </>
                )
            })}
            </div>        
        </>
    )
}
export default Staffs