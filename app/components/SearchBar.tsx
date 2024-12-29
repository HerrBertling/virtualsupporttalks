import React, { ChangeEvent, useRef } from "react";

const SearchBar = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clonedEvent = new Event(e.nativeEvent.type, e.nativeEvent);
    setInputValue(e.currentTarget.value);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.dispatchEvent(clonedEvent);
      }
    }, 1000);
  };

  return (
    <div className="inline-flex gap-2 w-full lg:w-96">
      <input
        name="search"
        type="text"
        placeholder="Suche..."
        className="text-[1rem] px-2 py-1 rounded-full hover:text-vsp-900 border border-vsp-400 active:border-vsp-900 focus:border-vsp-900 disabled:border-vsp-200 w-full"
        value={inputValue}
        onChange={(e) => {
          handleInputChange(e);
        }}
      ></input>
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
