import { Link } from "react-router-dom";
import ButtonPrimary from "../../components/button/buttonPrimery";
import { FaLongArrowAltLeft } from "react-icons/fa";

const GetCode = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col gap-8 ">
        <h1 className=" text-3xl font-medium">Enter your code</h1>
        <div className="flex items-start justify-center gap-5 flex-col">
          <div className="text-[#999999] text-sm font-medium flex items-center justify-start  ">
            <p>+44777744445555</p>
            <p>re send</p>
          </div>
          <div className="flex items-center justify-center gap-5">
            {Array.from({ length: 7 }, (_, InputIndex) => (
              <input
                key={InputIndex}
                type="text"
                maxLength={1}
                className={` border-none-focus border-b-4 rounded-sm border-solid border-[#999999] focus:border-blue-600 w-7 text-center`}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-7 pt-5">
            <Link to={""}>
              <FaLongArrowAltLeft  />
            </Link>
            <ButtonPrimary className={"!px-10"} disabled>
              Next
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCode;
