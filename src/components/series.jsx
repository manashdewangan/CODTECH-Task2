import { useRef, useEffect, useState } from "react";




export default function Series() {

    const [series, setSeries] = useState([]); // Initialize state to null for a single movie

    async function getSeries() {
        const api_key = "6395d590b30c5e2c51edc6a3d877895b"
        const url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}&include_adult=false`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setSeries(json.results); // Set the entire movie object
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getSeries();
    }, []);


    // DIV THAT HOVER OVER THE CARD
    const [hoveredSeriesId, setHoveredSeriesId] = useState(null);



    return (
        <div className="relative w-full bg-black mt-10 ">

            <div className=" mx-24" >
                <div className="">

                    <h2 className="text-2xl font-bold text-white uppercase">Pupular Series</h2>
                    <div className="bg-red-600 w-28 h-2 "></div>


                </div>
                <div className=" mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                    {series.map((tvSeries) => (
                        <div key={tvSeries.id}
                            className="min-w-[250px] overflow-hidden bg-black  transition duration-300">
                            <div className="relative "
                                onMouseEnter={() => setHoveredSeriesId(tvSeries.id)} // Set hovered movie ID
                                onMouseLeave={() => setHoveredSeriesId(null)} // Reset hover when mouse leaves
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`}
                                    alt={tvSeries.title}
                                    className="w-full"
                                />
                                {hoveredSeriesId === tvSeries.id && (
                                    <div className="absolute flex items-end bottom-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm text-white p-4 align-baseline "
                                    >
                                        <div>
                                            <p className="text-base text-gray-200">Released On: <span className="text-gray-400">{tvSeries.first_air_date}</span></p>
                                            <h3 className="text-lg font-semibold">{tvSeries.name}</h3>
                                            <p className="text-sm text-gray-400">{tvSeries.overview.substring(0, 200)}</p>
                                            <p className="text-base text-gray-200">Language: <span className="text-gray-400">{tvSeries.original_language}</span></p>
                                            <p className="text-base text-gray-200">Rating: <span className="text-gray-400">{tvSeries.vote_average}</span></p>
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
