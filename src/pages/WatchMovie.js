import '../styles/pageStyles/Watch.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tmdb from "../Tmdb";
import Nav from '../components/Nav';


export default function Watch() {

    //caso a nav esteja na rota watch, ela não pegue os links 'filmes' e 'videos'
    const params = useParams().id;
    const [item, setItem] = useState(null);
    const movie_tv_myList = 'movie';

    useEffect(() => {

        async function getInfo() {
            let info = await Tmdb.getMovieInfo(params, '/movies')
            setItem(info);
        };

        getInfo();

    }, []);


    let release_date = item ? new Date(item.data.release_date) : '';
    let runtime = item ? runtimeFunc(item.data.runtime) : '';
    let genres = [];

    if (item) {
        document.title = `Filmes - ${item.data.title}`

        for (let i in item.data.genres) {
            genres.push(item.data.genres[i].name);
        };
    }

    function runtimeFunc(time) {
        let hr = Math.floor(time / 60);
        let minutes = time % 60;
        let hrs = hr + 'h ' + minutes + 'min';
        return hrs;
    }

    return item ? (
        <div className="watch" style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.data.backdrop_path})`
        }}>

            <Nav movie_tv_myList={movie_tv_myList}></Nav>

            <div className='watch--fade'></div>

            <div className='watch--movie'>
                <div className="watch--title">
                    {item.data.title}
                </div>
                <a href='#' className='watch--btn'>Assistir</a>
                <div className="watch--info">
                    <div className='watch--average'>{item.data.vote_average}</div>
                    <div>{release_date.getFullYear()}</div>
                    <div>{runtime}</div>
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
    
    : //caso item não tenha sido carregado ele para para o carregando.
    
    (
        <div>Carregando...</div>
    );
};
