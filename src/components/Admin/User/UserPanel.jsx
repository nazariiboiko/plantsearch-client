import { useEffect } from "react";
import { useState } from "react";
import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, styled, TableRow, tableCellClasses, Button, List, ListItem, ListItemText, Tooltip, Fab } from "@mui/material";
import ModalTransition from "../../ui/modal/Modal";
import { Block, Undo } from "@mui/icons-material";
import { getAllUsers } from "../../../functions/UserRequests";

const UserPanel = () => {

  const [users, setUsers] = useState();
  const [response, setResponse] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    getAllUsers(pageNumber, pageSize).then((res) => setResponse(res));
  }, []);

  const handleShowModal = (user) => {
    setCurrentUser(user);
    setShowModal(!showModal)
  }

  const handleBlock = (id, status) => {
    //blockUser(id, status);
    setCurrentUser((prev) => ({ ...prev, status: status }));
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.mode === 'light' ? '#ddd' : '#505050',
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

  const StyledList = styled(List)(({ theme }) => ({
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500,
    "& ul": { padding: 0 },
  }));

  const StyledListItem = styled(ListItem)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
  }));

  const handlePageChange = (event, value) => {
    setPageNumber(value);
    //getAllUsers(value, pageSize).then((res) => setUsers(res));
  }

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
              page={pageNumber}
              onChange={handlePageChange}
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
                {console.info(response)}
                {response?.content?.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell scope="row" align="center">{user.id}</StyledTableCell>
                    <StyledTableCell align="center">{user.login}</StyledTableCell>
                    <StyledTableCell align="center">{user.email}</StyledTableCell>
                    <StyledTableCell align="center">{user.status === "ACTIVE" ? 'Активний' : 'Заблокований'}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="contained" className="admin-controll-button right-border" onClick={() => handleShowModal(user)}>Детальніше</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ModalTransition open={showModal} handleOpen={handleOpen} handleClose={handleClose} title={`Перегляд користувача`}>
            <StyledList>
              <StyledListItem>
                <ListItemText primary={`ID: ${currentUser?.id}`} />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary={`Логін: ${currentUser?.login}`} />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary={`Пошта: ${currentUser?.email}`} />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary={`Роль: ${currentUser?.role}`} />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary={`Зареєстрований: ${currentUser?.registrationDate}`} />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={`Останій вхід: ${currentUser?.lastLogin?.slice(0, 10) + ' ' + currentUser?.lastLogin?.slice(11, 19) + ' GMT-0'
                    }`}
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText>
                  <div> {currentUser?.status === "ACTIVE" ?
                    <div className="d-flex justify-content-between">
                      <div>
                        Статус: Активований <div className="badge-green badge">active</div>
                      </div>
                      <Tooltip title="Заблокувати" placement="bottom">
                        <Fab color="error" aria-label="add" onClick={() => handleBlock(currentUser?.id, 'NOT_ACTIVE')}>
                          <Block />
                        </Fab>
                      </Tooltip>
                    </div>
                    :
                    <div className="d-flex justify-content-between">
                      <div>
                        Статус: Заблокований <div className="badge-red badge">banned</div>
                      </div>
                      <Tooltip title="Розблокувати" placement="bottom">
                        <Fab color="primary" aria-label="add" onClick={() => handleBlock(currentUser.id, 'ACTIVE')}>
                          <Undo />
                        </Fab>
                      </Tooltip>
                    </div>}
                  </div>
                </ListItemText>
              </StyledListItem>
            </StyledList>
          </ModalTransition>
        </Paper>
      </div>
    </div >
  );
}

export default UserPanel;