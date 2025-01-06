import { useContext, useState } from 'react';
import UserDetails from '../components/UserDetails';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [action, setAction] = useState('default');

  return (
    <div className="container my-4">
      <div className="row">
        {action === 'default' && (
          <div className="col-lg-8 mx-auto rounded border p-4">
            <h2 className="mb-3">User Profile</h2>
            <hr />
            <UserDetails />
            <hr />
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => setAction('update_profile')}
            >
              Update Profile
            </button>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => setAction('change_password')}
            >
              Change Password
            </button>
          </div>
        )}
        {action === 'update_profile' && (
          <div className="col-lg-8 mx-auto rounded border p-4">
            <h2 className="mb-3 text-center">Update Profile</h2>
            <hr />
            <UpdateProfile />
            <hr />
            <div className="text-center">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => setAction('default')}
              >
                Back to Profile
              </button>
            </div>
          </div>
        )}
        {action === 'change_password' && (
          <div className="col-lg-5 col-md-8 mx-auto rounded border p-4 text-center">
            <h2 className="mb-3 text-center">Change Password</h2>
            <hr />
            <ChangePassword />
            <hr />
            <button
              type="button"
              className="btn btn-link text-decoration-none"
              onClick={() => setAction('default')}
            >
              Back to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const UpdateProfile = () => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext.Provider is missing!');
  }

  const { userCredentials, setUserCredentials } = appContext;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (!user.firstname || !user.lastname || !user.email) {
      alert('Please fill all the required fields!');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_WEBAPI_URL}/users/${
          userCredentials?.user.id
        }`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userCredentials?.accessToken,
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert('User profile updated correctly!');
        console.log('server response: ', data);
        //@ts-ignore
        setUserCredentials({ ...userCredentials, user: data });
      } else if (response.status == 401) {
        setUserCredentials(null);
        navigate('/auth/login');
      } else {
        alert('Unable to update user profile: ' + data);
      }
    } catch (error) {
      alert('Unable to connect to the server');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label">First Name *</label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            name="firstname"
            defaultValue={userCredentials?.user.firstname}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-4 col-form-label">Last Name *</label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            name="lastname"
            defaultValue={userCredentials?.user.lastname}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-4 col-form-label">Email *</label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            name="email"
            defaultValue={userCredentials?.user.email}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-4 col-form-label">Phone Number</label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            name="phone"
            defaultValue={userCredentials?.user.phone}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-4 col-form-label">Address</label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            name="address"
            defaultValue={userCredentials?.user.address}
          />
        </div>
      </div>

      <div className="text-end">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext.Provider is missing!');
  }

  const { userCredentials, setUserCredentials } = appContext;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const password = e.currentTarget.password.value;
    const confirm_password = e.currentTarget.confirm_password.value;

    if (!password) {
      alert('Please enter a new password');
      return;
    }

    if (password !== confirm_password) {
      alert('Passwords do not match');
      return;
    }

    const new_password = { password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_WEBAPI_URL}/users/${
          userCredentials?.user.id
        }`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userCredentials?.accessToken,
          },
          body: JSON.stringify(new_password),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert('Password changed succesfully!');
        console.log('server response: ', data);
      } else if (response.status === 401) {
        setUserCredentials(null);
        navigate('/auth/login');
      } else {
        alert('Unable to change password: ' + data);
      }
    } catch (error) {
      alert('Unable to connect to the server');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">New Password</label>
        <input type="password" className="form-control" name="password" />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          name="confirm_password"
        />
      </div>

      <div className="text-end">
        <button type="submit" className="btn btn-warning">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserProfile;
