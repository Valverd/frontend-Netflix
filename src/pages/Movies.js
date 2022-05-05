import { useEffect, useState } from "react";
import MovieRow from "../components/MovieRow";
import Tmdb from "../Tmdb";
import '../styles/pageStyles/MoviesTvs.css';
import FeaturedMovie from "../components/FeaturedMovie";
import Nav from "../components/Nav";

export default function Movies() {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackNav, setBlackNav] = useState(false);
    const movie_tv_myList = 'movie';

    useEffect(() => {

        async function loadAll() {
            //pegando a lista
            let list = await Tmdb.getMovieList();
            setMovieList(list);

            //pegando o featuredMovie
            let trending = list.filter(item => item.slug === "trending");
            let randomChoose = Math.floor(Math.random() * (trending[0].items.data.results.length - 1));
            let choosen = trending[0].items.data.results[randomChoose];
            let choosenInfo = await Tmdb.getMovieInfo(choosen.id, '/movies');
            setFeaturedData(choosenInfo);
        };

        loadAll();

        document.title = "Filmes";

    }, [])


    useEffect(() => {

        let scrollListenner = () => {
            if(window.scrollY > 10) {
                setBlackNav(true);
            } else{
                setBlackNav(false);
            };
        };

        window.addEventListener('scroll', scrollListenner);


    }, []);


    return (
        <div className="container">

            <Nav black={blackNav} movie_tv_myList={movie_tv_myList} />

            {featuredData &&
                <FeaturedMovie item={featuredData} movie_tv_myList={movie_tv_myList} />
            }

            <section className="lists">
                {movieList.map((movies, i) => {
                    return (
                        <MovieRow key={i} title={movies.title} items={movies.items.data} movie_tv_myList={movie_tv_myList} />
                    )
                })}
            </section>

        </div>
    );
};