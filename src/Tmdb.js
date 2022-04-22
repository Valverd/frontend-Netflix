import axios from "axios";
const API_KEY = 'abe5fbbb177409d306ee9bb26340aff3';
const API_BASE = 'https://api.themoviedb.org/3';

//estes são dados do site Tmdb, que possui api para requisição de filmes e seriados.

const basicFetch = async (endpoint) => {
    const req = await axios(`${API_BASE}${endpoint}`);
    return req;
};

const Tmdb = {

    getMovieList: async () => {

        return [

            {
                slug: 'trending',
                title: 'Em alta',
                items: await basicFetch(`/trending/movie/week?language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            }

        ];

    }, 

    getTvList: async () => {

        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_networks=213&language=pt-BR&api_key=${API_KEY}`),
            },

            {
                slug: 'trending',
                title: 'Em alta',
                items: await basicFetch(`/trending/tv/week?language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/tv?with_genres=10759&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/tv?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'animation',
                title: 'Animação',
                items: await basicFetch(`/discover/tv?with_genres=16&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'drama',
                title: 'Drama',
                items: await basicFetch(`/discover/tv?with_genres=18&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'sci-fi & fantasy',
                title: 'Fantasia e Sci-fi',
                items: await basicFetch(`/discover/tv?with_genres=10765&language=pt-BR&api_key=${API_KEY}`)
            }


        ]

    },

    getMovieInfo: async (movieID, type) => {

        let info = {};

        if(movieID) {
            switch(type) {
                case '/movies':
                    info = await basicFetch(`/movie/${movieID}?language=pt-BR&api_key=${API_KEY}`);
                    return info;
                case '/tvs':
                    info = await basicFetch(`/tv/${movieID}?language=pt-BR&api_key=${API_KEY}`);
                    return info;
                default:
                    return info;
            };
        };

    }
    
};

export default Tmdb;