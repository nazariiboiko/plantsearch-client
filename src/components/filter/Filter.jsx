import React, {useEffect, useState } from 'react';
import './Filter.css';
import { Dropdown, Form, Row, Col } from 'react-bootstrap';
import '../../utils/filter_criterias';
import * as criteria from '../../utils/filter_criterias';
import { getPlantsByCriterias } from '../../functions/plantRequests';
import PlantList from '../Plant/PlantList';
import Pagination from '@mui/material/Pagination';

const Filter = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [response, setResponse] = useState();
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(102);

  useEffect(()  => {
      const storedCriteriaString = sessionStorage.getItem('selectedCriteria');
      let selectedCriteria = {};
      if(storedCriteriaString != null) {
        selectedCriteria = JSON.parse(storedCriteriaString);
        console.info(selectedCriteria);
        getPlantsByCriterias(selectedCriteria, page, pageSize).then((res) => setResponse(res));
      } else {
        criteria.allCriterias().forEach((criterion) => {
          const selectedItems = criterion.value.filter((item) =>
            selectedValues.includes(item.value)
          );
          selectedCriteria[criterion.id] = selectedItems.map((item) => item.value);
          getPlantsByCriterias(selectedCriteria, page, pageSize).then((res) => setResponse(res));
        });
      }
  },[]);

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((val) => val !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleClear = () => {
    sessionStorage.removeItem('selectedCriteria');
    setSelectedValues([]);
    setInputValue('');
    const newValues = [];
    makeRequest(newValues, page, pageSize);
  };


  const handleSubmit = () => {
    setPage(1);
    const newPage = 1;
    makeRequest(selectedValues, newPage, pageSize);
  };

  const makeRequest = (selectedValues, page, pageSize) => {
    const selectedCriteria = {};
    criteria.allCriterias().forEach((criterion) => {
      const selectedItems = criterion.value.filter((item) =>
        selectedValues.includes(item.value)
      );
      selectedCriteria[criterion.id] = selectedItems.map((item) => item.value);
    });
    selectedCriteria['name'] = inputValue;
    getPlantsByCriterias(selectedCriteria , page, pageSize).then((res) => setResponse(res));
    const selectedCriteriaString = JSON.stringify(selectedCriteria);
    sessionStorage.setItem("selectedCriteria", selectedCriteriaString);
  };

  const handlePageChange = (page) => {
    if(page !== 0) {
      console.log('Page changed:', String(page));
      setPage(page);
      const newPage = page;
      makeRequest(selectedValues, newPage, pageSize);
    }
  };

  return (
    <div className='container filter-container'>
      <div className='filter-header'>
        <h4 className="w-100 font-weight-bold filter-title d-flex">Пошук</h4>
        <button className='btn btn-secondary filter-menu-leftbutton' onClick={handleClear}>Очистити</button>
        <button className='btn btn-secondary filter-menu-rightbutton' onClick={handleSubmit}>Знайти</button>
        <hr></hr>
      </div>
      <Form onSubmit={handleSubmit} className='d-flex'>
        <Row>
          <Col md={2}>
            <input className='filter-input' id='name' onChange={(e) => setInputValue(e.target.value)} placeholder='Пошук...'></input>
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

          <hr></hr>
        </Row>
      </Form>

      <div class="row justify-content-between align-items-center">
        <div className='col-md-2'>
          <p>{response?.totalSize} об'єктів</p>
        </div>
        <div className='col-md-8'>
          <Pagination
            count={Math.ceil(response?.totalSize / response?.pageSize)}
            size="large"
            onChange={(e) => handlePageChange(e.target.textContent)}
          />
        </div>
      </div>


      <PlantList response={response}/>
    </div>
  );
};

export default Filter;
