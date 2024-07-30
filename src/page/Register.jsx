import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import Auth from "../api/Auth";
import { toast } from "react-toastify";
import ButtonPrimary from "../components/button/buttonPrimery.jsx";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUserName } from "../store/PatientInformationStore.js";
import { Button } from "symphony-ui";
import Select from "../components/select/index.jsx";

const Register = () => {
  const passwordRef = useRef(null);

  // const {register, handleSubmit} = useForm();
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirm: "",
    accept: false,
    PracticeName: "",
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("This Full Name is required"),
    email: Yup.string()
      .email("This E-mail Address is not Valid.")
      .required("This E-mail Address is required."),
    password: Yup.string()
      .required()
      .min(8)
      .matches(/[a-zA-Z]/, "The password should contain letters and numbers."),
    accept: Yup.boolean().isTrue(),
    confirm: Yup.string()
      .required()
      .min(8)
      .matches(/[a-zA-Z]/, "The password should contain letters and numbers."),
  });
  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {},
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isPanding, setIsPanding] = useState(false);
  let [, saveIsAccess] = useLocalStorage("token");
  //   console.log("isAccess l", isAccess);
  const onSubmit = () => {
    setIsPanding(true);
    try {
      toast.loading("pending ...");
      Auth.login({
        username: form.values.userName,
        password: form.values.password,
      })
        .then((res) => {
          console.log(res);
          if (res.data.access_token) {
            setIsPanding(false);
            saveIsAccess(res.data.access_token);
            dispatch(setUserName("amin"));
            toast.dismiss();
            navigate("/");
          } else {
            console.log("res");
            // toast.error(res.data)
          }
        })
        .catch((err) => {
          toast.dismiss();
          // console.log(err.response.data)
          form.setFieldError("password", "The password is incorrect.");
          toast.error(err.response.data.detail);
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
    <div className={" "}>
      <div className={"h-[100px]  flex items-center justify-between px-10"}>
        <img
          className={" w-auto h-auto h-h"}
          src={"/image/login/IRIS.svg"}
          alt="iris"
        />
        <ButtonPrimary className={"invisible"}>Account</ButtonPrimary>
      </div>
      <div className="w-full h-[75vh] flex items-start text-[#2E2E2E]   justify-center">
        <div className="relative overflow-hidden">
          <img
            className={"hidden  md:block h-[590px] 2xl:h-[630px]"}
            src={"image/login-pic.png"}
          />
          <div className="absolute flex justify-center items-center top-0 w-[100%] h-[100%]">
            <div
              className="rounded-[16px]   w-[75%] h-[70%]"
              style={{ backdropFilter: "blur(6px)" }}
            >
              <div className="absolute flex justify-center items-start  top-0 ">
                <div className="rounded-[16px]    w-full h-[70%] px-2">
                  <div className="text-[20px] font-medium text-white">
                    A Revolutionary Face Mapping Tool for New and Experienced
                    Aestheticians
                  </div>

                  <div className="text-[18px] mt-6 text-white">
                    1.Analyzes facial measurements and provides guidance for the
                    use of injectable beauty products.
                  </div>

                  <div className="text-[18px] mt-6 text-white">
                    2.AI technology encodes the expertise of world-renowned
                    plastic surgeon <br /> Dr. Arthur Swift.{" "}
                  </div>

                  <div className="text-[18px] mt-6 text-white">
                    3.Improves consistency of results, enhance efficiency and
                    provides a competitive edge.{" "}
                  </div>

                  {/* <div className="text-[14px] mt-6 text-white">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor                            
                            </div>                                                     */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-fit px-10  animate-comeFromLeft gap-5  flex flex-col"
          // onSubmit={form.submitForm()}
        >
          <h1 className={" font-semibold text-2xl pb-1"}>Welcome to IRIS</h1>

          <div className="grid w-[330px]">
            <label className="flex mb-2 text-xl font-medium" htmlFor="email">
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
                className={`w-full pl-5 fill-none outline-none py-2 border-b ${
                  form.errors.userName ? "border-b border-red-500" : ""
                }`}
                type="text"
                placeholder="Your E-mail Address"
              />
            </div>
            {form.errors.email && (
              <div className="text-sm mt-2 text-red-500">
                {form.errors.email}
              </div>
            )}
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
          <div className="grid relative w-[330px]">
            <label className="flex mb-2 text-xl font-medium" htmlFor="password">
              Create a Password:
            </label>
            <div className="relative">
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
            {form.errors.password && form.touched.password && (
              <div className="text-sm mt-2 text-red-500">
                {form.errors.password}
              </div>
            )}
          </div>
          <div className="grid relative w-[330px]">
            <label className="flex mb-2 text-xl font-medium" htmlFor="password">
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
                className={`w-full outline-none pl-5 pr-7 py-2 border-b ${
                  form.errors.confirm ? "border-b border-red-500" : ""
                }`}
                {...form.getFieldProps("confirm")}
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
            {form.errors.confirm && form.touched.confirm && (
              <div className="text-sm mt-2 text-red-500">
                {form.errors.confirm}
              </div>
            )}
          </div>
          <div className="w-full justify-between">
            <div className="flex justify-start items-center">
              <input
                {...form.getFieldProps("accept")}
                id="accept"
                type="checkbox"
              />
              <label
                htmlFor="accept"
                className="ml-2 cursor-pointer text-sm text-[#444444]"
              >
                By signing up, I agree with{" "}
                <span className="text-primary-color">Terms & Conditions</span>
              </label>
            </div>
          </div>
          <Button
          disabled={!form.values.accept}
            onClick={() => {
              // onSubmit()
            }}
            theme="iris-large"
            
          >
            <div className="flex justify-center w-full">sign up</div>
          </Button>

          <div className="text-primary-color mt-[-4px] text-[14px] flex w-full justify-end">
            <Link to="/login">Already have an account?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
