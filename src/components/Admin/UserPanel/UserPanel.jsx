import { useEffect } from "react";
import { getAllUsers, blockUser } from "../../../functions/userRequests";
import { useState } from "react";
import { Link } from "react-router-dom";
import './UserPanel.css';

const UserPanel = () => {

    const [users, setUsers] = useState();

    useEffect(() => {
        getAllUsers().then((res) => setUsers(res));
    },[]);

    const handleStatus = (user, status) => {
        blockUser(user.id, status);
        const updatedUsers = users.map((u) =>
            u.id === user.id ? { ...u, status: status } : u
        );
        setUsers(updatedUsers);
    }

    return (
        <div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Login</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.login}</td>
                    <td>{user.email}</td>
                    <td className={user.status === 'NOT_ACTIVE' || user.status === 'DELETED'  ? 'admin-user-blocked' : ''}>{user.status} </td>
                    <td>
                        <Link to={`${user.id}`}>
                        <button className="admin-controll-button">Детальніше</button>
                        </Link>
                        {user.status === 'ACTIVE' && (
                            <button className="admin-controll-button" onClick={ x => handleStatus(user, "NOT_ACTIVE")}>Заблокувати</button>
                        )}
                        {user.status === 'NOT_ACTIVE' && (
                            <button className="admin-controll-button" onClick={ x => handleStatus(user, 'ACTIVE')}>Розблокувати</button>
                        )}
                        
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