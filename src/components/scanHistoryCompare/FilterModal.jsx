/* eslint-disable react/prop-types */
import { Checkbox,Switch } from '@mui/material';
// import { Button } from 'symphony-ui';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
const FilterModal = ({refrence,categories,activeCategories,setActiveCategory}) => {
    const onchangeCategory = (el) => {
        if(activeCategories.includes(el)){
            setActiveCategory(activeCategories.filter(val =>val!=el))
        }else {
            const newvals = activeCategories
            newvals.push(el)
            setActiveCategory([...newvals])
        }
    }
    const onChangeAll = () => {
        if(categories.length == activeCategories.length){
            setActiveCategory([])
        }else {
            setActiveCategory([...categories])
        }
    }
    return (
        <>
            <div ref={refrence} className="absolute scale-[85%] top-4 gap-2 flex flex-col p-4 right-0 rounded-[8px] z-50 w-[300px] bg-white" style={{
                boxShadow:'0px 0px 12px 0px #00000026'
            }}>
                <div className="text-[16px] text-[#2E2E2E] font-semibold">Category</div>
                <div>
                    <FormControl>
                        <div className='grid grid-cols-2'>
                            <FormControlLabel onChange={() => {
                                onChangeAll()
                            }} value="all" control={<Checkbox checked={categories.length == activeCategories.length} />} label="All" />
                            {categories.map((el) => {
                                return (
                                    <FormControlLabel onChange={() => onchangeCategory(el)} key={el} value={el} control={<Checkbox checked={activeCategories.includes(el)} />} label={el} />
                                )
                            })}

                        </div>
                    </FormControl>                
                </div>            
                <div className='w-full border border-b border-[#0000004D]'></div>
                <div className='flex justify-between items-center'>
                    <div className="text-[16px] text-[#2E2E2E] font-semibold">Show Images</div>
                    <Switch ></Switch>
                </div>
                {/* <div className='w-full flex justify-between items-center mt-4'>
                    <Button onClick={() => {
                        // setShowFilter(false)
                        // setImageBy("any")
                    }} theme='iris-secondary-small'>
                        <div className='w-[100px]'>
                            Clear Filter
                        </div>
                    </Button>
                    <Button onClick={() => {
                        // setShowFilter(false)
                        // setImageBy(filterImagBy)
                    }} theme='iris-small'>
                        <div className='w-[100px]'>
                            Apply Filter
                        </div>
                    </Button>
                </div>    */}
            </div>
        </>
    )
}

export default FilterModal