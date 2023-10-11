export const navTitles = {
    'TV': 'Top Rated TV',
    'Movie': 'Top Rated Movies',
    'Popular': 'Trending Now',
}

export const titles = {
    'Netflix Originals': {
        fetchUrl: 'fetchNetflixOriginals',       
        type: 'tv'
    },
    'Trending Now': {
        fetchUrl: 'fetchTrending',
    },
    'Top Rated Movies': {
        fetchUrl: 'fetchTopRated',
        type: 'movie'
    },
    'Top Rated TV': {
        fetchUrl: 'fetchTopRatedTV',
        type: 'tv'
    },
    'Popular TV': {
        fetchUrl: 'fetchPopularTV',
        type: 'tv'
    },
    'Action Movies': {
        fetchUrl: 'fetchActionMovies',
        type: 'movie'
    },
    'Comedy Movies': {
        fetchUrl: 'fetchComedyMovies',
        type: 'movie'
    },
    'Horror Movies': {
        fetchUrl: 'fetchHorrorMovies',
        type: 'movie'
    },
    'Romance Movies': {
        fetchUrl: 'fetchRomanceMovies',
        type: 'movie'
    },
    'Documentaries': {
        fetchUrl: 'fetchDocumentaries',
        type: 'movie'
    },
}