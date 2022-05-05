import '../styles/pageStyles/MyList.css';
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import api from "../Services/api";
import MovieRowList from "../components/MovieRowList";
import { useSelector } from "react-redux";

export default function MyList() {

    const userState = useSelector(state => state);

    const movie_tv_myList = 'my-list';
    const [movieList, setMovieList] = useState([]);
    const [tvList, setTvList] = useState([]);

    useEffect(() => {

        async function loadAll() {

            try {

                await api.post('list/getMovieList', { email: userState.user.email }).then(res => {
                    setMovieList(res.data);
                });

                await api.post('list/getTvList', {email: userState.user.email}).then(res => {
                    setTvList(res.data);
                })

            } catch (err) {
                alert(err);
            }

        };

        loadAll();

    }, [])

    return (
        <div>
            <Nav movie_tv_myList={movie_tv_myList}></Nav>

            <section className="rows">

                <MovieRowList title={'Meus Filmes'} items={movieList} movie_tv_myList={'movie'} />
                <MovieRowList title={'Minhas Séries'} items={tvList} movie_tv_myList={'tv'} />

            </section>
        </div>
    );

};