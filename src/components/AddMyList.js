import api from "../Services/api";
import { useSelector } from "react-redux";

export default function AddMyList({item, movie_tv_myList}) {

    console.log(movie_tv_myList);

    const userState = useSelector(state => state);
    const email = userState.user.email;

    async function listHandler() {

        switch(movie_tv_myList){
            case 'movie':

                try{
                    await api.post('list/addMyMovieList', {
                        email,
                        myMovieList: item.data
                    });
                    console.log('filme adicionado');

                } catch(err){
                    alert(err);
                };

            break;

            case 'tv':

                try{
                    await api.post('list/addMyTvList', {
                        email,
                        myTvList: item.data
                    });
                    console.log('série adicionada');

                } catch(err){
                    alert(err);
                };
                
            break;

            default:
                return;
        };
    };

    return (
        <p className="featured--mylist-btn" onClick={listHandler} >&#43; Minha Lista</p>
    );

};