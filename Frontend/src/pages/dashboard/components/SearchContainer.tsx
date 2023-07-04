import React from 'react';

function SearchContainer() {
  return (
    <div className='m-auto max-w-2xl bg-base-300 rounded-md p-8'>
      <div className="flex flex-row justify-between">
        <input type="search" className='rounded' placeholder='Search'/>
        <button className='btn btn-outline'>find</button>
      </div>
    </div>
  );
}

export default SearchContainer;
