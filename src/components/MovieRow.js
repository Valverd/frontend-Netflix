import '../styles/componentStyles/MovieRow.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MovieRow({ title, items, location, isMovie }) {

    const [scrollX, setScrollX] = useState(0);

    const handleLeftScroll = () => {
        let x = scrollX + window.innerWidth / 2;
        if(x > 0) {
            x = 0
        };

        setScrollX(x);
    };

    const handleRigthScroll = () => {

        let x = scrollX - window.innerWidth / 2;
        let movieRowWidth = items.results.length * 150;
        if(x < (window.innerWidth - movieRowWidth)) {
            x = (window.innerWidth - movieRowWidth - 60); // o 60 é padding que eu coloquei na lista
        };

        setScrollX(x);
    };

    return (

        <div className="movieRow">
            <h2>{title}</h2>

            <div className='movieRow--left' onClick={handleLeftScroll}>
                <NavigateBeforeIcon style={{fontSize:50}} />
            </div>

            <div className='movieRow--rigth' onClick={handleRigthScroll}>
                <NavigateNextIcon style={{fontSize:50}} />
            </div>

            <div className="movieRow--listarea">

                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {
                        items.results.length > 0 && items.results.map((movie, i) => {
                            return (
                                <Link className="movieRow--item" key={i} to={isMovie ? `/watch/movies/` + movie.id : `/watch/tvs/` + movie.id} state={location}>
                                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={`${movie.title}`} />
                                </Link>
                            )
                        })
                    }
                </div>

            </div>
        </div>

    )

}