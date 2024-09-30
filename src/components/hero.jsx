import { useEffect, useState } from 'react';


export default function Hero() {

    // MOVIES
    const [movie, setMovie] = useState([]); // Initialize state to null for a single movie

    async function getMovies() {
        const api_key = "6395d590b30c5e2c51edc6a3d877895b"
        const url1 = `https://api.themoviedb.org/3/movie/634649?api_key=${api_key}`;
        try {
            const response = await fetch(url1);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setMovie(json); // Set the entire movie object
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getMovies();
    }, []);


    // This is just a demo link address
    const visitLink = () => {
        window.open('https://youtu.be/7dOcH4HN5fA?si=DV7Sqw9c-Ri_mZov', '_blank');
      };



    return (
        <div className="dark:bg-slate-800 " >
            <div className="relative isolate overflow-hidden bg-gray-900 h-screen flex items-center ">

                {movie && ( // Ensure movie is loaded before rendering
                    <>
                        <img
                            alt={movie.title}
                            // src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                            src="../posters/spidrman1.jpg"
                            className="absolute inset-0 -z-10 w-full object-cover object-right md:object-bottom  brightness-[0.8]"/>

                        <div
                            className='w-full h-full top-0 absolute shadow-[inset_0_0px_100px_83px]'>
                        </div>

                        <div className=" max-w-full sm:mx-10 lg:mx-24">
                            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                <img className="w-2/4 object-cover" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
                                <div className=" py-2">
                                    <div className="font-bold text-2xl text-white">{movie.original_title}</div>
                                    <p className="text-white text-sm">
                                        <span className="text-white text-sm">
                                            <span className='text-gray-400'>{movie.tagline}</span>
                                        </span>
                                    </p>
                                    <p className="text-white text-sm"> Ratings
                                        <span className='text-gray-400'>{movie.popularity}⭐</span>
                                    </p>
                                    <p className="text-white text-sm">
                                        <span className='text-gray-400'>{movie.release_date}</span>
                                    </p>
                                </div>

                                <button onClick={visitLink} type="button" className=' absolute btn text-black bg-red-600 font-semibold py-2 px-8 rounded-sm hover:text-white transition ease-in-out'>Watch Trailer</button>
                                
                                
                            </div>
                        </div>
                    </>
                )}

            </div>
           


        </div>
    )
}
