import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from 'symphony-ui';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

const FilterModal =({refrence,setShowFilter,setImageBy,imageBy}) => {
    const [filterImagBy,setFilterImageBy]= useState(imageBy)
    return (
        <>
            <div ref={refrence} className="absolute scale-[85%] top-4 gap-2 flex flex-col p-4 right-0 rounded-[8px] z-50 w-[300px] bg-white" style={{
                boxShadow:'0px 0px 12px 0px #00000026'
            }}>
                <div className="text-[16px] text-[#2E2E2E] font-medium">Images</div>
                <div>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="all" control={<Radio onChange={() => {setFilterImageBy('all')}} checked={filterImagBy =='all'} />} label="Any" />
                            <FormControlLabel value="live" control={<Radio onChange={() => {setFilterImageBy('live')}} checked={filterImagBy =='live'} />} label="Live Scan" />
                            <FormControlLabel value="img_upload" control={<Radio onChange={() => {setFilterImageBy(' img_upload')}} checked={filterImagBy ==' img_upload'} />} label="Uploaded image" />
                        </RadioGroup>
                    </FormControl>                
                </div>            
                <div className='w-full border border-b border-[#0000004D]'></div>
                
                <div className="text-[16px] mt-2 text-[#2E2E2E] font-medium">Date</div>    
                <div className='flex justify-start items-center'>
                    <div className='text-[16px] w-[38px] mr-2'>from:</div>
                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                        <DatePicker  className='w-[180px] py-0 scale-70' />
                    </LocalizationProvider>                    
                </div>

                <div className='flex justify-start mb-4 items-center'>
                    <div className='text-[16px] w-[38px] mr-2'>to:</div>
                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                        <DatePicker  className='w-[180px] py-0 scale-70' />
                    </LocalizationProvider>                    
                </div>                
                <div className='w-full flex justify-between items-center'>
                    <Button onClick={() => {
                        setShowFilter(false)
                        setImageBy("any")
                    }} theme='iris-secondary-small'>
                        <div className='w-[100px]'>
                            Clear Filter
                        </div>
                    </Button>
                    <Button onClick={() => {
                        setShowFilter(false)
                        setImageBy(filterImagBy)
                    }} theme='iris-small'>
                        <div className='w-[100px]'>
                            Apply Filter
                        </div>
                    </Button>
                </div>        
            </div>
        </>
    )
}

export default FilterModal