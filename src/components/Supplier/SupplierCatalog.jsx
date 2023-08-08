import { useState, useEffect } from "react";
import * as request from "../../functions/supplierRequests";

const SupplierCatalog = () => {

    const [suppliers, setSuppliers] = useState();

    useEffect(() => {
        request.getAllSuppliers().then((res) => setSuppliers(res))
      }, []);

    return (
        <div className="container h1">
            {suppliers?.data?.map((supplier) => (
                <p>
                {supplier.name}
                </p>
            ))}
        </div>
    );
};

export default SupplierCatalog;