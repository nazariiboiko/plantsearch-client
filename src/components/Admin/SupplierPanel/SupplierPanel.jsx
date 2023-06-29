import { useEffect } from "react";
import  * as request from "../../../functions/supplierRequests";
import { useState } from "react";
import { Link } from "react-router-dom";
import './SupplierPanel.css';

const UserPanel = () => {

    const [suppliers, setSuppliers] = useState();

    useEffect(() => {
        request.getAllSuppliers().then((res) => setSuppliers(res));
    },[]);

    return (
        <div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers?.map((supplier) => (
                <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>
                    <td>
                        <Link to={`${supplier.id}`}>
                        <button className="admin-controll-button">Детальніше</button>
                        </Link>
                        
                        <button className="admin-controll-button right-border">Видалити</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );      
}

export default UserPanel;