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
    const isMovie = true;

    useEffect(() => {

        async function loadAll() {
            //pegando a lista
            let list = await Tmdb.getMovieList();
            setMovieList(list);

            //pegando o featuredMovie
            //peguei do originals netflix porque possui mais conteúdo
            let trending = list.filter(item => item.slug === "trending");
            let randomChoose = Math.floor(Math.random() * (trending[0].items.data.results.length - 1));
            let choosen = trending[0].items.data.results[randomChoose];
            let choosenInfo = await Tmdb.getMovieInfo(choosen.id, '/movies');
            setFeaturedData(choosenInfo);
        };

        loadAll();

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

            <Nav black={blackNav} isMovie={isMovie} />

            {featuredData &&
                <FeaturedMovie item={featuredData} isMovie={isMovie} />
            }

            <section className="lists">
                {movieList.map((movies, i) => {
                    return (
                        <MovieRow key={i} title={movies.title} items={movies.items.data} isMovie={isMovie} />
                    )
                })}
            </section>

        </div>
    );
};