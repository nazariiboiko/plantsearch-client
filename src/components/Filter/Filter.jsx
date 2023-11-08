import { Box, Button, ButtonGroup, Checkbox, CircularProgress, Container, Divider, FormControlLabel, FormGroup, Grid, Pagination, Paper, Stack, TextField, Typography, styled } from "@mui/material";
import './Filter.css';
import { useEffect, useState } from "react";
import { KeyboardArrowDown, Reorder, ViewModule } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { getPlantsByCriteria } from "../../functions/PlantRequest";
import { allCriterias } from "../../utils/filter_criterias";
import Dropdown from "../ui/Dropdown/Dropdown";
import { purple } from "@mui/material/colors";
import PlantList from "../Plant/PlantList";

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#474747' : '#E9E9E9',
    color: theme.palette.text.secondary,
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#303030' : "#ddd",
    },
}));

const Filter = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { keyword } = useParams();
    const [input, setInput] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const [response, setResponse] = useState();
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize] = useState(45);
    const [showOrder, setShowOrder] = useState(window.location.hash.replace("#", "") || 'grid');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (keyword === undefined) {
            const storedValuesString = sessionStorage.getItem('selectedValues');
            const storedInputString = sessionStorage.getItem('inputValue');

            if (storedValuesString !== undefined && storedValuesString !== null)
                setSelectedValues(storedValuesString);
            if (storedInputString !== undefined && storedInputString !== null)
                setInput(storedInputString);

            getPlantsByCriteria(storedValuesString, storedInputString, pageNumber, pageSize)
                .then((res) => setResponse(res))
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setInput(keyword);
            getPlantsByCriteria(selectedValues, String(keyword), pageNumber, pageSize)
                .then((res) => setResponse(res))
                .finally(() => {
                    setIsLoading(false);
                });;
        }
    }, [pageNumber]);

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
    }

    const handleSubmit = () => {
        sessionStorage.setItem("selectedValues", selectedValues);
        sessionStorage.setItem("inputValue", input);
        setPageNumber(1);

        getPlantsByCriteria(selectedValues, input, 0, pageSize)
            .then((res) => setResponse(res));
    };

    const handleClear = () => {
        sessionStorage.removeItem('selectedValues');
        sessionStorage.removeItem('inputValue');
        setInput('');
        setPageNumber(0);
        setSelectedValues([]);

        if (keyword !== undefined)
            window.location.href = '/filter';

        getPlantsByCriteria([], '', 0, pageSize)
            .then((res) => setResponse(res));
    };

    const handlePageChange = (event, value) => {
        setPageNumber(value);
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
                    height: '70vh',
                }}
            >
                <CircularProgress color="inherit" />
            </Box>
        );
    };

    return (
        <Container>
            <Paper sx={{ marginTop: "10px" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Typography color="primary" variant="h4" sx={{ paddingLeft: "1em", paddingTop: "10px" }}>
                        Пошук
                    </Typography>
                    <ButtonGroup>
                        <StyledButton variant="contained" onClick={handleClear}>Очистити</StyledButton>
                        <StyledButton variant="contained" onClick={handleSubmit}>Зберегти</StyledButton>
                    </ButtonGroup>
                </div>
                <hr />
                <Box sx={{ marginLeft: '20px' }}>
                    <Box sx={{ display: { xs: 'flex', md: 'none', }, width: "100%", }}>
                        <TextField id="filled-basic" label="Пошук..." variant="filled" size="small" sx={{ width: "100%", marginBottom: "15px" }} />
                    </Box>
                    <div className="filter-criteria-list">
                        <Box sx={{ display: { xs: 'none', md: 'flex', }, width: "100%", height: "10px" }}>
                            <TextField id="filled-basic" label="Пошук за назвою..." variant="filled" size="small" fullWidth />
                        </Box>

                        {allCriterias().map((criterion, index) => (
                            <Dropdown icon={<KeyboardArrowDown fontSize="small" />} label={criterion.label} key={index}>
                                <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
                                    {criterion.value.map((item, index) => (
                                        <>
                                            <FormControlLabel key={index} control={
                                                <Checkbox
                                                    checked={selectedValues.includes(item.value)}
                                                    onChange={() => handleCheckboxChange(item.value)}
                                                    name={item.label}
                                                />
                                            }
                                                label={item.label}
                                            />
                                            <Divider />
                                        </>
                                    ))}
                                </FormGroup>
                            </Dropdown>
                        ))}
                    </div>
                </Box>
                <hr />
                <Grid container>
                    <Grid item xs={4} md={4}>
                        <p>{response?.totalElements} об'єктів</p>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Stack alignItems="center" sx={{ paddingTop: "10px" }}>
                            <Pagination
                                variant="outlined"
                                className="justify-content-center"
                                count={Math.ceil(response?.totalElements / response?.size)}
                                page={pageNumber}
                                onChange={handlePageChange}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={4} md={4}>
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
                    </Grid>
                </Grid>
                <hr />
                <PlantList response={response} showOrder={showOrder} />

            </Paper>
        </Container>
    );
}

export default Filter;