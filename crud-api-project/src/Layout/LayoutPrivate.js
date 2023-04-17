import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";

const LayautPrivate = () => {

    const {user} = useUserContext();


  return (
    <>
    {
      user ? <Outlet /> : <Navigate to= "/" />
    }
      
    </>
  );
};

export default LayautPrivate;
