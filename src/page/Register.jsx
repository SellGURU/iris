import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import Auth from "../api/Auth";
import { toast } from "react-toastify";
import ButtonPrimary from "../components/button/buttonPrimery.jsx";
import { useRef, useState ,useEffect} from "react";
import { useFormik } from "formik";
import Package from "../model/Package.js";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUserName } from "../store/PatientInformationStore.js";
import { Button } from "symphony-ui";
import Select from "../components/select/index.jsx";
import {encryptTextResolver} from '../help.js';
import {PatientContext} from '../context/context.jsx'
import {useContext} from 'react';

const Register = () => {
  const passwordRef = useRef(null);
  const Appcontext = useContext(PatientContext)
  const [resolvedHight,setResolvedHight] = useState('80vh')
  const resolveHightImage = () => {
    if(document.getElementById("contentBox")){
      setResolvedHight(document.getElementById("contentBox").offsetHeight * 1)
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
  // const {register, handleSubmit} = useForm();
  const initialValues = {
    // fullName: "",
    firstName:"",
    lastName:"",
    email: "",
    // password: "",
    // confirm: "",
    accept: false,
    PracticeName: "",
  };
  const validationSchema = Yup.object().shape({
    // fullName: Yup.string(),
    firstName:Yup.string().required('First name is required.'),
    lastName:Yup.string().required('Last name is required.'),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("E-mail address is required."),
    // password: Yup
    // .string()
    // .required('Password is required')
    // .min(6, 'Password must be at least 6 characters long.')
    // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    accept: Yup.boolean().isTrue(),
  //   confirm: Yup
  // .string()
  // .oneOf([Yup.ref('password')], 'Passwords must match'),
  PracticeName: Yup
    .string().required("Practice name must be alphanumeric.").matches(/^[^!@#$%^&*+=<>:;|~]*$/,'Practice name must be alphanumeric.')
  });
  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {},
  });
  const form2 = useFormik({
    initialValues: {
      password: "",
      confirm: "",     
    },
    validationSchema: Yup.object().shape({
    password: Yup
      .string()
      .required('Password is required.')
      .min(6, 'Password must be at least 6 characters').max(15,'Password must not exceed 15 characters'),     
    confirm: Yup
      .string().required("Password is required.")
      .oneOf([Yup.ref('password')], 'Passwords must match'),      
    }),
    onSubmit: () => {},
  });  
  const dispatch = useDispatch();
  const [step,setStep] = useState(0)
  const navigate = useNavigate();
  const [isPanding, setIsPanding] = useState(false);
  let [, saveIsAccess] = useLocalStorage("token");
  let [, seveParty] = useLocalStorage("partyid");
  let [,saveEmail] = useLocalStorage("email")
  let [,savePass] = useLocalStorage("password")
  let [,saveOrg] = useLocalStorage("orgData")  
  //   console.log("isAccess l", isAccess);
  const onSubmit = () => {
    setIsPanding(true);
    try {
      // toast.loading("pending ...");
      Auth.signUp({
        email: encryptTextResolver(form.values.email),
        password: encryptTextResolver(form2.values.password),
        cpassword:encryptTextResolver(form2.values.confirm),
        practiceName:form.values.PracticeName,
        firstName:form.values.firstName,
        lastName:form.values.lastName
      })
        .then((res) => {
          if (res.data.status == 'success') {
            setIsPanding(false);
            // toast.info(res.data.msg);
              Auth.login({
                email: encryptTextResolver(form.values.email),
                password: encryptTextResolver(form2.values.password),
              })
                .then((res) => {
                  if (res.data.token!='') {
                    setIsPanding(false);
                    saveIsAccess(res.data.token);
                    seveParty(res.data.party_id)
                    saveEmail(form.values.email)
                    savePass(form2.values.password)
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
                    form.setFieldError("password", "The password is incorrect.");
                    // setTimeout(() => {
                    //   toast.pe
                    // }, 3000);
                  }
                })
                .catch((err) => {
                  console.log(err)
                  // form.setFieldError("password", "The password is incorrect.");
                  // toast.error(err.response?.data?.detail);
                });
          } else if(res.data.status == 'fail'){
            // console.log(res);
            alert(res.data.msg)
            // toast.error(res.data.msg);
            // toast.error(res.data)
          }
        })
        .catch((err) => {
          toast.dismiss();
          // console.log(err.response.data)
          form.setFieldError("password", "The password is incorrect.");
          // toast.error(err.response.data.detail);
        });
    } catch (error) {
      console.log("error1");
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
  const [HidePass2, setHidePass2] = useState(false);
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
      <div className="w-full  lg:h-[75vh] mt-[40px] md:mt-[40px] xl:mt-[-30px] flex items-center 2xl:items-start text-[#2E2E2E]   justify-center">

        <img className=" hidden md:block  " src={"./image/iris-login.png"} style={{height:resolvedHight}} />
        {step == 0?
            <div
              id="contentBox"
              className="w-fit px-10  animate-comeFromLeft gap-5  flex flex-col"
              // onSubmit={form.submitForm()}
            >
            <h1 className={" font-semibold text-2xl pb-1"}>Welcome to IRIS</h1>
            <div className="grid w-[330px]">
              <label className="flex mb-2 text-[16px] font-medium" htmlFor="firstName">
                First Name
              </label>
              <div className="relative">
                <input
                  {...form.getFieldProps("firstName")}
                  id="firstName"
                  className={`w-full pl-5 text-[14px] fill-none outline-none py-2 border-b ${
                    form.errors.firstName ? "border-b border-red-500" : ""
                  }`}
                  type="text"
                  placeholder="Your First Name"
                />
              </div>
                <div className={`${form.errors.firstName ? 'visible':'invisible'} h-[8px] text-[12px] mt-2 text-red-500`}>
                  {form.errors.firstName}
                </div>
            </div>
            <div className="grid w-[330px]">
              <label className="flex mb-2 text-[16px] font-medium" htmlFor="lastName">
                Last Name
              </label>
              <div className="relative">
                <input
                  {...form.getFieldProps("lastName")}
                  id="lastName"
                  className={`w-full pl-5 text-[14px] fill-none outline-none py-2 border-b ${
                    form.errors.lastName ? "border-b border-red-500" : ""
                  }`}
                  type="text"
                  placeholder="Your Last Name"
                />
              </div>
                <div className={`${form.errors.lastName ? 'visible':'invisible'} h-[8px] text-[12px] mt-2 text-red-500`}>
                  {form.errors.lastName}
                </div>
            </div>            
            <div className="grid w-[330px]">
              <label className="flex mb-2 text-[16px] font-medium" htmlFor="email">
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
                  {...form.getFieldProps("email")}
                  id="email"
                  className={`w-full pl-5 text-[14px] fill-none outline-none py-2 border-b ${
                    form.errors.userName ? "border-b border-red-500" : ""
                  }`}
                  type="text"
                  placeholder="Your E-mail Address"
                />
              </div>
                <div className={`${form.errors.email ? 'visible':'invisible'} h-[8px] text-[12px] mt-2 text-red-500`}>
                  {form.errors.email}
                </div>
            </div>
            <div className="grid w-[330px]">
              <Select
                value={form.values.PracticeName}
                onchange={(value) => {
                  form.setFieldValue("PracticeName", value);
                }}
                placeHolder={"Your Practice Name"}
                label={"Practice Name:"}
                options={["Sample Name 1", "Sample Name 2" , "sample Name 3"]}
              ></Select>
            </div>
            <div className={`${form.errors.PracticeName ? 'visible':'invisible'} h-[8px] text-[12px] mt-[-10px] text-red-500`}>
                {form.errors.PracticeName}
              </div>            

            <div className="w-full justify-between">
              <div className="flex justify-start items-center">
                <input
                  {...form.getFieldProps("accept")}
                  checked={form.values.accept}
                  id="accept"
                  type="checkbox"
                />
                <label
                  htmlFor="accept"
                  className="ml-2 cursor-pointer text-[12px] text-[#444444]"
                >
                  By signing up, I agree with{" "}
                </label>
                <span onClick={() => {
                  window.open('https://dev.irisaesthetics.ai/terms-conditions/')
                }} className="text-primary-color text-[14px] cursor-pointer ml-1 font-medium hover:underline">Terms & Conditions.</span>
              </div>
            </div>
            <Button
            disabled={!form.isValid || !form.values.accept}
              onClick={() => {
                // onSubmit()
                setStep(1)
              }}
              theme="iris-large"
              
            >
              <div className="flex justify-center w-full">Continue</div>
            </Button>

            <div className="text-primary-color mt-[-4px] text-[12px] flex w-full justify-end">
              <Link to="/login">Already have an account?</Link>
            </div>
          </div>
        :
          <div
            id="contentBox"
            className="w-fit px-10 min-h-[620px] justify-center  animate-comeFromLeft gap-5  flex flex-col"
            // onSubmit={form.submitForm()}
          >
            <h1 className={" font-semibold text-2xl pb-1"}>Welcome to IRIS</h1>
              {/* <div className="max-w-[330px] text-[14px] text-[#444444] mb-4">Choose a password with at least 8 characters, including uppercase, lowercase, numbers, and one special character (e.g., @, #, $).</div> */}
            <div className="grid relative w-[330px]">
              <label className="flex mb-2 text-[16px] font-medium" htmlFor="password">
                Create a Password:
              </label>
              <div className="relative">
                <input
                  onKeyDown={handleKeyPressSubmitData}
                  ref={passwordRef}
                  placeholder="Your Password"
                  id="password"
                  className={`w-full text-[14px] outline-none pl-5 pr-7 py-2 border-b ${
                    form2.errors.password ? "border-b border-red-500" : ""
                  }`}
                  {...form2.getFieldProps("password")}
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
              <div className={`${form2.errors.password ? 'visible':'invisible'} h-[8px] text-[12px] mt-2 text-red-500`}>
                {form2.errors.password}
              </div>
            </div>
            <div className="grid relative w-[330px]">
              <label className="flex mb-2 text-[16px] font-medium" htmlFor="password">
                Repeat the Password:
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
                  className={`w-full text-[14px] outline-none pl-5 pr-7 py-2 border-b ${
                    form2.errors.confirm ? "border-b border-red-500" : ""
                  }`}
                  {...form2.getFieldProps("confirm")}
                  type={!HidePass2 ? "password" : "text"}
                />
                <img
                  onClick={() => {
                    setHidePass2(!HidePass2);
                  }}
                  className="absolute cursor-pointer bottom-3 right-1"
                  src={!HidePass2 ? "./eye.svg" : "./eye-slash.svg"}
                />
              </div>

              <div className={`${form2.errors.confirm ? 'visible':'invisible'} h-[8px] text-[12px] mt-2 text-red-500`}>
                {form2.errors.confirm}
              </div>
            </div>
            <Button
            disabled={!form2.isValid || form2.values.confirm == ''}
              onClick={() => {
                onSubmit()
              }}
              theme="iris-large"
              
            >
              <div className="flex justify-center w-full">Sign up</div>
            </Button>

            <div onClick={() => {
              setStep(0)
            }} className="flex cursor-pointer w-[120px] items-center gap-2 justify-start">
              <img src="./arrow-left.svg" className="w-8"  />
              <div className="text-primary-color">Back</div>
            </div>

          </div>        
        }
      </div>
    </div>
  );
};

export default Register;
