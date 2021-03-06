import '../styles/pageStyles/Watch.css';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tmdb from "../Tmdb";
import Nav from '../components/Nav';
import AddMyList from '../components/AddMyList';


export default function Watch() {

    //caso a nav esteja na rota watch, ela não pegue os links 'filmes' e 'videos'
    const params = useParams().id;
    const [item, setItem] = useState(null);
    const movie_tv_myList = 'tv';

    useEffect(() => {

        async function getInfo() {
            let info = await Tmdb.getMovieInfo(params, '/tvs');
            setItem(info);
        }

        getInfo();

    }, []);


    let release_date = item ? new Date(item.data.first_air_date) : '';
    let genres = [];
    if (item) {
        document.title = `Séries - ${item.data.name}`
        for (let i in item.data.genres) {
            genres.push(item.data.genres[i].name);
        };
    };
    let seasonsOrSeason = (value) => {
        if(value > 1) {
            return 's';
        }
        return '';
    }


    return item ? (
        <div className="watch" style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.data.backdrop_path})`
        }}>
            <Nav movie_tv_myList={movie_tv_myList}></Nav>

            <div className='watch--fade'></div>

            <div className='watch--movie'>
                <div className="watch--title">
                    {item.data.name}
                </div>
                <a href='#' className='featured--watch-btn'>Assistir</a>
                <Link to={'#'}>
                    <AddMyList item={item} movie_tv_myList={movie_tv_myList} />
                </Link>
                <div className="watch--info">
                    <div className='watch--average'>{item.data.vote_average}</div>
                    <div>{release_date.getFullYear()}</div>
                    <div>{item.data.seasons.length} Temporada{seasonsOrSeason(item.data.seasons.length)}</div>
                </div>
                <div className='watch--overview'>
                    <div>{item.data.overview}</div>
                </div>
                <div className='watch--genres'>
                    <strong>Gêneros: </strong>{genres.join(', ')}
                </div>

            </div>
        </div>
    ) 
    
    :

    (
        <div>Carregando...</div>
    )
};
