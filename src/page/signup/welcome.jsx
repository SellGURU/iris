import { Link } from "react-router-dom";
import ButtonPrimary from "../../components/button/buttonPrimery";
import ButtonSecondary from "../../components/button/buttonSecondary";
import { useNavigate} from "react-router-dom";
const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: "" }}
      className="w-full h-screen bg-no-repeat flex items-center justify-center bg-cover bg-[url('/image/login/bg-image.svg')] bg-fixed	"
    >
      <div className="bg-[#edfafe] px-24 gap-10 py-10 flex-col rounded-md flex items-center justify-center ">
        <img
          className="w-[609px] h-[204px]"
          src="/image/login/IRIS.svg"
          alt=""
        />
        <div className="flex items-center justify-center flex-col gap-5">
          <p className="text-center text-[#606060] font-normal text-lg w-[609px]">
            By tapping ‘Create account’ or ‘Login in’, you agree to our Terms.
            Learn how we process your data in our Privacy Policy and Cookies
            Policy.
          </p>
          <ButtonPrimary>Create Account</ButtonPrimary>
          <ButtonSecondary onClickHandler={() => {
            navigate("/login")
          }}> Log in</ButtonSecondary>
          <Link to={""} className=" text-[14px] font-normal text-[#544BF0]">
            Trouble signing in?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
