import { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const Register = () => {
  const navigate = useNavigate();

  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext.Provider is missing!');
  }

  const { userCredentials, setUserCredentials } = appContext;

  if (userCredentials) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let user = Object.fromEntries(formData.entries());

    if (!user.firstname || !user.lastname || !user.email || !user.password) {
      alert('Please fill all the required fields');
      return;
    }
    if (user.password !== user.confirm_password) {
      alert('Passwords must match');
      return;
    }
    delete user.confirm_password;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_WEBAPI_URL}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log('server response: ', data);
        setUserCredentials(data);
        navigate('/');
      } else {
        alert('Unable to register' + data);
      }
    } catch (error) {
      alert('Unable to connect to server');
    }
  };
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create new Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">First Name *</label>
              <div className="col-sm-8">
                <input className="form-control" name="firstname" />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Last Name *</label>
              <div className="col-sm-8">
                <input className="form-control" name="lastname" />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Email *</label>
              <div className="col-sm-8">
                <input className="form-control" name="email" />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Phone</label>
              <div className="col-sm-8">
                <input className="form-control" name="phone" />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Address</label>
              <div className="col-sm-8">
                <input className="form-control" name="address" />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Password *</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">
                Confirm Password *
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="password"
                  name="confirm_password"
                />
              </div>
            </div>

            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link className="btn btn-outline-primary" to="/" role="button">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
