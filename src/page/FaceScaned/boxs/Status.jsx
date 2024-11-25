/* eslint-disable react/prop-types */
const Status =({status,isFull}) => {
    const resolvePosition =() => {
       if(status == 'No Action Requred'){
        return 'right-8'
       }
        if(status == 'Normal'){
        return 'right-24'
       }
       return 'left-12'
    }
    return (
        <>
                <div className="flex relative flex-col items-start justify-start gap-2 w-[45%]" style={{width:isFull?'100%':'45%'}}>

                    <div className="w-full  h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                        <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                        <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                        <div className="w-1/3 h-full bg-primary-color"></div>
                    </div>
                    <div className={`absolute flex items-end gap-1 top-[-24px] ${resolvePosition()} `}>

                        {status == 'Action Needed' ?
                        <>
                            <img className="" src="./icons/statusBarFlip.svg" alt="" />
                            <div className="text-[10px] font-light self-center">
                                {status}
                            </div>                           
                        </>
                        :
                        <>
                            <div className="text-[10px] font-light self-center">
                                {status}
                            </div>                        
                            <img src="./icons/StatusBar.svg" alt="" />
                        </>
                        }
                    </div>
                </div>        
        </>
    )
}

export default Status