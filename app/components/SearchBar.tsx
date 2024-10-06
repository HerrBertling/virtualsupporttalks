import { Form } from "@remix-run/react";
import React, { useState }  from 'react';
import SearchIcon from "./icons/SearchIcon";

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="inline-flex gap-2 mx-24">
            <Form>
                <input
                    type="text"
                    placeholder="Suche..."
                    className="text-[1rem] px-2 py-1 rounded-full hover:text-vsp-900 border border-vsp-400 active:border-vsp-900 focus:border-vsp-900 disabled:border-vsp-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                > 
                </input>
            </Form>
            <button
                className="py-1 px-4 font-inherit inline-flex items-center justify-center rounded-full bg-vsp-400 text-vsp-900 hover:text-white no-underline transition-opacity duration-300 hover:bg-vsp-900 focus:opacity-90 active:opacity-90 disabled:pointer-events-none disabled:bg-vsp-200 md:text-lg"
                type="submit"
                disabled={!searchTerm}
                onClick={handleSearch}
            >
                <SearchIcon />
            </button>
        </div>
    );
};
export default SearchBar;