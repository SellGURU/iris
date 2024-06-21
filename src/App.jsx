import {useRoutes} from "react-router-dom";
import {route} from "./routes";
import "./App.css";
import {HashRouter} from "react-router-dom";
import HeaderRegister from "./layout/header.jsx";

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
    const routes = useRoutes(route);
    return (
        <div className={"pb-16"}>
            <div className={""}>

                <HeaderRegister/>
            </div>
            {routes}
        </div>
    );
};
export default App;
