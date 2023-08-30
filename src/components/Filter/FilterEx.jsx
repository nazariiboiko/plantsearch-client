import { Button, ButtonGroup, Checkbox, Container, FormControlLabel, FormGroup, Pagination, TextField, ThemeProvider, createTheme } from "@mui/material";
import * as criteria from '../../utils/filter_criterias';
import './FilterEx.css';
import Popup from '../ui/Popup/Popup';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";
import { useParams } from "react-router-dom";
import PlantList from '../Plant/PlantList';
import { getPlantsByCriterias } from '../../functions/plantRequests';
import './Filter.css';
import { Box, CircularProgress, Stack } from "@mui/material";
import { Reorder, ViewModule } from "@mui/icons-material";
import { useEffect } from "react";

const FilterEx = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const { keyword } = useParams();
    const [input, setInput] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const [response, setResponse] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(45);
    const [showOrder, setShowOrder] = useState(window.location.hash.replace("#", "") || 'grid');
    const [isLoading, setIsLoading] = useState(true);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#3b4444',
            },
            secondary: {
                main: '#2196f3',
            },
            dropdown: {
                main: '#ccc'
            }
        },
    });

    useEffect(() => {
        if (keyword === undefined) {
            const storedValuesString = sessionStorage.getItem('selectedValues');
            const storedInputString = sessionStorage.getItem('inputValue');

            if (storedValuesString !== undefined && storedValuesString !== null)
                setSelectedValues(storedValuesString);
            if (storedInputString !== undefined && storedInputString !== null)
                setInput(storedInputString);

            getPlantsByCriterias(storedValuesString, storedInputString, pageNumber, pageSize)
                .then((res) => setResponse(res))
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setInput(keyword);
            getPlantsByCriterias(selectedValues, String(keyword), pageNumber, pageSize)
                .then((res) => setResponse(res))
                .finally(() => {
                    setIsLoading(false);
                });;
        }
    }, [keyword, pageNumber, pageSize, selectedValues]);

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
        console.info(value);
        if (Array.isArray(selectedValues)) {
            if (selectedValues.includes(value)) {
                setSelectedValues((prevValues) => prevValues.filter((item) => item !== value));
            } else {
                setSelectedValues((prevValues) => [...prevValues, value]);
            }
        } else {
            setSelectedValues([value]);
        }
       // console.info(selectedValues);
    };

    const handleSubmit = () => {
        sessionStorage.setItem("selectedValues", selectedValues);
        sessionStorage.setItem("inputValue", input);
        setPageNumber(1);

        getPlantsByCriterias(selectedValues, input, 1, pageSize)
            .then((res) => setResponse(res));
    };

    const handleShowOrder = (name) => {
        setShowOrder(name);
        window.location.hash = name;
    }

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '70%',
                }}
            >
                <CircularProgress />
            </Box>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <Container className="filter-container-ex">
                <div className="display-flex justify-between">
                    <h4>Пошук</h4>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button color="secondary" onClick={handleClear}>Очистити</Button>
                        <Button color="secondary" onClick={handleSubmit}>Знайти</Button>
                    </ButtonGroup>
                </div>
                <hr />
                <div className="mobile-input">
                    <TextField id="filled-basic" label="Пошук..." variant="filled" size="small" fullWidth />
                </div>
                <div className="filter-criteria-list">
                    {windowWidth >= 700 && (
                        <TextField id="filled-basic" label="Пошук..." variant="filled" size="small" style={{ height: '20px' }} />
                    )}

                    {criteria.allCriterias().map((criterion, index) => (
                        <Popup color="dropdown" icon={<KeyboardArrowDownIcon fontSize="small" />} label={criterion.label} key={index}>
                            <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
                                {criterion.value.map((item, index) => (
                                    <FormControlLabel key={index} control={
                                        <Checkbox
                                            checked={selectedValues.includes(item.value)}
                                            onChange={() => handleCheckboxChange(item.value)}
                                            name={item.label}
                                        />
                                    }
                                        label={item.label}
                                    />
                                ))}
                            </FormGroup>
                        </Popup>
                    ))}
                </div>
                <hr />
                <div className="filter-result-info">
                    <p>{response?.totalSize} об'єктів</p>
                    <Stack alignItems="center">
                        <Pagination
                            variant="outlined"
                            className="justify-content-center"
                            count={Math.ceil(response?.totalSize / response?.pageSize)}
                            page={pageNumber}
                            onChange={handlePageChange}
                        />
                    </Stack>
                    <div>
                        <Button
                            disableRipple
                            className={`mr-5 icon-type ${showOrder === 'grid' ? 'active' : ''}`}
                            onClick={() => handleShowOrder('grid')}
                        >
                            <ViewModule fontSize="large" />
                        </Button>
                        <Button
                            disableRipple
                            className={`icon-type ${showOrder === 'list' ? 'active' : ''}`}
                            onClick={() => handleShowOrder('list')}
                        >
                            <Reorder fontSize="large" />
                        </Button>
                    </div>
                </div>
                <hr />
                <PlantList response={response} showOrder={showOrder} />
            </Container>
        </ThemeProvider>
    );
};

export default FilterEx;