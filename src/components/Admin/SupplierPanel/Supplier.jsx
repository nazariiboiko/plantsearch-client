import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSupplierByid } from "../../../functions/supplierRequests";

const Supplier = () => {
    const {id} = useParams();
    const [supplier, setSupplier] = useState();

    useEffect(() => {
        getSupplierByid(id).then((res) => setSupplier(res));
    },[]);

    return (
        <div className="container">
            <div className="row">
                <div className="col text-start">
                    <h1 className="text-decoration-underline">{supplier?.name}</h1>
                </div>
                <div className="col text-end">
                    <button className="btn btn-primary">Добавити новий зв'язок</button>
                </div>
            </div>
            <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Supplier_ID</th>
                        <th>PLANT_ID</th>
                        <th>Назва</th>
                        <th>Латина</th>
                        <th>Ескіз</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {supplier?.avaliablePlants?.map((plant) => (
                       <tr key={plant.id}>
                            <td>
                                {supplier.id}
                            </td>
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
                                <i class='fa fa-window-close h1' style={{color: 'red'}}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
};

export default Supplier;