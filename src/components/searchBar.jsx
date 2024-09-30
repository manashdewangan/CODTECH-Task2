import React, { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi';

const searchBar = () => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        setQuery('');
    };
    return (
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className={`relative w-80 transition-all duration-300 ${isFocused ? 'bg-black' : ''}`}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full px-4 py-2 text-white bg-black border-b-2 border-gray-300 focus:outline-none placeholder-white ${isFocused ? 'border-red-600' : 'bg-transparent'}`}
                    placeholder="Search.."
                />
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                    {query ? (
                        <FiX className="text-white cursor-pointer" onClick={handleClear} />
                    ) : (
                        <FiSearch className={` ${isFocused ? 'text-red-600' : 'text-white'}`} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default searchBar
