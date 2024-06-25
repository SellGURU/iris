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
import {MainPage} from "./page/mainPage.jsx";
import { Scan } from "./page/Scan/Scan.jsx";
import FaceScaned from "./page/FaceScaned/index.jsx";

export const route = [
    {path: "/login", element: <Login/>},
    {path: "/login2", element: <Login2/>},
    {
        path: "/", element:
            <Header/>

            , children: [
            {
                path: "", element:
                <IsLogin>
                   <Scan/>
                </IsLogin>
            },
            {
                path: "faceMashFile", element:
                    <IsLogin>
                        <UploadFaceMash/>
                    </IsLogin>
            },
            {
                path:'result',

                element:<IsLogin>

                    <FaceScaned></FaceScaned>
                </IsLogin>
            },
            {
                path: "PatientInformation", element:
                    <IsLogin>
                    <PatientInformation/>
                    </IsLogin>
            },
            {
                path: "facecamera", element:
                    <IsLogin>

                        <FaceMesh/>
                    </IsLogin>
            },
            {
                path: "tour",

                element:<IsLogin>
                    <Tour/>
                </IsLogin>
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
