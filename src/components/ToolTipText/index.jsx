/* eslint-disable react/prop-types */
import { Tooltip } from 'react-tooltip'
import { useEffect,useRef,useState } from 'react';

const TooltipText =({ tooltipValue,children ,...props}) => {
    const textRef = useRef(null);
    const [isEllipsized, setIsEllipsized] = useState(false);    
    useEffect(() => {
        if (textRef.current) {
        const { offsetWidth, scrollWidth } = textRef.current;
        setIsEllipsized(scrollWidth > offsetWidth);
        }
    }, [tooltipValue]);    
    return (
        <>
         <span ref={textRef} data-tooltip-id="tooltip" data-tooltip-content={tooltipValue} {...props} style={{
            textWrap:'nowrap',
            overflow:'hidden',
            textOverflow:'ellipsis'
         }}>{ children }</span>
         {isEllipsized &&
            <Tooltip id='tooltip'></Tooltip>
         }
        </>
    )
}

export default TooltipText