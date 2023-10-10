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
        />

        <Row
          title='Trending Now'
        />

        <Row
          title='Popular TV'
        />

        <Row
          title='Top Rated Movies'
        />

        <Row
          title='Top Rated TV'
        />

        <Row
          title='Action Movies'
        />

        <Row
          title='Comedy Movies'
        />

        <Row
          title='Horror Movies'
        />

        <Row
          title='Romance Movies'
        />

        <Row
          title='Documentaries'
        />
        
    </div>
  )
}

export default HomeScreen