import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import api from "../Services/api";


export default function PrivateRoute({ children }) {
    
    const navigate = useNavigate();
    const location = useLocation();
    const userState = useSelector(state => state);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('auth_token'));

        async function getToken() {
            if (token) {
                api.defaults.headers.common['authorization'] = token;
                await api.get('/token')
                .then(() => {
                    setLoading(false);
                })
                .catch(() => {
                    navigate('/');
                });
            } else {
                navigate('/');
            }
        };

        getToken();

    }, []);


    if (loading) {
        return <h1>Loading...</h1>
    }



    return (

        userState.isLogged ? children : <Navigate to={"/"} state={location} />

    );
};

//estou tentando pegar os dados da rota token para carregar a pagina privada quando der reload.