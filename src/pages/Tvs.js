import { useEffect, useState } from "react";
import MovieRow from "../components/MovieRow";
import Tmdb from "../Tmdb";
import '../styles/pageStyles/MoviesTvs.css';
import FeaturedMovie from "../components/FeaturedMovie";
import Nav from "../components/Nav";

export default function Tvs() {

    const [tvList, setTvList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackNav, setBlackNav] = useState(false);
    const isMovie = false;

    useEffect(() => {

        async function loadAll() {
            //pegando a lista
            let list = await Tmdb.getTvList();
            setTvList(list);

            //pegando o featuredMovie
            //peguei do originals netflix porque possui mais conteúdo
            let originals = list.filter(item => item.slug === "originals");
            let randomChoose = Math.floor(Math.random() * (originals[0].items.data.results.length - 1));
            let choosen = originals[0].items.data.results[randomChoose];
            let choosenInfo = await Tmdb.getMovieInfo(choosen.id, '/tvs');
            setFeaturedData(choosenInfo);
        };

        loadAll();

        document.title = "Séries";

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
                {tvList.map((movies, i) => {
                    return (
                        <MovieRow key={i} title={movies.title} items={movies.items.data} isMovie={isMovie} />
                    )
                })}
            </section>

        </div>
    );
};