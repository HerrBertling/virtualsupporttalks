import { Form } from "@remix-run/react";
import React, { RefObject, useRef, useState }  from 'react';
import SearchIcon from "./icons/SearchIcon";


const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className="inline-flex gap-2">
                <input
                    name="search"
                    type="text"
                    placeholder="Suche..."
                    className="text-[1rem] px-2 py-1 rounded-full hover:text-vsp-900 border border-vsp-400 active:border-vsp-900 focus:border-vsp-900 disabled:border-vsp-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                > 
                </input>
            {/* <button
                className="py-2 px-2  font-inherit inline-flex items-center justify-center rounded-full  text-vsp-900 hover:text-white no-underline transition-opacity duration-300 hover:bg-vsp-900 focus:opacity-90 active:opacity-90 disabled:pointer-events-none "
                type="button"
                disabled={!searchTerm}
                onClick={()=>{setSearchTerm('')}}
            >
                CLEAR
            </button> */}
        </div>
    );
};
export default SearchBar;