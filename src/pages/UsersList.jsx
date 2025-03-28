import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Modal,
  Box,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

const columns = [
  { id: "avatar", label: "Avatar", minWidth: 100 },
  { id: "first_name", label: "First Name", minWidth: 100 },
  { id: "last_name", label: "Last Name", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

export function UsersList({ onLogout }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=1")
      .then((response) => setUsers(response.data.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setDeleteMessage(true);  // Show delete success message
      setTimeout(() => setDeleteMessage(false), 3000);  // Hide after 3 seconds
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEmailError(""); // Reset email error
    setOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Invalid email format");
      return;
    }
    
    try {
      await axios.put(`https://reqres.in/api/users/${selectedUser.id}`, selectedUser);
      setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
      setOpen(false);
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);  // Hide after 3 seconds
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h2 className="text-center text-3xl font-sans">Users List</h2>

      {/* Logout Button */}
      <div className="flex w-full justify-end p-2">
        <Button variant="contained" color="primary" onClick={onLogout}>
          Logout
        </Button>
      </div>

      <Paper sx={{ width: "60%", marginTop: "3rem" }}>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "avatar" ? (
                          <img src={value} alt="Avatar" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                        ) : column.id === "actions" ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => handleEditClick(row)}
                              style={{ marginRight: 5 }}
                            >
                              Edit
                            </Button>
                            <Button variant="contained" color="error" size="small" onClick={() => handleDelete(row.id)}>
                              Delete
                            </Button>
                          </>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Edit User Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Edit User</h2>
          {selectedUser && (
            <>
              <TextField
                fullWidth
                label="First Name"
                margin="normal"
                value={selectedUser.first_name}
                onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })}
              />
              <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                value={selectedUser.last_name}
                onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })}
              />
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                error={!!emailError}
                helperText={emailError}
              />
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" onClick={handleUpdateUser} sx={{ marginRight: 1 }}>
                  Update
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Snackbar
  open={successMessage}
  autoHideDuration={3000}
  onClose={() => setSuccessMessage(false)}
  anchorOrigin={{
    vertical: 'top',  
    horizontal: 'center',  
  }}
>
  <Alert severity="success" sx={{ width: '100%' }}>
    User updated successfully!
  </Alert>
</Snackbar>

<Snackbar
  open={deleteMessage}
  autoHideDuration={3000}
  onClose={() => setDeleteMessage(false)}
  anchorOrigin={{
    vertical: 'bottom',  
    horizontal: 'right', 
  }}
>
  <Alert severity="success" sx={{ width: '100%' }}>
    User deleted successfully!
  </Alert>
</Snackbar>

    </div>
  );
}
