import React from "react";
import { useState, useRef, useEffect } from 'react';
import { getPageablePlantByName } from '../../functions/plantRequests';
import { Link } from 'react-router-dom';
import './SearchBar.css';
import { Card } from '@mui/material';

const SearchBarEx = () => {

  let searchTimeout;
  const [query, setQuery] = useState('');
  const searchBarRef = useRef(null);
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [result]);

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    const q = e.target.value;


    clearTimeout(searchTimeout);

    if (q.length > 2) {
      searchTimeout = setTimeout(() => {
        getPageablePlantByName(q)
          .then((res) => setResult([...res.data]))
          .catch((error) => {
            setResult([]);
          });
        console.info(result);
      }, 400);
    } else {
      setResult([]);
    }
  };

  return (
    <div className={`${showResult === false ? 'search-bar-body' : 'search-bar-body-active'}`}>
      <div className='search-bar-input d-flex' ref={searchBarRef}>
        <input
          placeholder='Пошук...'
          onChange={handleInputChange}
        />
        <Link to={`/filter/${query}`}>
          <i className='fa-solid fa-search'></i>
        </Link>
      </div>
      <div className={`search-bar-content ${showResult === false ? 'hidden' : 'enabled'}`}>
        <div className='filter-wrapper'>
          <Link to={`/filter`} className="filter-icon">
            <i class="fa-solid fa-filter"></i> filter
          </Link>
        </div>
        {
          result?.map((plant) => {
            return (
              <Link to={`/plant/${plant.id}`} key={plant.id}>
                <Card variant='outlined' className='search-bar-item'>
                  <div className='text-container'>
                    <p className='h5 ml-10'>{plant.name}</p>
                  </div>
                  <div className='image-card-container'>
                    <img
                      src={`https://plantsearch.s3.eu-north-1.amazonaws.com/sketches/${plant.sketch}`}
                      alt="sketch"
                      className='image-card'
                    />
                  </div>
                </Card>
              </Link>
            );
          })
        }

      </div>
    </div>
  );
}

export default SearchBarEx;