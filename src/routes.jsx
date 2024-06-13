import FaceMesh from "./page/faceMash";
import Login from "./page/login";
import Login2 from "./page/Login2";
import UploadFaceMash from "./page/UploadFaceMash";
import SignUp from "./page/signup";
import GetCode from "./page/signup/getCode";
import GetNumberPage from "./page/signup/getNumberPage";
import WelcomePage from "./page/signup/welcome";

export const route = [
  { path: "", element: <FaceMesh /> },
  { path: "", element: <FaceMesh /> },
  { path: "/login", element: <Login /> },
  { path: "/login2", element: <Login2 /> },
  { path: "/faceMashFile", element: <UploadFaceMash /> },
  {
    path: "/SignUp",
    element: <SignUp />,
    children: [
      { path: "", element: <WelcomePage /> },
      { path: "getnumber", element: <GetNumberPage /> },
      { path: "getnumber", element: <GetCode /> },
      { path: "test", element: <h1>test</h1> },
    ],
  },
];
