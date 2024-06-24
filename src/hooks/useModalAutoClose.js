import {  useEffect } from "react";

// interface useModalAutoClose{
//     refrence:MutableRefObject<HTMLDivElement | null>
//     close:() =>void
// }

const useModalAutoClose = (props) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (
            props.refrence.current &&
            !props.refrence.current.contains(event.target)
        ) {
            props.close()
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props, props.refrence]);  
}

export default useModalAutoClose