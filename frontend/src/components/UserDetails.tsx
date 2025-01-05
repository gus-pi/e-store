import { useContext } from 'react';
import { AppContext } from '../AppContext';

const UserDetails = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext.Provider is missing!');
  }

  const { userCredentials } = appContext;
  return (
    <>
      <div className="row mb-3">
        <div className="col-sm-3">First Name</div>
        <div className="col-sm-6">{userCredentials?.user.firstname}</div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-3">Last Name</div>
        <div className="col-sm-6">{userCredentials?.user.lastname}</div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-3">Email Address</div>
        <div className="col-sm-6">{userCredentials?.user.email}</div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-3">Phone Number</div>
        <div className="col-sm-6">{userCredentials?.user.phone}</div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-3">Address</div>
        <div className="col-sm-6">{userCredentials?.user.address}</div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-3">Role</div>
        <div className="col-sm-6">
          {userCredentials?.user.role === 'admin' ? 'Admin' : 'Client'}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
