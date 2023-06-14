import React, { useState } from 'react';
import './Filter.css';
import { Dropdown, Form, Row, Col } from 'react-bootstrap';

const Filter = () => {
    const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((val) => val !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, including the selected checkbox values
    console.log('Selected Checkboxes:', selectedValues);
  };

  const checkboxItems = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
  ];

  return (
    <div className='container filter-container'>
    <Row>
    <Form onSubmit={handleSubmit} className='d-flexф'>
        <Col>
        <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-checkbox">
            Select Options
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {checkboxItems.map((item) => (
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

        <Col>
        <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-checkbox">
            Select Options
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {checkboxItems.map((item) => (
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
        <button className='btn btn-secondary' type="submit">Submit</button>
    </Form>
    </Row>
    </div>
  );
  };

export default Filter;
