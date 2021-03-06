import { useDispatch } from "react-redux";
import { logoutAction } from "../actions/loginActions";
import '../styles/componentStyles/ButtonLogout.css';

export default function ButtonLogout() {

    const dispatch = useDispatch();

    return(
        
        <p className="link-nav" onClick={() => {
            localStorage.removeItem('auth_token');
            dispatch(logoutAction());
        }}>Sair</p>
    )

}