import '../styles/componentStyles/FeaturedMovie.css';

export default function FeaturedMovie({item, isMovie}) {

    let seasons = ` Temporada${item.data.number_of_seasons !== 1 ? 's' : ''}`;

    let genres = [];
    for(let i in item.data.genres){
        genres.push(item.data.genres[i].name);
    };
    
    let firstDate = new Date(item.data.first_air_date);
    let release_date = new Date(item.data.release_date);
    let overview = item.data.overview;

    if(item.data.overview.length > 200){
        overview = item.data.overview.substr(0, 50) + "...";
    }    

    return(
        <section className="featured" style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.data.backdrop_path})`
        }}>

        <div className='featured--vertical'>
            <div className='featured--horizontal'>
                <div className='featured--name'>{isMovie ? item.data.title : item.data.name}</div>
                <div className='featured--info'>
                    <div className='featured--points'>{item.data.vote_average}</div>
                    <div className='featured--year'>{isMovie ? release_date.getFullYear() : firstDate.getFullYear()}</div>
                    <div className='featured--seasons'>{isMovie ? '' : item.data.number_of_seasons + seasons}</div>
                </div>
                <div className='featured--description'>{overview}</div>
                <div className={isMovie? 'featured--info' : ''}>
                        
                </div>
                <div className='featured--buttons'>
                    <a href={isMovie ? `/watch/movies/` + item.data.id : `watch/tvs/` + item.data.id} className="featured--watch-btn">&#9658; Assistir</a>
                    <a href='#' className="featured--mylist-btn">&#43; Minha Lista</a>
                </div>
                <div className='featured--genres'><strong>Gêneros</strong>: {genres.join(', ')} </div>
            </div>
        </div>

        </section>
    )

}