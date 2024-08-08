import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import Auth from "../api/Auth";
// import { toast } from "react-toastify";
import ButtonPrimary from "../components/button/buttonPrimery.jsx";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUserName } from "../store/PatientInformationStore.js";
import { Button } from "symphony-ui";

const Login = () => {
  const passwordRef = useRef(null);

  // const {register, handleSubmit} = useForm();
  const initialValues = {
    userName: localStorage.getItem("myapp-email")? localStorage.getItem("myapp-email"): '',
    password:  localStorage.getItem("myapp-password")? localStorage.getItem("myapp-password"): '',
    rememberMe: false,
  };
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("userName is required"),
    password: Yup.string().required(),
  });
  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {},
  });
  const dispatch = useDispatch();
  const  remember = () => {
    if(form.values.rememberMe){
      localStorage.setItem("myapp-email", form.values.userName); localStorage.setItem("myapp-password", form.values.password)
    }
    else{
      localStorage.setItem("myapp-email", ""); localStorage.setItem("myapp-password", "")
    }
  }
  const navigate = useNavigate();
  const [isPanding, setIsPanding] = useState(false);
  let [, saveIsAccess] = useLocalStorage("token");
  let [, seveParty] = useLocalStorage("partyid");
  //   console.log("isAccess l", isAccess);
  const onSubmit = () => {
    setIsPanding(true);
    try {
      // toast.loading("pending ...");
      // toast.loading('pending ...');
      Auth.login({
        email: form.values.userName,
        password: form.values.password,
      })
        .then((res) => {
          // toast.dismis()
          console.log(res)
          remember()
          if (res.data.token!='') {
            setIsPanding(false);
            saveIsAccess(res.data.token);
            seveParty(res.data.party_id)
            dispatch(setUserName("amin"));
            // toast.
            navigate("/");
          } else {
            // console.log("res");
            // toast.error(res.data.error) 
            form.setFieldError("password", "The password is incorrect.");
            // setTimeout(() => {
            //   toast.pe
            // }, 3000);
          }
        })
        .catch((err) => {
          console.log(err)
          form.setFieldError("password", "The password is incorrect.");
          // toast.error(err.response?.data?.detail);
        });
    } catch (error) {
      console.log(error);
    }
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
  const [HidePass, setHidePass] = useState(false);
  return (
    <div className={" "}>
      <div className={"h-[100px]  flex items-center justify-between px-10"}>
        <img
          className={" w-auto h-auto h-h"}
          src={"/image/login/IRIS.svg"}
          alt="iris"
        />
        <ButtonPrimary className={"invisible"}>Account</ButtonPrimary>
      </div>
      <div className="w-full h-[75vh] flex items-center text-[#2E2E2E]   justify-center">
        <img
          className={"hidden md:block  h-[500px] 2xl:h-[630px]"}
          src={"image/login-pic.png"}
        />
        <div
          className="w-fit px-10 py-5  animate-comeFromLeft   gap-5  flex flex-col"
          // onSubmit={form.submitForm()}
        >
          <h1 className={" font-medium text-2xl pb-5"}>Welcome Back to IRIS</h1>
          <div className="grid w-[330px]">
            <label className="flex mb-2 text-xl font-medium" htmlFor="userName">
              E-mail Address:
            </label>
            <div className="relative">
              {/* {
                                form.values.userName.length == 0?
                                    <img className="absolute cursor-pointer bottom-3 left-1" src='./sms.svg' alt="" />
                                :undefined
                            } */}
              <input
                onKeyDown={handleUsernameKeyPress}
                {...form.getFieldProps("userName")}
                id="userName"
                className={`w-full pl-5 fill-none outline-none py-2 border-b ${
                  form.errors.userName ? "border-b border-red-500" : ""
                }`}
                type="text"
                placeholder="Your E-mail Address"
              />
            </div>
            {form.errors.userName && (
              <div className="text-sm mt-2 text-red-500">
                {form.errors.userName}
              </div>
            )}
          </div>
          <div className="grid relative w-[330px]">
            <label className="flex mb-2 text-xl font-medium" htmlFor="password">
              Password:
            </label>
            <div className="relative">
              {/* {
                                form.values.password.length == 0?
                                    <img className="absolute cursor-pointer bottom-3 left-1" src='./lock.svg' alt="" />
                                :undefined
                            } */}

              <input
                onKeyDown={handleKeyPressSubmitData}
                ref={passwordRef}
                placeholder="Your Password"
                id="password"
                className={`w-full outline-none pl-5 pr-7 py-2 border-b ${
                  form.errors.password ? "border-b border-red-500" : ""
                }`}
                {...form.getFieldProps("password")}
                type={!HidePass ? "password" : "text"}
              />
              <img
                onClick={() => {
                  setHidePass(!HidePass);
                }}
                className="absolute cursor-pointer bottom-3 right-1"
                src={!HidePass ? "./eye.svg" : "./eye-slash.svg"}
              />
            </div>
            {form.errors.password && (
              <div className="text-sm mt-2 text-red-500">
                {form.errors.password}
              </div>
            )}
          </div>
          <div className="w-full mb-6 flex items-center justify-between">
            <div className="flex justify-start items-center">
              <input
                id="rememberMeBox"
                type="checkbox"
                {...form.getFieldProps("rememberMe")}
              />
              <label
                htmlFor="rememberMeBox"
                className="ml-2 cursor-pointer text-sm text-[#444444]"
              >
                Remember me
              </label>
            </div>
            <p className="  text-sm font-normal">
              <Link to="/forgetpass" className="text-primary-color">
                Forgot Password?
              </Link>
            </p>
          </div>
          <Button
            onClick={() => {
              onSubmit();
            }}
            theme="iris-large"
            disabled={!form.isValid}
          >
            <div className="flex justify-center w-full">Log in</div>
          </Button>
          {/* <ButtonPrimary className="h-[52px] mt-[50px] rounded-[12px]" onClickHandler={() => {
                        onSubmit()
                    }} disabled={!form.isValid}>Log In</ButtonPrimary> */}
          <p className="  text-sm font-normal">
            Don’t have an account?
            <Link to="/register" className="text-primary-color">
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
