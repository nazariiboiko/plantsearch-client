import { useEffect } from "react";
import  * as request from "../../../functions/supplierRequests";
import { useState } from "react";
import { Link } from "react-router-dom";
import './SupplierPanel.css';

const UserPanel = () => {

    const [suppliers, setSuppliers] = useState();

    useEffect(() => {
        request.getAllSuppliers().then((res) => setSuppliers(res))
        .then(console.info(suppliers));
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
              {suppliers?.data?.map((supplier) => (
                <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>
                    <td>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                          <button className="btn btn-secondary" onClick={x => window.location.href = `supplier/${supplier.id}`}>Детальніше</button>
                        </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );      
}

export default UserPanel;