import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPlants, getPlantById, getPageablePlantByName } from "../../../functions/plantRequests";
import { getSupplierByid, deleteJunction, createJunction } from "../../../functions/supplierRequests";
import Modal from "../../ui/Modal/Modal";
import { Pagination } from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
const Supplier = () => {
    const { id } = useParams();
    const [supplier, setSupplier] = useState([]);
    const [active, setActive] = useState(false);
    let searchTimeout;
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [response, setResponse] = useState();
    const [keyword, setKeyword] = useState('');

    const style = {
        width: '100%',
        bgcolor: 'background.paper',
    };

    useEffect(() => {
        getSupplierByid(id).then((res) => setSupplier(res));
        getAllPlants(1, pageSize).then((res) => setResponse(res));
    }, []);

    const handleDeleteJunction = (plantId, indexToRemove) => {
        deleteJunction(id, plantId)
            .then(() => {
                const updatedPlants = supplier.avaliablePlants.slice();
                updatedPlants.splice(indexToRemove, 1);
                setSupplier((prevSupplier) => ({
                    ...prevSupplier,
                    avaliablePlants: updatedPlants,
                }));
            })
            .catch((error) => {
                console.error("Error deleting junction:", error);
            });
    };

    const openModal = () => {
        setActive(true);
    }

    const handleInputChange = (e) => {
        const q = e.target.value;
        setKeyword(q);
        setPageNumber(1);
        handleRequest(q);
    };

    const handleRequest = (q) => {
        if (q === null)
            q = "";

        clearTimeout(searchTimeout);

        if (!isNaN(+q) && q >= 1) {
            getPlantById(q)
                .then((res) => setResponse({ data: [res] }))
                .catch((error) => {
                    setResponse([]);
                });
        }

        else if (q.length > 2) {
            searchTimeout = setTimeout(() => {
                getPageablePlantByName(q, 1, pageSize, 'id')
                    .then((res) => setResponse(res))
                    .catch((error) => {
                        setResponse([]);
                    });
            }, 800);
        }

        if (q.length === 0) {
            setPageNumber(1);
            getAllPlants(1, pageSize).then((res) => setResponse(res));
        }
    }

    const handlePageChange = (event, value) => {
        setPageNumber(value);
        if (keyword.length !== 0) {
            getPageablePlantByName(keyword, value, pageSize, 'id')
                .then((res) => setResponse(res))
                .catch((error) => {
                    setResponse([]);
                });
        } else {
            getAllPlants(value, pageSize).then((res) => setResponse(res));
        }
        console.info(response);
    };

    const handleButtonClick = (plant) => {
        createJunction(id, plant.id)
            .then(() => {
                setSupplier((prevSupplier) => ({
                    ...prevSupplier,
                    avaliablePlants: [...prevSupplier.avaliablePlants, plant],
                }));
            })
            .catch((error) => {
                console.error("Error creating junction:", error);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col text-start">
                    <h1 className="text-decoration-underline">{supplier?.name}</h1>
                </div>
                <div className="col text-end">
                    <button className="btn btn-primary" onClick={openModal}>Добавити новий зв'язок</button>
                </div>
            </div>
            <div>

                {active && (
                    <Modal activeObj={{ active, setActive }} title={"Обрати розсаду"}>
                        <div className="admin-input">
                            <input
                                placeholder='Знайти Назва, латинь, ID'
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                {response?.data?.map((plant) => (
                                    <ListItemButton button key={plant.id} divider onClick={() => handleButtonClick(plant)}>
                                        <ListItemText primary={plant.id + ' ' + plant.latinName}> </ListItemText>
                                    </ListItemButton>
                                ))}
                            </List>
                        </div>
                        <Pagination
                            variant="outlined"
                            shape="rounded"
                            count={Math.ceil(response?.totalSize / response?.pageSize)}
                            page={pageNumber}
                            onChange={handlePageChange}
                        />
                    </Modal>
                )}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>PLANT_ID</th>
                            <th>Назва</th>
                            <th>Латина</th>
                            <th>Ескіз</th>
                            <th>Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplier?.avaliablePlants?.map((plant, index) => (
                            <tr key={plant.id}>
                                <td>
                                    {plant.id}
                                </td>
                                <td>
                                    {plant.name}
                                </td>
                                <td>
                                    {plant.latinName}
                                </td>
                                <td>
                                    <img src={`https://plantsearch.s3.eu-north-1.amazonaws.com/sketches/${plant.sketch}`} alt="sketch" style={{ width: '20%', height: '20%' }}></img>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={x => handleDeleteJunction(plant.id, index)}
                                    > Видалити</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Supplier;
