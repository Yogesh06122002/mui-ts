// import Login from './pages/Login.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { Appbar } from "./components/Appbar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Appbar />,
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
