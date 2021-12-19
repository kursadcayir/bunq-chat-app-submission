
import { Navigate } from "react-router-dom";
import {useStore} from '../../store';

const GuardedRoute = ({ children }) => {
    const user = useStore(store => store.user);
    return user ? children : <Navigate to="/login" />;
}

export default GuardedRoute;
