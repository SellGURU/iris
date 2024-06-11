import FaceMesh from "./page/faceMash";
import Login from "./page/login";
import Login2 from './page/Login2';

export const route = [
  { path: "", element: <FaceMesh /> },
  { path: "/login", element: <Login /> },
  { path: "/login2", element: <Login2 /> },
];
