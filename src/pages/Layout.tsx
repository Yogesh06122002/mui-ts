import { Outlet } from "react-router-dom"
import { Appbar } from "../components/Appbar"


export const Layout = () => {
  return (
    <>
   <Appbar/>
   <Outlet/>
    </>
  )
}
