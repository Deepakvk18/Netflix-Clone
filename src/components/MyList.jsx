import Nav from "./Nav"

const MyList = () => {

    const tv = []
    const movies = []

  return (
    <div className='text-white bg-[#111] h-full min-h-[100vh]'>
        <Nav links background/>
        <div className='pt-20 pl-5 pb-10 text-4xl text-white'>
            My List
        </div>
        <div className='text-2xl p-5 text-white'>
            Movie Shows
        </div>
        <div className='bg-[#111] flex mt-0 pl-5 flex-wrap h-full z-10'>
            {movies?.results?.map((show)=>(
                <MovieCard key={show?.id} movie={show} type="movie" search/>
            ))}
        </div>
        <div className='text-2xl p-5 text-white'>
            TV Shows
        </div>
        <div className='bg-[#111] flex mt-0 pl-5 flex-wrap h-full z-10'>
            {tv?.results?.map((show)=>(
                <MovieCard key={show?.id} movie={show} type="tv" search/>
            ))}
        </div>
    </div>
  )
}

export default MyList