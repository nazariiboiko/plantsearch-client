import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dropdown, Form, Row, Col } from 'react-bootstrap';
import PlantList from '../Plant/PlantList';
import Pagination from '@mui/material/Pagination';
import * as criteria from '../../utils/filter_criterias';
import { getPlantsByCriterias } from '../../functions/plantRequests';
import './Filter.css';
import { Button, Stack } from "@mui/material";
import { Reorder, ViewModule } from "@mui/icons-material";

const Filter = () => {

  const { keyword } = useParams();
  const [input, setInput] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [response, setResponse] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(48);
  const [showOrder, setShowOrder] = useState('list');

  useEffect(() => {
    if (keyword === undefined) {
      const storedValuesString = sessionStorage.getItem('selectedValues');
      const storedInputString = sessionStorage.getItem('inputValue');

      if (storedValuesString !== undefined && storedValuesString !== null)
        setSelectedValues(storedValuesString);
      if (storedInputString !== undefined && storedInputString !== null)
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
      .then((res) => { setResponse(res); })
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

    if (keyword !== undefined)
      window.location.href = '/filter';

    getPlantsByCriterias([], '', 1, pageSize)
      .then((res) => setResponse(res));
  };

  const handleCheckboxChange = (value) => {
    if (Array.isArray(selectedValues)) {
      if (selectedValues.includes(value)) {
        setSelectedValues((prevValues) => prevValues.filter((item) => item !== value));
      } else {
        setSelectedValues((prevValues) => [...prevValues, value]);
      }
    } else {
      setSelectedValues([value]);
    }
    console.info(selectedValues);
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
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <button className="btn btn-secondary" onClick={handleClear}> Очистити</button>
          <button className="btn btn-secondary" onClick={handleSubmit}> Знайти</button>
        </div>
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

      <div class="row align-items-center d-flex">
        <hr></hr>
        <div className='col-md-4'>
          <p>{response?.totalSize} об'єктів</p>
        </div>
        <div className='col-md-4'>
          <Stack alignItems="center">
            <Pagination
              variant="outlined"
              className="justify-content-center"
              count={Math.ceil(response?.totalSize / response?.pageSize)}
              page={pageNumber}
              onChange={handlePageChange}
            />
          </Stack>
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          <Button
            disableRipple
            className={`mr-5 icon-type ${showOrder == 'grid' ? 'active' : ''}`}
            onClick={() => setShowOrder('grid')}
          >
            <ViewModule fontSize="large" />
          </Button>
          <Button
            disableRipple
            className={`icon-type ${showOrder == 'list' ? 'active' : ''}`}
            onClick={() => setShowOrder('list')}
          >
            <Reorder fontSize="large" />
          </Button>
        </div>

        <hr></hr>
      </div>

      <PlantList response={response} showOrder={showOrder} />
    </div >
  );
}

export default Filter;