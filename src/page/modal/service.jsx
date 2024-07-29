import { Button } from "symphony-ui"

const Servise = ({backAction,renewAction,mode}) => {

    return (
        <>
            <div className="max-w-[796px] overflow-hidden relative w-full rounded-[8px] bg-white h-[472px]">
                <img className="absolute bottom-0 " src="./image/Rectangle.svg" alt="" />
                <div className="flex justify-center mt-[70px]">
                    <img className="w-[120px]" src="./image/login/IRIS.svg" alt="" />
                </div>
                <div className="text-primary-color flex justify-center mt-6 text-[24px]">Thank you for using our services.</div>

                <div className="flex mt-6 justify-center">
                    <div className="w-[384px] text-center text-[14px]">
                        {mode == 'empty' && <span>{`You haven't purchased any packages and currently don't have an active package. To use the face scanner service, please make your first purchase. Click the 'Buy Subscription' button to view available packages`}</span>}
                        {mode == 'expiredTime' && <div> We regret to inform you that your bundle has Expired.To continue enjoying our services, please <span className="text-primary-color">extend</span> your package.</div>}          
                        {mode == 'ziroBundle' && <div> We regret to inform you that your bundle has Expired.To continue enjoying our services, please <span className="text-primary-color">extend</span> your package.</div>}
                    </div>
                </div>
                <div className="flex mt-6 relative z-20  justify-center">
                    <div className="w-[384px] text-center text-[14px]">
                        If you have any questions or need further information, feel free to reach out to us at <span className="text-primary-color">HELLO@IRISAESTHETICS.AI</span> 
                    </div>
                </div>   

                <div className="flex mt-6 relative z-20 gap-2 justify-center w-full">
                    <Button onClick={backAction} theme="iris-secondary">
                        <img className="w-5 mr-1" src="./arrow-left.svg" alt="" />
                        Back
                    </Button>
                    <Button onClick={renewAction} theme="iris">
                       {mode == 'empty'? 
                       'Buy Subscription'
                       :
                       'Renew Subscription'
                       }
                        </Button>
                </div>  

                           
            </div>
        </>
    )
}

export default Servise