import '../styles/componentStyles/LoginForm.css';
import api from "../Services/api";
import { useState } from 'react';
import { loginAction } from "../actions/loginActions";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";


export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function loginHandler(e) {
        e.preventDefault();

        try {

            await api.post('user/login', {
                email,
                password
            }).then((user) => {
                    dispatch(loginAction(user.data));
                    localStorage.setItem('auth_token', JSON.stringify(user.data.token));
                    navigate('/movies');
            }).catch(() => {
                    alert("Email ou senha digitados incorretamente!");
                });

        } catch (err) {
            alert(err);
        };
    };


    return (
        <form className="loginForm">
            <h1 className='title-loginForm'>Entrar</h1>
            <input className='input' type='email' name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            <input className='input' type='password' name="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}></input>
            <button className='btn-loginForm' onClick={loginHandler}>Entrar</button>
            <p className='p-loginForm'>Novo por aqui? <Link className='link-loginForm' to={'/register'}>Registre-se</Link> </p>
        </form>
    );

}