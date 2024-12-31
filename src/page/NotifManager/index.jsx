import { useRef, useState } from "react"
import { Modal } from "../../components/modal"
import { subscribe } from "../../utility/event"
import useModalAutoClose from '../../hooks/useModalAutoClose.js';

const NotifManager = () => {
    const [text,setText] = useState("")
    const [isVisible,setIsVisible] = useState(false)
    subscribe("haveError",(e) => {
        console.log(e.detail.data)
        setText(e.detail.data)
        setIsVisible(true)
    })
    const modalRef = useRef(null)
  useModalAutoClose({
    refrence:modalRef,
    close:() => {
      setIsVisible(false)
    }
  })    
    return (
        <>
        {
            isVisible &&
            <>
                    <div className="fixed w-full h-full bg-[#00000099] top-0 left-0 z-[500]"></div>
                    <div className="w-full flex justify-center items-center absolute left-0 top-0 z-[501]">
                        <div className="w-full flex h-screen justify-center items-center">
                            <div ref={modalRef} >
                                <Modal onClose={() => {
                                    setIsVisible(false)
                                }} text={text}></Modal>

                            </div>
                        </div>
                    </div>
            </>

        }
        </>
    )
}

export default NotifManager