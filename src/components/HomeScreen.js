import requests from '../requests'
import Banner from './Banner'
import './assets/styles/HomeScreen.css'
import Nav from './Nav'
import Row from './Row'

function HomeScreen() {
  return (
    <div className='homescreen w-full h-full'>
      
      <title> Home - Netflix Clone </title>
        <Nav />
        
        <Banner />
        
        <Row
          title='NETFLIX ORIGINALS'
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />

        <Row
          title='Trending Now'
          fetchUrl={requests.fetchTrending}
        />

        <Row
          title='Top Rated'
          fetchUrl={requests.fetchTopRated}
        />

        <Row
          title='Action Movies'
          fetchUrl={requests.fetchActionMovies}
        />

        <Row
          title='Comedy Movies'
          fetchUrl={requests.fetchComedyMovies}
          isLargeRow
        />

        <Row
          title='Horror movies'
          fetchUrl={requests.fetchHorrorMovies}
        />

        <Row
          title='Romance movies'
          fetchUrl={requests.fetchRomanceMovies}
        />

        <Row
          title='Documentary movies'
          fetchUrl={requests.fetchDocumentaryMovies}
        />
        
    </div>
  )
}

export default HomeScreen