/* eslint-disable react/prop-types */
const Status =({status,isFull,percent}) => {
    const resolvePosition =() => {
       if(status == 'No Action Needed'){
        return 'right-8'
       }
        if(status == 'Normal'){
        return 'right-24'
       }
       return 'left-12'
    }
    function normalizeTo100(x) {
        if (x >= 0 && x <= 90) {
            // Red (Low)
            return (x * 50) / 90;
        } else if (x > 90 && x <= 110) {
            // Green
            return 50 + ((x - 90) * 25) / 20;
        } else if (x > 110 && x <= 150) {
            // Red (High)
            return 75 + ((x - 110) * 25) / 40;
        } else {
            // Out of range
            return 0;
        }
    }
    return (
        <>
                <div className="flex relative flex-col items-start justify-start gap-2 w-[45%]" style={{width:isFull?'100%':'45%'}}>

                    <div className="w-full relative overflow-visible h-3 rounded-[21px] flex flex-row items-center self-center" style={{borderRadius:'21px'}}>
                        <div className=" h-full rounded-l-md bg-[#FF3E5D]" style={{backgroundColor:'#FF3E5D',borderLeftRadius:'21px',width:normalizeTo100(90)+'%'}}></div>
                        {/* <div className="w-1/3 h-full bg-[#03DAC5]" style={{backgroundColor:'#03DAC5'}}></div> */}
                        <div className="w-1/2 h-full bg-[#03DAC5]" style={{backgroundColor:'#03DAC5',width:normalizeTo100(110) -normalizeTo100(90) +'%'}}></div>
                        <div className="w-1/2 h-full rounded-r-md bg-[#03DAC5]" style={{backgroundColor:'#FF3E5D',borderRightRadius:'21px',width:normalizeTo100(150) -normalizeTo100(110) +'%'}}></div>
                        <div className="absolute text-[10px]" style={{left:normalizeTo100(percent)-2+"%",top:'-24px'}}>
                            {percent}
                        </div>
                        <div className="w-4 h-4 absolute bottom-[-2px] flex justify-center items-center left-[-6px] border border-black rounded-full" style={{left:normalizeTo100(percent)-2+"%"}}>
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                        </div>  
                        <div className="absolute h-[1px] bg-gray-800 " style={{width:normalizeTo100(percent)-2+"%",height:'1px'}}></div>
                    </div>
                    {/* <div className={`absolute flex gap-1 top-[-24px] ${resolvePosition()} `} style={{top:'-18px'}}>

                        {status == 'Action Needed' ?
                        <>
                            <img className="" src="./image/statusBarFlip.svg" alt="" />
                            <div className=" text-[8px] xl:text-[10px] mt-[-14px] font-light self-center text-nowrap" style={{marginTop:'-14px'}}>
                                {status}
                            </div>        
                            <div className="w-4 h-4 absolute bottom-[-16px] flex justify-center items-center left-[-6px] border border-black rounded-full" style={{bottom:'-16px',left:'-6px'}}>
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                            </div>                                               
                        </>
                        :
                        <>
                            <div className="text-[8px] xl:text-[10px] mt-[-14px] font-light self-center text-nowrap"  style={{marginTop:'-14px'}}>
                                {status}
                            </div>     
                  
                            <img src="./image/StatusBar.svg" alt="" />
                            <div className="w-4 h-4 absolute bottom-[-16px] flex justify-center items-center right-[-6px] border border-black rounded-full" style={{bottom:'-16px',right:'-6px'}}>
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                            </div>
                        </>
                        }
                    </div> */}
                </div>        
        </>
    )
}

export default Status