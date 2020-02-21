import React from 'react';

const Search = ({ handleOnChange, handleSearch }) => (
    <div>
        <input 
            className="text" 
            type="text" 
            placeholder="Search" 
            onChange={handleOnChange}
        />
        <button onClick={handleSearch}>검색</button>
    </div>
);

export default Search;