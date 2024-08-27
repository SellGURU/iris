import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import ButtonPrimary from "../components/button/buttonPrimery.jsx";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Button } from "symphony-ui";

const InformationSiginup = () => {
  const passwordRef = useRef(null);

  // const {register, handleSubmit} = useForm();
  const initialValues = {
    firstName:'',
    lastName:''
  };

  const form = useFormik({
    initialValues: initialValues,
    onSubmit: () => {},
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isPanding, setIsPanding] = useState(false);
  let [, saveIsAccess] = useLocalStorage("token");
  //   console.log("isAccess l", isAccess);
  const onSubmit = () => {
    setIsPanding(true);
    navigate('/registerInformation')
  };
  const handleUsernameKeyPress = (event) => {
    if (event.key === "Enter") {
      passwordRef.current.focus();
    }
  };
  const handleKeyPressSubmitData = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };
  const resolveHightImage = () => {
    if(document.getElementById("contentBox")){
      return document.getElementById("contentBox").offsetHeight * 1.4

    }else {
      return '80vh'
    }
  }
  return (
    <div className={"h-[100svh] w-full md:fixed md:overflow-hidden "}>
      <div className={"h-[100px]  flex items-center justify-between px-10"}>
        <img
          className={" w-auto h-auto h-h"}
          src={"/image/login/IRIS.svg"}
          alt="iris"
        />
        <ButtonPrimary className={"invisible"}>Account</ButtonPrimary>
      </div>
      <div className="w-full  lg:h-[75vh] mt-[40px] md:mt-[40px] xl:mt-[-30px] flex items-center  text-[#2E2E2E]   justify-center">
        <img className=" hidden md:block  " src={"./image/iris-login.png"} style={{height:resolveHightImage()}} />
        <div
          id="contentBox"
          className="w-fit px-10  animate-comeFromLeft gap-5  flex flex-col"
          // onSubmit={form.submitForm()}
        >
          <h1 className={" font-semibold text-2xl pb-1"}>Welcome to IRIS</h1>
          <div className="w-[300px]  grid">
            Signup successful!
            <span>
                Please enter your full name to get started. 
            </span>
          </div>

          <div className="grid w-[330px]">
            <label className="flex mb-2 text-[16px] font-medium" htmlFor="firstName">
              First Name
            </label>
            <div className="relative">
              {/* {
                                form.values.userName.length == 0?
                                    <img className="absolute cursor-pointer bottom-3 left-1" src='./sms.svg' alt="" />
                                :undefined
                            } */}
              <input
                onKeyDown={handleUsernameKeyPress}
                {...form.getFieldProps("firstName")}
                id="firstName"
                className={`w-full pl-5 text-[14px] fill-none outline-none py-2 border-b ${
                  form.errors.userName ? "border-b border-red-500" : ""
                }`}
                type="text"
                placeholder="Your First Name"
              />
            </div>

          </div>

          <div className="grid mb-4 w-[330px]">
            <label className="flex mb-2 text-[16px] font-medium" htmlFor="firstName">
              Last Name
            </label>
            <div className="relative">
              {/* {
                                form.values.userName.length == 0?
                                    <img className="absolute cursor-pointer bottom-3 left-1" src='./sms.svg' alt="" />
                                :undefined
                            } */}
              <input
                onKeyDown={handleUsernameKeyPress}
                {...form.getFieldProps("lastName")}
                id="Your Last Name"
                className={`w-full pl-5 text-[14px] fill-none outline-none py-2 border-b ${
                  form.errors.lastName ? "border-b border-red-500" : ""
                }`}
                type="text"
                placeholder="Your Last Name"
              />
            </div>

          </div>

          <Button
            disabled={!form.isValid || form.values.firstName =='' || form.values.lastName =='' }
            onClick={() => {
              onSubmit()
            }}
            theme="iris-large"
            
          >
            <div className="flex justify-center w-full">Get Started</div>
          </Button>


          {/* <div className="text-primary-color mt-[-4px] text-[12px] flex w-full justify-end">
            <Link to="/login">Already have an account?</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default InformationSiginup;
