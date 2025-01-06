import { useContext, useEffect, useState } from 'react';
import { User } from '../../../types';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../AppContext';

const UserList = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext.Provider is missing!');
  }

  const { userCredentials, setUserCredentials } = appContext;

  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const getUsers = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_WEBAPI_URL
        }/users?_page=${currentPage}&_limit=${pageSize}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + userCredentials?.accessToken,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        let totalCount = Number(response.headers.get('X-Total-Count'));
        let pages = Math.ceil(totalCount / pageSize);
        setTotalPages(pages);
        setUsers(data);
      } else if (response.status === 401) {
        setUserCredentials(null);
        navigate('/auth/login');
      } else {
        alert('Unable to read the data: ' + data);
      }
    } catch (error) {
      alert('Unable to connect to the server');
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  //pagination buttons
  let paginationButtons = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li
        className={i === currentPage ? 'page-item active' : '"page-item'}
        key={i}
      >
        <a
          className="page-link"
          href={`?page=${i}`}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(Number(i));
          }}
        >
          {i}
        </a>
      </li>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-5">List of Users</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>
                {user.role === 'admin' ? (
                  <span className="badge text-bg-warning">Admin</span>
                ) : (
                  <span className="badge text-bg-success">Client</span>
                )}
              </td>
              <td>
                <Link
                  className="btn btn-primary btn-sm"
                  to={`/admin/users/details/${user.id}`}
                  role="button"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination">{paginationButtons}</ul>
    </div>
  );
};

export default UserList;
