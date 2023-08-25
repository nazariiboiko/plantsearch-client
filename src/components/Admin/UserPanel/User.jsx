import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './UserPanel.css';
import { getUserById, updateUser } from "../../../functions/userRequests";

//deprecated
const User = () => {

  const { id } = useParams();
  const [user, setUser] = useState({});


  useEffect(() => {
    getUserById(id).then((res) => setUser(res));
  }, [id]);

  const handleRequest = () => {
    getUserById(id).then((res) => setUser(res));
    console.info(user);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    handleRequest();
  }

  const handleSubmit = () => {
    updateUser(user);
  }

  return (
    <div className="container">
      <form>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>login/Логін</th>
              <td><input
                type="text"
                id="login"
                name="login"
                value={user.login || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>email/Пошта</th>
              <td><input
                type="email"
                id="email"
                name="email"
                value={user.email || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>role/Роль</th>
              <td><select name="role" id="role" onChange={handleChange} value={user.role || ''}>
                <option value="ADMIN">Адмін</option>
                <option value="MANAGER">Менеджер</option>
                <option value="USER">Користувач</option>
              </select></td>
            </tr>
            <tr>
              <th>status/Статус</th>
              <td><select name="status" id="status" onChange={handleChange} value={user.status || ''}>
                <option value="ACTIVE">Активний</option>
                <option value="NOT_ACTIVE">Заблокований</option>
                <option value="DELETED">Видалений</option>
              </select></td>
            </tr>
          </tbody>
        </table>
      </form>
      <button className="btn btn-danger admin-plant-button" onClick={handleSubmit}>Зберегти</button>
      <button className="btn btn-warning admin-plant-button" onClick={handleCancel}>Скасувати</button>
    </div>
  );

};

export default User;