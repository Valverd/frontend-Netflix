import LoginForm from "../components/LoginForm";
import '../styles/pageStyles/Home.css';

export default function Home() {

    return (
        <div className="home">
            <div className="modal">
                <div className="logo-div">
                    <img alt="Logo Netflix" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" />
                </div>
                <LoginForm className="loginForm" />
            </div>
        </div>

    )

}