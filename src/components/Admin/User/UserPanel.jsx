import { useEffect } from "react";
import { useState } from "react";
import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, styled, TableRow, tableCellClasses, Button, List, ListItem, ListItemText, Tooltip, Fab, Typography, Box } from "@mui/material";
import ModalTransition from "../../ui/modal/Modal";
import { Block, Undo } from "@mui/icons-material";
import { getAllUsers } from "../../../functions/UserRequests";
import { useTranslation } from "react-i18next";

const UserPanel = () => {

  const [users, setUsers] = useState();
  const [response, setResponse] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const { t } = useTranslation();

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
        </div>
        <hr />
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">{t('user.id')}</StyledTableCell>
                  <StyledTableCell align="center">{t('user.login')}</StyledTableCell>
                  <StyledTableCell align="center">{t('user.email')}</StyledTableCell>
                  <StyledTableCell align="center">{t('user.status.label')}</StyledTableCell>
                  <StyledTableCell align="center">{t('actions.label')}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.info(response)}
                {response?.content?.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell scope="row" align="center">{user.id}</StyledTableCell>
                    <StyledTableCell align="center">{user.login}</StyledTableCell>
                    <StyledTableCell align="center">{user.email}</StyledTableCell>
                    <StyledTableCell align="center">{user.status === "ACTIVE" ? t('user.status.active') : t('user.status.blocked')}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="contained" className="admin-controll-button right-border" onClick={() => handleShowModal(user)}>{t('actions.details')}</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ModalTransition open={showModal} handleOpen={handleOpen} handleClose={handleClose} title={`${t('labels.userDetails')}`}>
            <StyledList>
              <StyledListItem>
                <ListItemText primary={`${t('user.id')}: ${currentUser?.id}`} />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary={`${t('user.login')}: ${currentUser?.login}`} />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary={`${t('user.email')}: ${currentUser?.email}`} />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary={`${t('user.role')}: ${currentUser?.role}`} />
              </StyledListItem>
              <StyledListItem>
                <ListItemText primary={`${t('user.registrationDate')}: ${currentUser?.registrationDate}`} />
              </StyledListItem>
              <StyledListItem>
                <ListItemText
                  primary={`${t('user.lastLoginDate')}: ${currentUser?.lastLogin?.slice(0, 10) + ' ' + currentUser?.lastLogin?.slice(11, 19) + ' GMT-0'
                    }`}
                />
              </StyledListItem>
              <StyledListItem>
                <ListItemText>
                  <div> {currentUser?.status === "ACTIVE" ?
                    <Box sx={{alignItems: 'center'}} className="d-flex justify-content-between">
                      <div className="d-flex">
                        <Typography> {t('user.status.label')}: {t('user.status.active')} </Typography>
                        <Box sx={{marginLeft: '10px', paddingLeft: '10px', paddingRight: '50px', backgroundColor: 'green', border: '1px solid transparent', borderRadius: '20px', width: '45px'}}>active</Box>
                      </div>
                      <Tooltip title={t('actions.block')} placement="bottom">
                        <Fab color="error" aria-label="add" onClick={() => handleBlock(currentUser?.id, 'NOT_ACTIVE')}>
                          <Block />
                        </Fab>
                      </Tooltip>
                    </Box>
                    :
                    <div className="d-flex justify-content-between">
                      <Box sx={{alignItems: 'center'}} className="d-flex">
                        {t('user.status.label')}: {t('user.status.blocked')} 
                        <Box sx={{marginLeft: '10px', paddingLeft: '10px', paddingRight: '65px', backgroundColor: 'red', border: '1px solid transparent', borderRadius: '20px', width: '45px'}}>banned</Box>
                      </Box>
                      <Tooltip title={t('actions.unblock')} placement="bottom">
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