import { useEffect } from "react";
import { getAllUsers, blockUser } from "../../../functions/userRequests";
import { useState } from "react";
import { Link } from "react-router-dom";
import './UserPanel.css';

const UserPanel = () => {

  const [users, setUsers] = useState();

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res));
  }, []);

  const handleStatus = (user, status) => {
    blockUser(user.id, status);
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, status: status } : u
    );
    setUsers(updatedUsers);
  }

  return (
    <div className="container">
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
              <td className={user.status === 'NOT_ACTIVE' || user.status === 'DELETED' ? 'admin-user-blocked' : ''}>{user.status} </td>
              <td>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <button className="btn btn-secondary" onClick={x => window.location.href = `user/${user.id}`}> Детальніше</button>
                  {user.status === 'ACTIVE' && (
                    <button className="btn btn-secondary" onClick={x => handleStatus(user, "NOT_ACTIVE")}>Заблокувати</button>
                  )}
                  {user.status === 'NOT_ACTIVE' && (
                    <button className="btn btn-secondary" onClick={x => handleStatus(user, 'ACTIVE')}>Розблокувати</button>
                  )}
                  {user.status !== 'DELETED' && (
                    <button className="btn btn-secondary" onClick={x => handleStatus(user, 'DELETED')}>Видалити</button>
                  )}
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