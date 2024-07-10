import {useRoutes} from "react-router-dom";
import {route} from "./routes";
import "./App.css";
import {HashRouter} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {useLocalStorage} from "@uidotdev/usehooks";
import {updateLocalPatientIHistoty} from "./utility/updateLocalPatientIHistoty.js";
import {initialState} from "./context/context.jsx";

function App() {
    return (
        <>
            <HashRouter basename="/">
                <AppRoutes/>
            </HashRouter>
        </>
    );
}

const AppRoutes = () => {
    const [tour, setTour] = useLocalStorage("tour")
    getVersion()
    if (tour === undefined) setTour(true)
    const routes = useRoutes(route);
    return (

        <div className={"pb-16"}>
            <ToastContainer/>
            {routes}
        </div>
    );
};
export default App;
const getVersion = () => {
    const [version, setVersion] = useLocalStorage("version")
    if (version === undefined) {
        setVersion(1)
    }
    if (version !== 1) {
        localStorage.removeItem("patients")
    }
}