import React, { useState, useEffect, useRef } from 'react';
import { getPlantByName } from '../../functions/plantRequests';
import { Link } from 'react-router-dom';
import './Header.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  let searchTimeout;
  const searchContainerRef = useRef(null);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 30); // Delay in milliseconds before hiding the dropdown
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getPlantByName(searchQuery);
        setSearchResults([...results]);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    // Clear the previous timeout to avoid unnecessary requests
    clearTimeout(searchTimeout);

    // Set a new timeout to delay the request
    if (searchQuery.length > 2) {
      searchTimeout = setTimeout(fetchData, 400);
    } else {
      setSearchResults([]);
    }

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const handleClickOutside = (e) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
      handleBlur();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    handleBlur();
  };

  return (
    <div className="search-container" ref={searchContainerRef}>
      <div className='search-bar'>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder="Search plant..."
      />
       <Link to={`/filter?keyword=${searchQuery}`}>
      <i className='fa-solid fa-search'></i>
      </Link>
      </div>
      
      {showDropdown && (
        <div className="dropdown-search">
          <div className='dropdown-subtext'>
            <Link to={`/filter`}>
            <i class="fa-solid fa-filter"></i>
            filter
            </Link>
          </div>
          {searchResults?.map((plant) => (
            <div className="dropdown-item" key={plant.id}>
              <Link to={`/plant/${plant.id}`} onClick={handleLinkClick}>
                <div className="dropdown-text">
                  <img
                    src={`https://plantsearch.s3.eu-north-1.amazonaws.com/images/${plant.image}`}
                    style={{ width: '10%', height: '10%' }}
                    alt="Lights"
                  />
                  {plant.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
