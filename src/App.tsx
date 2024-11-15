import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { CountryList } from "./pages/CountryList";
import { StateList } from "./pages/StateList";
import { DistrictList } from "./pages/DistrictList";
import { MainLayout } from "./components/MainLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
        path: "/country",
        element: <CountryList />
      },
      {
        path:"/state",
        element:<StateList/>
      },
      {
        path:"/district",
        element:<DistrictList/>
      }
    ],
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
