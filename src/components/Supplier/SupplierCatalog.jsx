import { useState, useEffect } from "react";
import * as request from "../../functions/supplierRequests";
import './SupplierCatalog.css';
import { ApartmentOutlined } from "@mui/icons-material";
//import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const SupplierCatalog = () => {

    const [suppliers, setSuppliers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    //const navigate = useNavigate();

    useEffect(() => {
        request.getAllSuppliers()
        .then((res) => setSuppliers(res))
        .finally(() => {
            setIsLoading(false);
         });
    }, []);

    if (isLoading) {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <CircularProgress />
          </Box>
        );
      };

    return (
        <div className="container filter-container">
            <div className="filter-header">
                <h4 className="w-100 font-weight-bold filter-title d-flex"><ApartmentOutlined /> Розсадники</h4>
                <hr />
            </div>
            <div className="supplier-list">
                {suppliers?.data?.map((supplier) => (
                    <button key={supplier.id} className="supplier-card" >
                        {/* onClick={() => navigate(`${supplier.id}`)} */}
                        <h5 className="supplier-name">{supplier.name}</h5>
                        <p className="supplier-details">{supplier.details}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SupplierCatalog;