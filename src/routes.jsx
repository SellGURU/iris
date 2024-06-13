import FaceMesh from "./page/faceMash";
import SignUp from "./page/signup";
import GetCode from "./page/signup/getCode";
import GetNumberPage from "./page/signup/getNumberPage";
import WelcomePage from "./page/signup/welcome";

export const route = [
  { path: "", element: <FaceMesh /> },
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
