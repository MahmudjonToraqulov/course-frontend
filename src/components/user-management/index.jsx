import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import {
  Button,
  ButtonToolbar,
  Container,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Table,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock, faUserXmark, faUserGear, faUser, faImages } from '@fortawesome/free-solid-svg-icons';

const UsersTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const table = useSelector((state) => state.table);
  const [masterChecked, setMasterChecked] = useState(false);
  const [selectedList, setSelectedList] = useState([]);

  const { theme } = useTheme();

  useEffect(() => {
    dispatch(setTotalCountTableAsync());
  }, []);

  useEffect(() => {
    fetchUsers(table.page, table.limit).then((data) => {
      dispatch(setUsersAction(data.rows));
      data.rows.every((user) => {
        if (!selectedList.includes(user.id)) {
          setMasterChecked(false);
          return false;
        }
      });
    });
  }, [table.page]);

  const logOut = () => {
    dispatch(setUserAction({}));
    dispatch(setIsAuthAction(false));
    localStorage.removeItem('token');
  };

  const setStatus = (status) => {
    if (selectedList.length > 0) {
      changeStatus(selectedList, status)
        .then(() => dispatch(setUsersAsync(table.page, table.limit)))
        .then(() => {
          if (status === 'blocked' && selectedList.includes(jwt_decode(localStorage.getItem('token')).id)) {
            logOut();
          }
        });
    }
  };

  const setRole = (role) => {
    if (selectedList.length > 0) {
      changeRole(selectedList, role)
        .then(() => dispatch(setUsersAsync(table.page, table.limit)))
        .then(() => {
          if (role === 'USER' && selectedList.includes(jwt_decode(localStorage.getItem('token')).id)) {
            logOut();
          }
        });
    }
  };

  const deleteUser = () => {
    if (selectedList.length > 0) {
      remove(selectedList)
        .then(() => {
          dispatch(setUsersAsync(table.page, table.limit));
          dispatch(setTotalCountTableAsync());
        })
        .then(() => {
          if (selectedList.includes(jwtDecode(localStorage.getItem('token')).id)) {
            logOut();
          }
        });
    }
  };

  const onMasterCheck = (e) => {
    const selectedIds = e.target.checked ? table.users.map((user) => user.id) : [];
    setSelectedList(selectedIds);
    setMasterChecked(e.target.checked);
  };

  const onItemCheck = (e, id) => {
    const selectedIds = e.target.checked ? [...selectedList, id] : [...selectedList.filter((item) => item !== id)];
    setSelectedList(selectedIds);
    setMasterChecked(table.users.length === selectedIds.length);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      View collections
    </Tooltip>
  );

  return (
    <Container className="container-wrap d-flex align-items-center flex-column">
      <ButtonToolbar className="users-button-toolbar mt-3 d-none d-md-block">
        <Button
          onClick={() => setStatus('blocked')}
          className={`text-${themeColorDark[theme]} m-2`}
          variant="secondary"
        >
          Block <FontAwesomeIcon icon={faLock} />
        </Button>
        <Button onClick={() => setStatus('active')} className={`text-${themeColorDark[theme]} m-2`} variant="secondary">
          Unblock <FontAwesomeIcon icon={faUnlock} />
        </Button>
        <Button onClick={deleteUser} className={`text-${themeColorDark[theme]} m-2`} variant="secondary">
          Delete <FontAwesomeIcon icon={faUserXmark} />
        </Button>
        <Button onClick={() => setRole('ADMIN')} className={`text-${themeColorDark[theme]} m-2`} variant="secondary">
          Add to admins <FontAwesomeIcon icon={faUserGear} />
        </Button>
        <Button onClick={() => setRole('USER')} className={`text-${themeColorDark[theme]} m-2`} variant="secondary">
          Remove from admins <FontAwesomeIcon icon={faUser} />
        </Button>
      </ButtonToolbar>
      <DropdownButton
        id="dropdown-basic-button"
        title="Actions"
        className="mt-3 d-md-none users-dropdown"
        data-bs-theme={theme}
        variant="secondary"
      >
        <Dropdown.Item onClick={() => setStatus('blocked')}>
          Block <FontAwesomeIcon icon={faLock} />
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setStatus('active')}>
          Unblock <FontAwesomeIcon icon={faUnlock} />
        </Dropdown.Item>
        <Dropdown.Item onClick={deleteUser}>
          Delete <FontAwesomeIcon icon={faUserXmark} />
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setRole('ADMIN')}>
          Add to admins <FontAwesomeIcon icon={faUserGear} />
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setRole('USER')}>
          Remove from admins <FontAwesomeIcon icon={faUser} />
        </Dropdown.Item>
      </DropdownButton>
      <Table variant={theme} className="users-table mt-3" striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">
              <input
                type="checkbox"
                className="form-check-input"
                checked={masterChecked}
                onChange={(e) => onMasterCheck(e)}
              />
            </th>
            <th>Name</th>
            <th>e-mail</th>
            <th>Status</th>
            <th>Role</th>
            <th className="text-center">Collections</th>
          </tr>
        </thead>
        <tbody>
          {table.users.map((user) => (
            <tr key={user.id}>
              <td className="text-center" scope="row">
                <input
                  type="checkbox"
                  checked={selectedList.includes(user.id)}
                  className="form-check-input"
                  onChange={(e) => onItemCheck(e, user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.role}</td>
              <td className="text-center">
                <OverlayTrigger placement="right" delay={{ show: 250, hide: 250 }} overlay={renderTooltip}>
                  <Button onClick={() => navigate(`/profile/${user.id}`)} variant="secondary">
                    <FontAwesomeIcon icon={faImages} />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pages component="usersTable" />
    </Container>
  );
};

export default UsersTable;