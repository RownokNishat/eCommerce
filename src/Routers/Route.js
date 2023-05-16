import Main from "../Layout/Main";
import Landing from "../Pages/LandingPage/Landing";
import Login from "../Pages/LoginPage/Login";
import Registration from "../Pages/RegistrationPage/Registration";
const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Landing></Landing>,
      },
      {
        path: "/loginPage",
        element: <Login></Login>,
      },
      {
        path: "/registrationPage",
        element: <Registration></Registration>,
      },
    ],
  },
]);
export default router;
