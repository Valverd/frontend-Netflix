import api from "../Services/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function AddMyList({ item, movie_tv_myList }) {

    const userState = useSelector(state => state);
    const email = userState.user.email;
    const [checkList, setCheckList] = useState(false);

    //aqui eu checo se o filme ou série ja tem no banco de dados para setar se eu adiciono ou removo o item da minha lista
    useEffect(() => {
        async function check() {

            switch (movie_tv_myList) {
                case 'movie':

                    await api.post('list/getMovieList', { email })
                        .then(res => {
                            let movieList = res.data;
                            let check = movieList.some(movie => movie.id === item.data.id);
                            if (check) {
                                setCheckList(true);
                            } else {
                                setCheckList(false);
                            }
                        });

                    break;

                case 'tv':

                    await api.post('list/getTvList', { email })
                        .then(res => {
                            let tvList = res.data;
                            let check = tvList.some(tv => tv.id === item.data.id);
                            if (check) {
                                setCheckList(true);
                            } else {
                                setCheckList(false);
                            };
                        });
                    break;

                default:
                    return;
            }

        };

        check();

    }, [])


    async function removeList() {
        switch (movie_tv_myList) {
            case 'movie':

                await api.post('list/getMovieList', { email })
                    .then(async res => {
                        let movieList = res.data;
                        movieList = movieList.filter(movie => movie.id !== item.data.id)
                        await api.post('list/removeMyMovieList', { email, myMovieList: movieList });
                        setCheckList(false);
                    });

                break;

            case 'tv':

                await api.post('list/getTvList', { email })
                    .then(async res => {
                        let tvList = res.data;
                        tvList = tvList.filter(tv => tv.id !== item.data.id)
                        await api.post('list/removeMyTvList', { email, myTvList: tvList });
                        setCheckList(false);
                    });

                break;

            default:
                return;
        }
    }

    async function addList() {

        switch (movie_tv_myList) {
            case 'movie':

                await api.post('list/addMyMovieList', {
                    email,
                    myMovieList: item.data
                });
                console.log(email);
                setCheckList(true);

                break;

            case 'tv':

                await api.post('list/addMyTvList', {
                    email,
                    myTvList: item.data
                });

                setCheckList(true);

                break;

            default:
                return;
        };
    };

    return checkList ? (<p className="featured--mylist-btn" onClick={removeList} >- Remover da Minha Lista</p>)

        :

        (<p className="featured--mylist-btn" onClick={addList} >&#43; Minha Lista</p>)

};