import FaceMesh from "./page/faceMash";
import Login from "./page/login";

export const route = [
  { path: "", element: <FaceMesh /> },
  { path: "/login", element: <Login /> },
];
