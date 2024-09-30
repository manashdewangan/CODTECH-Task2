import { useRef, useEffect, useState } from "react";



export default function Trending() {

    const [trendMovies, setTrendMovies] = useState([]); // Initialize state to null for a single movie

    async function trendingMovies() {
        const url = "https://api.themoviedb.org/3/trending/movie/week?api_key=6395d590b30c5e2c51edc6a3d877895b&include_adult=false";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setTrendMovies(json.results); // Set the entire movie object
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        trendingMovies();
    }, []);


    // DIV THAT HOVER OVER THE CARD
    const [hoveredMovieId, setHoveredMovieId] = useState(null);



    return (
        <div className="relative w-full mt-10 bg-black ">

            <div className=" mx-24" >
                <div className="">

                    <h2 className="text-2xl font-bold text-white uppercase">Trending Movies</h2>
                    <div className="bg-red-600 w-28 h-2 "></div>


                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                    {trendMovies.map((movie) => (
                        <div key={movie.id}
                            className="min-w-[250px] overflow-hidden bg-black  transition duration-300">
                            <div className="relative "
                                onMouseEnter={() => setHoveredMovieId(movie.id)} // Set hovered movie ID
                                onMouseLeave={() => setHoveredMovieId(null)} // Reset hover when mouse leaves
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full"
                                />
                                {hoveredMovieId === movie.id && (
                                    <div className="absolute flex  direc items-end bottom-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm text-white p-4 align-baseline "
                                    >
                                        <div>
                                            <p className="text-base text-gray-200">Released On: <span className="text-gray-400">{movie.release_date}</span></p>
                                            <h3 className="text-lg font-semibold">{movie.title}</h3>
                                            <p className="text-sm text-gray-400">{movie.overview.substring(0, 200)}</p>
                                            <p className="text-base text-gray-200">Language: <span className="text-gray-400">{movie.original_language}</span></p>
                                            <p className='rating'>Rating: {movie.vote_average}</p>

                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}
