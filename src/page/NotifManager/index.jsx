import { useRef, useState } from "react"
import { Modal } from "../../components/modal"
import { subscribe } from "../../utility/event"
import useModalAutoClose from '../../hooks/useModalAutoClose.js';

const NotifManager = () => {
    const [text,setText] = useState("")
    const [isVisible,setIsVisible] = useState(false)
    const [notifType,setNotifType] = useState("error")
    subscribe("isNotif",(e) => {
        setText(e.detail.data.message)
        setIsVisible(true)
        setNotifType(e.detail.data.type)
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
                        <div className="w-full fixed left-0 top-0 flex h-screen justify-center items-center">
                            <div ref={modalRef} >
                                <Modal type={notifType} onClose={() => {
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