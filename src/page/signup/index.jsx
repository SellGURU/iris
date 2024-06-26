import {useForm} from "react-hook-form";
import {redirect, useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";
import {Outlet} from "react-router-dom";

const SignUp = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    let [isAccess, saveIsAccess] = useLocalStorage("access");
    //   console.log("isAccess l", isAccess);
    const onSubmit = (data) => {
        if (data.userName === "admin" && data.password === "1823648364") {
            saveIsAccess("true");
            navigate("/");
        }
    };
    //  <div className="w-full h-screen flex items-center justify-center">
    //     <form
    //       action=""
    //       className="w-fit px-10 py-5 bg-slate-500 gap-5 rounded-xl border flex flex-col"
    //       onSubmit={handleSubmit(onSubmit)}
    //     >
    //       <input
    //         className="w-64 pl-3 py-2 rounded-md border"
    //         {...register("userName")}
    //         type="text"
    //       />
    //       <input
    //         className="w-64 pl-3 py-2 rounded-md border"
    //         {...register("password")}
    //         type="password"
    //       />
    //       <button
    //         type="submit"
    //         className="py-2 px-4 text-white  rounded-lg bg-green-500"
    //       >
    //         login
    //       </button>
    //     </form>
    //   </div>
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default SignUp;
