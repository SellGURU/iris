import { useRoutes } from "react-router-dom";
import { route } from "./routes";
import "./App.css";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter basename="/">
        <AppRoutes />
      </HashRouter>
    </>
  );
}
const AppRoutes = () => {
  const routes = useRoutes(route);
  return routes;
};
export default App;
