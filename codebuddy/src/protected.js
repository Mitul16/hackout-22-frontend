import { Navigate } from "react-router-dom";
import {toast} from 'react-hot-toast'

const Protected = ({ isLoggedIn, children }) => {

    if (isLoggedIn) 
    {
        return children;
    }
    
    toast.error("You are not logged in!")
    return <Navigate to="/login" replace />;

};

export default Protected;