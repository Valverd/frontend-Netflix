import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../styles/componentStyles/Nav.css';
import ButtonLogout from "./ButtonLogout";

export default function Nav({ black, movie_tv_myList }) {

    const userState = useSelector(state => state);
    // const name = userState.user.name;

    return (
        <nav className={black ? 'nav black' : 'nav'}>
            <div className="left-links-nav">
                <Link className="link-logo" to={'/movies'}>
                    <img alt="Logo Netflix" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" />
                </Link>

                <Link className={movie_tv_myList == 'movie' ? 'link-nav borderBottom' : 'link-nav'} to={'/movies'}>
                    <p>Filmes</p>
                </Link>

                <Link className={movie_tv_myList == 'tv' ? 'link-nav borderBottom' : 'link-nav'} to={'/tvs'}>
                    <p>Séries</p>
                </Link>

                <Link className={movie_tv_myList == 'my-list' ? 'link-nav borderBottom' : 'link-nav'} to={'/my-list'}>
                    <p>Minha Lista</p>
                </Link>

            </div>

            <div className="right-links-nav">
                <Link className="link-perfil" to={'/movies'}>
                    <img alt="Foto de Perfil" src="https://i.pinimg.com/originals/61/54/76/61547625e01d8daf941aae3ffb37f653.png" />
                </Link>
                {/* <p>{name.split(' ').slice(0,1)}</p> */}
                {/* <ButtonLogout></ButtonLogout> */}
                <ButtonLogout />
            </div>
        </nav>
    )

}