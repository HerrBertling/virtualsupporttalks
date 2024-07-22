import SearchBar from "./SearchBar";
/*import SpeakingTimeContent from "./SpeakingTimeContent";*/

function Searching() {
  /*const [searchResults, setSearchResults] = useState<string[]>([]);
     const allText = document.querySelector("allText");*/
 
    const handleSearch = (searchTerm: string) => {
    };
 
     return (
         <div className="flex flex-row-reverse py-5 max-w-7xl mx-auto">
             <SearchBar onSearch={handleSearch} />
         </div>
     );
}

export default Searching;