import { Link } from "react-router-dom";
import PhoneInput from "../../components/input/phone";
import ButtonPrimary from "../../components/button/buttonPrimery";
import ButtonSecondary from "../../components/button/buttonSecondary";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const GetNumberPage = () => {
  return (
    <div className="w-full  h-screen flex items-center justify-center">
      <div className="  w-96 gap-10 flex items-center justify-center flex-col">
        <h1 className=" font-medium text-3xl">Can we get your number?</h1>
        <div className=" space-y-3">
          <PhoneInput />
          <p className=" text-[#444444] text-sm font-normal">
            We will send you a code to verify you’re really you. Message and
            data rates may apply. What happens if your number changes?
          </p>
        </div>
        <div className="">
          <Link to={""}></Link>
          <ButtonPrimary className={"!px-10"} disabled>
            Next
          </ButtonPrimary>
        </div>
        <div className=" space-y-5">
          <ButtonSecondary ClassName=" !text-black w-96">
            Sign up with Email
          </ButtonSecondary>
          <ButtonSecondary ClassName=" !text-black  w-96">
            Sign up with
            <FcGoogle className="w-8 h-8" />
          </ButtonSecondary>
          <ButtonSecondary ClassName=" !text-black  w-96">
            Sign up with
            <img src="/image/login/facebook.svg" className="w-8 h-8" alt="" />
          </ButtonSecondary>
          <ButtonSecondary ClassName=" !text-black  w-96">
            Sign up with
            <FaApple className="w-8 h-8 text-[#656565]" />
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export default GetNumberPage;
