import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import Auth from "../api/Auth";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  let [,saveIsAccess] = useLocalStorage("access");
  //   console.log("isAccess l", isAccess);
  const onSubmit = (data) => {
    // if (data.userName === "admin" && data.password === "1823648364") {
    //   saveIsAccess("true");
    //   navigate("/");
    // }
    Auth.login({
      username:data.userName,
      password:data.password
    }).then((res) => {
      if(res.data.access_token){
        saveIsAccess("true");
        navigate("/");       
        localStorage.setItem("token",res.data.access_token) 
      }else{
        toast.error(res.data)
      }
    })
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        action=""
        className="w-fit px-10 py-5 bg-slate-500 gap-5 rounded-xl border flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid">
          <label className="flex mb-2 text-base text-gray-300" htmlFor="userName">userName:</label>
          <input
            id="userName"
            className="w-64 pl-3 py-2 rounded-md border"
            {...register("userName")}
            type="text"
          />
        </div>
        <div className="grid">
           <label className="flex mb-2 text-base text-gray-300" htmlFor="password">userName:</label>
          <input
            id="password"
            className="w-64 pl-3 py-2 rounded-md border"
            {...register("password")}
            type="password"
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 text-white  rounded-lg bg-green-500"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
