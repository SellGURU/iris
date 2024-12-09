/* eslint-disable react/prop-types */
const Status =({status,isFull}) => {
    const resolvePosition =() => {
       if(status == 'No Action Required'){
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

                    <div className="w-full  h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden" style={{borderRadius:'21px'}}>
                        <div className="w-1/2 h-full bg-[#FF3E5D]" style={{backgroundColor:'#FF3E5D'}}></div>
                        {/* <div className="w-1/3 h-full bg-[#03DAC5]" style={{backgroundColor:'#03DAC5'}}></div> */}
                        <div className="w-1/2 h-full bg-primary-color" style={{backgroundColor:'#544BF0'}}></div>
                    </div>
                    <div className={`absolute flex gap-1 top-[-24px] ${resolvePosition()} `} style={{top:'-18px'}}>

                        {status == 'Action Needed' ?
                        <>
                            <img className="" src="./icons/statusBarFlip.svg" alt="" />
                            <div className="text-[10px] mt-[-14px] font-light self-center" style={{marginTop:'-14px'}}>
                                {status}
                            </div>        
                            <div className="w-4 h-4 absolute bottom-[-16px] flex justify-center items-center left-[-6px] border border-black rounded-full" style={{bottom:'-16px',left:'-6px'}}>
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                            </div>                                               
                        </>
                        :
                        <>
                            <div className="text-[10px] mt-[-14px] font-light self-center"  style={{marginTop:'-14px'}}>
                                {status}
                            </div>     
                  
                            <img src="./icons/StatusBar.svg" alt="" />
                            <div className="w-4 h-4 absolute bottom-[-16px] flex justify-center items-center right-[-6px] border border-black rounded-full" style={{bottom:'-16px',right:'-6px'}}>
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                            </div>
                        </>
                        }
                    </div>
                </div>        
        </>
    )
}

export default Status