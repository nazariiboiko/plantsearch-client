import React from "react";
import { useState, useRef, useEffect } from 'react';
import { getAutocompleteByName } from '../../functions/PlantRequest.js';
import { Link } from 'react-router-dom';
import './Searchbar.css';
import { Card } from '@mui/material';
import { Search } from "@mui/icons-material";
import { useTheme } from "../../utils/themeProvider.js";

const SearchBarEx = () => {

    let searchTimeout;
    const [query, setQuery] = useState('');
    const searchBarRef = useRef(null);
    const [result, setResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const { theme } = useTheme();

    const themeInputStyle = {
        backgroundColor: theme.palette.mode === 'light' ? 'white' : '#303030', 
        color: theme.palette.text.primary,
        fontSize: '1.0rem',
        width: '100%',
        border: theme.palette.mode === 'light' ? '' : 'none',

    };
    const searchBarStyles = {
        searchBarBody: {
          marginLeft: '10px',
          backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#101010', 
          borderRadius: '20px',
          width: '300px',
          position: 'relative',
          zIndex: 999,
        },
        searchBarBodyActive: {
          marginLeft: '10px',
          backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#101010', 
          borderRadius: '20px 20px 0 0',
          width: '300px',
          position: 'relative',
        },
        searchBarInput: {
            border: 'none',
            width: '100%',
            color: theme.palette.text.primary,
            backgroundColor: 'inherit',
            fontSize: '1.0rem',
            outline: 'none',
        },
      };

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
                getAutocompleteByName(q)
                    .then((res) => setResult(res))
                    .catch((error) => {
                        setResult([]);
                    });
            }, 400);
        } else {
            setResult([]);
        }
    };

    return (
        <div style={showResult === false ? searchBarStyles.searchBarBody : searchBarStyles.searchBarBodyActive} >
            <div className='search-bar-input-wrapper d-flex'  ref={searchBarRef}>
                <input
                    placeholder='Пошук...'
                    onChange={handleInputChange}
                    style={searchBarStyles.searchBarInput}
                />
                <Link to={`/filter/${query}`} style={{ paddingTop: '7px'}}>
                    <Search />
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
                            <Link to={`/plant/${plant.id}`} key={plant.id} style={{ backgroundColor: `#${theme.palette.text.primary}` }}>
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