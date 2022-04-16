import { useEffect, useState } from "react";
import MovieRow from "../components/MovieRow";
import Tmdb from "../Tmdb";
import '../styles/pageStyles/MoviesTvs.css';
import FeaturedMovie from "../components/FeaturedMovie";
import Nav from "../components/Nav";
import { useLocation } from "react-router-dom";

export default function Tvs() {

    const [tvList, setTvList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackNav, setBlackNav] = useState(false);
    const location = useLocation();
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
                        <MovieRow title={movies.title} items={movies.items.data} key={i} location={location} />
                    )
                })}
            </section>

        </div>
    );
};