import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Tmdb from "../Tmdb";


export default function Watch() {

    const params = useParams().id;
    const location = useLocation();
    const movieOrTv = location.state.pathname;
    const [item, setItem] = useState([]);


    useEffect(() => {

        async function loadInfo(){
            let loadInfo = await Tmdb.getMovieInfo(params, movieOrTv);
            setItem(loadInfo);
            console.log(item)
        }
        
        loadInfo();

    }, []);

    return(
        <div>
        </div>
    );
};