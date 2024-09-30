import React, { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';



const topRated = () => {

    const [topRated, setTopRated] = useState([]); // Initialize state to null for a single movie

    async function getTopRated() {
        const url = "https://api.themoviedb.org/3/trending/movie/week?api_key=6395d590b30c5e2c51edc6a3d877895b&include_adult=false";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setTopRated(json.results); // Set the entire movie object
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getTopRated();
    }, []);


    // DIV THAT HOVER OVER THE CARD
    const [hoveredMovieId, setHoveredMovieId] = useState(null);

    // SLECTIONS
    
    const [selected, setSelected] = useState()

    return (
        <>

            <div className="dark:bg-black h-full">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className='flex justify-between'>
                        <div className="">

                            <h2 className="text-2xl font-bold text-white uppercase">Top Rated Movies</h2>
                            <div className="bg-red-600 w-28 h-2 "></div>

                        </div>
                        
                    </div>


                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {topRated.map((topRatedMovie) => (
                            <div key={topRatedMovie.id}
                                className="min-w-[250px] overflow-hidden bg-black  transition duration-300">
                                <div className="relative "
                                    onMouseEnter={() => setHoveredMovieId(topRatedMovie.id)} // Set hovered movie ID
                                    onMouseLeave={() => setHoveredMovieId(null)} // Reset hover when mouse leaves
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${topRatedMovie.poster_path}`}
                                        alt={topRatedMovie.title}
                                        className="w-full"
                                    />
                                    {hoveredMovieId === topRatedMovie.id && (
                                        <div className="absolute flex  direc items-end bottom-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm text-white p-4 align-baseline "
                                        >
                                            <div>
                                                <p className="text-sm text-gray-400">{topRatedMovie.release_date}</p>
                                                <h3 className="text-lg font-semibold">{topRatedMovie.title}</h3>
                                                <p className="text-sm text-gray-400">{topRatedMovie.overview.substring(0, 200)}</p>
                                                <p className="text-base text-gray-200">Language: <span className="text-gray-400">{topRatedMovie.original_language}</span></p>
                                                <p className='rating'>Rating: {topRatedMovie.vote_average}</p>

                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                            

                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default topRated;