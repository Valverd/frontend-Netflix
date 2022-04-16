import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import '../styles/componentStyles/RegisterForm.css';

export default function FormRegister() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister(e) {
        e.preventDefault();
        
        await api.post('/user/register', {
            name,
            email,
            password
        })
            .then(() => {
                navigate('/');
            })
            .catch(() => {
                alert('Email já cadastrado!');
            })

    }

    return (

        <form className="registerForm">
            <h1 className='register-title'>Registrar</h1>
            <input className="input-register" placeholder="Nome" name="name" type={'text'} onChange={e => setName(e.target.value)} />
            <input className="input-register" placeholder="Email" name="email" type={'email'} onChange={e => setEmail(e.target.value)} />
            <input className="input-register" placeholder="Senha" name="password" type={'password'} onChange={e => setPassword(e.target.value)} />
            <button className='btn-registerForm' onClick={handleRegister}>Enviar</button>
        </form>

    );

};