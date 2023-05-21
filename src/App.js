import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Route from "./Routers/Route";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div>
      <ToastContainer></ToastContainer>
      <RouterProvider router={Route}></RouterProvider>
    </div>
  );
}

export default App;
