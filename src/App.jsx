import { useRoutes } from "react-router-dom";
import { route } from "./routes";
import "./App.css";

function App() {
  const routes = useRoutes(route);


  return <div>{routes}</div>;
}

export default App;
