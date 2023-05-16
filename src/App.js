import "./App.css";
import Route from "./Routers/Route";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div>
      <RouterProvider router={Route}></RouterProvider>
    </div>
  );
}

export default App;
