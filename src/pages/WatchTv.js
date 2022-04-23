import '../styles/pageStyles/Watch.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tmdb from "../Tmdb";
import Nav from '../components/Nav';


export default function Watch() {

    //caso a nav esteja na rota watch, ela não pegue os links 'filmes' e 'videos'
    const params = useParams().id;
    const [item, setItem] = useState(null);
    const isMovie = false;

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


    return (
        <div className="watch" style={{
            backgroundImage: item && `url(https://image.tmdb.org/t/p/original${item.data.backdrop_path})`
        }}>
            <Nav isMovie={isMovie}></Nav>

            <div className='watch--fade'></div>

            <div className='watch--movie'>
                <div className="watch--title">
                    {item && item.data.title}
                </div>
                <a href='#' className='watch--btn'>Assistir</a>
                <div className="watch--info">
                    <div className='watch--average'>{item && item.data.vote_average}</div>
                    <div>{item && release_date.getFullYear()}</div>
                    <div>{item && item.data.seasons.length} Temporada{item && seasonsOrSeason(item.data.seasons.length)}</div>
                </div>
                <div className='watch--overview'>
                    <div>{item && item.data.overview}</div>
                </div>
                <div className='watch--genres'>
                    <strong>Gêneros: </strong>{item && genres.join(', ')}
                </div>

            </div>
        </div>
    );
};