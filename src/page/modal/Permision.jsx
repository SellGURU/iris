/* eslint-disable react/prop-types */
import { Button } from "symphony-ui"

const Permision = ({onAllow,onDeny}) => {
    return (
        <>
            <div className="bg-white p-[56px] rounded-[8px] w-[496px] h-[300px]" style={{boxShadow:'0px 0px 12px 0px #00000026'}}>
                <div className="text-[#2E2E2E] text-[28px] font-medium text-center">Camera Permission</div>
                <div className="text-[14px] text-[#444444] text-center mt-6 " style={{lineHeight:'21px'}}>This application requires access to your camera to proceed. Please grant camera access to continue.</div>
                <div className="w-full flex mt-8 gap-2 justify-center items-center">
                    <Button onClick={() => {
                        onDeny()
                    }} theme="iris-secondary">Deny</Button>
                    <Button onClick={() => {
                        navigator.permissions.query({name: 'camera'})
                        .then((permissionObj) => {
                             onAllow()
                        })
                        .catch((error) => {
                            console.log('Got error :', error);
                        })                        
                    }} theme="iris">Allow</Button>
                </div>
            </div>            
        </>
    )
}

export default Permision