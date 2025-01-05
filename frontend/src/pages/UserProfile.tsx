import { useState } from 'react';
import UserDetails from '../components/UserDetails';

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

export default UserProfile;
