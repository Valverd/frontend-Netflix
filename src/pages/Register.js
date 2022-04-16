import '../styles/pageStyles/Register.css'
import { Link } from "react-router-dom";
import RegisterForm from '../components/RegisterForm';

export default function Register() {

    return(
        <div className="container">
            <nav className="nav-register">
                <h1 className="logo">NETFLIX</h1>
                <Link className="link-login" to={'/'}>Entrar</Link>
            </nav>

            <div className='form'>
                <RegisterForm className="registerForm" />
            </div>
        </div>
    )

}