import {IoMenu} from "react-icons/io5";
import ButtonPrimary from "../components/button/buttonPrimery";
import {AiOutlineUser} from "react-icons/ai";
import {Outlet} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <div
                className=" sticky top-0 left-0 mb-5 shadow-md h-[10vh]  w-full bg-inherit flex items-center justify-between px-5">
                <IoMenu className="w-10 h-10 text-[#544BF0]"/>
                <img src="/image/login/IRIS.svg" alt="logo"/>
                <ButtonPrimary onClick={() => console.log("account")}>
                    <AiOutlineUser className="w-6 h-6 text-white"/>
                    account
                </ButtonPrimary>
            </div>
            <Outlet/>
        </div>
    );
};

export default Header;
