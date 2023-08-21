import { useState, useEffect } from "react";
import * as request from "../../functions/supplierRequests";

const SupplierCatalog = () => {

    const [suppliers, setSuppliers] = useState();

    useEffect(() => {
        request.getAllSuppliers().then((res) => setSuppliers(res))
    }, []);

    return (
        <div className="container filter-container">
            <div className='filter-header'>
                <h4 className="w-100 font-weight-bold filter-title d-flex">Розсадники</h4>
                <hr></hr>
            </div>
            {suppliers?.data?.map((supplier) => (
                <p>
                    {supplier.name}
                </p>
            ))}
        </div>
    );
};

export default SupplierCatalog;