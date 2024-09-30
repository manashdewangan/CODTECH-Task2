import React, { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';




const tvShows = () => {

    // SERACH BAR FOCUS
    const [isFocused, setIsFocused] = useState(false);

    // SERACH BAR VAlUE
    const [searchQuery, setSearchQuery] = useState('');

    // SEARCHING tvShows
    const [tvShow, setTvShows] = useState([]); // Initialize state to null for a single tvShows

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value); // Capture actual input value
    };

    const handleSearchSubmit = async () => {
        if (searchQuery.trim() === '') return;
        const apiKey = '6395d590b30c5e2c51edc6a3d877895b'; // API Key for ThetvShowsDB
        const url = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(searchQuery)}&api_key=${apiKey}`;
        // const url = `https://api.themoviedb.org/3/discover/tv/query=${encodeURIComponent(searchQuery)}include_adult=false&api_key=${apiKey}`;

        try {
            const response = await fetch(url); // Fetch data from API
            const data = await response.json(); // Convert the response to JSON

            if (response.ok) {
                setTvShows(data.results); // Correctly access data.results
                console.log(data.results); // Log the fetched results
            } else {
                console.error('Error fetching tvShows:', data);
            }
        } catch (error) {
            console.error('Error fetching tvShows:', error); // Handle network errors
        }
    };


    // SERACH BAR HOVER
    const [hoveredtvShowsId, setHoveredtvShowsId] = useState(null);

    // SLECTIONS

    return (
        <>

            <div className="dark:bg-black h-full">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className='flex justify-between'>
                        <div className="">

                            <h2 className="text-2xl font-bold text-white uppercase">Tv Shows</h2>
                            <div className="bg-red-600 w-28 h-2 "></div>

                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <div className={`relative w-80 transition-all duration-300 ${isFocused ? 'bg-black' : ''}`}>

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchQuery} // Trigger search on every change
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    className={`w-full py-2 text-white bg-black border-b-2 border-gray-300 focus:outline-none placeholder-white ${isFocused ? 'border-red-600' : 'bg-transparent'
                                        } ${isFocused ? 'placeholder:text-red-600' : 'text-white'}`}
                                    placeholder="Search tvShows..."
                                />
                                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                                    {searchQuery ? (
                                        <FiX
                                            className="text-white cursor-pointer"
                                            onClick={() => {
                                                setSearchQuery(''); // Clear search query
                                                setIsFocused(false); // Unfocus input
                                            }}
                                        />
                                    ) : (
                                        <FiSearch
                                            onClick={() => setIsFocused(true)}
                                            className={`${isFocused ? 'text-red-600' : 'text-white'}`}
                                        />
                                    )}
                                </div>
                            </div>
                            <button onClick={handleSearchSubmit} className=' ml-2 search-button rounded-md px-6 py-2 bg-white font-semibold hover:bg-red-600'>Search</button>
                        </div>

                    </div>


                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {tvShow.map((tvShows) => (
                            <div key={tvShows.id}
                                className="min-w-[250px] overflow-hidden bg-black  transition duration-300">
                                <div className="relative "
                                    onMouseEnter={() => setHoveredtvShowsId(tvShows.id)} // Set hovered tvShows ID
                                    onMouseLeave={() => setHoveredtvShowsId(null)} // Reset hover when mouse leaves
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${tvShows.poster_path}`}
                                        alt={tvShows.title}
                                        className="w-full"
                                    />
                                    {hoveredtvShowsId === tvShows.id && (
                                        <div className="absolute flex  direc items-end bottom-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm text-white p-4 align-baseline "
                                        >
                                            <div>
                                                <p className="text-sm text-gray-400">{tvShows.release_date}</p>
                                                <h3 className="text-lg font-semibold">{tvShows.title}</h3>
                                                <p className="text-sm text-gray-400">{tvShows.overview.substring(0, 200)}</p>
                                                <p className="text-base text-gray-200">Language: <span className="text-gray-400">{tvShows.original_language}</span></p>
                                                <p className='rating'>Rating: {tvShows.vote_average}</p>

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

export default tvShows;