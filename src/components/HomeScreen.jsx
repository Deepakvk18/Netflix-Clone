import Banner from './Banner'
import Nav from './Nav'
import Row from './Row'

function HomeScreen() {
  return (
    <div className=''>
      
      <title> Home - Netflix Clone </title>

        <Nav links />
        
        <Banner />
        
        <Row
          title='Netflix Originals'
          fetchUrl={'fetchNetflixOriginals'}
        />

        <Row
          title='Trending Now'
          fetchUrl={'fetchTrending'}
        />

        <Row
          title='Popular TV Shows'
          fetchUrl={'popularTV'}
        />

        <Row
          title='Top Rated Movies'
          fetchUrl={'fetchTopRated'}
        />

        <Row
          title='Action Movies'
          fetchUrl={'fetchActionMovies'}
        />

        <Row
          title='Comedy Movies'
          fetchUrl={'fetchComedyMovies'}
        />

        <Row
          title='Horror movies'
          fetchUrl={'fetchHorrorMovies'}
        />

        <Row
          title='Romance movies'
          fetchUrl={'fetchRomanceMovies'}
        />

        <Row
          title='Documentary movies'
          fetchUrl={'fetchDocumentaryMovies'}
        />
        
    </div>
  )
}

export default HomeScreen