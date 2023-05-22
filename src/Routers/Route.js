import Main from "../Layout/Main";
import Cart from "../Pages/Cart/Cart";
import Landing from "../Pages/LandingPage/Landing";
import Login from "../Pages/LoginPage/Login";
import Registration from "../Pages/RegistrationPage/Registration";
import PurchaseHistory from "../Pages/PurchaseHistory/PurchaseHistory";
import Profile from "../Pages/UserProfile/Profile";
import CRUDProduct from "../Pages/Admin/CRUDProduct/CRUDProduct";
import SearchProducts from "../Component/SearchProducts/SearchProducts";
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
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/search",
        element: <SearchProducts></SearchProducts>,
      },
      {
        path: "/purchaseHistory",
        element: <PurchaseHistory></PurchaseHistory>,
      },
      {
        path: "/userProfile",
        element: <Profile></Profile>,
      },
      {
        path: "/adminPage",
        element: <CRUDProduct></CRUDProduct>,
      },
    ],
  },
]);
export default router;
