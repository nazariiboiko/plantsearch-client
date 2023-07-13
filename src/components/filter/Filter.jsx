import React, { useEffect, useState }from "react";
import { useParams } from "react-router-dom";
import { Dropdown, Form, Row, Col } from 'react-bootstrap';
import PlantList from '../Plant/PlantList';
import Pagination from '@mui/material/Pagination';
import * as criteria from '../../utils/filter_criterias';
import { getPlantsByCriterias } from '../../functions/plantRequests';
import './Filter.css';

const Filter = () => {

    const { keyword } = useParams();
    const [input, setInput] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const [response, setResponse] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(48);

    useEffect(() => {
        if(keyword === undefined) {
            const storedValuesString = sessionStorage.getItem('selectedValues');
            const storedInputString = sessionStorage.getItem('inputValue');
            
            console.info(storedValuesString);
            console.info(storedInputString);

            if(storedValuesString !== undefined && storedValuesString !== null)
                setSelectedValues(storedValuesString);
            if(storedInputString !== undefined && storedInputString !== null)
                setInput(storedInputString);
                
            getPlantsByCriterias(storedValuesString, storedInputString, pageNumber, pageSize)
                .then((res) => setResponse(res));
        } else {
            setInput(keyword);
            getPlantsByCriterias(selectedValues, String(keyword), pageNumber, pageSize)
                .then((res) => setResponse(res));
        }
    }, [keyword]);

    const handlePageChange = (event, value) => {
      setPageNumber(value);
      getPlantsByCriterias(selectedValues, input, value, pageSize, 'id')
            .then((res) => {setResponse(res);})
            .catch((error) => {
              setResponse([]);
            }); 
    }

    const handleClear = () => {
        sessionStorage.removeItem('selectedValues');
        sessionStorage.removeItem('inputValue');
        setInput('');
        setPageNumber(1);
        setSelectedValues([]);

        if(keyword !== undefined)
            window.location.href = '/filter';

        getPlantsByCriterias([], '', 1, pageSize)
            .then((res) => setResponse(res));
    }

    const handleCheckboxChange = (value) => {
        if (selectedValues.includes(value)) {
          setSelectedValues(selectedValues.filter((val) => val !== value));
        } else {
          setSelectedValues([...selectedValues, value]);
        }
      };

    const handleSubmit = () => {
        sessionStorage.setItem("selectedValues", selectedValues);
        sessionStorage.setItem("inputValue", input);
        setPageNumber(1);

        getPlantsByCriterias(selectedValues, input, 1, pageSize)
            .then((res) => setResponse(res));
    }

    return (
        <div className='container filter-container mb-10'>
          <div className='filter-header'>
            <h4 className="w-100 font-weight-bold filter-title d-flex">Пошук</h4>
            <button className='btn btn-secondary filter-menu-leftbutton' onClick={handleClear}>Очистити</button>
            <button className='btn btn-secondary filter-menu-rightbutton' onClick={handleSubmit}>Знайти</button>
            <hr></hr>
          </div>
          
          <Form onSubmit={handleSubmit} className='d-flex'>
            <Row>
              <Col md={2}>
                <input 
                className='filter-input' 
                id='name' 
                onChange={(e) => setInput(e.target.value)} 
                placeholder='Пошук...'
                value={input}></input>
              </Col>
              {criteria.allCriterias().map((criterion) => (
                <Col md={2} sm={6} key={criterion.label}>
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-checkbox">
                      {criterion.label}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {criterion.value.map((item) => (
                        <Form.Check
                          key={item.value}
                          type="checkbox"
                          id={item.value}
                          label={item.label}
                          checked={selectedValues.includes(item.value)}
                          onChange={() => handleCheckboxChange(item.value)}
                        />
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              ))}
    
            </Row>
          </Form>
    
          <div class="row justify-content-between align-items-center">
            <hr></hr>
          <div className='col-md-2'>
              <p>{response?.totalSize} об'єктів</p>
            </div>
            <div className='col-md-5'>
              <div class="justify-content-center pb-10">
                <Pagination
                  variant="outlined" 
                 
                  count={Math.ceil(response?.totalSize / response?.pageSize)}
                  page={pageNumber}
                  onChange={handlePageChange}
                />
                </div>
            </div>
            <div className="col-md-1 d-flex">
              <div className="mr-5 icon-type">
              <i class="fa fa-th" aria-hidden="true"></i>
              </div>
              <div className="icon-type">
              <i class="fa fa-list" aria-hidden="true"></i>
              </div>
            </div>
            <hr></hr>
          </div>
    
          <PlantList response={response} title={'Результат:'}/>
        </div>
      );
}

export default Filter;