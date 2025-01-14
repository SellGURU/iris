import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import Auth from "../api/Auth";
// import { toast } from "react-toastify";
import {BeatLoader} from 'react-spinners'
import ButtonPrimary from "../components/button/buttonPrimery.jsx";
import { useEffect, useRef, useState ,useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUserName } from "../store/PatientInformationStore.js";
import { Button } from "symphony-ui";
import Package from "../model/Package.js";
import {PatientContext} from '../context/context.jsx'
import {encryptTextResolver} from '../help.js';


const removeToken =() => {
    localStorage.removeItem("token")
    localStorage.removeItem("partyid")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.removeItem("orgData")
    localStorage.removeItem("patients")
    localStorage.removeItem("package")
}
const Login = () => {
  const passwordRef = useRef(null);
  const Appcontext = useContext(PatientContext)
  // const {register, handleSubmit} = useForm();
  const initialValues = {
    userName: localStorage.getItem("myapp-email")? localStorage.getItem("myapp-email"): '',
    password:  localStorage.getItem("myapp-password")? localStorage.getItem("myapp-password"): '',
    rememberMe: false,
  };
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("E-mail address is required."),
    password: Yup.string().required("Password is required."),
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
  let [, save_uv_token_type ] = useLocalStorage("uv_token_type");
  let [, save_uv_token ] = useLocalStorage("uv_token");
  let [, seveParty] = useLocalStorage("partyid");
  let [,saveEmail] = useLocalStorage("email")
  let [,savePass] = useLocalStorage("password")
  let [,saveOrg] = useLocalStorage("orgData")
  const [resolvedHight,setResolvedHight] = useState('80vh')
  const resolveHightImage = () => {
    if(document.getElementById("contentBox")){
      setResolvedHight(document.getElementById("contentBox").offsetHeight * 1.3)
    }else {
      setResolvedHight("80vh")
    }
  }  
  useEffect(() => {
    resolveHightImage()
  })
  addEventListener("resize", (event) => {
  resolveHightImage()
  });
  //   console.log("isAccess l", isAccess);
  const onSubmit = () => {
    setIsPanding(true);
    try {
      // toast.loading("pending ...");
      // toast.loading('pending ...');
      removeToken()
      Auth.login({
        email: encryptTextResolver(form.values.userName),
        password: encryptTextResolver(form.values.password),
      })
        .then((res) => {
          // toast.dismis()
          remember()
          setIsPanding(false)
          if (res.data.token!='') {
            setIsPanding(false);
            saveIsAccess(res.data.token);
            save_uv_token(res.data.uv_token)
            save_uv_token_type(res.data.uv_token_type)
            seveParty(res.data.party_id)
            saveEmail(form.values.userName)
            savePass(form.values.password)
            saveOrg(JSON.stringify(res.data.org_data))
            dispatch(setUserName("amin"));
            Appcontext.user.updateCustomInformation('account',{
                PracticeName:res.data.org_data.orgName,
                PhoneNumber:"",
                EmailAddress:res.data.org_data.orgEmail
            })         
            Appcontext.user.updateCustomInformation("personal",{
              FirstName:res.data.org_data.firstName,
              LastName:res.data.org_data.lastName,
              
            }) 
            Appcontext.user.updateCustomInformation("photo",
                `https://ui-avatars.com/api/?name=`+res.data.org_data.firstName+" "+res.data.org_data.lastName              
            )             
            if(res.data.org_data.subs_data.length> 0){
                let newPak = new Package({
                    name:'No available package',
                    cycle:'Yearly',
                    cost:0,
                    useage:res.data.org_data.subs_data[0].iscan_used,
                    bundle:res.data.org_data.subs_data[0].iscan_brought,
                    discount:0,
                    options:[]                           
                })
                    // console.log(newPak)
                Appcontext.package.updatePackage(newPak)
            }
            // photo:`https://ui-avatars.com/api/?name=`+res.data.org_data.firstName+" "+res.data.org_data.lastName
            // toast.
            navigate("/");
          } else {
            // console.log(res.msg);
            // toast.error(res.data.error) 
            // alert(res.msg)
            // form.setFieldError("password", "The password is incorrect.");
            // setTimeout(() => {
            //   toast.pe
            // }, 3000);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsPanding(false)
          if(err.data.detail.includes("Password ")){
            form.setFieldError("password", err.data.detail);
          }else {
            form.setFieldError("userName", err.data.detail);
          }
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
    <div className={"h-[100svh] w-full fixed overflow-hidden "}>
      <div className={"h-[100px]  flex items-center justify-between px-10"}>
        <img
          className={" w-auto h-auto h-h"}
          src={"/image/login/IRIS.svg"}
          alt="iris"
        />
        <ButtonPrimary className={"invisible"}>Account</ButtonPrimary>
      </div>
      <div className="w-full h-[75vh] flex items-center text-[#2E2E2E]   justify-center">
        {/* <img
          className={"h-[50vh] xl:h-[85vh] 2xl:h-[80vh]"}
          src={"image/login-pic.png"}
        /> */}
        <img className=" hidden md:block  " src={"./image/login-pic.png"} style={{height:resolvedHight}} />        
        <div
          id="contentBox"
          className="w-fit px-10 py-5  animate-comeFromLeft   gap-5  flex flex-col"
          // onSubmit={form.submitForm()}
        >
          <h1 className={" font-medium text-2xl "}>Welcome Back to IRIS</h1>
          <div className="grid w-[330px]">
            <label className="flex mb-2 text-[16px] font-medium" htmlFor="userName">
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
                className={`w-full pl-5 fill-none text-[14px] outline-none py-2 border-b ${
                  form.errors.userName ? "border-b border-red-500" : ""
                }`}
                type="text"
                placeholder="Your E-mail Address"
              />
            </div>

            <div className={`${form.errors.userName?'visible':'invisible'} h-[16px] text-[12px] mt-1 text-red-500`}>
              {form.errors.userName}
            </div>
          </div>
          <div className="grid relative w-[330px]">
            <label className="flex mb-2 text-[16px] font-medium" htmlFor="password">
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
                className={`w-full outline-none text-[14px] pl-5 pr-7 py-2 border-b ${
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

            <div className={`${form.errors.password?'visible':'invisible'} h-[16px] text-[12px] mt-1  text-red-500`}>
              {form.errors.password}
            </div>

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
                className="ml-2 cursor-pointer text-[12px] text-[#444444]"
              >
                Remember me
              </label>
            </div>
            <p className="  text-[12px] font-normal">
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
            disabled={(!form.isValid || isPanding)}
          >
            {isPanding ?
              <div className="flex justify-center items-center w-full">
                <BeatLoader size={10} color="white"></BeatLoader>

              </div>
            :
              <div className="flex justify-center w-full">Log in</div>
            }
          </Button>
          {/* <ButtonPrimary className="h-[52px] mt-[50px] rounded-[12px]" onClickHandler={() => {
                        onSubmit()
                    }} disabled={!form.isValid}>Log In</ButtonPrimary> */}
          <p className="  text-[12px] font-normal">
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
