import { useEffect } from "react";
import { getAllUsers, blockUser } from "../../../functions/userRequests";
import { useState } from "react";
import './UserPanel.css';
import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, styled, TableRow, TextField, tableCellClasses, Button, List, ListItem, ListItemText, ListItemButton, Tooltip, Fab } from "@mui/material";
import './User.css';
import Modal from "../../ui/Modal/Modal";
import { Block, Undo } from "@mui/icons-material";

const UserPanel = () => {

  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    getAllUsers(1, 20).then((res) => { setUsers(res); console.info(res) });
  }, []);

  const handleShowModal = (user) => {
    setCurrentUser(user);
    setShowModal(!showModal)
  }

  const handleBlock = (id, status) => {
    blockUser(id, status);
    setCurrentUser((prev) => ({ ...prev, status: status }));
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div className="container">
      <div>
        <hr />
        <div className="d-flex justify-content-between">
          {/* <TextField id="outlined-basic"
            label="Знайти за логіном, ID"
            variant="outlined"
          //onChange={handleInputChange} 
          /> */}
          <div class="d-flex mt-3">
            <Pagination
              variant="outlined"
              shape="rounded"
              count={Math.ceil(users?.totalSize / users?.pageSize)}
            //={pageNumber}
            //onChange={handlePageChange}
            />
          </div>
          <div></div>
          <div></div>
          {/* <Tooltip title="Добавити" placement="top" className="mr-10">
            <Fab color="success" aria-label="add">
              <Add />
            </Fab>
          </Tooltip> */}
        </div>
        <hr />
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Логін</StyledTableCell>
                  <StyledTableCell align="center">Пошта</StyledTableCell>
                  <StyledTableCell align="center">Статус</StyledTableCell>
                  <StyledTableCell align="center">Дії</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.data?.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell scope="row" align="center">{user.id}</StyledTableCell>
                    <StyledTableCell align="center">{user.login}</StyledTableCell>
                    <StyledTableCell align="center">{user.email}</StyledTableCell>
                    <StyledTableCell align="center">{user.status}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="contained" className="admin-controll-button right-border" onClick={() => handleShowModal(user)}>Детальніше</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {showModal && (
            <Modal activeObj={{ active: showModal, setActive: setShowModal }} title={'Перегляд користувача'}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: '100%',
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 500,
                  '& ul': { padding: 0 },
                }}
                subheader={<li />}
              >
                <ListItem>
                  <ListItemText primary={`ID: ${currentUser.id}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Логін: ${currentUser.login}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Пошта: ${currentUser.email}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Роль: ${currentUser.role}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Статус: ${currentUser.status}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Зареєстрований: ${currentUser.registrationDate}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Останнє відвідування: ${currentUser.lastLogin}`} />
                </ListItem>
              </List>
              {currentUser.status !== 'NOT_ACTIVE' && (
                <Tooltip title="Заблокувати" placement="bottom">
                  <Fab color="error" aria-label="add" onClick={() => handleBlock(currentUser.id, 'NOT_ACTIVE')}>
                    <Block />
                  </Fab>
                </Tooltip>
              )}
              {currentUser.status !== 'ACTIVE' && (
                <Tooltip title="Розблокувати" placement="bottom">
                  <Fab color="error" aria-label="add" onClick={() => handleBlock(currentUser.id, 'ACTIVE')}>
                    <Undo />
                  </Fab>
                </Tooltip>
              )}

            </Modal>)}
        </Paper>
      </div>
    </div >
  );
}

export default UserPanel;