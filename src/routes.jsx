import FaceMesh from "./page/faceMash";
import Login from "./page/login";
import Login2 from "./page/Login2";
import UploadFaceMash from "./page/UploadFaceMash";
import SignUp from "./page/signup";
import GetCode from "./page/signup/getCode";
import GetNumberPage from "./page/signup/getNumberPage";
import WelcomePage from "./page/signup/welcome";
import {IsLogin} from "./utility/isLogin.jsx";
import {Tour} from "./page/tour/Tour.jsx";
import {PatientInformation} from "./page/PatientInformation/patientInformation.jsx";
import Header from "./layout/header.jsx";

export const route = [
    {path: "/login", element: <Login/>},
    {path: "/login2", element: <Login2/>},
    {
        path: "/", element: <Header/>, children: [
            {
                path: "faceMashFile", element:
                    <IsLogin>
                        <UploadFaceMash/>
                    </IsLogin>
            },
            {
                path: "PatientInformation", element:
                    <PatientInformation/>
            },
            {
                path: "facecamera", element:
                    <IsLogin>
                        <FaceMesh/>
                    </IsLogin>
            },
            {
                path: "tour",
                element: <Tour/>
            },
        ]
    },

    {
        path: "/SignUp",
        element: <SignUp/>,
        children: [
            {path: "", element: <WelcomePage/>},
            {path: "getnumber", element: <GetNumberPage/>},
            {path: "getnumber", element: <GetCode/>},
            {path: "test", element: <h1>test</h1>},
        ],
    },
];
