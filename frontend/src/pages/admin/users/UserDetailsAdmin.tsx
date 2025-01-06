import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { User } from '../../../types';
import { AppContext } from '../../../AppContext';

const UserDetailsAdmin = () => {
  const [user, setUser] = useState<User>();
  const params = useParams();
  const navigate = useNavigate();

  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext.Provider is missing!');
  }

  const { userCredentials, setUserCredentials } = appContext;

  const getUserDetails = async () => {
    try {
      const response = await fetch(`http://localhost:4000/users/${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + userCredentials?.accessToken,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else if (response.status === 401) {
        setUserCredentials(null);
        navigate('/auth/login');
      } else {
        alert('Unable to read the user details: ' + data);
      }
    } catch (error) {
      alert('Unable to connect to the server');
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-3">User Details</h2>
      <hr />

      <div className="row mb-3">
        <div className="col-4">ID</div>
        <div className="col-8">{user?.id}</div>
      </div>

      <div className="row mb-3">
        <div className="col-4">First Name</div>
        <div className="col-8">{user?.firstname}</div>
      </div>

      <div className="row mb-3">
        <div className="col-4">Last Name</div>
        <div className="col-8">{user?.lastname}</div>
      </div>

      <div className="row mb-3">
        <div className="col-4">Email</div>
        <div className="col-8">{user?.email}</div>
      </div>

      <div className="row mb-3">
        <div className="col-4">Phone</div>
        <div className="col-8">{user?.phone}</div>
      </div>

      <div className="row mb-3">
        <div className="col-4">Address</div>
        <div className="col-8">{user?.address}</div>
      </div>

      <div className="row mb-3">
        <div className="col-4">Role</div>
        <div className="col-8">
          {!user?.id ? (
            ''
          ) : user?.role === 'admin' ? (
            <span className="badge text-bg-warning">Admin</span>
          ) : (
            <span className="badge text-bg-success">Client</span>
          )}
        </div>
      </div>

      <hr />
      <Link className="btn btn-secondary btn-sm" to="/admin/users">
        Back
      </Link>
    </div>
  );
};

export default UserDetailsAdmin;
