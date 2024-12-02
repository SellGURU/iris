/* eslint-disable react/prop-types */
import { Checkbox,Switch } from '@mui/material';
import { Button } from 'symphony-ui';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
const FilterModal = ({refrence,categories,setShowImagesOrgin,activeCategories,setActiveCategory,onClose,isShowImages}) => {
    const [mycategories,setmyCategories] = useState(activeCategories)
    const [showImages,setShowImages] = useState(isShowImages)
    const onchangeCategory = (el) => {
        if(mycategories.includes(el)){
            setmyCategories(mycategories.filter(val =>val!=el))
        }else {
            const newvals = mycategories
            newvals.push(el)
            setmyCategories([...newvals])
        }
    }
    const onChangeAll = () => {
        if(categories.length == mycategories.length){
            setmyCategories([])
        }else {
            setmyCategories([...categories])
        }
    }
    const onSubmit = () => {
        setActiveCategory([...mycategories])
        setShowImagesOrgin(showImages)
    }
    useEffect(() => {
        setmyCategories(activeCategories)
    },[activeCategories])
    useEffect(() => {
        setShowImages(isShowImages)
    },[isShowImages])
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
                            }} value="all" control={<Checkbox  checked={categories.length == mycategories.length} />} label="All" />
                            {categories.map((el) => {
                                return (
                                    <FormControlLabel onChange={() => onchangeCategory(el)} key={el} value={el} control={<Checkbox checked={mycategories.includes(el)} />} label={el} />
                                )
                            })}

                        </div>
                    </FormControl>                
                </div>            
                <div className='w-full border border-b border-[#0000004D]'></div>
                <div className='flex justify-between items-center'>
                    <div className="text-[16px] text-[#2E2E2E] font-semibold">Show Images</div>
                    <Switch checked={showImages} onChange={() => {
                        setShowImages(!showImages)
                    }}></Switch>
                </div>
                <div className='w-full flex justify-between items-center mt-4'>
                    <Button onClick={() => {
                        // setShowFilter(false)
                        // setImageBy("any")
                        onClose()
                    }} theme='iris-secondary-small'>
                        <div className='w-[100px]'>
                            Clear Filter
                        </div>
                    </Button>
                    <Button onClick={() => {
                        // setShowFilter(false)
                        // setImageBy(filterImagBy)
                        onSubmit()
                        onClose()
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