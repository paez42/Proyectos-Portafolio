import { useRouteError } from "react-router-dom";

const NotFound = () => {

    const error = useRouteError()
    console.log(error)

    return ( "not Found" );
}
 
export default NotFound;