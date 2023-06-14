import React from 'react';
import './Filter.css';
import { ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';

const Filter = () => {

    return (
        <div className='filter-container'>
            Filter
            <form>
            <div className="row filter-criteria">
                <div className="col-md-2">
                <input type="text" placeholder="search..." />
                </div>
                <div className="col-md-2">
                <ButtonGroup>
                    <DropdownButton id="dropdown-button-1" title="Вид">
                    <Dropdown.Item>
                        <input type="checkbox" id="tree" /> <label htmlFor="tree">Дерево</label>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <input type="checkbox" id="shrub" /> <label htmlFor="shrub">Кущ</label>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <input type="checkbox" id="subshrub" /> <label htmlFor="subshrub">Напівкущ</label>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <input type="checkbox" id="large-shrub" /> <label htmlFor="large-shrub">Великий кущ</label>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <input type="checkbox" id="climber" /> <label htmlFor="climber">Ліана</label>
                    </Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                </div>
                <div className="col-md-2">
                <ButtonGroup>
                    <DropdownButton id="dropdown-button-2" title="Освітлення">
                    <Dropdown.Item>
                        <input type="checkbox" id="semi-shade" /> <label htmlFor="semi-shade">Напівсон</label>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <input type="checkbox" id="sun" /> <label htmlFor="sun">Сонце</label>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <input type="checkbox" id="shade" /> <label htmlFor="shade">Тінь</label>
                    </Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                </div>
                <div className="col-md-2">
                <ButtonGroup>
                    <DropdownButton id="dropdown-button-3" title="Вічнозелене" onClick={(e) => e.stopPropagation()}>
                    <Dropdown.Item>
                        <input type="checkbox" id="yes" onClick={(e) => e.stopPropagation()} /> <label htmlFor="yes">Так</label>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <input type="checkbox" id="no" onClick={(e) => e.stopPropagation()} /> <label htmlFor="no">Ні</label>
                    </Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                </div>
                <div className="col-md-2">1</div>
                <div className="col-md-2">1</div>
                <div className="col-md-2">
                <button className="btn btn-primary ms-auto">
                    Filter <i className="fa-solid fa-filter"></i>
                </button>
                </div>
            </div>
            </form>
            
        </div>
    );

};

export default Filter;