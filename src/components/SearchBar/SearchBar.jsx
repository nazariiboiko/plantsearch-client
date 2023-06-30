import { useState, useRef, useEffect } from 'react';
import { getPlantByName } from '../../functions/plantRequests';
import { Link } from 'react-router-dom';
import './SearchBar.css';

const SearchBarEx = () => {

    let searchTimeout;
    const[query, setQuery] = useState('');
    const searchBarRef = useRef(null);
    const[result, setResult] = useState([]);
    const[showResult, setShowResult] = useState(false);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

    const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setShowResult(false);
    } else {
        setShowResult(true);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    
  
    clearTimeout(searchTimeout);
  
    if (query.length > 2) {
      searchTimeout = setTimeout(() => {
        getPlantByName(query)
          .then((res) => setResult([...res]))
          .catch((error) => {
            setResult([]);
          });
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
                <Link to={`/filter?keyword=${query}`}>
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
                            <div className='search-bar-item' key={plant.id}>
                                <Link to={`/plant/${plant.id}`}>
                                {plant.name}
                                </Link>
                            </div>
                            )
                        })
                    }
                    
            </div>
        </div>
    );
}

export default SearchBarEx;