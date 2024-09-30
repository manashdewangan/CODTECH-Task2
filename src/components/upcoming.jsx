import { useRef, useEffect, useState } from "react";



export default function upcoming() {

    const [upcoming, setUpcoming] = useState([]); // Initialize state to null for a single movie

    async function getUpcomingMovies() {
        const api_key = "6395d590b30c5e2c51edc6a3d877895b"
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&include_adult=false`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setUpcoming(json.results); // Set the entire movie object
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getUpcomingMovies();
    }, []);

    // DIV THAT HOVER OVER THE CARD
    const [hoveredUpcomingMovieId, setHoveredUpcomingMovieId] = useState(null);



    return (
        <div className="relative w-full mt-10 bg-black ">

            <div className=" mx-24" >
                    <div className="">

                        <h2 className="text-2xl font-bold text-white uppercase">Upcoming Movies</h2>
                        <div className="bg-red-600 w-28 h-2 "></div>

                    </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                    {upcoming.map((upcomingMovie) => (
                        <div key={upcomingMovie.id}
                            className="min-w-[250px] overflow-hidden bg-black  transition duration-300">
                            <div className="relative "
                                onMouseEnter={() => setHoveredUpcomingMovieId(upcomingMovie.id)} // Set hovered movie ID
                                onMouseLeave={() => setHoveredUpcomingMovieId(null)} // Reset hover when mouse leaves
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${upcomingMovie.poster_path}`}
                                    alt={upcomingMovie.title}
                                    className="w-full"
                                />
                                {hoveredUpcomingMovieId === upcomingMovie.id && (
                                    <div className="absolute flex  direc items-end bottom-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm text-white p-4 align-baseline "
                                    >
                                        <div>
                                            <p className="text-sm text-gray-200">To be release on:<span className="text-gray-400"> {upcomingMovie.release_date}</span>
                                            </p>
                                            <h3 className="text-lg font-semibold">{upcomingMovie.title}</h3>
                                            <p className="text-sm text-gray-400">{upcomingMovie.overview.substring(0, 200)}</p>
                                            <p className="text-base text-gray-200">Language: <span className="text-gray-400">{upcomingMovie.original_language}</span></p>
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
