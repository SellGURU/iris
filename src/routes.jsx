import FaceMesh from "./page/faceMash";
import Login from "./page/login";
import Forget from './page/forgetPassword.jsx'
import Register from "./page/Register";
import UploadFaceMash from "./page/UploadFaceMash";
import SignUp from "./page/signup";
import GetCode from "./page/signup/getCode";
import GetNumberPage from "./page/signup/getNumberPage";
import WelcomePage from "./page/signup/welcome";
import {IsLogin} from "./utility/isLogin.jsx";
import {Tour} from "./page/tour/Tour.jsx";
import {PatientInformation} from "./page/PatientInformation/patientInformation.jsx";
import Header from "./layout/header.jsx";
import {ScanHistory} from "./page/ScanHistory/ScanHistory.jsx";
import FaceScaned from "./page/FaceScaned/faceScanResult.jsx";
import {PaymentHistory} from "./page/payment/paymentHistory.jsx";
import Account from "./page/account/index.jsx";

export const route = [
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
    {path: "/forgetPass", element: <Forget/>},
    {
        path: "/", element:
            <Header/>
        , children: [
            {
                path: "", element:
                    <IsLogin>
                        <ScanHistory/>
                    </IsLogin>
            },
            {
                path: "/account", element:
                    <IsLogin>
                        <Account/>
                    </IsLogin>
            },            
            {
                path: "faceMashFile", element:
                    <IsLogin>
                        <UploadFaceMash/>
                    </IsLogin>
            }, {
                path: "payment", element:
                    <IsLogin>
                        <PaymentHistory/>
                    </IsLogin>
            },
            {
                path: 'result',
                element:
                    <IsLogin>
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
                element:
                    <IsLogin>
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
